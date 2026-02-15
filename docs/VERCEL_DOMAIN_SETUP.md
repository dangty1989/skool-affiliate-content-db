# Hướng Dẫn Thêm Domain Cho Vercel Project

## Vấn Đề Hiện Tại
- **Project Vercel:** `skool-affiliate-content-db`
- **Domain hiện tại:** `skool-machine.vercel.app` ✅ (hoạt động)
- **Domain mong muốn:** `skool-affiliate-content-db.vercel.app` ❌ (404)

## Giải Pháp: Thêm Domain Mới

### Bước 1: Vào Vercel Dashboard
1. Truy cập: https://vercel.com/dashboard
2. Click vào project `skool-affiliate-content-db`

### Bước 2: Vào Settings → Domains
1. Click tab **"Settings"** (trên menu)
2. Click **"Domains"** trong sidebar bên trái

### Bước 3: Thêm Domain Mới
1. Trong ô **"Add Domain"**, nhập: `skool-affiliate-content-db.vercel.app`
2. Click nút **"Add"**
3. Vercel sẽ tự động verify và configure

### Bước 4: Verify
Sau khi thêm, bạn sẽ thấy:
- ✅ `skool-affiliate-content-db.vercel.app` - Production
- ✅ `skool-machine.vercel.app` - Production

Cả 2 domain sẽ cùng trỏ đến site, bạn có thể:
- **Giữ cả 2:** Dùng cả 2 URLs
- **Xóa domain cũ:** Xóa `skool-machine.vercel.app` nếu không cần

## Alternative: Đổi Tên Project
Nếu bạn muốn domain chính là `skool-affiliate-content-db.vercel.app`:

1. Settings → General
2. Tìm **"Project Name"**
3. Click **"Edit"**
4. Đổi từ tên hiện tại sang: `skool-affiliate-content-db`
5. Click **"Save"**

**Lưu ý:** Việc đổi tên project sẽ tự động đổi domain mặc định.

## Test Domain Sau Khi Thêm
```bash
# Test domain mới
curl -I https://skool-affiliate-content-db.vercel.app

# Kỳ vọng: HTTP/2 200 OK
```

## Cập Nhật Workflow (Nếu Cần)
Nếu bạn update domain, có thể cần update các file sau:

1. **README.md** - Update URL demo
2. **website/src/config.ts** - Update base URL (nếu có)
3. **Telegram bot messages** - Update URL trong thông báo

## Support
Nếu gặp vấn đề, check:
- Vercel deployment logs
- Domain DNS settings
- SSL certificate status (auto-provision by Vercel)
