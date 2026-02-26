import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { ArrowRight, Sparkles, Search, ArrowLeft } from 'lucide-react';

const getPosts = () => {
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);
    const posts = files.map((filename) => {
        const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
        const { data, content } = matter(fileContent);
        const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
        const image = data.image || (imageMatch ? imageMatch[1] : '/globe.svg');

        return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace('.md', ''),
            date: data.date || filename.substring(0, 10),
            description: data.description || '',
            category: data.category || 'AI Insights',
            tags: data.tags || [],
            image,
            ...data,
        };
    });

    const sorted = posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return JSON.parse(JSON.stringify(sorted));
};

export default function BlogPage() {
    const posts = getPosts();
    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    // Extract all unique categories
    const categories = Array.from(new Set(posts.map((p: any) => p.category).filter(Boolean)));

    return (
        <div className="min-h-screen relative">
            {/* Decorative orbs */}
            <div className="orb orb-purple w-[400px] h-[400px] -top-20 -right-20 animate-float"></div>
            <div className="orb orb-blue w-[300px] h-[300px] top-[600px] -left-20 animate-pulse-glow"></div>

            {/* ====== HEADER ====== */}
            <section className="text-center pt-8 pb-16 px-4 relative">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-300 transition-colors text-sm mb-8">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong text-xs font-semibold text-indigo-300 border border-indigo-500/20 mb-6 mx-auto">
                    <Sparkles size={12} className="text-indigo-400" />
                    {posts.length} Articles Published
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                    AI <span className="hero-gradient">Insights</span> Hub
                </h1>
                <p className="text-gray-400 text-lg max-w-lg mx-auto">
                    Deep dives into AI trends, automation strategies, and affiliate marketing intelligence.
                </p>

                {/* Category Pills */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                        <span className="tag-pill bg-indigo-500/20 text-indigo-200 border-indigo-500/30">All</span>
                        {categories.slice(0, 6).map((cat: any) => (
                            <span key={cat} className="tag-pill">{cat}</span>
                        ))}
                    </div>
                )}
            </section>

            {/* ====== FEATURED POST ====== */}
            {featuredPost && (
                <section className="px-4 pb-12">
                    <Link href={`/blog/${featuredPost.slug}`} className="group block">
                        <div className="featured-card relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/5">
                            <img
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent z-10"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="tag-pill">🔥 Latest</span>
                                    <span className="text-gray-400 text-sm font-mono">{featuredPost.date}</span>
                                    {featuredPost.category && (
                                        <span className="tag-pill bg-purple-500/10 text-purple-300 border-purple-500/20">{featuredPost.category}</span>
                                    )}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight group-hover:text-indigo-200 transition-colors line-clamp-2">
                                    {featuredPost.title}
                                </h2>
                                {featuredPost.description && (
                                    <p className="text-gray-300 text-lg max-w-2xl line-clamp-2 mb-5">{featuredPost.description}</p>
                                )}
                                <div className="inline-flex items-center gap-2 text-indigo-300 font-semibold group-hover:text-white transition-colors">
                                    Read Full Article <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* ====== DIVIDER ====== */}
            <div className="section-divider mx-4 my-8"></div>

            {/* ====== POST GRID ====== */}
            <section className="px-4 pb-24">
                {remainingPosts.length === 0 && !featuredPost ? (
                    <div className="text-center py-20">
                        <div className="glass-strong inline-flex flex-col items-center px-12 py-10 rounded-3xl">
                            <Sparkles size={40} className="text-indigo-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
                            <p className="text-gray-500">Our AI bot is writing the first article. Check back soon!</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                            <h3 className="text-lg font-bold text-white">All Articles</h3>
                            <span className="text-gray-600 text-sm">({remainingPosts.length})</span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {remainingPosts.map((post: any, index: number) => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                                    <div className="glass card-hover overflow-hidden h-full flex flex-col gradient-border">
                                        <div className="aspect-[16/10] w-full overflow-hidden bg-gray-900/50 relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-75 group-hover:opacity-100"
                                            />
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="tag-pill text-[10px]">{post.category || 'AI'}</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent"></div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col">
                                            <p className="text-xs text-indigo-400 mb-2 font-mono tracking-wide uppercase">{post.date}</p>
                                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug capitalize">
                                                {post.title}
                                            </h3>
                                            {post.description && (
                                                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.description}</p>
                                            )}

                                            {/* Tags */}
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {post.tags.slice(0, 3).map((tag: string, i: number) => (
                                                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/5">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="mt-auto pt-3 border-t border-white/5 flex items-center text-gray-500 text-sm group-hover:text-indigo-300 transition-colors">
                                                Read Article <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* ====== CTA BANNER ====== */}
            <section className="px-4 pb-20">
                <div className="glass-strong rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto gradient-border">
                    <h3 className="text-2xl md:text-3xl font-black mb-3">Want More Than Just Articles?</h3>
                    <p className="text-gray-400 mb-6">Join our Skool community for live trainings, AI workflows, and direct mentorship.</p>
                    <Link href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="btn-primary text-lg">
                        Join the Community <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
