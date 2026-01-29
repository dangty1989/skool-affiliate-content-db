import fs from 'fs';
import path from 'path';
import Markdown from 'react-markdown';
import Link from 'next/link';
import matter from 'gray-matter';

// Function to get post content by slug
const getPostContent = (slug: string) => {
    const folder = path.join(process.cwd(), 'content', 'blog');
    const file = `${folder}/${slug}.md`;

    if (!fs.existsSync(file)) {
        return null;
    }

    const content = fs.readFileSync(file, 'utf-8');
    const matterResult = matter(content);
    return matterResult;
};

// Generate static params for Vercel static export
export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'content', 'blog');

    if (!fs.existsSync(postsDirectory)) return [];

    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
    }));
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const post = getPostContent(slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Post Not Found</h1>
                    <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4">
            <article className="max-w-3xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    ← Back to all posts
                </Link>

                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight capitalize">
                    {slug.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ')}
                </h1>

                {/* Markdown Content Wrapper */}
                <div className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-a:text-primary hover:prose-a:text-blue-400
                    prose-strong:text-white prose-code:text-yellow-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-800">
                    <Markdown>{post.content}</Markdown>
                </div>

                {/* Footer CTA */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <div className="bg-secondary p-6 rounded-xl border border-gray-800 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Ready to master AI SEO?</h3>
                        <p className="text-gray-400 mb-4">Join the Skool community and start building your empire today.</p>
                        <a
                            href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                        >
                            Join Skool Now →
                        </a>
                    </div>
                </div>
            </article>
        </div>
    );
}
