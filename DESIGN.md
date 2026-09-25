# DESIGN SYSTEM & ARCHITECTURE: ĐÊM HỘI TRĂNG RẰM SPA
> **Project Stitch ID:** `15160776352269966973`  
> **Dự án:** Trung Thu Kỷ Niệm SPA (Đêm Hội Trăng Rằm - Chúc Mừng Tết Trung Thu)  
> **Thiết bị:** Desktop / Responsive (2560 x 2048 px base resolution)  
> **Được trích xuất trực tiếp từ Stitch MCP**

---

## 1. Tổng Quan Dự Án (Project Overview)
Dự án là một Single Page Application (SPA) kể chuyện tương tác (interactive storytelling) kết hợp đa phương tiện (âm thanh TTS, quay màn hình lưu kỷ niệm, hiệu ứng rước đèn / thả hoa đăng). Giao diện mang đậm âm hưởng lễ hội Tết Trung Thu cổ truyền Việt Nam nhưng kết hợp công nghệ hiện đại (trợ lý AI dẫn truyện, đồ họa vector rực rỡ, hiệu ứng ánh sáng phát quang trong bóng tối).

---

## 2. Hệ Thống Màu Sắc (Color Palette)

Hệ thống màu được thiết kế dựa trên không gian đêm rằm tháng Tám: sự tương phản mạnh mẽ giữa nền trời đêm huyền bí (`#050816`) và sắc đỏ son lễ hội (`#991b1b`), ánh trăng vàng kim (`#fbbf24`), ánh lửa đèn lồng hổ phách (`#f59e0b`).

### 2.1. Bảng màu chủ đạo (Primary Theme - `midautumn`)
| Tên Token | Mã Hex | Giá trị HSL / RGB | Mục đích sử dụng |
| :--- | :--- | :--- | :--- |
| `midautumn-night` | `#050816` | `rgb(5, 8, 22)` | Màu nền chính (Deep Night Sky), chiều sâu không gian |
| `midautumn-red` | `#991b1b` | `rgb(153, 27, 27)` | Đỏ son truyền thống, điểm nhấn lễ hội, nút bấm quan trọng |
| `midautumn-gold` | `#fbbf24` | `rgb(251, 191, 36)` | Vàng trăng rằm, viền khung viền, ánh sáng trăng tròn |
| `midautumn-amber` | `#f59e0b` | `rgb(245, 158, 11)` | Vàng hổ phách, ngọn lửa hoa đăng, đèn ông sao, thanh cuộn |

### 2.2. Bảng màu nền & Bề mặt (Surfaces & Gradients)
- **Nền sảnh / Card chính:** Gradient từ đỏ thẫm qua tím than đêm huyền ảo:
  - Step 0: `from-[#3b0b0b]/90 to-[#1e0720]/95`
  - Step 1: `from-[#3a0a1a]/90 to-[#120824]/95`
  - Step 2: `from-[#380812]/95 to-[#16072b]/95`
  - Step 6: `from-[#25081b]/95 to-[#0b0416]/95`
- **Sân khấu đêm rước đèn / dòng sông:** `from-[#110729] to-[#2a0815]`
- **Màu giấy thư chúc mừng (Parchment Paper):**
  - Gradient tỏa tròn: `radial-gradient(circle at 50% 50%, #fffbeb 0%, #fef3c7 70%, #fde68a 100%)`
  - Viền thư: `border-amber-600/50` kết hợp bóng đổ chiều sâu `rgba(0, 0, 0, 0.6)`
  - Chữ thư: `#451a03` (amber-950) và `#7f1d1d` (red-900)

### 2.3. Màu điểm nhấn & Trạng thái (Accents & Status)
- **Ánh trăng & đom đóm:** `#fde047` (Yellow-300), `#fef08a` (Yellow-200)
- **Dòng sông & Sóng nước:** `#38bdf8` (Sky-400), `#0284c7` (Sky-600), `#082f49` (Sky-950)
- **Trạng thái Online / Bật đèn:** `#10b981` (Emerald-500), `#34d399` (Emerald-400)
- **Cảnh báo / Tắt âm thanh:** `#ef4444` (Red-500), `#7f1d1d` (Red-900)

### 2.4. Hiệu ứng phát quang & Đổ bóng (Glows & Shadows)
```css
/* Phát quang đèn lồng */
.lantern-glow {
  box-shadow: 0 0 40px rgba(245, 158, 11, 0.6), 0 0 80px rgba(239, 68, 68, 0.4);
}

/* Phát quang ánh trăng khi tắt đèn */
.dark-glow {
  box-shadow: 0 0 70px rgba(251, 191, 36, 0.8), 0 0 120px rgba(245, 158, 11, 0.5);
}

/* Giấy thư truyền thống */
.letter-paper {
  background: radial-gradient(circle at 50% 50%, #fffbeb 0%, #fef3c7 70%, #fde68a 100%);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(217, 119, 6, 0.2);
}
```

---

## 3. Hệ Thống Font Chữ (Typography System)

Google Fonts được nhúng trực tiếp phục vụ đầy đủ bộ ký tự tiếng Việt có dấu:

| Nhóm Font | Family Name | Trọng số (Weights) | Vai trò & Mục đích |
| :--- | :--- | :--- | :--- |
| **Sans-serif** | `'Quicksand', sans-serif` | 500, 600, 700 | Font chữ thân thiện, hiện đại dùng cho toàn bộ văn bản UI, mô tả, nút bấm, nhãn |
| **Serif** | `'Playfair Display', serif` | 600, 800 (Bold & Italic) | Tiêu đề chính các bước, tiêu đề thư chúc mừng, tạo cảm giác sang trọng, hoài niệm |
| **Cursive/Script**| `'Dancing Script', cursive`| 700 (Bold) | Chữ ký cá nhân (ví dụ: *LongDaiCa*), lời đề tựa tình cảm |
| **Festive** | `'Cinzel Decorative', serif`| 700 (Bold) | Tiêu đề chương trình, con dấu truyền thống, chữ trang trí lễ hội |

### Cấp bậc phân cấp chữ (Type Scale Hierarchy)
- **Display Title (H1 / Banner):** `text-2xl md:text-3xl font-serif font-bold tracking-wide`
- **Section Heading (H2):** `text-xl md:text-2xl font-serif font-bold text-amber-200`
- **Subheading / Badge:** `text-xs font-semibold uppercase tracking-widest text-amber-300`
- **Body Regular:** `text-sm font-sans leading-relaxed text-amber-100/90`
- **Caption / Metadata:** `text-[10px]` đến `text-xs text-amber-300/70`
- **Chữ ký cuối thư:** `text-2xl font-script font-bold text-red-900`

---

## 4. Bố Cục & Kiến Trúc Trải Nghiệm (Layout & UX Journey)

Giao diện được xây dựng theo kiến trúc **Center-Stage Modal Card** nằm trên lớp nền vũ trụ Trung Thu động (Dynamic Ambient Background).

```
+---------------------------------------------------------------------------------+
| HEADER (Sticky Top Bar):                                                       |
| [🌕 Đêm Hội Trăng Rằm]     [🔴 REC 00:15]       [🌙 Tắt đèn]  [🔊 Âm thanh]     |
+---------------------------------------------------------------------------------+
|                                                                                 |
| BACKGROUND:                                                                     |
|  - Trăng rằm phát sáng tỏa hào quang                                             |
|  - Lồng đèn bay dập dềnh (animate-float-slow)                                   |
|  - Sao lấp lánh (sparkle twinkle)                                               |
|                                                                                 |
|                        +------------------------------+                         |
|                        | MAIN STAGE (max-w-lg)        |                         |
|                        | Glassmorphism Card           |                         |
|                        | (Chuyển bước Step 0 -> 7)    |                         |
|                        |                              |                         |
|                        +------------------------------+                         |
|                                                                                 |
+---------------------------------------------------------------------------------+
| FOOTER: Bản quyền & Ghi chú đồng hành (Long & Tuấn • LongDaiCa)                 |
+---------------------------------------------------------------------------------+
```

### Các bước trong hành trình trải nghiệm (Flow Steps):
1. **Step 0 - Lời chào AI Đồng Hành (AI Companion Intro):**
   - Avatar robot Trung Thu đội mũ đèn lồng, trạng thái *ONLINE*.
   - Giọng đọc AI tự động giới thiệu sứ mệnh đồng hành của Long & Tuấn.
2. **Step 1 - Cấp quyền Media (Recording & Audio Permission):**
   - Hướng dẫn và kích hoạt bộ đôi Web API: `getDisplayMedia` (quay màn hình) + `getUserMedia` (ghi âm mic).
   - Tùy chọn bỏ qua nếu người dùng chỉ muốn xem trực tiếp.
3. **Step 2 - Đăng ký danh tính (Identity Gate):**
   - Nhập tên người dùng để cá nhân hóa toàn bộ lời chúc và danh xưng suốt trải nghiệm.
4. **Step 3 - Lựa chọn phong tục (Branching Choice):**
   - Lựa chọn 1 trong 2 nhánh:
     - Nhánh A: **🏮 Rước Đèn Ông Sao** (Không khí rộn rã, tùng dinh dinh).
     - Nhánh B: **🪷 Thả Đèn Hoa Đăng** (Lắng đọng, trôi ước nguyện trên dòng sông trăng).
5. **Step 4 - Hộp quà bí mật (Mystery Gift Box):**
   - Hộp quà Tết Trung Thu đóng nắp rung lắc vui nhộn.
   - Nhấp vào hộp quà để mở điều bất ngờ (bánh dẻo, bánh nướng, đèn ông sao).
6. **Step 5 - Nghi thức Tắt đèn đón trăng (Dark Mode Switch):**
   - Đưa người dùng vào trạng thái tắt đèn mô phỏng (`isLightsOff`).
   - Khung cảnh màn đêm sập tối, đẩy ánh sáng đèn lồng và trăng rằm rực rỡ nhất (`dark-glow`).
7. **Step 6 - Trải nghiệm tương tác rẽ nhánh (Interactive Experience):**
   - **Nếu chọn Rước Đèn:** Khung cảnh 2D hoạt hình với em bé rước đèn ông sao cán tre và màn múa lân hoạt họa rộn ràng.
   - **Nếu chọn Thả Đèn:** Khu vực soạn thảo điều ước, hiệu ứng gấp giấy hoa đăng, đặt lên thuyền giấy thả trôi trên sóng nước lượn sóng (`water-wave`).
8. **Step 7 - Bức thư chúc mừng & Hoàn tất ghi hình (Letter & Recording Completion):**
   - Bức thư giấy da truyền thống in con dấu đỏ "Đoàn Viên".
   - Lời chúc được điền tên người dùng, ký tên `LongDaiCa` & Tuấn.
   - Video màn hình được trộn cùng âm thanh web và microphone vào một file `kyniem.webm`, tự động tải khi người dùng rời hoặc đóng trang.

---

## 5. Chuyển Động & Hiệu Ứng (Motion & Animations)

### 5.1. Keyframe Definitions
- **`float` (6s ease-in-out infinite):** Lồng đèn lơ lửng, dịch chuyển dọc `14px` và xoay nhẹ `2deg`.
- **`floatGentle` (4s ease-in-out infinite):** Card nội dung bồng bềnh nhẹ nhàng `6px`.
- **`pulseGlow` (2.5s infinite):** Hào quang vàng cam phập phồng quanh trăng tròn và lồng đèn.
- **`waterWave` (8s ease-in-out infinite alternate):** Dòng sóng nước trôi lững lờ chở thuyền hoa đăng.
- **`flameFlicker` (1.2s alternate infinite):** Ngọn nến trong đèn lồng bập bùng với biến thiên scale và opacity ngẫu nhiên.
- **`twinkle` (3s infinite):** Các vì sao và đom đóm nhấp nháy sáng tối.

---

## 6. Công Nghệ Đề Xuất Để Hiện Thực Hóa (Tech Stack)
- **Framework:** React / Next.js hoặc SPA Vanilla HTML5 + React 18 + Tailwind CSS.
- **Styling:** Tailwind CSS cấu hình token `midautumn` + Custom CSS hiệu ứng ánh sáng.
- **Biểu tượng:** Lucide React Icons & SVG Assets thủ công cho các nhân vật dân gian (chú Cuội, lân, đèn ông sao, hoa đăng).
- **Audio & Media:**
  - SpeechSynthesis API (giọng đọc trợ lý AI tiếng Việt).
  - MediaStream & MediaRecorder API (quay màn hình và xuất file WebM).
