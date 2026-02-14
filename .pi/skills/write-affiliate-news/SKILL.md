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

Run the Node.js script to scrape top AI news sources (Python is not available):
```bash
node .pi/scripts/fetch-ai-news.js
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

### ⚡ Writing Style (ENGAGING COPY - NOT CORPORATE REPORTS):

**Core Principle:** Write like Julian Goldie - direct, punchy, value-packed.

**HOOK FIRST (Mandatory):**
- Open with a pattern interrupt or surprising stat
- Make readers think "Wait, what?!"
- Examples:
  - "Most marketers are doing X wrong. Here's why..."
  - "This AI tool just killed [competitor]. Here's how..."
  - "I tested [tool] for 30 days. Results shocked me."

**Format Rules:**
- **Length:** 300-500 words MAX (not 800+!)
- **Paragraphs:** Ultra-short. 1-2 sentences. White space is your friend.
- **Bold Liberally:** Highlight **key takeaways** and **action items**
- **Lists:** Use bullets for features, steps, benefits
- **Headers:** Add emojis to H2/H3 (e.g., "## 🔥 The Big Deal")

**Tone & Voice:**
- **Direct:** No fluff. Get to the point.
- **Conversational:** Write like you're explaining to a friend over coffee
- **Opinionated:** Have a take. Bland = boring.
- **Value-first:** "Here's what this means for YOU"

### 📝 Article Structure (SHORT & PUNCHY):

```markdown
---
title: "Click-worthy Title with Numbers or Power Words"
date: YYYY-MM-DD
author: AI News Desk
category: AI Technology
tags: [Relevant, SEO, Keywords]
description: "Compelling one-liner that makes you want to read more"
image: "URL_TO_IMAGE"
---

# Headline (Not the same as title!)

![Alt Text](IMAGE_URL)

**HOOK:** One sentence that makes readers stop scrolling.

[1-2 sentences setting up the story]

## 🔥 What Happened

**The TLDR:**
- Key point 1 (specific, not vague)
- Key point 2 (outcomes, not features)
- Key point 3 (why this matters NOW)

[Short paragraph with analysis - 2-3 sentences max]

## 💡 Why You Should Care

**Bottom line:** [One punchy sentence about impact]

[Short explanation of real-world implications]

**For creators:** [Specific benefit]
**For marketers:** [Specific benefit]

## 🎯 What To Do About It

[Optional: Only if there's a clear action]

**Action step:** [Specific, tactical advice]

[Naturally mention affiliate tool if relevant]

## 🏁 Final Take

[Your opinion in 1-2 sentences]

[CTA: Join Skool community for more insights like this]
```

### 🎣 Hook Examples (Use These Patterns):

1. **The Reversal:** "Everyone says X. They're wrong. Here's why..."
2. **The Stat Bomb:** "67% of marketers waste $10K/month on this mistake"
3. **The Warning:** "If you're still using [old method], you're already behind"
4. **The Prediction:** "This will replace [thing] in 6 months. Here's proof..."
5. **The Personal:** "I tried [tool] for 30 days. Results? Mind-blowing."

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
