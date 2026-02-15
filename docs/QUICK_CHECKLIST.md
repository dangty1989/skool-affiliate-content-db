# Quick Checklist - Kiểm Tra Bài Mới Trên Site

## ✅ CHECKLIST 5 PHÚT

### 1. Kiểm Tra URL Đúng
- [ ] Đang dùng: `https://skool-machine.vercel.app/blog` (ĐÚNG ✅)
- [ ] KHÔNG dùng: `skool-affiliate-content-db.vercel.app` (SAI ❌)

### 2. Kiểm Tra Thời Gian Bot
**Lịch chạy tự động:**
- [ ] **9 AM UTC** = **4 PM Việt Nam** (bài EU)
- [ ] **1 PM UTC** = **8 PM Việt Nam** (bài US)

**Thời gian hiện tại:** _____
- [ ] Đã qua 4 PM? → Có bài EU
- [ ] Đã qua 8 PM? → Có bài US

### 3. Kiểm Tra GitHub Actions
🔗 https://github.com/dangty1989/skool-affiliate-content-db/actions

- [ ] Có workflow run mới hôm nay?
- [ ] Status: ✅ Success hoặc ❌ Failed?
- [ ] Thời gian chạy gần nhất: _____

### 4. Kiểm Tra Repo
🔗 https://github.com/dangty1989/skool-affiliate-content-db/tree/main/website/content/blog

- [ ] Có file `.md` mới với ngày hôm nay?
- [ ] Filename format: `YYYY-MM-DD-slug.md` ✅
- [ ] Commit message có "Create job" hoặc "Major upgrade"?

### 5. Kiểm Tra Vercel
🔗 https://vercel.com/ty-dangs-projects/skool-affiliate-content-db

- [ ] Có deployment mới?
- [ ] Status: Ready ✅
- [ ] Deployment time: _____

### 6. Kiểm Tra Live Site
🔗 https://skool-machine.vercel.app/blog

- [ ] Hard refresh (Ctrl+F5)
- [ ] Thấy bài mới ở đầu list?
- [ ] Click vào bài → Load đúng nội dung?
- [ ] Kiểm tra affiliate links (2-3 links)

## 🚨 NẾU KHÔNG THẤY BÀI MỚI

### Scenario 1: Bot chưa chạy
**Triệu chứng:**
- Chưa đến giờ (4 PM hoặc 8 PM VN)
- Không có workflow run mới trong Actions

**Giải pháp:**
- Đợi đến giờ scheduled
- HOẶC chạy thủ công: Actions → Run workflow

### Scenario 2: Bot chạy nhưng failed
**Triệu chứng:**
- Có workflow run ❌ Failed
- Không có commit mới

**Giải pháp:**
1. Click vào workflow run để xem logs
2. Tìm error message
3. Fix theo error (thường là API key hoặc permissions)
4. Run lại workflow

### Scenario 3: Bot chạy OK nhưng không thấy trên site
**Triệu chứng:**
- Workflow ✅ Success
- Có commit mới trong repo
- Vercel deployment ✅ Ready
- Nhưng site vẫn không có bài

**Giải pháp:**
1. Hard refresh (Ctrl+F5)
2. Clear browser cache
3. Thử incognito mode
4. Check deployment logs trên Vercel
5. Verify Vercel build thành công

### Scenario 4: Dùng sai URL
**Triệu chứng:**
- 404 Error
- "Deployment not found"

**Giải pháp:**
- Đổi sang: `https://skool-machine.vercel.app/blog`

## 🎯 MANUAL RUN (Chạy Ngay)

Nếu muốn test NGAY KHÔNG ĐỢI:

1. **Vào GitHub Actions:**
   https://github.com/dangty1989/skool-affiliate-content-db/actions

2. **Click workflow:**
   "AI News Bot - Daily Articles"

3. **Click nút "Run workflow"** (màu xanh, bên phải)

4. **Fill form:**
   - Branch: `main`
   - Job description: (để trống = dùng default)

5. **Click "Run workflow"** để confirm

6. **Đợi 3-5 phút** → Refresh repo để thấy bài mới

7. **Check site:** https://skool-machine.vercel.app/blog

## 📞 DEBUG NHANH

### Command Line Check
```bash
# Check newest blog post
ls -lt website/content/blog/ | head -n 3

# Check latest commit
git log --oneline -n 5

# Check GitHub Actions status (cần gh CLI)
gh run list --limit 5

# Test site response
curl -I https://skool-machine.vercel.app/blog
```

### Browser Check
```javascript
// Paste in browser console to check cache
console.log('Last-Modified:', document.lastModified);
console.log('Cache-Control:', document.querySelector('meta[http-equiv="Cache-Control"]'));
```

## ✨ KỲ VỌNG SAU MỖI LẦN CHẠY

**Khi bot chạy thành công, bạn sẽ thấy:**

1. ✅ GitHub Actions: "Success" status
2. ✅ GitHub Repo: File `.md` mới trong `/website/content/blog/`
3. ✅ Vercel: Deployment mới với status "Ready"
4. ✅ Site: Bài mới xuất hiện ở `/blog` (sau ~2-3 phút)

**Thời gian tổng:**
- Bot run: 3-5 phút
- Vercel build: 1-2 phút
- **Total:** ~5-7 phút từ lúc trigger đến khi live

---

**Last Updated:** 2026-02-15
**Next Scheduled Run:** 
- Morning: 4 PM VN (9 AM UTC)
- Evening: 8 PM VN (1 PM UTC)
