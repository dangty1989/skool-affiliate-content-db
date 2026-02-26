
import urllib.request
import json
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import time
import os
import ssl
import re

# Configuration
HOURS_BACK = 24
OUTPUT_FILE = "logs/latest-ai-news.json"

SOURCES = [
    {"name": "OpenAI Blog", "url": "https://openai.com/blog/rss.xml"},
    {"name": "Google AI Blog", "url": "https://ai.googleblog.com/feeds/posts/default"},
    {"name": "Hugging Face Blog", "url": "https://huggingface.co/blog/feed.xml"},
    {"name": "TechCrunch AI", "url": "https://techcrunch.com/category/artificial-intelligence/feed/"},
    {"name": "MIT Technology Review", "url": "https://www.technologyreview.com/topic/artificial-intelligence/feed"},
    {"name": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/feed/"}
]

def fetch_news():
    print(f"Fetching AI news from the last {HOURS_BACK} hours...")
    
    # Create logs directory if it doesn't exist
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Time threshold
    time_threshold = datetime.now() - timedelta(hours=HOURS_BACK)
    articles = []
    
    # SSL Context (ignore cert errors)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    for source in SOURCES:
        try:
            print(f"Scanning {source['name']}...")
            req = urllib.request.Request(source['url'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx) as response:
                tree = ET.parse(response)
                root = tree.getroot()
                
                # Detect RSS vs Atom
                is_atom = 'http://www.w3.org/2005/Atom' in root.tag
                
                items = root.findall('{http://www.w3.org/2005/Atom}entry') if is_atom else root.findall('.//item')
                
                for item in items[:10]: # Check top 10 items
                    try:
                        title = item.find('{http://www.w3.org/2005/Atom}title' if is_atom else 'title').text
                        link = item.find('{http://www.w3.org/2005/Atom}link' if is_atom else 'link')
                        if is_atom:
                            link = link.attrib['href']
                        else:
                            link = link.text
                            
                        pub_date_str = item.find('{http://www.w3.org/2005/Atom}published' if is_atom else 'pubDate').text
                        
                        # Flexible date parsing
                        pub_date = None
                        date_formats = [
                            '%a, %d %b %Y %H:%M:%S %z',
                            '%a, %d %b %Y %H:%M:%S GMT',
                            '%Y-%m-%dT%H:%M:%S%z',
                            '%Y-%m-%dT%H:%M:%SZ'
                        ]
                        
                        for fmt in date_formats:
                            try:
                                pub_date_cleaned = pub_date_str.replace("Z", "+0000")
                                pub_date = datetime.strptime(pub_date_cleaned, fmt)
                                # Make naive dates aware (assume UTC)
                                if pub_date.tzinfo is None:
                                    pub_date = pub_date.replace(tzinfo=datetime.timezone.utc)
                                break
                            except:
                                continue
                                
                        if not pub_date:
                            continue
                            
                        # Normalize timezones for comparison
                        if pub_date.replace(tzinfo=None) < time_threshold.replace(tzinfo=None):
                            continue

                        # --- IMAGE EXTRACTION LOGIC ---
                        image_url = ""
                        description = ""
                        
                        # Get description content
                        if is_atom:
                            desc_elem = item.find('{http://www.w3.org/2005/Atom}content') or item.find('{http://www.w3.org/2005/Atom}summary')
                        else:
                            desc_elem = item.find('description')
                            
                        if desc_elem is not None:
                            description = desc_elem.text or ""
                        
                        # 1. Try media:content (Yahoo RSS)
                        media = item.find('{http://search.yahoo.com/mrss/}content')
                        if media is not None and 'url' in media.attrib:
                            image_url = media.attrib['url']
                            
                        # 2. Try enclosure
                        if not image_url:
                            enclosure = item.find('enclosure')
                            if enclosure is not None and enclosure.attrib.get('type', '').startswith('image'):
                                image_url = enclosure.attrib['url']
                                
                        # 3. Try to regex find first <img> tag in description
                        if not image_url and description:
                            img_match = re.search(r'<img[^>]+src="([^">]+)"', description)
                            if img_match:
                                image_url = img_match.group(1)
                                
                        # Add to list
                        articles.append({
                            "source": source['name'],
                            "title": title,
                            "link": link,
                            "date": pub_date.isoformat(),
                            "description": description[:300] + "...",
                            "image_url": image_url
                        })
                        
                    except Exception as e:
                        # print(f"Skipping item: {e}")
                        continue
                        
        except Exception as e:
            print(f"Failed to fetch {source['name']}: {e}")

    # Remove duplicates
    unique_articles = {v['link']: v for v in articles}.values()
    
    # Sort by date (newest first)
    sorted_articles = sorted(unique_articles, key=lambda x: x['date'], reverse=True)
    
    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(list(sorted_articles), f, indent=2, ensure_ascii=False)
        
    print(f"✅ Found {len(sorted_articles)} fresh AI news articles.")
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    fetch_news()
