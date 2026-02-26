import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Affiliate Hub — AI-Powered Marketing Intelligence",
  description: "Daily AI insights, automation strategies, and affiliate marketing intelligence for Skool Affiliate. Powered by autonomous AI agents. Updated automatically.",
  keywords: ["AI affiliate marketing", "Skool affiliate", "AI automation", "affiliate marketing", "HeyGen", "ElevenLabs", "Make automation", "Julian Goldie", "AI tools"],
  authors: [{ name: "Dang Ty", url: "https://skool-machine.vercel.app" }],
  creator: "Dang Ty",
  publisher: "AI Affiliate Hub",
  metadataBase: new URL("https://skool-machine.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skool-machine.vercel.app",
    siteName: "AI Affiliate Hub",
    title: "AI Affiliate Hub — AI-Powered Marketing Intelligence",
    description: "Daily AI insights, automation strategies, and affiliate marketing intelligence. Powered by AI. Updated automatically.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Affiliate Hub — AI-Powered Marketing Intelligence",
    description: "Daily AI insights and automation strategies for Skool Affiliate growth.",
    creator: "@dangty1989",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ====== SCHEMA MARKUP - "MẮT THẦN" CHO AI ====== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://skool-machine.vercel.app/#website",
                  "url": "https://skool-machine.vercel.app",
                  "name": "AI Affiliate Hub",
                  "description": "Daily AI insights, automation strategies, and affiliate marketing intelligence for Skool community growth.",
                  "publisher": { "@id": "https://skool-machine.vercel.app/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": { "@type": "EntryPoint", "urlTemplate": "https://skool-machine.vercel.app/blog?q={search_term_string}" },
                    "query-input": "required name=search_term_string"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "Organization",
                  "@id": "https://skool-machine.vercel.app/#organization",
                  "name": "AI Affiliate Hub",
                  "url": "https://skool-machine.vercel.app",
                  "description": "Expert AI affiliate marketing intelligence hub specializing in Skool community growth, AI automation tools, and revenue optimization strategies.",
                  "founder": { "@id": "https://skool-machine.vercel.app/#person" },
                  "knowsAbout": [
                    "AI Affiliate Marketing",
                    "Skool Community Growth",
                    "Marketing Automation",
                    "HeyGen Video AI",
                    "ElevenLabs Voice AI",
                    "Make.com Automation",
                    "n8n Workflows",
                    "SEO Strategy"
                  ],
                  "sameAs": [
                    "https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b"
                  ]
                },
                {
                  "@type": "Person",
                  "@id": "https://skool-machine.vercel.app/#person",
                  "name": "Dang Ty",
                  "jobTitle": "AI Affiliate Marketing Expert",
                  "description": "Specialist in AI automation and affiliate marketing systems generating $300k/mo using tools like HeyGen, ElevenLabs, and Make.com.",
                  "url": "https://skool-machine.vercel.app",
                  "knowsAbout": [
                    "AI Affiliate Marketing",
                    "Skool Community",
                    "n8n Automation",
                    "Video AI Production",
                    "SEO Content Automation"
                  ],
                  "sameAs": [
                    "https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b"
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${outfit.className} bg-mesh min-h-screen`}>
        {/* ====== NAVBAR ====== */}
        <nav className="fixed top-0 w-full z-50 px-4 pt-4">
          <div className="glass-strong border border-white/5 py-3 px-6 md:px-8 flex justify-between items-center max-w-6xl mx-auto rounded-2xl">
            <Link href="/" className="text-xl font-black tracking-tight">
              AI<span className="hero-gradient">HUB</span>
            </Link>

            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
              <a href="https://tino.vn/vps-gia-re?php=4086" className="hover:text-white transition-colors">VPS</a>
              <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="hover:text-white transition-colors">Community</a>
            </div>

            <a
              href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b"
              className="btn-primary text-sm py-2 px-5"
            >
              Join Free
            </a>
          </div>
        </nav>

        {/* ====== MAIN ====== */}
        <main className="pt-28 px-4 md:px-6 max-w-6xl mx-auto">
          {children}
        </main>

        {/* ====== FOOTER ====== */}
        <footer className="mt-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto py-16 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="text-2xl font-black tracking-tight mb-3">
                  AI<span className="hero-gradient">HUB</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  AI-powered affiliate marketing intelligence. Updated daily by autonomous AI agents.
                </p>
              </div>

              {/* Automation Tools */}
              <div>
                <span className="text-white font-bold text-xs uppercase tracking-widest mb-4 block">Automation</span>
                <div className="flex flex-col gap-2.5 text-gray-500 text-sm">
                  <a href="https://www.make.com/en/register?pc=dangty" className="hover:text-indigo-300 transition-colors">Make.com</a>
                  <a href="https://lovable.dev/?via=ty-dang" className="hover:text-indigo-300 transition-colors">Lovable.dev</a>
                  <a href="https://openrouter.ai/" className="hover:text-indigo-300 transition-colors">OpenRouter</a>
                </div>
              </div>

              {/* AI Media */}
              <div>
                <span className="text-white font-bold text-xs uppercase tracking-widest mb-4 block">AI Media</span>
                <div className="flex flex-col gap-2.5 text-gray-500 text-sm">
                  <a href="https://www.heygen.com/?sid=rewardful&via=dang-ty" className="hover:text-indigo-300 transition-colors">HeyGen</a>
                  <a href="https://try.elevenlabs.io/4x8x1ricbng4" className="hover:text-indigo-300 transition-colors">ElevenLabs</a>
                  <a href="https://customgpt.ai/api/?fpr=ty92" className="hover:text-indigo-300 transition-colors">CustomGPT</a>
                </div>
              </div>

              {/* Infrastructure */}
              <div>
                <span className="text-white font-bold text-xs uppercase tracking-widest mb-4 block">Infrastructure</span>
                <div className="flex flex-col gap-2.5 text-gray-500 text-sm">
                  <a href="https://tino.vn/vps-gia-re?php=4086" className="hover:text-indigo-300 transition-colors">Tino Hosting</a>
                  <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="hover:text-indigo-300 transition-colors">Skool Community</a>
                </div>
              </div>
            </div>

            <div className="section-divider mb-8"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                © 2026 AI Affiliate Hub. Powered by Autonomous AI Agents.
              </p>
              <div className="flex gap-6 text-gray-600 text-sm">
                <Link href="/blog" className="hover:text-indigo-300 transition-colors">Blog</Link>
                <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="hover:text-indigo-300 transition-colors">Join</a>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
