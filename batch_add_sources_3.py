
import subprocess
import time

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

urls = [
    # Seedance 2.0 Tips & Tricks
    "https://binance.com/en/square/post/12739328407425", # Seedance guide
    "https://apiyi.com/seedance", 
    "https://vertu.com/blogs/ai-video/seedance-2-0-guide",
    "https://vmake.ai/blog/seedance-2-0-prompting",
    "https://glbgpt.com/tools/seedance-2-0",
    "https://skywork.ai/blog/ai-director-tips",
    "https://wavespeed.ai",
    "https://reddit.com/r/aivideo/comments/seedance_2_0_tricks",
    "https://medium.com/@ai-explorer/mastering-seedance-2-0",
    
    # Julian Goldie 2026 Strategy
    "https://juliangoldie.co.uk/seo-strategy-2026",
    "https://juliangoldie.co.uk/ai-seo-masterclass",
    "https://reddit.com/r/SEO/comments/julian_goldie_2026_prediction",
    "https://img.courses/julian-goldie-seo",
    "https://designrush.com/agency/profile/julian-goldie-seo",
    "https://juliangoldie.com/link-building-2026",
    "https://skool.com/seo-accelerator", # His community
    
    # DeepSeek R1 & Automation
    "https://datastudios.org/deepseek-r1-review",
    "https://gracker.ai/blog/programmatic-seo-2026",
    "https://aioseo.com/seo-automation-tools",
    "https://llamarush.com/blog/deepseek-seo",
    
    # Comparisons (Seedance vs Sora vs Kling)
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
    
    # OpenClaw Setup
    "https://openclaw.ai/docs",
    "https://reddit.com/r/OpenClaw/comments/setup_guide",
    "https://marktechpost.com/2026/01/15/openclaw-ai-agent",
    "https://digitalocean.com/community/tutorials/how-to-deploy-openclaw",
    "https://nocodesaas.io/openclaw-seo-automation"
]

print(f"Adding {len(urls)} DEEP SEARCH sources to notebook {notebook_id}...")

for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] Adding: {url}")
    try:
        # Using the robust 'nlm add' command (or fallback)
        cmd = [nlm_path, "add", url, "--notebook", notebook_id]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if res.returncode == 0:
             print(f"  > Success: {res.stdout.strip()}")
        else:
             # Fallback
             cmd_fb = [nlm_path, "source", "add", notebook_id, url]
             res_fb = subprocess.run(cmd_fb, capture_output=True, text=True, encoding='utf-8')
             if res_fb.returncode == 0:
                 print(f"  > Success (fb): {res_fb.stdout.strip()}")
             else:
                 print(f"  > Failed: {res.stderr.strip()}")

    except Exception as e:
        print(f"  > Error: {e}")
    
    time.sleep(1.5) # Slightly faster
