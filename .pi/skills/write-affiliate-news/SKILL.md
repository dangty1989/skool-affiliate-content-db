# Skill: Write AI News with Affiliate Intelligence

**Purpose:** Generate SEO-optimized AI news articles with naturally integrated affiliate links for a GLOBAL audience.

---

## When to Use This Skill

Use this skill when you need to:
- Write daily AI news articles
- Research and synthesize multiple news sources
- Identify relevant affiliate products for an article
- Publish blog posts to the website repository

---

## Required Inputs

1. **Target Market:** EU (morning) or US (evening) -> Always write in English.
2. **Current Date:** For file naming and context

---

## Workflow Steps

### Step 1: Fetch Latest News

Run the Python script to scrape top AI news sources:
```bash
python .pi/scripts/fetch-ai-news.py
```

This will generate `logs/latest-ai-news.json`. Read this file to see top stories.

### Step 2: Select the Best Story

Criteria for selection:
- **Impact:** Is this a major breakthrough or just a minor update?
- **Relevance:** Does it matter to creators, marketers, or developers?
- **Affiliate Potential:** Can we naturally mention our tools (e.g. video AI news -> HeyGen)?

### Step 3: Match Affiliate Products

Check `.pi/knowledge/affiliate-products.md`.
- If news is about "Video AI" -> Recommend **HeyGen**.
- If news is about "LLMs/Chatbots" -> Recommend **ChatGPT Team** or **Claude**.
- If news is about "Automation" -> Recommend **Make**.
- If news is about "Web/Code" -> Recommend **Lovable**.

**Rule:** If no product fits naturally, DO NOT FORCE IT.

### Step 4: Write the Article

## 4. Content Guidelines

### Writing Style (CRITICAL FOR READABILITY):
- **Format:** "Smart Curator" / "Influencer" style. 
- **Paragraphs:** SUPER SHORT. 1-3 sentences maximum. Break up text frequently.
- **Formatting:** Use **bold** liberally to highlight key phrases and takeaways.
- **Lists:** Use bullet points for features, reasons, or benefits.
- **Headers:** Add emojis to H2/H3 headers (e.g., "## 🚀 What Happened").
- **Images:** MANDATORY. Find an image URL from the source news or use a relevant Unsplash placeholder.

### Article Structure:
```markdown
---
title: "Catchy SEO-Optimized Title (English)"
date: YYYY-MM-DD
author: AI News Desk
category: AI Technology
tags: [Relevant, SEO, Keywords]
description: "Compelling meta description in English (Under 160 chars)"
image: "URL_TO_IMAGE" 
---

# Main Title

![Alt Text for Image](URL_TO_IMAGE)

**Hook:** A single punchy sentence summarizing the big news.

[Short paragraph explaining context]

## 🚀 The News

**Key breakdown:**
- Point 1
- Point 2
- Point 3

[Short analysis paragraph]

## 💡 Why It Matters

**Impact:** Explain why the reader should care. Use **bold** for emphasis.

## 🔗 Related Developments

...

## 🏁 Conclusion

Final thoughts and Call-to-Action.
```

### Affiliate Link Integration Rules:
1. **2-3 links maximum per article** (avoid spam)
2. **Contextual relevance is mandatory** (use affiliate-products.md matching rules)
3. **Value-first approach** (solve problems, then recommend tools)
4. **Natural language** (no "BUY NOW!" aggressive marketing)
5. **Strategic placement** (body sections and conclusion work best)

---

## Output Naming Convention

**Crucial Step:** 
1. Create a concise, SEO-friendly **English slug** based on the title.
2. Format: lowercase, no special characters, dash-separated.
3. Save file as: `website/content/blog/YYYY-MM-DD-english-slug.md`

**Example:**
- Topic: "OpenAI releases new model"
- Filename: `website/content/blog/2026-02-13-openai-new-model.md`
