const https = require('https');
const fs = require('fs');
const path = require('path');

// ─── Configuration ───────────────────────────────────────────────
const NEWS_FILE = path.join('logs', 'latest-ai-news.json');
const BLOG_DIR = path.join('website', 'content', 'blog');
const AFFILIATE_FILE = path.join('.pi', 'knowledge', 'affiliate-products.md');
const SKILL_FILE = path.join('.pi', 'skills', 'write-affiliate-news', 'SKILL.md');

// ─── OpenAI API Call ─────────────────────────────────────────────
function callOpenAI(messages) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.error('❌ OPENAI_API_KEY not found in environment!');
        process.exit(1);
    }

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: 'o3-mini',
            messages: messages,
            max_completion_tokens: 4000,
            reasoning_effort: 'medium'
        });

        const options = {
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    if (response.error) {
                        reject(new Error(`OpenAI API Error: ${response.error.message}`));
                        return;
                    }
                    if (response.choices && response.choices[0]) {
                        resolve(response.choices[0].message.content);
                    } else {
                        reject(new Error('No response from OpenAI'));
                    }
                } catch (e) {
                    reject(new Error(`Failed to parse OpenAI response: ${e.message}\nRaw: ${data.substring(0, 500)}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`OpenAI request failed: ${e.message}`));
        });

        req.setTimeout(120000, () => {
            req.destroy();
            reject(new Error('OpenAI request timed out after 120s'));
        });

        req.write(postData);
        req.end();
    });
}

// ─── Slug Generator ──────────────────────────────────────────────
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 60)
        .replace(/-$/, '');
}

// ─── Today's Date ────────────────────────────────────────────────
function getToday() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// ─── Check if blog post already exists for today ─────────────────
function todayPostExists() {
    const today = getToday();
    if (!fs.existsSync(BLOG_DIR)) return false;
    const files = fs.readdirSync(BLOG_DIR);
    return files.some(f => f.startsWith(today));
}

// ─── Main ────────────────────────────────────────────────────────
async function main() {
    console.log('🚀 Write Blog Post - Direct OpenAI Mode');
    console.log('========================================\n');

    // Step 0: Check if we already have a post today
    if (todayPostExists()) {
        console.log(`⚠️  A blog post already exists for today (${getToday()}). Skipping.`);
        process.exit(0);
    }

    // Step 1: Read fetched news
    console.log('📰 Step 1: Reading fetched news...');
    if (!fs.existsSync(NEWS_FILE)) {
        console.error(`❌ News file not found: ${NEWS_FILE}`);
        console.error('   Run fetch-ai-news.js first!');
        process.exit(1);
    }

    const articles = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
    if (!articles || articles.length === 0) {
        console.error('❌ No articles found in news file!');
        process.exit(1);
    }

    console.log(`   Found ${articles.length} articles`);

    // Step 2: Read affiliate products
    console.log('🔗 Step 2: Reading affiliate products...');
    let affiliateInfo = '';
    if (fs.existsSync(AFFILIATE_FILE)) {
        affiliateInfo = fs.readFileSync(AFFILIATE_FILE, 'utf8');
        console.log('   Affiliate products loaded');
    } else {
        console.log('   ⚠️ No affiliate products file found, proceeding without');
    }

    // Step 3: Read SKILL guidelines
    console.log('📋 Step 3: Reading writing guidelines...');
    let skillGuide = '';
    if (fs.existsSync(SKILL_FILE)) {
        skillGuide = fs.readFileSync(SKILL_FILE, 'utf8');
        console.log('   SKILL guidelines loaded');
    }

    // Step 4: Prepare the top 5 news for AI to pick from
    const topNews = articles.slice(0, 5);
    const newsContext = topNews.map((a, i) =>
        `${i + 1}. [${a.source}] "${a.title}"\n   Link: ${a.link}\n   Date: ${a.date}\n   Summary: ${a.description}\n   Image: ${a.image_url || 'none'}`
    ).join('\n\n');

    // Step 5: Call OpenAI to write the article
    console.log('\n🧠 Step 4: Calling OpenAI o3-mini to write article...');

    const today = getToday();

    const systemPrompt = `You are Julian Goldie - an aggressive, high-ticket affiliate marketing expert and SEO master.
Your goal is to turn AI news into viral, profit-driven masterpieces.

${skillGuide}

${affiliateInfo}

CRITICAL RULES:
1. NO FLUFF. No "In this article...", no "Conclusion". Start with a HOOK.
2. USE PROPER HEADINGS. Use ## 🔥 and ## 💰 style. NEVER just bold text for titles.
3. TITLE CASE. Titles must be: "AI Is Taking Over" NOT "ai is taking over".
4. BE SPECIFIC. Mention real names, companies, and numbers. No generic "research labs".
5. NO CODE BLOCKS around the output. Just raw markdown.
6. MANDATORY IMAGE: You MUST include the featured image right after the H1 using the provided source image.
7. AFFILIATE LINKS: Use them naturally as a "recommendation from a friend".
8. Language: English. Length: 300-500 words.`;

    const userPrompt = `Today is ${today}. Here are the top AI news stories to pick from:

${newsContext}

PICK THE MOST IMPACTFUL STORY. Write as Julian Goldie. 
Ensure the "title", "description", and "image" in frontmatter are high-quality.
If a source image exists, YOU MUST use it in the frontmatter "image" field and display it at the top of the post.

Output the COMPLETE markdown file content.`;

    try {
        const blogContent = await callOpenAI([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ]);

        // Step 6: Extract title for slug
        console.log('📝 Step 5: Processing and saving...');

        // Clean the content - remove any wrapping code blocks
        let cleanContent = blogContent.trim();
        if (cleanContent.startsWith('```markdown')) {
            cleanContent = cleanContent.replace(/^```markdown\n?/, '').replace(/\n?```$/, '');
        }
        if (cleanContent.startsWith('```')) {
            cleanContent = cleanContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }

        // Extract title from frontmatter
        const titleMatch = cleanContent.match(/title:\s*["']?(.+?)["']?\s*$/m);
        const title = titleMatch ? titleMatch[1].replace(/["']/g, '') : 'ai-news-update';

        const slug = generateSlug(title);
        const fileName = `${today}-${slug}.md`;
        const filePath = path.join(BLOG_DIR, fileName);

        // Post-processing: Force image fallback if AI skipped it
        const topImage = (topNews.find(n => n.image_url && n.image_url !== 'none') || topNews[0]).image_url;

        if (topImage && topImage !== 'none') {
            // Replace image: "none" or empty image: field in frontmatter
            if (cleanContent.includes('image: none') || cleanContent.includes('image: ""') || !cleanContent.includes('image:')) {
                cleanContent = cleanContent.replace(/image:.*$/m, `image: "${topImage}"`);
            }

            // Ensure the image is also in the body after the H1 if missing
            const h1Match = cleanContent.match(/^# .*$/m);
            if (h1Match && !cleanContent.includes('![')) {
                cleanContent = cleanContent.replace(h1Match[0], `${h1Match[0]}\n\n![${title}](${topImage})`);
            }
        }

        // Ensure blog directory exists
        if (!fs.existsSync(BLOG_DIR)) {
            fs.mkdirSync(BLOG_DIR, { recursive: true });
        }

        // Save the file
        fs.writeFileSync(filePath, cleanContent, 'utf8');

        console.log(`\n✅ SUCCESS! Blog post saved!`);
        console.log(`   📄 File: ${filePath}`);
        console.log(`   📰 Title: ${title}`);
        console.log(`   📏 Length: ${cleanContent.length} characters`);
        console.log(`   📅 Date: ${today}`);

    } catch (error) {
        console.error(`\n❌ FAILED to generate blog post: ${error.message}`);
        process.exit(1);
    }
}

main();
