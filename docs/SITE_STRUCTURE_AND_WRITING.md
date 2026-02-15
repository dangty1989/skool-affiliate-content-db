# Cấu Trúc Site & Cách Viết Bài - Skool Affiliate Content DB

## 📁 CẤU TRÚC SITE

### Tổng Quan
```
skool-affiliate-content-db/
├── website/                    # Next.js App (ROOT của Vercel)
│   ├── src/                   # Source code
│   │   ├── app/              # Next.js App Router
│   │   └── components/       # React components
│   ├── content/              # ⭐ CONTENT FOLDER
│   │   └── blog/            # 📝 BLOG POSTS
│   │       ├── 2026-02-14-airbnb-ai-innovations.md
│   │       ├── 2026-02-14-top-ai-news-story.md
│   │       └── ...          # 10 bài viết
│   ├── public/              # Static assets
│   ├── package.json
│   └── next.config.ts
├── .pi/                       # PopeBot Skills Framework
│   ├── skills/
│   │   └── write-affiliate-news/  # Skill viết bài
│   │       └── SKILL.md          # Workflow chi tiết
│   ├── knowledge/
│   │   └── affiliate-products.md # Database sản phẩm affiliate
│   └── scripts/
│       ├── fetch-ai-news.js      # Script lấy tin AI
│       └── clean-blog-output.js  # Clean output debug
├── .github/workflows/
│   └── run-job.yml              # GitHub Actions workflow
└── operating_system/            # Bot configuration
    ├── AGENT.md                # Bot persona
    ├── SOUL.md                 # Writing style
    └── CRONS.json              # Lịch chạy tự động
```

## 📝 FORMAT BÀI VIẾT

### Tên File
```
YYYY-MM-DD-slug-description.md
```

**Ví dụ:**
- `2026-02-14-airbnb-ai-innovations.md`
- `2026-02-14-top-ai-news-story.md`

### Cấu Trúc Bài Viết

#### 1. Frontmatter (YAML)
```yaml
---
title: "Tiêu đề bài viết"
date: "YYYY-MM-DD"
author: "AI News Desk"
category: AI Technology
tags: [AI, Breakthrough, Research]
description: "Mô tả ngắn gọn về bài viết cho SEO"
---
```

#### 2. Nội Dung Bài
```markdown
# Tiêu Đề Chính (H1)

Đoạn giới thiệu ngắn gọn, hấp dẫn...

## The News (H2)
Phần tin tức chính với link nguồn...

## Why It Matters (H2)
Tại sao tin này quan trọng...

## Related Developments (H2)
Các phát triển liên quan...

## Conclusion (H2)
Kết luận và call-to-action...

---

### Affiliate Links (Tự nhiên trong nội dung)
Ví dụ: [HeyGen](https://heygen.com) cho video generation...
```

### Yêu Cầu Nội Dung
- **Độ dài:** 800-1200 từ
- **Affiliate links:** 2-3 links tự nhiên trong bài
- **SEO:** Proper H2/H3 structure
- **Style:** Julian Goldie copywriting (engaging, data-driven)

## 🤖 QUY TRÌNH TỰ ĐỘNG

### Workflow GitHub Actions
```yaml
# File: .github/workflows/run-job.yml

# Trigger: 2 lần/ngày
- 9 AM UTC (4 PM Vietnam)  → EU market
- 1 PM UTC (8 PM Vietnam)  → US market

# Hoặc: Manual trigger từ GitHub Actions UI
```

### Các Bước Bot Thực Hiện

1. **Fetch News**
   ```bash
   node /job/.pi/scripts/fetch-ai-news.js
   ```
   - Lấy tin AI news từ 12h gần nhất
   - Lưu vào `/job/logs/latest-ai-news.json`

2. **Generate Article**
   - Bot đọc skill từ `.pi/skills/write-affiliate-news/SKILL.md`
   - Viết bài 800-1200 từ
   - Chèn 2-3 affiliate links từ `.pi/knowledge/affiliate-products.md`
   - Format Markdown với frontmatter

3. **Save Article**
   ```
   /job/website/content/blog/YYYY-MM-DD-slug.md
   ```

4. **Clean Output**
   ```bash
   node .pi/scripts/clean-blog-output.js
   ```
   - Xóa debug output không mong muốn

5. **Commit & Push**
   - Create branch: `job/{JOB_ID}`
   - Commit file mới
   - Push to GitHub
   - Auto-merge to `main` via PR

6. **Vercel Auto-Deploy**
   - Vercel detect commit to `main`
   - Build Next.js app từ `/website`
   - Deploy to `skool-machine.vercel.app`

## 🔗 AFFILIATE PRODUCTS

Database ở: `.pi/knowledge/affiliate-products.md`

**Sản phẩm hiện có:**
1. HeyGen - AI Video Generation
2. Synthesia - AI Video Creation
3. Descript - Video Editing
4. Hemingway Editor - Writing Tool
5. Grammarly - Grammar Checker
6. Canva Pro - Design Tool
7. ChatGPT Plus - AI Assistant
8. Pictory AI - Video from Text

**Matching Rules:**
- Video generation → HeyGen, Synthesia
- Writing/Content → Hemingway, Grammarly
- Design → Canva Pro
- Chat/Assistant → ChatGPT Plus

## 🌐 DEPLOYMENT

### Vercel Settings
```
Project: skool-affiliate-content-db
Root Directory: website
Framework: Next.js
Build Command: next build (auto)
Output Directory: .next (auto)
```

### Live URLs
- **Production:** https://skool-machine.vercel.app
- **Blog:** https://skool-machine.vercel.app/blog

### GitHub Repo
- **Repo:** dangty1989/skool-affiliate-content-db
- **Branch:** main
- **Actions:** Auto-triggered by schedule/manual

## 🧪 CÁCH TEST

### Test 1: Chạy Thủ Công
1. Vào GitHub Actions: https://github.com/dangty1989/skool-affiliate-content-db/actions
2. Click "AI News Bot - Daily Articles"
3. Click "Run workflow"
4. Chọn branch `main`
5. Click "Run workflow" để confirm
6. Đợi 3-5 phút
7. Check `/website/content/blog/` trong repo
8. Check site: https://skool-machine.vercel.app/blog

### Test 2: Kiểm Tra Bài Mới
```bash
# List files in blog folder
ls -la website/content/blog/

# View tất cả bài viết
cat website/content/blog/*.md | grep "title:"

# Check latest commit
git log --oneline -n 5
```

### Test 3: Verify Deployment
```bash
# Check Vercel deployment status
curl -I https://skool-machine.vercel.app/blog

# Expect: HTTP/2 200 OK
```

## 📊 MONITORING

### Check Bot Status
1. **GitHub Actions:** https://github.com/dangty1989/skool-affiliate-content-db/actions
2. **Vercel Deployments:** https://vercel.com/ty-dangs-projects/skool-affiliate-content-db
3. **Live Site:** https://skool-machine.vercel.app/blog

### Expected Schedule
- **Morning (4 PM VN):** 1 bài mới
- **Evening (8 PM VN):** 1 bài mới
- **Tổng:** 2 bài/ngày = 60 bài/tháng

## 🛠️ TROUBLESHOOTING

### Vấn Đề: Bot chạy nhưng không thấy bài
**Nguyên nhân:**
- Bot push lên GitHub thành công
- Vercel chưa deploy (check deployment status)

**Giải pháp:**
1. Check GitHub Actions logs
2. Verify commit trong repo
3. Check Vercel deployment logs
4. Hard refresh browser (Ctrl+F5)

### Vấn Đề: Domain 404
**Nguyên nhân:**
- Dùng sai URL

**Giải pháp:**
- Dùng: `https://skool-machine.vercel.app/blog`
- Hoặc add domain mới trong Vercel Settings

### Vấn Đề: Bài cũ
**Nguyên nhân:**
- Bot chưa chạy hôm nay
- Cache browser

**Giải pháp:**
1. Check thời gian hiện tại vs schedule
2. Clear cache (Ctrl+F5)
3. Check GitHub Actions để xem lần chạy gần nhất

## 📚 TÀI LIỆU THAM KHẢO

- **Setup Guide:** `POPEBOT_SETUP_GUIDE.md`
- **Skill Instructions:** `.pi/skills/write-affiliate-news/SKILL.md`
- **Affiliate Database:** `.pi/knowledge/affiliate-products.md`
- **Workflow Config:** `.github/workflows/run-job.yml`
- **Bot Persona:** `operating_system/AGENT.md`
- **Writing Style:** `operating_system/SOUL.md`
