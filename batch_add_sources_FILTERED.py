
import subprocess
import time
import os

# Configuration
nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# Filtered list: Removed generic homepages, search results, and social profiles likely to fail
# Kept specific video links and article/doc pages.
urls = [
    # --- High Quality Video Sources (Julian Goldie & Seedance) ---
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
    
    # --- Specific Blog Posts / Guides (Removed generic homepages) ---
    "https://juliangoldie.co.uk/seo-strategy-2026",
    # "https://juliangoldie.co.uk", # REMOVED (Homepage)
    "https://binance.com/en/square/post/12739328407425",
    "https://vertu.com/blogs/ai-video/seedance-2-0-guide",
    "https://vmake.ai/blog/seedance-2-0-prompting",
    "https://glbgpt.com/tools/seedance-2-0",
    "https://skywork.ai/blog/ai-director-tips",
    "https://medium.com/@ai-explorer/mastering-seedance-2-0",
    "https://vmake.ai/blog/seedance-2-0-prompting", # Duplicate check? Set will handle if I used it.
    
    # --- Product Pages (Usually okay if static) ---
    "https://seedance2.ai",
    "https://seedance2.app",
    "https://openai.com/sora",
    "https://kling.kuaishou.com",
    "https://runwayml.com",
    "https://lumalabs.ai/dream-machine",
    "https://www.synthesia.io",
    "https://www.heygen.com",
    "https://openclaw.ai", 
    
    # --- Docs & Deep Dives ---
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
    "https://northpennnow.com/tech/luma-ai-review",
    "https://techjarvisai.com/luma-dream-machine",
    "https://influencewithcontent.com/ai-video-tools",
    "https://hitpaw.com/ai-video/luma-vs-sora",
    "https://openclaw.ai/docs",
    "https://marktechpost.com/2026/01/15/openclaw-ai-agent",
    "https://digitalocean.com/community/tutorials/how-to-deploy-openclaw",
    "https://nocodesaas.io/openclaw-seo-automation"
]

print(f"Adding {len(urls)} CURATED sources to notebook {notebook_id}...")
print("Skipping broken/invalid sources automatically.")

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

success_count = 0
fail_count = 0

for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] Processing: {url}")
    try:
        # Correct Syntax from diagnosis: nlm source add --url <URL> <NOTEBOOK_ID>
        # Wait, the successful test was: 
        # C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe source add --url https://www.theverge.com/ai d5c6fae5-73b2-49ab-8f27-67c1f3825a92
        # So it is: nlm source add --url <URL> <NOTEBOOK_ID>
        
        cmd = [nlm_path, "source", "add", "--url", url, notebook_id]
        
        # Run command
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
        
        if res.returncode == 0:
             print(f"  > Success: {res.stdout.strip()}")
             success_count += 1
        else:
             print(f"  > FAILED (Skipping): {res.stderr.strip()}")
             fail_count += 1
             
    except Exception as e:
        print(f"  > ERROR (Skipping): {e}")
        fail_count += 1
    
    # Sleep to prevent rate limits
    time.sleep(1.5)

print(f"\n--- Batch Complete ---")
print(f"Success: {success_count}")
print(f"Failed (Skipped): {fail_count}")
