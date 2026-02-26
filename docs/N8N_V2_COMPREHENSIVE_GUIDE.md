## 📚 **Hướng Dẫn Toàn Diện: n8n Phiên Bản 2.0 Trở Đi**

Tài liệu này tổng hợp **toàn bộ thông tin quan trọng** về n8n v2.0+ từ phiên bản 2.0 đến 2.6.0 (hiện tại).

***

## 🎯 **I. n8n 2.0: Hardening Release - Không Phải Feature Release**

### **Tính Chất Chính** [docs.n8n](https://docs.n8n.io/release-notes/)

n8n 2.0 **KHÔNG** là release về tính năng, mà là **security & reliability hardening**:

- ✅ **Security**: Xoá quyền truy cập environment variable mặc định
- ✅ **Reliability**: Xoá in-memory binary data mode (gây crash)
- ✅ **Performance**: SQLite pooling lên đến **10x nhanh hơn**
- ✅ **Production Safety**: Thêm Save vs Publish paradigm

### **Release Timeline**

| Phiên bản | Ngày | Điểm chính |
|-----------|------|-----------|
| **2.0.0** | Dec 2025 | Beta release - Save/Publish paradigm |
| **2.1.0** | Jan 2026 | Env var support on runners |
| **2.2.0** | Jan 2026 | Parallel execution, memory fixes |
| **2.3.0** | Current | Instance ID caching, Stop All Executions |
| **2.4.0** | Jan 2026 | **Autosave** feature launch |
| **2.5.0** | Jan 2026 | AI builder fixes |
| **2.6.0** | Jan 2026 | Custom scopes for Excel/Teams |

***

## 🔴 **II. Breaking Changes - PHẢI BIẾT**

### **1. Save vs Publish Paradigm** [dev](https://dev.to/techstuff/n8n-20-a-complete-guide-to-save-and-publish-workflows-17hh)

#### **n8n 1.x (Cũ):**
```
Click "Save" → Workflow activate ngay → Production live instantly
❌ Vấn đề: Sửa mà quên Publish = Production break
```

#### **n8n 2.0+ (Mới):**
```
Click "Save" (Auto mỗi 5 giây) → Lưu Draft (không live)
Click "Publish" → Workflow active + Production live
✅ Lợi ích: Safe iteration + explicit deployment
```

**Cách Publish:**
1. Click nút **"Publish"** ở header
2. Nhập version name + description
3. Click "Publish"
4. Production URL activate + webhooks hoạt động

**Lưu ý:**
```javascript
// Webhook URL CHỈ hoạt động khi:
✅ Workflow PUBLISHED
❌ Workflow chỉ SAVED (draft)

// $execution.resumeUrl CHỈ có giá trị khi:
✅ Workflow PUBLISHED + trigger từ production
❌ Test mode / Manual execute
```

***

### **2. Task Runners - Code Node Isolation** [docs.n8n](https://docs.n8n.io/2-0-breaking-changes/)

#### **n8n 1.x:**
```javascript
// Code node chạy trong process chính
- Có quyền access env vars
- Risk crash toàn bộ n8n
```

#### **n8n 2.0+:**
```javascript
// Code node chạy trong isolated environment
- Enabled by default: N8N_RUNNERS_ENABLED=true
- Toàn bộ code được sandbox
- Env var access blocked: N8N_BLOCK_ENV_ACCESS_IN_NODE=true
```

**JavaScript Code Node:**
```javascript
// ❌ KHÔNG ĐƯỢC trong v2.0
const apiKey = process.env.MY_API_KEY;

// ✅ PHẢI DÙNG
const apiKey = $secret.my_api_key;  // Use n8n secrets instead
```

***

### **3. Python Node: Native Python** [docs.n8n](https://docs.n8n.io/2-0-breaking-changes/)

#### **n8n 1.x:**
```python
# Chạy JavaScript-based Python (Pyodide) - chậm, giới hạn
```

#### **n8n 2.0+:**
```python
# Chạy native Python thực - nhanh, full support
import requests
response = requests.get("https://...")  // ✅ WORKS
```

***

### **4. Binary Data: In-Memory Mode Xoá** [docs.n8n](https://docs.n8n.io/2-0-breaking-changes/)

#### **n8n 1.x:**
```
N8N_DEFAULT_BINARY_DATA_MODE=default  # In-memory (crash risk)
```

#### **n8n 2.0+:**
```bash
# Options:
N8N_DEFAULT_BINARY_DATA_MODE=filesystem  # Default - lưu disk
N8N_DEFAULT_BINARY_DATA_MODE=database    # Lưu DB (cloud)
```

***

## 🎁 **III. New Features - Từ v2.0 Đến v2.6**

### **v2.0: Save/Publish + Task Runners**
### **v2.1: Env Vars on Runners + Dynamic Credentials**
### **v2.2: Performance + Parallel Execution**
### **v2.3: Instance Management (Phiên bản của dự án)** ⭐
- Instance ID caching
- Stop All Executions feature
- Workflow history compaction
### **v2.4: Autosave**
### **v2.5: AI Builder Enhancements**
### **v2.6: Custom Scopes**

***

## 💻 **IV. Workflow Execution Flow - n8n 2.0+**

### **Draft vs Published State**

Webhook URL và trigger chỉ hoạt động ở chế độ Production khi workflow đã được **PUBLISHED**.

**JavaScript (Cách gọi Webhook):**
```javascript
// DRAFT mode (Test):
http://n8n-instance/webhook-test/abc...

// PUBLISHED mode (Production):
http://n8n-instance/webhook/abc...
```

***

## 🎯 **V. Wait Node - n8n 2.0+ Cấu Hình Đúng**

**BẮT BUỘC phải có `httpMethod`:**
```json
{
  "resume": "webhook",
  "httpMethod": "POST",  // ← CỰC KỲ QUAN TRỌNG
  "responseCode": 200,
  "respondWith": "immediately",
  "options": {
    "limitWaitTime": true,
    "amount": 600,
    "unit": "seconds"
  }
}
```

***

## 🚀 **VI. Best Practices Cho Dự Án**

1. **Save ≠ Publish**: Luôn Publish sau khi test xong.
2. **Secrets**: Dùng `$secret.key_name` thay vì `process.env`.
3. **Wait Node**: Luôn điền `httpMethod: POST`.
4. **Binary Data**: Yên tâm xử lý video lớn vì n8n v2.3 lưu file xuống ổ đĩa (filesystem) mặc định.
