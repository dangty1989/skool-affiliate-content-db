const fs = require('fs');
const path = require('path');

/**
 * Clean unwanted debug output from blog posts
 * Removes lines like:
 * - "lưu vào:/job/website/content/blog/..."
 * - "save to: /job/website/content/blog/..."
 * - Other system messages
 */

const BLOG_DIR = path.join(__dirname, '../../website/content/blog');

// Patterns to remove
const UNWANTED_PATTERNS = [
    /^lưu vào:.*$/gim,
    /^save to:.*$/gim,
    /^saved to:.*$/gim,
    /_save to:.*_$/gim,  // Matches: _save to: `/job/...`_
    /_lưu vào:.*_$/gim,  // Matches: _lưu vào: `/job/...`_
    /^writing to:.*$/gim,
    /^output:.*\.md$/gim,
    /^file:.*\.md$/gim
];

function cleanBlogPost(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Remove unwanted patterns
    UNWANTED_PATTERNS.forEach(pattern => {
        content = content.replace(pattern, '');
    });

    // Remove multiple consecutive blank lines
    content = content.replace(/\n{3,}/g, '\n\n');

    // Trim trailing whitespace
    content = content.trim() + '\n';

    // Only write if content changed
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Cleaned: ${path.basename(filePath)}`);
        return true;
    }

    return false;
}

function main() {
    if (!fs.existsSync(BLOG_DIR)) {
        console.log('⚠️  Blog directory not found');
        return;
    }

    const files = fs.readdirSync(BLOG_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(BLOG_DIR, f));

    console.log(`🔍 Checking ${files.length} blog posts for unwanted content...`);

    let cleanedCount = 0;
    files.forEach(file => {
        if (cleanBlogPost(file)) {
            cleanedCount++;
        }
    });

    if (cleanedCount > 0) {
        console.log(`\n🎉 Cleaned ${cleanedCount} file(s)`);
    } else {
        console.log('\n✨ All files are clean!');
    }
}

main();
