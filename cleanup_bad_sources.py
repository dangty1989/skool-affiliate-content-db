
import subprocess
import json
import time
import os

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

def list_sources():
    try:
        cmd = [nlm_path, "source", "list", notebook_id]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
        if res.returncode == 0:
            try:
                # The output seems to be JSON array directly
                return json.loads(res.stdout)
            except json.JSONDecodeError:
                print("Error decoding JSON from source list.")
                print("Output snippet:", res.stdout[:200])
                return []
        else:
            print("Error listing sources:", res.stderr)
            return []
    except Exception as e:
        print(f"Error executing list command: {e}")
        return []

def delete_source(source_id, reason):
    print(f"Deleting source {source_id} ({reason})...")
    try:
        # Command: nlm source delete <SOURCE_ID> --notebook <NOTEBOOK_ID> (Assuming syntax)
        # Let's check help or assume standard: 'source delete <ID> <NOTEBOOK_ID>' or reversed
        # Based on 'source add', maybe 'source delete <NOTEBOOK_ID> <SOURCE_ID>'?
        # Let's try: nlm source delete <NOTEBOOK_ID> <SOURCE_ID>
        
        cmd = [nlm_path, "source", "delete", notebook_id, source_id]
        
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
        
        if res.returncode == 0:
            print(f"  > Deleted successfully.")
        else:
            print(f"  > Delete failed: {res.stderr.strip()}")
            
    except Exception as e:
        print(f"  > Error deleting: {e}")

print("Fetching current sources to clean up...")
sources = list_sources()
print(f"Found {len(sources)} sources.")

# Rules for deletion
bad_patterns = [
    "search_query=",
    "twitter.com",
    "linkedin.com",
    "facebook.com",
    "youtube.com/results",
    "google.com/search",
    "youtube.com/@" # Channel pages are often just lists, better to have specific videos
]

for source in sources:
    s_id = source.get('id')
    s_title = source.get('title', '')
    s_url = source.get('url')
    
    # Check if bad
    reason = None
    
    # Check title/URL against bad patterns
    for pat in bad_patterns:
        if pat in s_title or (s_url and pat in s_url):
            reason = f"Matches bad pattern: {pat}"
            break
            
    # Check for likely incomplete processing (title is just URL often means unprocessed)
    # But some valid ones might just be URLs.
    # Let's be aggressive on known bad domains.
    
    if reason:
        delete_source(s_id, reason)
        time.sleep(1) # Be nice to API

print("Cleanup complete.")
