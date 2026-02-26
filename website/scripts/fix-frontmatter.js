const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../content/blog');
const files = fs.readdirSync(blogDir);

files.forEach(filename => {
    const filePath = path.join(blogDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(content);

    // Ensure all frontmatter fields are strings
    if (parsed.data.date && typeof parsed.data.date !== 'string') {
        parsed.data.date = parsed.data.date.toISOString().split('T')[0];
    }
    if (parsed.data.author && typeof parsed.data.author !== 'string') {
        parsed.data.author = String(parsed.data.author);
    }
    if (parsed.data.category && typeof parsed.data.category !== 'string') {
        parsed.data.category = String(parsed.data.category);
    }

    // Rebuild file
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✓ Fixed: ${filename}`);
});

console.log('\n✅ All blog posts fixed!');
