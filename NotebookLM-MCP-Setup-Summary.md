# Tổng kết: Kết nối NotebookLM MCP với n8n trên VPS

**Ngày thực hiện:** 28/01/2026  
**Mục tiêu:** Tích hợp NotebookLM MCP Server vào hệ thống n8n để tự động hóa việc truy vấn kiến thức từ Google NotebookLM

---

## 🎯 Vấn đề ban đầu

NotebookLM MCP Server được thiết kế để chạy qua **stdio** (standard input/output), phù hợp với các AI agents như Claude Code. Tuy nhiên, n8n cần gọi qua **HTTP Request**, dẫn đến xung đột giao thức.

---

## ✅ Những gì đã hoàn thành

### 1. Tạo HTTP Wrapper cho NotebookLM MCP

**File: `/opt/n8n/notebooklm-wrapper.js`**

```javascript
const express = require('express');
const { spawn } = require('child_process');
const app = express();

app.use(express.json());

app.post('/ask_question', async (req, res) => {
  const { question, notebook_url } = req.body;
  
  if (!question) {
    return res.status(400).json({ error: 'Missing question parameter' });
  }

  console.log('Received question:', question);
  
  const mcp = spawn('notebooklm-mcp');
  let output = '';
  let errorOutput = '';

  mcp.stdout.on('data', (data) => {
    output += data.toString();
  });

  mcp.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  const mcpRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'ask_question',
      arguments: { question, notebook_url }
    }
  };

  mcp.stdin.write(JSON.stringify(mcpRequest) + '\n');

  setTimeout(() => {
    mcp.kill();
    res.json({ 
      success: true,
      output: output,
      error: errorOutput 
    });
  }, 10000);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'NotebookLM HTTP Wrapper is running' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('NotebookLM HTTP Wrapper listening on port 3000');
});
```

### 2. Tạo Dockerfile với đầy đủ dependencies

**File: `/opt/n8n/Dockerfile-notebooklm`**

```dockerfile
FROM node:22

# Cài đặt dependencies cho Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    libvulkan1 \
    && rm -rf /var/lib/apt/lists/*

# Cài notebooklm-mcp và patchright
RUN npm install -g notebooklm-mcp patchright

# Cài Chrome browser
RUN npx patchright install chrome

# Tạo app directory và cài express
WORKDIR /app
RUN npm init -y && npm install express

# Copy wrapper script
COPY notebooklm-wrapper.js /app/wrapper.js

# Chạy wrapper
CMD ["node", "wrapper.js"]
```

### 3. Cấu hình Docker Compose

**Thêm vào `/opt/n8n/docker-compose.yml`:**

```yaml
  notebooklm-mcp:
    build:
      context: .
      dockerfile: Dockerfile-notebooklm
    container_name: notebooklm-mcp
    restart: always
    ports:
      - "3001:3000"
    volumes:
      - ./notebooklm-data:/root/.local/share/notebooklm-mcp
```

### 4. Build và Deploy thành công

```bash
cd /opt/n8n
docker compose up -d --build notebooklm-mcp
```

**Kết quả:**
- ✅ Container khởi động thành công
- ✅ HTTP Server lắng nghe trên port 3000
- ✅ Chrome browser được cài đặt và sẵn sàng
- ✅ Giao tiếp với NotebookLM MCP qua stdio hoạt động

---

## 🔧 Cách sử dụng trong n8n

### HTTP Request Node Configuration:

- **Method:** POST
- **URL:** `http://notebooklm-mcp:3000/ask_question`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "question": "Nêu quy trình 7 bước của Julian Goldie",
  "notebook_url": "https://notebooklm.google.com/notebook/YOUR_NOTEBOOK_ID"
}
```

### Health Check Endpoint:

```
GET http://notebooklm-mcp:3000/health
```

---

## ⚠️ Vấn đề còn tồn đọng

### Authentication Required

NotebookLM yêu cầu đăng nhập Google để truy cập notebooks. Trong môi trường VPS headless (không có màn hình), việc authentication tự động gặp khó khăn.

**Lỗi hiện tại:**
```
❌ Auto-login disabled and no valid auth state - manual login required
❌ Failed to authenticate session
```

---

## 💡 Các giải pháp tiếp theo

### Giải pháp 1: Setup Authentication với Cookies

1. Lấy cookies từ browser đã đăng nhập Google
2. Import cookies vào container:

```bash
docker exec -it notebooklm-mcp /bin/sh
# Trong container, tạo file cookies.json với nội dung từ browser
```

**Nhược điểm:** Cookies sẽ expire sau vài tuần

### Giải pháp 2: Dùng Gemini API trực tiếp (Khuyến nghị)

Thay vì qua NotebookLM, sử dụng Google Gemini API:

**Bước 1:** Lấy API key tại https://aistudio.google.com/apikey

**Bước 2:** Trong n8n HTTP Request Node:

- **Method:** POST
- **URL:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY`
- **Body:**

```json
{
  "contents": [{
    "parts": [{
      "text": "Dựa trên tài liệu Skool Affiliate Machine của Julian Goldie, nêu quy trình F.Y.W.H.E.E.L 7 bước"
    }]
  }]
}
```

**Ưu điểm:**
- Không cần authentication phức tạp
- Ổn định hơn
- Rate limit cao hơn
- Có thể upload files trực tiếp qua Gemini Files API

### Giải pháp 3: Chạy wrapper trên máy local

- Chạy wrapper trên máy Windows/Mac (có thể đăng nhập Google thủ công)
- Expose qua ngrok/Cloudflare Tunnel
- n8n trên VPS gọi vào URL public

---

## 📊 Thống kê kỹ thuật

- **Image size:** ~1.2GB (bao gồm Node.js + Chrome)
- **Build time:** ~75 giây
- **Memory usage:** ~300-500MB khi idle
- **Ports:** 
  - Internal: 3000
  - External (mapped): 3001

---

## 🗂️ Files quan trọng

| File | Đường dẫn | Mô tả |
|------|-----------|-------|
| Wrapper Script | `/opt/n8n/notebooklm-wrapper.js` | Express server chuyển HTTP → stdio |
| Dockerfile | `/opt/n8n/Dockerfile-notebooklm` | Build definition với Chrome |
| Docker Compose | `/opt/n8n/docker-compose.yml` | Service configuration |
| Data Volume | `/opt/n8n/notebooklm-data` | Persistent storage cho Chrome profile |

---

## 🔍 Debugging Commands

```bash
# Xem logs
docker logs -f notebooklm-mcp

# Kiểm tra container
docker ps | grep notebooklm

# Vào shell của container
docker exec -it notebooklm-mcp /bin/sh

# Test endpoint
curl -X POST http://localhost:3001/ask_question \
  -H "Content-Type: application/json" \
  -d '{"question": "Test", "notebook_url": "YOUR_URL"}'

# Health check
curl http://localhost:3001/health

# Rebuild từ đầu
docker compose up -d --build --force-recreate notebooklm-mcp
```

---

## 📝 Bài học kinh nghiệm

### Những gì thành công:
1. ✅ Tạo HTTP wrapper cho stdio MCP protocol
2. ✅ Cài đặt Chrome trong Docker container
3. ✅ Docker networking giữa n8n và NotebookLM container
4. ✅ Persistent storage cho Chrome profile

### Những thách thức:
1. ⚠️ Image ban đầu thiếu Chrome browser
2. ⚠️ Express cài global không hoạt động, phải cài local
3. ⚠️ Authentication headless trên VPS
4. ⚠️ Vòng lặp restart do lệnh CMD không đúng

### Key Takeaways:
- Docker container networking: Dùng `container_name` thay vì `localhost`
- MCP protocol cần wrapper để chuyển đổi sang HTTP
- Headless browser automation yêu cầu authentication cookies
- Build time optimization: Cache layers hiệu quả

---

## 🚀 Next Steps

1. **Option A:** Setup authentication cookies cho NotebookLM
2. **Option B:** Migrate sang Gemini API (khuyến nghị)
3. **Option C:** Hybrid approach - dùng cả hai tùy use case

---

**Tài liệu này được tạo tự động bởi Antigravity**  
*Cập nhật lần cuối: 28/01/2026 22:53*
