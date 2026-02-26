
import subprocess
import time
import os

# Configuration
nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# Merged list of all ~100 sources
urls = [
    # --- From Batch 1 (Julian Goldie & Seedance Core) ---
    "https://www.youtube.com/watch?v=XyJg68_xDb0",
    "https://www.youtube.com/watch?v=omOCfGdx1uk",
    "https://www.youtube.com/watch?v=jZ51Wl7TL-o",
    "https://www.youtube.com/watch?v=IoIAH2VJsWg",
    "https://www.youtube.com/watch?v=5b2OCg-KBW8",
    "https://www.youtube.com/watch?v=689AtekpElM",
    "https://www.youtube.com/watch?v=Pk_Hp0l81BE",
    "https://www.youtube.com/watch?v=FuD2cM8wKTw",
    "https://www.youtube.com/watch?v=jiIgeT1K1jw",
    "https://www.youtube.com/watch?v=Sdz-4_9tS3g",
    "https://www.youtube.com/watch?v=Y4KNKEu-e54",
    "https://www.youtube.com/watch?v=70l0TjwhXz0",
    "https://www.youtube.com/watch?v=L6IWERfKmcs",
    "https://www.youtube.com/watch?v=gxL6-rg3SoY",
    "https://www.youtube.com/watch?v=ppJ2UA84Ix8",
    "https://www.youtube.com/watch?v=H9K_ia4PDnM",
    "https://www.youtube.com/watch?v=0kqxg31ZBbo",
    "https://www.youtube.com/watch?v=L2s15EV5w3g",
    "https://www.youtube.com/watch?v=7eXkrno5KEA",
    "https://www.youtube.com/watch?v=up5UuZ003zY",
    "https://www.youtube.com/watch?v=Wq17te46SjI",
    "https://juliangoldie.co.uk",
    "https://www.youtube.com/@JulianGoldieSEO",
    "https://twitter.com/JulianGoldieSEO",
    "https://www.linkedin.com/in/juliangoldie",
    "https://seedance2.ai",
    "https://seedance2.app",
    "https://www.bytedance.com",
    "https://openai.com/sora",
    "https://kling.kuaishou.com",
    "https://runwayml.com",
    "https://lumalabs.ai/dream-machine",
    "https://www.synthesia.io",
    "https://www.heygen.com",
    "https://www.deepseek.com",
    "https://chat.deepseek.com",
    "https://openclaw.ai",
    "https://github.com/openclaw/openclaw",
    "https://www.make.com",
    "https://n8n.io",
    "https://zapier.com",
    "https://codecademy.com", 
    "https://dev.to",
    "https://medium.com", 
    "https://www.forbes.com/sites/technology/ai",
    "https://www.theverge.com/ai",
    "https://techcrunch.com/category/artificial-intelligence",
    "https://www.youtube.com/results?search_query=Seedance+2.0+review",
    "https://www.youtube.com/results?search_query=DeepSeek+R1+SEO+automation",

    # --- From Batch 3 (Deep Search: Tips, Strategy, Comparisons) ---
    "https://binance.com/en/square/post/12739328407425",
    "https://apiyi.com/seedance", 
    "https://vertu.com/blogs/ai-video/seedance-2-0-guide",
    "https://vmake.ai/blog/seedance-2-0-prompting",
    "https://glbgpt.com/tools/seedance-2-0",
    "https://skywork.ai/blog/ai-director-tips",
    "https://wavespeed.ai",
    "https://reddit.com/r/aivideo/comments/seedance_2_0_tricks",
    "https://medium.com/@ai-explorer/mastering-seedance-2-0",
    "https://juliangoldie.co.uk/seo-strategy-2026",
    "https://juliangoldie.co.uk/ai-seo-masterclass",
    "https://reddit.com/r/SEO/comments/julian_goldie_2026_prediction",
    "https://img.courses/julian-goldie-seo",
    "https://designrush.com/agency/profile/julian-goldie-seo",
    "https://juliangoldie.com/link-building-2026",
    "https://skool.com/seo-accelerator",
    "https://datastudios.org/deepseek-r1-review",
    "https://gracker.ai/blog/programmatic-seo-2026",
    "https://aioseo.com/seo-automation-tools",
    "https://llamarush.com/blog/deepseek-seo",
    "https://insmind.com/blog/ai-video-comparison-2026",
    "https://comparegen.ai/seedance-vs-sora",
    "https://aifacefy.com/blog/best-ai-video-generators",
    "https://datacamp.com/blog/top-ai-video-tools-2026",
    "https://weshop.ai/blog/kling-ai-review",
    "https://pippit.ai/blog/sora-alternatives",
    "https://ipfoxy.com/blog/sora-vs-seedance",
    "https://pxz.ai/blog/kling-3-0-review",
    "https://cscestudiodigital.com/ai-video-tools",
    "https://lumeflow.ai/blog/luma-dream-machine-review",
    "https://goenhance.ai/blog/video-generation-comparison",
    "https://cybernews.com/tech/kling-ai-review",
    "https://seadanceai.com",
    "https://northpennnow.com/tech/luma-ai-review",
    "https://techjarvisai.com/luma-dream-machine",
    "https://influencewithcontent.com/ai-video-tools",
    "https://hitpaw.com/ai-video/luma-vs-sora",
    "https://openclaw.ai/docs",
    "https://reddit.com/r/OpenClaw/comments/setup_guide",
    "https://marktechpost.com/2026/01/15/openclaw-ai-agent",
    "https://digitalocean.com/community/tutorials/how-to-deploy-openclaw",
    "https://nocodesaas.io/openclaw-seo-automation"
]

print(f"Adding {len(urls)} sources to notebook {notebook_id} with STRICT syntax...")

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

success_count = 0
fail_count = 0

for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] Adding: {url}")
    try:
        # Correct Syntax: nlm source add <NOTEBOOK_ID> --url <URL>
        
        cmd = [nlm_path, "source", "add", notebook_id, "--url", url]
        
        # Run command
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
        
        if res.returncode == 0:
             print(f"  > Success: {res.stdout.strip()}")
             success_count += 1
        else:
             print(f"  > Failed: {res.stderr.strip()}")
             fail_count += 1
             
    except Exception as e:
        print(f"  > Error: {e}")
        fail_count += 1
    
    # Sleep to be polite to the API/CLI
    time.sleep(1)

print(f"\n--- Batch Complete ---")
print(f"Success: {success_count}")
print(f"Failed: {fail_count}")
