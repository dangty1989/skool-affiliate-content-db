import Link from 'next/link';
import { ArrowRight, Zap, Target, BarChart3, Video, Mic, Workflow, Layout, MessageSquare, Server } from 'lucide-react';
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

  const sorted = (posts as any[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

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
        {/* Live pulse badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-blue-400 border border-blue-500/20 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>AI-Updated Daily · Live Intelligence</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] max-w-4xl">
          Master the Art of <span className="hero-gradient">Skool Affiliate</span> Growth.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mt-4">
          Experience the power of AI-driven affiliate marketing. We repurpose top SEO strategies into actionable insights, helping you scale your Skool communities faster.
        </p>

        {/* Quick stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><span className="text-green-400 font-bold">↑</span> $300k/mo Revenue Systems</span>
          <span className="text-white/10">|</span>
          <span className="flex items-center gap-1.5"><span className="text-blue-400 font-bold">✦</span> 6 Elite AI Tools</span>
          <span className="text-white/10">|</span>
          <span className="flex items-center gap-1.5"><span className="text-purple-400 font-bold">⚡</span> Auto-Published Content</span>
        </div>

        <div className="flex gap-4 mt-6">
          <Link href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-2xl shadow-white/10">
            Join the Group <ArrowRight size={20} />
          </Link>
          <Link href="#insights" className="glass px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all text-white border border-white/10">
            Latest Insights
          </Link>
        </div>
      </section>

      {/* Elite AI Stack - Featured Products */}
      <section className="px-4 max-w-6xl mx-auto -mt-6">
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
            <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.25em]">⚡ The Elite AI Stack</span>
          </div>
          <p className="text-gray-400 text-center max-w-lg text-sm">
            Professional-grade tools powering automated affiliate systems.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              name: "HeyGen",
              icon: <Video size={22} />,
              iconColor: "text-orange-400",
              bgGlow: "bg-orange-500/10",
              color: "from-orange-500/30 to-red-500/30",
              border: "border-orange-500/25 hover:border-orange-400/50",
              text: "Video AI",
              link: "https://www.heygen.com/?sid=rewardful&via=dang-ty"
            },
            {
              name: "ElevenLabs",
              icon: <Mic size={22} />,
              iconColor: "text-blue-400",
              bgGlow: "bg-blue-500/10",
              color: "from-blue-500/30 to-indigo-500/30",
              border: "border-blue-500/25 hover:border-blue-400/50",
              text: "Voice AI",
              link: "https://try.elevenlabs.io/4x8x1ricbng4"
            },
            {
              name: "Make",
              icon: <Workflow size={22} />,
              iconColor: "text-purple-400",
              bgGlow: "bg-purple-500/10",
              color: "from-purple-500/30 to-pink-500/30",
              border: "border-purple-500/25 hover:border-purple-400/50",
              text: "Automation",
              link: "https://www.make.com/en/register?pc=dangty"
            },
            {
              name: "Lovable",
              icon: <Layout size={22} />,
              iconColor: "text-emerald-400",
              bgGlow: "bg-emerald-500/10",
              color: "from-green-500/30 to-emerald-500/30",
              border: "border-emerald-500/25 hover:border-emerald-400/50",
              text: "Web Dev",
              link: "https://lovable.dev/?via=ty-dang"
            },
            {
              name: "CustomGPT",
              icon: <MessageSquare size={22} />,
              iconColor: "text-cyan-400",
              bgGlow: "bg-cyan-500/10",
              color: "from-cyan-500/30 to-blue-500/30",
              border: "border-cyan-500/25 hover:border-cyan-400/50",
              text: "Agentic AI",
              link: "https://customgpt.ai/api/?fpr=ty92"
            },
            {
              name: "TinoHost",
              icon: <Server size={22} />,
              iconColor: "text-yellow-400",
              bgGlow: "bg-yellow-500/10",
              color: "from-yellow-500/30 to-orange-500/30",
              border: "border-yellow-500/25 hover:border-yellow-400/50",
              text: "AI Hosting",
              link: "https://tino.vn/vps-gia-re?php=4086"
            }
          ].map((tool, idx) => (
            <a
              key={idx}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl p-4 flex flex-col items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 bg-white/3 border ${tool.border} hover:bg-white/5 cursor-pointer`}
            >
              {/* Glow background on hover */}
              <div className={`absolute inset-0 ${tool.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center ${tool.iconColor} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                {tool.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 text-center">
                <span className="block text-[13px] font-black text-white group-hover:text-white transition-colors tracking-tight">{tool.name}</span>
                <span className={`block text-[10px] font-bold ${tool.iconColor} uppercase tracking-widest mt-0.5 opacity-70`}>{tool.text}</span>
              </div>

              {/* Shimmer line at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Bottom label */}
        <p className="text-center text-[11px] text-gray-600 mt-4 tracking-widest uppercase">Click any tool to explore affiliate offers</p>
      </section>

      {/* Strategic Video Insights Gallery */}
      <section className="px-4 max-w-6xl mx-auto -mt-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { id: "OdMTSmTqexg", title: "Skool Growth Strategy", desc: "Master the fundamental AI automation for communities." },
            { id: "uNK6GKIiUpI", title: "Elite Affiliate Hacks", desc: "Hidden techniques to scale your revenue with AI." }
          ].map((video, idx) => (
            <div key={idx} className="relative glass-strong rounded-[2rem] overflow-hidden gradient-border group">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-5 bg-white/5 border-t border-white/5">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{video.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{video.desc}</p>
              </div>
            </div>
          ))}
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
            {latestPosts.map((post: any) => (
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
