
import urllib.request
import json
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import time
import os
import ssl

# Configuration
HOURS_BACK = 24
OUTPUT_FILE = ".pi/scripts/latest-ai-news.json"

SOURCES = [
    {"name": "OpenAI Blog", "url": "https://openai.com/blog/rss.xml"},
    {"name": "Google AI Blog", "url": "https://ai.googleblog.com/feeds/posts/default"},
    {"name": "Hugging Face Blog", "url": "https://huggingface.co/blog/feed.xml"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/"},
    {"name": "The Verge AI", "url": "https://www.theverge.com/rss/artificial-intelligence/index.xml"},
    {"name": "MIT Technology Review AI", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed"}
]

def fetch_feed(url):
    try:
        # Create a context that ignores SSL verification errors (unsafe but robust for scraping)
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        req = urllib.request.Request(
            url, 
            data=None, 
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        )
        with urllib.request.urlopen(req, context=ctx, timeout=10) as response:
            return response.read()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def parse_feed(content, source_name):
    articles = []
    if not content:
        return articles
        
    try:
        root = ET.fromstring(content)
        
        # Handle Atom vs RSS
        if root.tag.endswith('feed'):  # Atom
            for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
                try:
                    title = entry.find('{http://www.w3.org/2005/Atom}title').text
                    link = entry.find('{http://www.w3.org/2005/Atom}link').attrib['href']
                    published = entry.find('{http://www.w3.org/2005/Atom}published')
                    if published is None:
                        published = entry.find('{http://www.w3.org/2005/Atom}updated')
                    pub_date = published.text if published is not None else ""
                    
                    articles.append({
                        "source": source_name,
                        "title": title,
                        "link": link,
                        "pubDate": pub_date
                    })
                except:
                    continue
        else:  # RSS
            for item in root.findall('.//item'):
                try:
                    title = item.find('title').text
                    link = item.find('link').text
                    pub_date = item.find('pubDate').text
                    
                    articles.append({
                        "source": source_name,
                        "title": title,
                        "link": link,
                        "pubDate": pub_date
                    })
                except:
                    continue
    except Exception as e:
        print(f"Error parsing feed from {source_name}: {e}")
        
    return articles

def main():
    print(f"🔍 Fetching AI news from the last {HOURS_BACK} hours...")
    
    all_news = []
    
    for source in SOURCES:
        print(f"📰 Fetching: {source['name']}...")
        content = fetch_feed(source['url'])
        articles = parse_feed(content, source['name'])
        all_news.extend(articles)
        print(f"   ✓ Found {len(articles)} articles")

    # Save to JSON
    output_data = {
        "generated": datetime.now().isoformat(),
        "totalArticles": len(all_news),
        "news": all_news[:20]  # Just keep top 20 for simplicity
    }
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
        
    print(f"\n💾 Saved {len(all_news)} articles to: {OUTPUT_FILE}")
    print("\n📌 Top 3 Recent Articles:")
    for i, news in enumerate(all_news[:3]):
        print(f"{i+1}. [{news['source']}] {news['title']}")

if __name__ == "__main__":
    main()
