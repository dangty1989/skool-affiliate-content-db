
import subprocess
import os

nlm_path = r"C:\Users\Admin\AppData\Roaming\Python\Python314\Scripts\nlm.exe"
notebook_id = "d5c6fae5-73b2-49ab-8f27-67c1f3825a92"

# SUPER MASTER PROMPT VIETNAMESE (Julian Goldie Style + F.Y.W.H.E.E.L Structure)
prompt = """
Hãy đóng vai một "Affiliate God" phiên bản Việt Nam (phong cách Julian Goldie: Năng lượng cao, thực dụng, tập trung vào tiền và kết quả).

Dựa trên 100+ nguồn dữ liệu trong sổ tay này (đặc biệt là chiến lược F.Y.W.H.E.E.L, Seedance 2.0, DeepSeek R1), hãy viết một **KỊCH BẢN VIDEO YOUTUBE 10 PHÚT (TIẾNG VIỆT)** để hướng dẫn anh em MMO cách xây dựng "Cỗ máy kiếm tiền tự động" năm 2026.

*** BẮT BUỘC TUÂN THỦ ***
1.  **Ngôn ngữ:** TIẾNG VIỆT 100%. Dùng từ ngữ dân dã, "bụi bặm" của dân kiếm tiền online (MMO): "Vít ads", "bơm traffic", "lụm lúa", "nổ đơn", "kèo đổi đời", "tự động hóa cơm gạo".
2.  **Cấu trúc:** Áp dụng KHUNG F.Y.W.H.E.E.L (Find, Yield, Wire, Harvest, Expand, Engage, Level Up) vào quy trình dùng Seedance/DeepSeek.
3.  **Tone giọng:** Gắt, mạnh, dứt khoát. Không "Xin chào các bạn", mà là "Dừng ngay việc đốt tiền đi!". Một câu một ý, ngắn gọn như phát súng.

*** KỊCH BẢN CHI TIẾT (Chia theo thời gian) ***

**0:00 - 1:30: THE BRUTAL HOOK (CÚ TÁT THẲNG MẶT)**
*   Show ngay kết quả: "Tôi vừa tạo ra 47 triệu trong 30 ngày chỉ với 3 công cụ AI miễn phí. Không cần vốn, không cần lộ mặt."
*   Vạch trần sai lầm: "99% anh em đang làm Affiliate sai cách. Đăng link dạo? Spam comment? Vứt hết đi. Đó là cách của năm 2015 rồi."
*   Giới thiệu "The Machine 2026": Seedance 2.0 (Video) + DeepSeek (Content) + OpenClaw (Auto).

**1:30 - 3:00: BƯỚC 1 - F (FIND): SĂN KÈO NGON BẰNG DEEPSEEK**
*   Tại sao ChatGPT đã "lỗi thời" để tìm ngách? DeepSeek R1 mới là trùm tìm "Blue Ocean" (Đại dương xanh).
*   Thực chiến: Gõ lệnh gì vào DeepSeek để nó nhả ra danh sách sản phẩm High-Ticket (Hoa hồng cao) ít cạnh tranh?
*   Chốt: "Đừng bán cái ai cũng bán. Bán cái người giàu cần."

**3:00 - 5:00: BƯỚC 2 - Y (YIELD): XƯỞNG SẢN XUẤT VIDEO VỚI SEEDANCE 2.0**
*   Đây là "Vũ khí bí mật". Quên Sora đi, Seedance 2.0 mới là vua số lượng.
*   Hướng dẫn nhanh (Director Mode): Cách ném prompt vào để ra video review sản phẩm trông như studio chuyên nghiệp.
*   Mẹo: Dùng tính năng Multimodal để clone video triệu view của đối thủ (nhưng làm tốt hơn).

**5:00 - 6:30: BƯỚC 3 - W (WIRE): DẪN TRAFFIC VỀ "CÁI RỌ" (LINK)**
*   Đừng dẫn link trực tiếp (dễ bị ban). Hãy dẫn về "Cầu nối" (Bridge Page) hoặc nhóm Skool/Zalo.
*   Sử dụng OpenClaw để tự động hóa việc rải comment điều hướng (Seeding) trên MXH. "Để máy chạy, mình đi ngủ, tiền vẫn về".

**6:30 - 8:00: BƯỚC 4, 5, 6 - H.E.E.L (THU HOẠCH & MỞ RỘNG)**
*   **Harvest:** Khi tiền về, đừng tiêu xài. Tái đầu tư vào acc Premium, thuê VPS.
*   **Expand:** Nhân bản mô hình sang ngách khác (Bất động sản, Crypto, AI Tool).
*   **Level Up:** Biến traffic thành cộng đồng (Skool). Đây mới là tài sản thật.

**8:00 - 9:00: CẢNH BÁO RỦI RO (RISK MITIGATION)**
*   Những cái bẫy chết người: Ham rẻ dùng tool rác, không fake IP kỹ, nội dung copy 100% không chỉnh sửa.
*   Cách né gậy bản quyền và thuật toán quét của YouTube/TikTok.

**9:00 - 10:00: LỜI KÊU GỌI CUỐI CÙNG (THE ULTIMATE CTA)**
*   Tuyên bố đanh thép: "Cơ hội này chỉ còn ngon trong 6 tháng tới. Năm 2027 ai cũng biết thì nát."
*   CTA: "Muốn lấy trọn bộ Prompt & Quy trình cài đặt OpenClaw? Vào ngay Skool bên dưới. Tôi để sẵn nút bấm rồi."
*   Kết thúc: "Hành động hoặc đứng nhìn người khác giàu. Lựa chọn là của bạn. Peace!"

*** HÃY VIẾT TOÀN BỘ KỊCH BẢN NÀY (TIẾNG VIỆT) NGAY BÂY GIỜ. ***
"""

print(f"Generating Julian Goldie Style Script (VN) from Notebook {notebook_id}...")

# Set environment for Encoding
env = os.environ.copy()
env["PYTHONIOENCODING"] = "utf-8"

try:
    # Command: nlm query <NOTEBOOK_ID> "<PROMPT>"
    cmd = [nlm_path, "query", notebook_id, prompt]
    
    # Run command
    # Note: increased buffer/wait time implied by nature of subprocess, 
    # but we just wait until it returns.
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', env=env)
    
    if res.returncode == 0:
        print("\n--- SCRIPT GENERATED SUCCESSFULLY ---\n")
        # Save to file
        filename = "kich_ban_julian_vn.md"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(res.stdout)
        print(f"\n(Script saved to {filename})")
        print("\n--- PREVIEW (First 500 chars) ---\n")
        print(res.stdout[:500] + "...")
            
    else:
        print(f"Error generating script: {res.stderr}")

except Exception as e:
    print(f"Execution Error: {e}")
