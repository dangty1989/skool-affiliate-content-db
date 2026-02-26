
import subprocess
import time

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

urls = [
    # Top Search Results (Julian Goldie & SEO)
    "https://juliangoldie.co.uk",
    "https://www.youtube.com/@JulianGoldieSEO",
    "https://twitter.com/JulianGoldieSEO",
    "https://www.linkedin.com/in/juliangoldie",
    
    # Seedance 2.0 & Competitors
    "https://seedance2.ai",
    "https://seedance2.app",
    "https://www.bytedance.com",
    "https://openai.com/sora",
    "https://kling.kuaishou.com",
    "https://runwayml.com",
    "https://lumalabs.ai/dream-machine",
    "https://www.synthesia.io",
    "https://www.heygen.com",
    
    # DeepSeek & AI Automation
    "https://www.deepseek.com",
    "https://chat.deepseek.com",
    "https://openclaw.ai",
    "https://github.com/openclaw/openclaw",
    "https://www.make.com",
    "https://n8n.io",
    "https://zapier.com",
    
    # Articles & Reviews found
    "https://codecademy.com", 
    "https://dev.to",
    "https://medium.com", 
    "https://www.forbes.com/sites/technology/ai",
    "https://www.theverge.com/ai",
    "https://techcrunch.com/category/artificial-intelligence",
    
    # Specific Videos (Julian + Reviews)
    "https://www.youtube.com/watch?v=XyJg68_xDb0", # Seedance
    "https://www.youtube.com/watch?v=omOCfGdx1uk", # PicoClaw
    "https://www.youtube.com/watch?v=jZ51Wl7TL-o", # OpenClaw 1-click
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
    
    # More related to AI Video trend
    "https://www.youtube.com/results?search_query=Seedance+2.0+review",
    "https://www.youtube.com/results?search_query=DeepSeek+R1+SEO+automation"
]

print(f"Adding {len(urls)} additional sources to notebook {notebook_id}...")

for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] Adding: {url}")
    try:
        # Using the syntax we validated: nlm source add <NOTEBOOK_ID> <URL>
        # (Based on usage hint: nlm source add [OPTIONS] NOTEBOOK_ID)
        # But wait, looking at the previous error: "No such option: --notebook"
        # It means NOTEBOOK_ID is positional.
        # But where does URL go? CLI usually takes source as argument.
        # Let's try: nlm source add <NOTEBOOK_ID> <URL> 
        # OR nlm source add <URL> --id <NOTEBOOK_ID> (unlikely)
        
        # We will try the most robust way: nlm add (which is often an alias)
        
        # Attempt 1: nlm add <URL> --notebook <NOTEBOOK_ID>
        # (This is standard for many CLI tools we built)
        # But if that failed earlier, we try the positional one.
        
        # Let's rely on 'nlm add' if 'source add' is tricky without docs.
        # The jacob-bd repo usually has 'nlm add <SOURCE>'.
        
        cmd = [nlm_path, "add", url, "--notebook", notebook_id]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        
        if res.returncode == 0:
             print(f"  > Success: {res.stdout.strip()}")
        else:
             # Fallback: nlm source add <NOTEBOOK_ID> <URL>
             cmd_fb = [nlm_path, "source", "add", notebook_id, url]
             res_fb = subprocess.run(cmd_fb, capture_output=True, text=True, encoding='utf-8')
             if res_fb.returncode == 0:
                 print(f"  > Success (fb): {res_fb.stdout.strip()}")
             else:
                 print(f"  > Failed: {res.stderr.strip()} | {res_fb.stderr.strip()}")

    except Exception as e:
        print(f"  > Error: {e}")
    
    time.sleep(2)
