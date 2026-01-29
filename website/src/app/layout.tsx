import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Julian Goldie Affiliate Hub - Expert SEO Insights",
  description: "Automated insights and training for Skool Affiliate Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-mesh min-h-screen`}>
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-8 flex justify-between items-center max-w-7xl left-1/2 -translate-x-1/2 mt-4 rounded-full overflow-hidden">
          <div className="text-xl font-bold tracking-tight">GOLDIE<span className="text-blue-500">AFFILIATE</span></div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Insights</a>
            <a href="https://tino.vn/vps-gia-re?php=4086" className="hover:text-white transition-colors">VPS</a>
            <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="hover:text-white transition-colors">Join Group</a>
          </div>
          <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/25">
            Start Learning
          </a>
        </nav>
        <main className="pt-32 px-6 max-w-7xl mx-auto">
          {children}
        </main>
        <footer className="py-20 flex flex-col items-center gap-12 border-t border-white/5 mt-20">
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-sm uppercase tracking-widest">Automation Tools</span>
              <div className="flex flex-col gap-2 text-gray-500 text-sm">
                <a href="https://www.make.com/en/register?pc=dangty" className="hover:text-blue-400 transition-colors">Make.com (Integration)</a>
                <a href="https://lovable.dev/?via=ty-dang" className="hover:text-blue-400 transition-colors">Lovable.dev (App Builder)</a>
                <a href="https://openrouter.ai/" className="hover:text-blue-400 transition-colors">OpenRouter (AI Models)</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-sm uppercase tracking-widest">AI Media</span>
              <div className="flex flex-col gap-2 text-gray-500 text-sm">
                <a href="https://www.heygen.com/?sid=rewardful&via=dang-ty" className="hover:text-blue-400 transition-colors">HeyGen (AI Video)</a>
                <a href="https://try.elevenlabs.io/4x8x1ricbng4" className="hover:text-blue-400 transition-colors">ElevenLabs (AI Voice)</a>
                <a href="https://customgpt.ai/api/?fpr=ty92" className="hover:text-blue-400 transition-colors">CustomGPT (AI Bots)</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white font-bold text-sm uppercase tracking-widest">Infrastructure</span>
              <div className="flex flex-col gap-2 text-gray-500 text-sm">
                <a href="https://tino.vn/vps-gia-re?php=4086" className="hover:text-blue-400 transition-colors">Tino Hosting (VPS)</a>
                <a href="https://www.skool.com/ai-seo-with-julian-goldie-1553/about?ref=451dbbb27ba0480f931fa9156fe6ff4b" className="hover:text-blue-400 transition-colors">Julian Goldie Skool</a>
              </div>
            </div>
          </div>
          <div className="text-gray-600 text-sm">
            © 2026 Julian Goldie Affiliate Hub. Powered by AI Automation.
          </div>
        </footer>
      </body>
    </html>
  );
}
