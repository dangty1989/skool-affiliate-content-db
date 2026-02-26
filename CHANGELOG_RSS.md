# RSS Feed News Fetcher - Recent Updates

## What Changed

Added automatic RSS feed aggregation system for AI news discovery.

### New Files:
- `.pi/scripts/fetch-ai-news.js` - RSS feed aggregator
  - Fetches from 6 major AI news sources
  - Parses RSS/Atom feeds without external dependencies
  - Filters by time window (12h or 24h)
  - Outputs JSON for bot consumption

### Updated Files:
- `.pi/skills/write-affiliate-news/SKILL.md`
  - Step 1 now uses RSS script instead of manual scraping
  - Example workflow updated with concrete commands
  - Clearer instructions for bot execution

### How It Works:

**Before (Manual):**
Bot had to manually curl websites and parse HTML → Unreliable

**Now (Automated):**
```bash
node .pi/scripts/fetch-ai-news.js 12
# → Returns structured JSON with latest AI news
# → Bot reads JSON and selects best topic
# → Bot writes SEO article with affiliate links
```

### News Sources Covered:
1. OpenAI Blog (official announcements)
2. Google AI Blog (research updates)
3. Hugging Face Blog (open-source models)
4. TechCrunch AI (industry news)
5. The Verge AI (consumer perspective)
6. MIT Tech Review (deep analysis)

### Next Steps:
Commit these changes and test the script manually before letting bot use it.

---

## PopyBot v1.2.72-beta.7 Update (2026-02-26)

Applied updates from Stephen Popy's PopyBot release v1.2.72-beta.7.

### Improved Debugging & Observability
- Enhanced `summarizeJob` logging in `event_handler/server.js`
  - Logs system prompt length, user message length, and result preview
  - Explicit error logging if `JOB_SUMMARY.md` is missing or empty

### Template Cleanup
- Removed redundant markdown code fences from `operating_system/JOB_SUMMARY.md`
  - Template now contains plain Markdown for easier reading and editing

### Dependency & Compatibility Fixes
- `crypto.randomUUID()` → `uuid` package (already in use, no changes needed)

---

Last updated: 2026-02-26
