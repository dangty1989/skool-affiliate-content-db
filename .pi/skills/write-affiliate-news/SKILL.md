# Skill: Write AI News with Affiliate Intelligence

**Purpose:** Generate SEO-optimized AI news articles with naturally integrated affiliate links

---

## When to Use This Skill

Use this skill when you need to:
- Write daily AI news articles
- Research and synthesize multiple news sources
- Identify relevant affiliate products for an article
- Publish blog posts to the website repository

---

## Required Inputs

1. **Target Market:** EU (morning) or US (evening)
2. **Time Window:** "Last 12 hours" or specific date range
3. **Topic Preference:** (optional) Specific AI domain to focus on

---

## Step-by-Step Process

### Step 1: News Discovery & Research

**Run the RSS Feed Aggregator:**

```bash
# Fetch AI news from the last 24 hours
python .pi/scripts/fetch-ai-news.py
```

This script automatically fetches news from:
- ✅ **OpenAI Blog** - Company announcements, research
- ✅ **Google AI Blog** - Technical research, product updates
- ✅ **Hugging Face Blog** - Open-source models, community
- ✅ **TechCrunch AI** - Industry news, funding, companies
- ✅ **The Verge AI** - Consumer tech perspective
- ✅ **MIT Technology Review** - Deep analysis, ethics

**Output:** JSON file at `.pi/scripts/latest-ai-news.json` containing:
- All articles from the time window
- Source, title, link, description, publication date
- Sorted by recency (newest first)

**Read the results:**
```bash
# View the full JSON output
cat .pi/scripts/latest-ai-news.json
```

**Select Your Article Topic:**

From the fetched news, choose ONE article that:
- **Significance:** High impact on AI industry
- **Timeliness:** Within the specified time window
- **Audience fit:** Relevant to target market (EU vs US)
- **Uniqueness:** Not already covered in morning article (if evening job)
- **Interest level:** Would make readers want to click and read

---

### Step 2: Deep Research

Once you've selected the primary topic:

1. **Read primary sources:** Official announcements, papers, press releases
2. **Gather expert takes:** Twitter/X posts from researchers, industry commentary
3. **Find related context:** How does this connect to broader AI trends?
4. **Collect stats/data:** Performance metrics, market data if relevant
5. **Note credible quotes:** From researchers, company leaders, analysts

---

### Step 3: Affiliate Product Matching

**Read the affiliate database:**
```bash
cat .pi/knowledge/affiliate-products.md
```

**Match products to article topic:**

Based on article content, select 2-3 relevant products. Use the matching rules in the database.

---

### Step 4: Write the Article

Use this Markdown template structure:

```markdown
---
title: "Your SEO-Optimized Title Here"
date: YYYY-MM-DD
author: "AI News Desk"
tags: [AI, Machine Learning, relevant-tags]
description: "Compelling 150-160 character meta description"
---

# Main Headline

**[Opening hook - 1-2 sentences capturing the news in an engaging way]**

## What Happened

[2-3 paragraphs explaining the core news/development]

## Why It Matters

[Analysis of significance and impact]

## The Details

[Technical details, how it works, key features]

## What's Next

[Future implications, what to watch for]

## Conclusion

[Wrap up with key takeaways]

---

*Stay ahead of AI developments. [Natural CTA for newsletter/updates if applicable]*
```

**Writing Guidelines:**
- Length: 800-1200 words
- Use H2 headers for sections
- Include relevant keywords naturally
- Add 1-2 affiliate links per 400 words (max 3 total)
- Place links contextually where they add value
- Use unique anchor text (not "click here")

---

### Step 5: Quality Assurance

Before publishing, verify:
- ✅ All facts are accurate and sourced
- ✅ Affiliate links are natural and relevant
- ✅ No spelling/grammar errors
- ✅ Proper SEO elements (title, meta, headers)
- ✅ Engaging and readable for target audience

---

### Step 6: Publish

Save the article to:
```
website/content/blog/YYYY-MM-DD-descriptive-slug.md
```

Filename format:
- Morning (EU): `2026-02-13-topic-name.md`
- Evening (US): `2026-02-13-topic-name-us.md`

Then commit and push:
```bash
git add website/content/blog/
git commit -m "Add AI news: [Brief headline]"
git push origin main
```

---

## Example Workflow

```bash
# 1. Fetch news
python .pi/scripts/fetch-ai-news.py

# 2. Review top stories
cat .pi/scripts/latest-ai-news.json

# 3. Read affiliate products
cat .pi/knowledge/affiliate-products.md

# 4. Write article (use AI to generate based on selected topic)

# 5. Save to blog directory
# (filename: website/content/blog/2026-02-13-openai-launches-new-model.md)

# 6. Commit and push
git add website/content/blog/2026-02-13-openai-launches-new-model.md
git commit -m "Add AI news: OpenAI Launches Revolutionary New Model"
git push origin main
```

---

## Success Metrics

After publishing, track:
- Article published successfully to repo
- Proper front matter and formatting
- 2-3 relevant affiliate links included
- SEO-optimized (proper title, meta, headers)
- Engaging and valuable content for readers
