import Link from 'next/link';
import { ArrowRight, Zap, Target, BarChart3 } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to get latest blog posts
const getLatestPosts = () => {
  const blogDir = path.join(process.cwd(), 'content', 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
    const { data, content } = matter(fileContent);
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    const image = imageMatch ? imageMatch[1] : '/globe.svg';

    return {
      slug: filename.replace('.md', ''),
      title: data.title || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ').replace('.md', ''),
      date: data.date || filename.substring(0, 10),
      description: data.description || '',
      image,
      ...data,
    };
  });

  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  // CRITICAL: Serialize to convert any Date objects to strings
  // This prevents "Objects are not valid as a React child" error
  return JSON.parse(JSON.stringify(sorted));
};

export default function Home() {
  const latestPosts = getLatestPosts();

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-blue-400 border border-blue-500/20 mb-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Zap size={14} className="fill-current" />
          <span>Automated SEO Insights v1.0</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] max-w-4xl">
          Master the Art of <span className="hero-gradient">Skool Affiliate</span> Growth.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mt-4">
          Experience the power of AI-driven affiliate marketing. We repurpose top SEO strategies into actionable insights, helping you scale your Skool communities faster.
        </p>
        <div className="flex gap-4 mt-8">
          <Link href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-2xl shadow-white/10">
            Join the Group <ArrowRight size={20} />
          </Link>
          <Link href="#insights" className="glass px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all text-white border border-white/10">
            Latest Insights
          </Link>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {[
          { icon: <Target className="text-red-500" />, title: "Precision Targeting", desc: "AI-extracted keywords and SEO entities for maximum reach." },
          { icon: <Zap className="text-yellow-500" />, title: "Rapid Content", desc: "Video-to-blog conversion in under 5 minutes for $0." },
          { icon: <BarChart3 className="text-green-500" />, title: "Verified Growth", desc: "Data-driven strategies from Julian Goldie's proven playbooks." }
        ].map((feat, i) => (
          <div key={i} className="glass p-8 group hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Blog Listing Segment */}
      <section id="insights" className="py-12 border-t border-white/5">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Latest Insights</h2>
            <p className="text-gray-500">Expert strategies for Skool Affiliate success.</p>
          </div>
          {latestPosts.length > 0 && (
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Dynamic Blog Posts */}
        {latestPosts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass aspect-[16/9] flex items-center justify-center text-gray-600 animate-pulse border-dashed border-2 border-white/10">
              New Strategy Coming Soon...
            </div>
            <div className="glass aspect-[16/9] flex items-center justify-center text-gray-600 animate-pulse border-dashed border-2 border-white/10">
              Automatic Update Pending...
            </div>
            <div className="glass aspect-[16/9] flex items-center justify-center text-gray-600 animate-pulse border-dashed border-2 border-white/10">
              AI Content Queued...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <div className="glass overflow-hidden hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col">
                  <div className="aspect-video w-full overflow-hidden bg-gray-900/50 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-blue-400 mb-2 font-mono">{post.date}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{post.description}</p>
                    )}
                    <div className="mt-auto pt-4 flex items-center text-gray-400 text-sm group-hover:text-white transition-colors">
                      Read Article <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
