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
# Fetch AI news from the last 12 hours (for morning run)
node .pi/scripts/fetch-ai-news.js 12

# OR fetch from last 24 hours (for comprehensive coverage)
node .pi/scripts/fetch-ai-news.js 24
```

This script automatically fetches news from:
- ✅ **OpenAI Blog** - Company announcements, research
- ✅ **Google AI Blog** - Technical research, product updates
- ✅ **Hugging Face Blog** - Open-source models, community
- ✅ **TechCrunch AI** - Industry news, funding, companies
- ✅ **The Verge AI** - Consumer tech perspective
- ✅ **MIT Technology Review** - Deep analysis, ethics

**Output:** JSON file at `/job/tmp/latest-ai-news.json` containing:
- All articles from the time window
- Source, title, link, description, publication date
- Sorted by recency (newest first)

**Read the results:**
```bash
# View the full JSON output
cat /job/tmp/latest-ai-news.json

# Or just see the top 5 articles
node .pi/scripts/fetch-ai-news.js 12 | grep -A 20 "Top 5"
```

**Select Your Article Topic:**

From the fetched news, choose ONE article that:
- **Significance:** High impact on AI industry
- **Timeliness:** Within the specified time window
- **Audience fit:** Relevant to target market (EU vs US)
- **Uniqueness:** Not already covered in morning article (if evening job)
- **Interest level:** Would make readers want to click and read

**Selection Strategy:**
- **EU Morning (9 AM UTC):** Prioritize European companies/research, or global topics that will interest EU audience waking up
- **US Evening (1 PM UTC):** Prioritize US companies, or pick a DIFFERENT topic than morning to provide variety

---

### Step 2: Deep Research

Once you've selected the primary topic:

1. **Read primary sources:** Official announcements, papers, press releases
2. **Gather expert takes:** Twitter/X posts from researchers, industry commentary
3. **Find related context:** How does this connect to broader AI trends?
4. **Collect stats/data:** Performance metrics, market data if relevant
5. **Note credible quotes:** From researchers, company leaders, analysts

**Quality Check:**
- Can you explain this to a non-technical reader?
- Do you have at least 3 credible sources?
- Is the information factually accurate?

---

### Step 3: Affiliate Product Matching

**Read the affiliate database:**
```bash
cat .pi/knowledge/affiliate-products.md
```

**Match products to article topic:**

Ask yourself for EACH of the 8 products:
1. Is this product directly related to my article topic?
2. Would it genuinely help readers who are interested in this topic?
3. Can I mention it without disrupting the article flow?

**Product Selection Rules:**
- **2-3 links maximum per article**
- **Relevance threshold: HIGH** (don't force it)
- **Mix placement:** 1 in body, 1-2 in conclusion works well

**Example Matching:**
- Article about **AI video generation** → HeyGen (primary), ElevenLabs (secondary if audio mentioned)
- Article about **custom AI assistants** → CustomGPT (primary), OpenRouter (secondary for API access)
- Article about **AI coding tools** → Lovable.dev (primary), Make.com (secondary for automation)
- Article about **hosting AI projects** → Tino VPS (primary)

---

### Step 4: Article Structure & Writing

**File Naming Convention:**
```
YYYY-MM-DD-descriptive-slug.md        # Morning (EU)
YYYY-MM-DD-descriptive-slug-us.md     # Evening (US)
```

**Markdown Template:**
```markdown
---
title: "Engaging SEO-Optimized Title (60 chars max)"
date: 2026-02-13
author: AI News Desk
category: AI Technology
tags: [Primary Keyword, Secondary Keyword, Topic, Technology]
description: "Compelling meta description that includes main keyword and value prop (150-160 chars)"
---

# Main Article Title

**Brief opening paragraph** that hooks the reader and summarizes the key news in 2-3 sentences. Include the main keyword naturally.

## What Happened

Detailed explanation of the news/development:
- Key facts and timeline
- Who is involved (companies, researchers)
- What was announced/discovered
- Primary sources and quotes

## Why This Matters

Analysis and implications:
- Industry impact
- What this means for developers/businesses/users
- How it advances the field
- Potential challenges or limitations

[Optional affiliate integration - if natural fit]

## The Bigger Picture

Context and connections:
- How does this relate to broader AI trends?
- What came before this?
- What might come next?
- Are there competing approaches?

## [Domain-Specific Section Based on Topic]

For example:
- "Technical Deep-Dive" for research papers
- "Practical Applications" for product launches
- "Market Implications" for business news
- "What Developers Need to Know" for platform updates

[Another potential affiliate integration point]

## Looking Ahead

Forward-looking analysis:
- What are the next steps?
- Timeline expectations
- Open questions
- What to watch for

## Conclusion

Wrap-up paragraph that:
- Summarizes key takeaway
- Connects to reader impact
- May include final CTA with affiliate link (if relevant)
- Ends with engaging question or thought

---

**Related Resources:**
- [Link to relevant affiliate product if highly relevant]
- Other natural links

---

*Stay updated on the latest AI developments - subscribe to our newsletter for daily insights.*
```

**Writing Guidelines:**
- **Length:** 800-1200 words total
- **Paragraphs:** 2-4 sentences max (web readability)
- **Headers:** Use H2 (##) and H3 (###) properly
- **Keywords:** Include naturally, don't stuff
- **Links:** 4-7 total (2-3 affiliate, 2-4 reference sources)

---

### Step 5: Affiliate Link Integration

**Natural Integration Template:**

**Context → Problem → Solution (with affiliate link)**

Example:
> "As enterprises rush to deploy custom AI solutions, many teams are discovering that building from scratch requires significant ML expertise and infrastructure. **For teams looking to bypass this complexity, platforms like [CustomGPT](affiliate-link) offer a no-code path to deploying AI chatbots trained on proprietary data**, handling the technical heavy-lifting behind simple interfaces."

**Best Practices:**
1. **Lead with value:** Explain the use case/problem first
2. **Introduce organically:** "Platforms like..." "Tools such as..." "Services like..."
3. **Include specifics:** Mention actual features/benefits
4. **Stay factual:** No exaggerated claims
5. **Maintain flow:** Shouldn't feel like an ad break

**Bad Integration (Don't do this):**
> "Click here to try CustomGPT now! Best deal ever!"

**Disclosure Note (Subtle):**
Include at article end if you have 2+ affiliate links:
> "*Some links in this article may earn us a commission. We only recommend tools we believe add genuine value.*"

---

### Step 6: Quality Assurance

Before saving, verify:

**Content Quality:**
- [ ] Facts are accurate and sourced
- [ ] Explanations are clear to non-experts
- [ ] Article provides genuine value
- [ ] No plagiarized content
- [ ] Proper grammar and spelling

**SEO Optimization:**
- [ ] Title includes primary keyword
- [ ] Meta description is compelling and under 160 chars
- [ ] Headers use proper hierarchy (H2, H3)
- [ ] Keywords appear naturally 2-3 times
- [ ] Images have alt text (if any)

**Affiliate Integration:**
- [ ] 2-3 affiliate links maximum
- [ ] Each link is contextually relevant
- [ ] No forced or spammy mentions
- [ ] Would pass the "friend test" (would you send this to a friend?)
- [ ] Proper disclosure included

**Technical:**
- [ ] Markdown frontmatter is complete
- [ ] Filename follows convention
- [ ] File saved to `website/content/blog/`
- [ ] No broken links

---

### Step 7: Publishing

**Save the file:**
```bash
# Navigate to blog directory
cd /job/website/content/blog/

# Create the file
cat > 2026-02-13-article-slug.md << 'EOF'
[paste full markdown content]
EOF

# Verify it was created
ls -lh 2026-02-13-article-slug.md
```

**Commit and push:**
```bash
# Stage the new article
git add website/content/blog/2026-02-13-article-slug.md

# Commit with descriptive message
git commit -m "Add AI news article: [Article Title]"

# Push to repository
git push origin main
```

**Verify publication:**
- Check that commit succeeded
- Note the commit hash for reference
- Article will appear on website after Next.js rebuild

---

## Example Workflow

**Morning Job (9 AM UTC / EU Market):**

```bash
# 1. Fetch AI news from last 12 hours
node .pi/scripts/fetch-ai-news.js 12

# 2. Read the results and select a topic
cat /job/tmp/latest-ai-news.json | head -100

# 3. Read affiliate database for product matching
cat .pi/knowledge/affiliate-products.md

# 4. Write the article content
# [AI writes 800-1200 word article based on selected news]

# 5. Save to blog directory
cd /job/website/content/blog/
cat > 2026-02-13-google-gemini-15-ultra-launch.md << 'EOF'
---
title: "Google Launches Gemini 1.5 Ultra with 1M Token Context"
date: 2026-02-13
author: AI News Desk
category: AI Technology
tags: [Google, Gemini, LLM, Context Window, AI]
description: "Google's Gemini 1.5 Ultra introduces a groundbreaking 1 million token context window, revolutionizing long-form AI analysis capabilities."
---

# Google Launches Gemini 1.5 Ultra with 1M Token Context

**Google has unveiled Gemini 1.5 Ultra, marking a significant milestone in large language model development with its unprecedented 1 million token context window—a 10x improvement over previous generation models.**

## What Happened

[Full article content with proper structure, 800-1200 words]
[2-3 naturally integrated affiliate links based on relevance]
[SEO-optimized headers and content]

---

*Some links may earn us a commission. We only recommend tools that add genuine value.*
EOF

# 6. Commit and push
git add website/content/blog/2026-02-13-google-gemini-15-ultra-launch.md
git commit -m "Add AI news: Google Gemini 1.5 Ultra with 1M token context window"
git push origin main

# 7. Verify success
echo "✅ Article published successfully!"
```

**Evening Job (1 PM UTC / US Market):**

```bash
# 1. Fetch fresh news from last 12 hours
node .pi/scripts/fetch-ai-news.js 12

# 2. Check morning article to avoid duplication
ls -lh /job/website/content/blog/ | tail -2

# 3. Select DIFFERENT topic than morning article
cat /job/tmp/latest-ai-news.json | grep -v "Gemini"

# 4-7. [Same process as morning, but different topic]
```

---

## Common Scenarios

### Scenario 1: Multiple Big News Stories
**Decision:** Pick the most impactful for your target market (EU vs US differences)
- EU morning: Prioritize European companies/research
- US evening: Prioritize US companies/broader global impact

### Scenario 2: Slow News Day
**Alternatives:**
- Trend analysis piece: "What recent AI developments tell us about..."
- Comparison article: "Comparing the latest AI video tools"
- Educational content: "Understanding how transformer models work"
- Interview/profile: "How X company is using AI"

### Scenario 3: No Natural Affiliate Fit
**Do:** Write the article anyway without forced links
**Don't:** Shoehorn irrelevant products just to include links
**Remember:** Quality content builds long-term SEO value

### Scenario 4: Competing with Morning Article
**Evening Job Only:**
- Check what morning article covered
- Select distinctly different topic
- Can be related (e.g., morning = GPT-5, evening = Claude 3.5) but not duplicate

---

## Output Deliverables

Each execution should produce:
1. **One new blog post** (800-1200 words)
2. **Proper git commit** with the article
3. **Verification** that file was pushed successfully

---

## Success Metrics

A successful article:
- ✅ Provides genuine value to readers
- ✅ Is factually accurate and well-sourced
- ✅ Follows SEO best practices
- ✅ Integrates affiliate links naturally (if relevant)
- ✅ Maintains editorial integrity
- ✅ Is published on time (9 AM UTC or 1 PM UTC)

---

## Troubleshooting

**Issue:** Can't access news sources
- **Solution:** Try alternative sources, use cached versions

**Issue:** Uncertainty about facts
- **Solution:** Mark as "reportedly" or "according to X source," don't guess

**Issue:** Git push fails
- **Solution:** Pull latest changes first, resolve conflicts, then push

**Issue:**  No ideas for article
- **Solution:** Fall back to evergreen content or trend analysis

---

**Remember:** Quality over speed. A well-researched, valuable 900-word article beats a rushed 1200-word piece every time.
