# PopeBot Integration - Next Steps

**Status:** ✅ Core files integrated and customized
**Date:** 2026-02-13
**Target:** AI News + Affiliate automated publishing (2x daily for EU & US markets)

---

## ✅ What We've Completed

### 1. Core Framework Copied
- ✅ `.pi/` - Skills framework (5 files)
- ✅ `operating_system/` - Agent configuration (11 files)
- ✅ `event_handler/` - Telegram listener (19 files)
- ✅ `.github/workflows/` - GitHub Actions (4 files)
- ✅ `Dockerfile` & `entrypoint.sh` - Container setup

**Total:** 41 files integrated

### 2. Custom Configuration Created
- ✅ `.pi/knowledge/affiliate-products.md` - Database of 8 affiliate products with matching rules
- ✅ `operating_system/AGENT.md` - AI News Writer persona and mission
- ✅ `operating_system/SOUL.md` - Writing philosophy and style guide
- ✅ `operating_system/CRONS.json` - Dual schedule (9 AM UTC & 1 PM UTC)
- ✅ `.pi/skills/write-affiliate-news/SKILL.md` - Complete workflow for article generation

---

## 📋 What You Need to Do Next

### Phase 1: GitHub Repository Setup (15 minutes)

#### Step 1: Commit the Bot Framework
```bash
cd F:\Skool_Affiliate_Project\Skool_Machine_Clean

git add .pi/ operating_system/ event_handler/ .github/ Dockerfile entrypoint.sh
git commit -m "Integrate PopeBot framework for AI news automation"
git push origin main
```

#### Step 2: Enable GitHub Actions
1. Go to your repo on GitHub.com
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions":
   - Select: **"Allow all actions and reusable workflows"**
   - Click **Save**
4. Under "Workflow permissions":
   - Select: **"Read and write permissions"**
   - Click **Save**

#### Step 3: Configure GitHub Secrets
Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets ONE BY ONE:

| Secret Name | Value | Where to Get It |
|------------|-------|-----------------|
| `OPENAI_API_KEY` | `sk-proj-...` | https://platform.openai.com/api-keys |
| `GH_TOKEN` | `ghp_...` | https://github.com/settings/tokens → Generate new token (classic) → Select `repo` + `workflow` scopes |
| `GH_OWNER` | Your GitHub username | Example: `dangty02` |
| `GH_REPO` | Repository name | Example: `Skool_Machine_Clean` |
| `TELEGRAM_BOT_TOKEN` | `110201543:AAHdqTcv...` | You already have this from @BotFather |
| `TELEGRAM_CHAT_ID` | `123456789` | Send `/start` to @userinfobot on Telegram |
| `API_KEY` | Any random string | Example: `my-secret-key-12345` (create your own) |

**Important Notes:**
- `GH_TOKEN`: When creating, select **repo** (full control) and **workflow** permissions
- `API_KEY`: This is just a security key you make up (any random string)
- `TELEGRAM_CHAT_ID`: Must be YOUR personal chat ID (numeric, not username)

---

### Phase 2: Event Handler Deployment (20 minutes)

#### Option A: Deploy to Railway.app (Recommended - $1/month)

1. **Sign up:** Go to https://railway.app and sign in with GitHub
2. **New Project:** Click "New Project" → "Deploy from GitHub repo"
3. **Select Repo:** Choose `Skool_Machine_Clean`
4. **Configure:**
   - **Root Directory:** Leave as `/` (root)
   - **Start Command:** Will auto-detect from package.json
5. **Add Environment Variables:** Click "Variables" tab, add ALL the secrets from Step 3 above
6. **Deploy:** Click "Deploy" button
7. **Get URL:** After deployment, copy your Railway app URL (something like `https://your-app.railway.app`)

#### Option B: Deploy to Render.com (Free but spins down after 15 min)

1. **Sign up:** Go to https://render.com and connect GitHub
2. **New Web Service:** Click "New +" → "Web Service"
3. **Select Repo:** Choose `Skool_Machine_Clean`
4. **Configure:**
   - **Root Directory:** `event_handler`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:** Add all secrets from Step 3
6. **Create:** Click "Create Web Service"
7. **Get URL:** Copy your Render URL (like `https://your-app.onrender.com`)

---

### Phase 3: Telegram Webhook Setup (5 minutes)

Once your event handler is deployed and you have the URL:

```bash
# Replace with your actual values:
# - BOT_TOKEN: Your Telegram bot token
# - YOUR_RAILWAY_OR_RENDER_URL: The URL you got from Phase 2

curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://YOUR_RAILWAY_OR_RENDER_URL/api/telegram"
  }'
```

**Example:**
```bash
curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://my-app-production.up.railway.app/api/telegram"
  }'
```

**Verify webhook is set:**
```bash
curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
```

---

### Phase 4: Testing (10 minutes)

#### Test 1: Manual Article Generation via Telegram

Open Telegram and message your bot:

```
Write an AI news article about the latest developments in AI video generation tools. Include relevant affiliate recommendations.
```

The bot should:
1. Acknowledge your message
2. Trigger a GitHub Action job
3. Research the topic
4. Write an 800-1200 word article
5. Save it to `website/content/blog/`
6. Commit and push to your repo
7. Reply with success message and article link

**Expected time:** 3-5 minutes

#### Test 2: Check GitHub Actions

1. Go to your repo → **Actions** tab
2. You should see a workflow run for your manual request
3. Click on it to see the logs
4. Verify it completed successfully

#### Test 3: Verify Article Published

1. Go to `website/content/blog/` in your repo
2. You should see a new `.md` file with today's date
3. Open it and verify:
   - Proper frontmatter
   - 800-1200 words
   - 2-3 affiliate links naturally integrated
   - Good SEO structure

---

### Phase 5: Automated Schedule Testing (Next Day)

The bot is configured to run automatically at:
- **9 AM UTC (4 PM Vietnam)** - Morning article for EU market
- **1 PM UTC (8 PM Vietnam)** - Evening article for US market

**Monitor the first automated run:**
1. Open **Actions** tab at the scheduled time
2. Watch the workflow execute
3. Verify article is published
4. Check quality of content

---

## 🔧 Troubleshooting Guide

### Issue: "GitHub Actions not triggering"
**Solution:**
- Verify Actions are enabled (Settings → Actions)
- Check workflow file syntax (`.github/workflows/run-job.yml`)
- Ensure all secrets are configured correctly

### Issue: "Telegram bot not responding"
**Solution:**
- Verify webhook is set: `curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
- Check event handler logs on Railway/Render
- Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are correct

### Issue: "Bot can't access OpenAI"
**Solution:**
- Verify `OPENAI_API_KEY` is valid
- Check API key has credits: https://platform.openai.com/usage
- View GitHub Actions logs for error details

### Issue: "Git push fails in GitHub Actions"
**Solution:**
- Verify `GH_TOKEN` has `repo` and `workflow` permissions
- Ensure `GH_OWNER` and `GH_REPO` match your actual repo
- Check Actions logs for specific error message

### Issue: "Bot writes low-quality articles"
**Solution:**
- Review `operating_system/AGENT.md` and adjust guidelines
- Update `.pi/skills/write-affiliate-news/SKILL.md` with more specific instructions
- Provide feedback via Telegram: "The last article was too short, please aim for 1000+ words"

---

## 📊 Cost Breakdown

### Monthly Costs:
| Item | Cost | Notes |
|------|------|-------|
| GitHub Actions | **$0** | 2000 free minutes (enough for 60+ articles) |
| Railway/Render | **$0-1** | Railway $1/month, Render free (but slower) |
| OpenAI API | **~$15** | ~$0.50 per article × 60 articles |
| **Total** | **~$16/month** | For 60 professional articles |

### Cost Optimization:
- Use GPT-4-Turbo instead of GPT-4 (cheaper, still high quality)
- Limit article length to 900 words instead of 1200
- Test with GPT-3.5-Turbo first (much cheaper for testing)

---

## 🎯 Success Metrics

After 1 week of operation (14 articles), verify:
- ✅ All scheduled jobs ran successfully (14/14)
- ✅ Articles average 800-1200 words
- ✅ 2-3 affiliate links per article
- ✅ No duplicate content or plagiarism
- ✅ SEO structure is proper (H2/H3, meta descriptions)
- ✅ GitHub Actions usage < 200 minutes (well under limit)

After 1 month (60 articles):
- ✅ Organic traffic increase to blog
- ✅ Affiliate link click-through rate
- ✅ Content quality remains high
- ✅ No technical failures or downtime

---

## 🚀 Future Enhancements

Once the system is stable, consider:

1. **Image Generation:**
   - Add DALL-E or Midjourney API to generate featured images
   - Update skill to create custom visuals for each article

2. **Multi-Source Intelligence:**
   - Integrate RSS feeds for automated news discovery
   - Add Reddit/Twitter monitoring for trending topics

3. **SEO Optimization:**
   - Keyword research automation
   - Internal linking suggestions
   - Backlink monitoring

4. **Analytics Integration:**
   - Track article performance
   - A/B test different affiliate placements
   - Optimize based on conversion data

5. **Content Diversification:**
   - Add tutorial-style content
   - Create comparison guides
   - Develop case studies

---

## 📝 Important Files Reference

### Configuration Files:
- `.github/workflows/run-job.yml` - Main workflow trigger
- `operating_system/AGENT.md` - Bot identity and mission
- `operating_system/SOUL.md` - Writing style and ethics
- `operating_system/CRONS.json` - Automated schedule

### Knowledge Base:
- `.pi/knowledge/affiliate-products.md` - Product database

### Skills:
- `.pi/skills/write-affiliate-news/SKILL.md` - Article generation workflow

### Event Handler:
- `event_handler/server.js` - Telegram webhook receiver
- `event_handler/package.json` - Node.js dependencies

---

## 🆘 Need Help?

If you encounter issues:
1. Check GitHub Actions logs for error details
2. Review event handler logs on Railway/Render
3. Test manually via Telegram with: "Debug mode: show me what's happening"
4. Consult ThePopeBot documentation: https://github.com/stephengpope/thepopebot

---

## ✅ Checklist: Ready to Go Live

Before considering this complete, verify:

- [ ] All 41 files committed and pushed to GitHub
- [ ] GitHub Actions enabled with proper permissions
- [ ] All 7 GitHub Secrets configured
- [ ] Event handler deployed to Railway or Render
- [ ] Telegram webhook successfully set
- [ ] Manual test article generated and published
- [ ] First automated run completed successfully
- [ ] Article quality meets standards (800-1200 words, proper SEO, natural affiliate links)

Once all boxes are checked: **Your AI News Bot is operational!** 🎉

---

**Last Updated:** 2026-02-13 16:15 (Vietnam Time)
**Next Review:** After first automated run tomorrow
