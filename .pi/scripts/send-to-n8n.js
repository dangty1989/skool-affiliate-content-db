const https = require('https');
const fs = require('fs');
const path = require('path');

async function main() {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        console.log('⚠️  N8N_WEBHOOK_URL not set. Skipping n8n dispatch.');
        return;
    }

    console.log('📤 Dispatching content to n8n...');

    try {
        // 1. Get the latest blog post file
        const blogDir = path.join('website', 'content', 'blog');
        const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).sort().reverse();
        const latestBlogFile = files[0];
        const blogContent = fs.readFileSync(path.join(blogDir, latestBlogFile), 'utf8');

        // 2. Read social content
        const readLog = (file) => fs.existsSync(path.join('logs', file)) ? fs.readFileSync(path.join('logs', file), 'utf8') : '';

        const data = {
            timestamp: new Date().toISOString(),
            blog: {
                filename: latestBlogFile,
                url: `https://skool-machine.vercel.app/blog/${latestBlogFile.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '')}`,
                content: blogContent
            },
            social: {
                x: {
                    caption: readLog('x-caption.txt'),
                    comment: readLog('x-comment.txt')
                },
                facebook: {
                    caption: readLog('fb-caption.txt'),
                    comment: readLog('fb-comment.txt')
                }
            }
        };

        // 3. Send to n8n Webhook
        const url = new URL(webhookUrl);
        const postData = JSON.stringify(data);

        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            console.log(`✅ n8n Response: ${res.statusCode}`);
        });

        req.on('error', (e) => {
            console.error(`❌ Failed to send to n8n: ${e.message}`);
        });

        req.write(postData);
        req.end();

    } catch (err) {
        console.error(`❌ Error gathering data for n8n: ${err.message}`);
    }
}

main();
