
import subprocess
import time
import sys

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# List of sources found (Videos + Articles)
urls = [
    # Top Videos
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
    
    # Articles & Resources
    "https://seedance2.ai",
    "https://seedance2.app",
    "https://www.juliangoldie.com",
    "https://www.bytedance.com",
    "https://openai.com",
    "https://www.deepseek.com",
    "https://www.anthropic.com",
    "https://www.make.com",
    "https://www.skool.com"
]

print(f"Adding {len(urls)} sources to notebook {notebook_id}...")

success_count = 0
for i, url in enumerate(urls, 1):
    print(f"[{i}/{len(urls)}] Adding: {url}")
    try:
        # Using encoding setup via env in subprocess is hard on Windows consistently, 
        # but the command logic should work. 
        # We assume nlm.exe can handle the add command.
        
        # We set env to force UTF-8
        env = {"PYTHONIOENCODING": "utf-8", "SystemRoot": "C:\\Windows"}
        
        # Try 'source add' with positional arguments (Notebook ID first per usage hint)
        # Usage: nlm source add [OPTIONS] NOTEBOOK_ID
        # It likely prompts for URL or takes it as an argument?
        # Let's try: nlm source add <NOTEBOOK_ID> --url <URL> or similar based on common patterns
        
        # Attempt 1: Positional: nlm source add <NOTEBOOK_ID> <URL>
        # (Assuming URL is the next arg)
        print(f"  > Trying: source add {notebook_id} {url}")
        cmd1 = [nlm_path, "source", "add", notebook_id, url]
        res1 = subprocess.run(cmd1, capture_output=True, text=True, encoding='utf-8')
        
        if res1.returncode == 0:
            print(f"  > Success: {res1.stdout.strip()}")
            success_count += 1
            continue
            
        # Attempt 2: Maybe source add <URL> --id <NOTEBOOK_ID>? No, the usage said NOTEBOOK_ID is positional.
        # Maybe nlm source add <NOTEBOOK_ID> --link <URL>? 
        # Let's try adding via 'notebook add-source' if available
        # But wait, looking at the error: "No such option: --notebook"
        # It confirms NOTEBOOK_ID is positional.
        
        # Attempt 2: URL as '--url' or '-u'
        print(f"  > Trying: source add {notebook_id} --url {url}")
        cmd2 = [nlm_path, "source", "add", notebook_id, "--url", url]
        res2 = subprocess.run(cmd2, capture_output=True, text=True, encoding='utf-8')
        
        if res2.returncode == 0:
            print(f"  > Success: {res2.stdout.strip()}")
            success_count += 1
            continue

        # Attempt 3: The 'add' command directly (as discussed earlier)
        print(f"  > Trying: add {url} --notebook {notebook_id}")
        cmd3 = [nlm_path, "add", url, "--notebook", notebook_id]
        res3 = subprocess.run(cmd3, capture_output=True, text=True, encoding='utf-8')

        if res3.returncode == 0:
            print(f"  > Success: {res3.stdout.strip()}")
            success_count += 1
        else:
            print(f"  > All attempts failed. Last error: {res3.stderr.strip()}")
            if "No such command" in res3.stderr:
                 print(f"  > 'add' command not found.")
                    
    except Exception as e:
        print(f"  > Error: {e}")
    
    # Sleep to avoid rate limits
    time.sleep(2)

print(f"Finished. Successfully added {success_count}/{len(urls)} sources.")
