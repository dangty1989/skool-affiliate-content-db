import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

// Hàm lấy tất cả bài viết từ thư mục content/blog
const getPosts = () => {
    const blogDir = path.join(process.cwd(), 'content', 'blog');

    // Tạo thư mục nếu chưa có để tránh lỗi
    if (!fs.existsSync(blogDir)) {
        return [];
    }

    const files = fs.readdirSync(blogDir);
    const posts = files.map((filename) => {
        const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
        const { data, content } = matter(fileContent);
        // Trích xuất ảnh đầu tiên trong bài làm ảnh đại diện (nếu có)
        const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
        const image = imageMatch ? imageMatch[1] : '/globe.svg'; // Ảnh mặc định

        return {
            slug: filename.replace('.md', ''),
            title: filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace('.md', ''),
            date: filename.substring(0, 10),
            image,
            ...data,
        };
    });

    // Sắp xếp bài mới nhất lên đầu
    const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // CRITICAL: Serialize to convert any Date objects to strings
    // This prevents "Objects are not valid as a React child" error
    return JSON.parse(JSON.stringify(sorted));
};

export default function BlogPage() {
    const posts = getPosts();

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-10 text-center">
                    Skool Affiliate <span className="text-primary">Insights</span>
                </h1>

                {posts.length === 0 ? (
                    <div className="text-center text-gray-400">
                        <p>No posts found. Waiting for AI Agent to publish...</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                                <div className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-primary/50 h-full flex flex-col">
                                    <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
                                        {/* Hiển thị ảnh thay vì Next/Image để đơn giản hóa với file tĩnh */}
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <p className="text-sm text-primary mb-2 font-mono">{post.date}</p>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors capitalize line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center text-gray-400 text-sm group-hover:text-white transition-colors">
                                            Read Article <span className="ml-2">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
