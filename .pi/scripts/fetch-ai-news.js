const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const HOURS_BACK = 24;
const OUTPUT_FILE = path.join('logs', 'latest-ai-news.json');

const SOURCES = [
  { name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml" },
  { name: "Google AI Blog", url: "https://ai.googleblog.com/feeds/posts/default" },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed" },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/" }
];

// Ensure logs directory exists
const logDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function fetchRSS(source) {
  return new Promise((resolve) => {
    const req = https.get(source.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        fetchRSS({ ...source, url: res.headers.location }).then(resolve);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ source: source.name, data }));
    });

    req.on('error', (e) => {
      console.error(`Error fetching ${source.name}: ${e.message}`);
      resolve(null);
    });
  });
}

function parseDate(dateStr) {
  try {
    return new Date(dateStr);
  } catch (e) {
    return null;
  }
}

function extractImage(itemStr) {
  // 1. Try media:content
  const mediaMatch = itemStr.match(/<media:content[^>]+url="([^"]+)"/);
  if (mediaMatch) return mediaMatch[1];

  // 2. Try enclosure
  const enclosureMatch = itemStr.match(/<enclosure[^>]+url="([^"]+)"[^>]*type="image/);
  if (enclosureMatch) return enclosureMatch[1];

  // 3. Try regex on content/description
  const imgMatch = itemStr.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];

  return "";
}

function cleanText(txt) {
  return txt.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim();
}

async function main() {
  console.log(`Fetching AI news from last ${HOURS_BACK} hours...`);
  const timeThreshold = new Date(Date.now() - HOURS_BACK * 60 * 60 * 1000);

  const fetchPromises = SOURCES.map(src => fetchRSS(src));
  const results = await Promise.all(fetchPromises);

  let allArticles = [];

  for (const result of results) {
    if (!result || !result.data) continue;

    const xml = result.data;
    // Simple Regex XML Parser to avoid dependencies
    const isAtom = xml.includes('<entry>');
    const itemTag = isAtom ? 'entry' : 'item';

    const itemRegex = new RegExp(`<${itemTag}[^>]*>([\s\S]*?)<\/${itemTag}>`, 'gi');
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];

      // Extract fields
      const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(isAtom ? /<link[^>]+href="([^"]+)"/ : /<link>([\s\S]*?)<\/link>/);
      const dateMatch = itemContent.match(isAtom ? /<published>([\s\S]*?)<\/published>/ : /<pubDate>([\s\S]*?)<\/pubDate>/);
      const descMatch = itemContent.match(isAtom ? /<summary>([\s\S]*?)<\/summary>/ : /<description>([\s\S]*?)<\/description>/);

      if (!titleMatch || !dateMatch) continue;

      const pubDate = parseDate(cleanText(dateMatch[1]));
      if (!pubDate || pubDate < timeThreshold) continue;

      const title = cleanText(titleMatch[1]);
      const link = isAtom ? linkMatch[1] : cleanText(linkMatch[1]);
      const description = descMatch ? cleanText(descMatch[1]).substring(0, 200) + '...' : '';
      const imageUrl = extractImage(itemContent);

      allArticles.push({
        source: result.source,
        title: title,
        link: link,
        date: pubDate.toISOString(),
        description: description,
        image_url: imageUrl
      });
    }
  }

  // De-duplicate by link
  const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.link, item])).values());

  // Sort by date (newest first)
  uniqueArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueArticles, null, 2));
  console.log(`✅ Found ${uniqueArticles.length} fresh AI news articles.`);
  console.log(`Saved to ${OUTPUT_FILE}`);
}

main();
