#!/usr/bin/env node

/**
 * AI News RSS Feed Aggregator
 * Fetches latest AI news from multiple RSS sources
 * Usage: node fetch-ai-news.js [hours]
 * Example: node fetch-ai-news.js 24
 */

const https = require('https');
const http = require('http');

// RSS Feed Sources
const RSS_SOURCES = [
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'Company News'
  },
  {
    name: 'Google AI Blog',
    url: 'https://ai.googleblog.com/feeds/posts/default',
    category: 'Research'
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    category: 'Open Source'
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'Industry News'
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
    category: 'Tech News'
  },
  {
    name: 'MIT Technology Review AI',
    url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed',
    category: 'Deep Analysis'
  }
];

/**
 * Fetch URL content
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AINewsBot/1.0)'
      }
    }, (res) => {
      let data = '';
      
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Simple XML parser for RSS feeds
 */
function parseRSSFeed(xml, sourceName) {
  const items = [];
  
  // Match all <item> or <entry> tags
  const itemRegex = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/gi;
  const matches = xml.matchAll(itemRegex);
  
  for (const match of matches) {
    const itemXml = match[1];
    
    // Extract fields
    const title = extractTag(itemXml, 'title');
    const link = extractTag(itemXml, 'link');
    const description = extractTag(itemXml, 'description') || extractTag(itemXml, 'summary') || extractTag(itemXml, 'content:encoded');
    const pubDate = extractTag(itemXml, 'pubDate') || extractTag(itemXml, 'published') || extractTag(itemXml, 'updated');
    
    if (title && link) {
      items.push({
        source: sourceName,
        title: cleanHtml(title),
        link: cleanHtml(link),
        description: cleanHtml(description).substring(0, 500), // Limit description length
        pubDate: pubDate ? new Date(cleanHtml(pubDate)) : new Date(),
        timestamp: pubDate ? new Date(cleanHtml(pubDate)).getTime() : Date.now()
      });
    }
  }
  
  return items;
}

/**
 * Extract content from XML tag
 */
function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  if (match) return match[1];
  
  // Try self-closing or CDATA
  const selfClosing = new RegExp(`<${tagName}[^>]*\\/>`, 'i');
  const selfMatch = xml.match(selfClosing);
  if (selfMatch) return selfMatch[0];
  
  return null;
}

/**
 * Clean HTML entities and tags
 */
function cleanHtml(text) {
  if (!text) return '';
  
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1') // Remove CDATA
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Filter news by time window
 */
function filterByTime(items, hours = 24) {
  const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
  return items.filter(item => item.timestamp >= cutoffTime);
}

/**
 * Main function
 */
async function main() {
  const hoursBack = parseInt(process.argv[2]) || 24;
  
  console.log(`\n🔍 Fetching AI news from the last ${hoursBack} hours...\n`);
  
  const allNews = [];
  const errors = [];
  
  // Fetch all RSS feeds
  for (const source of RSS_SOURCES) {
    try {
      console.log(`📰 Fetching: ${source.name}...`);
      const xml = await fetchUrl(source.url);
      const items = parseRSSFeed(xml, source.name);
      
      // Add category to each item
      items.forEach(item => {
        item.category = source.category;
      });
      
      allNews.push(...items);
      console.log(`   ✓ Found ${items.length} articles`);
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      errors.push({ source: source.name, error: error.message });
    }
  }
  
  // Filter by time
  const recentNews = filterByTime(allNews, hoursBack);
  
  // Sort by date (newest first)
  recentNews.sort((a, b) => b.timestamp - a.timestamp);
  
  // Output results
  console.log(`\n✅ Total articles found: ${allNews.length}`);
  console.log(`📅 Recent articles (last ${hoursBack}h): ${recentNews.length}\n`);
  
  if (errors.length > 0) {
    console.log(`⚠️  Errors encountered: ${errors.length} sources failed\n`);
  }
  
  // Save to JSON file
  const output = {
    generated: new Date().toISOString(),
    hoursBack: hoursBack,
    totalArticles: allNews.length,
    recentArticles: recentNews.length,
    errors: errors,
    news: recentNews
  };
  
  // Output to stdout as JSON (for consumption by other scripts)
  console.log('\n--- JSON OUTPUT START ---');
  console.log(JSON.stringify(output, null, 2));
  console.log('--- JSON OUTPUT END ---\n');
  
  // Also save to file if running in /job/tmp/
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Try to save to /job/tmp/ (Docker environment)
    let outputPath = '/job/tmp/latest-ai-news.json';
    
    // Fallback to current directory if not in Docker
    if (!fs.existsSync('/job/tmp/')) {
      outputPath = path.join(__dirname, 'latest-ai-news.json');
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`💾 Saved to: ${outputPath}\n`);
  } catch (e) {
    // Silent fail if can't write file
  }
  
  // Print top 5 most recent
  console.log('📌 Top 5 Most Recent Articles:\n');
  recentNews.slice(0, 5).forEach((item, i) => {
    console.log(`${i + 1}. [${item.source}] ${item.title}`);
    console.log(`   ${item.link}`);
    console.log(`   Published: ${item.pubDate.toLocaleString()}`);
    console.log('');
  });
  
  return output;
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { fetchUrl, parseRSSFeed, filterByTime };
