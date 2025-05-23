# MekongAI Recruitment Automation System

> Hệ thống AI tự động hóa quy trình tuyển dụng hỗ trợ doanh nghiệp (HR) và ứng viên tương tác trực tiếp qua giao diện web, tích hợp AI để đánh giá CV, tạo bộ câu hỏi phỏng vấn, phỏng vấn tự động, và quản lý lịch sử.

---

## Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng chính](#tính-năng-chính)
- [Kiến trúc dự án](#kiến-trúc-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt & chạy dự án](#cài-đặt--chạy-dự-án)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [API tích hợp](#api-tích-hợp)
- [Luồng nghiệp vụ](#luồng-nghiệp-vụ)
- [Hướng phát triển & mở rộng](#hướng-phát-triển--mở-rộng)
- [Đóng góp](#đóng-góp)
- [Liên hệ](#liên-hệ)

---

## Giới thiệu

MekongAI Recruitment Automation System là giải pháp tối ưu quy trình tuyển dụng bằng trí tuệ nhân tạo:

- Đánh giá tự động CV ứng viên theo JD tuyển dụng
- Tạo bộ câu hỏi phỏng vấn tự động dựa trên CV và JD
- Giao diện phỏng vấn chat tương tác AI – ứng viên trả lời, AI đặt câu hỏi tiếp
- Quản lý trạng thái vòng tuyển dụng, lịch sử phỏng vấn, và tương tác realtime
- Hỗ trợ HR quản lý danh sách ứng viên, đánh giá và ra quyết định

---

## Tính năng chính

- **Landing page** giới thiệu hệ thống
- **Trang demo** chia 2 màn hình:
  - Bên HR: Quản lý JD, danh sách ứng viên, đánh giá CV, tạo và gửi bộ câu hỏi, xem lịch sử chat
  - Bên ứng viên: Xem JD, upload CV, tham gia phỏng vấn AI theo bộ câu hỏi, xem kết quả đánh giá
- **Quản lý vòng tuyển dụng**: Vòng 1 (upload, đánh giá CV), vòng 2 (phỏng vấn AI), vòng 3 (thông báo trúng tuyển)
- **Tích hợp API Backend**: Đánh giá CV, tạo câu hỏi, gửi câu trả lời phỏng vấn, lấy lịch sử phỏng vấn
- **Modal chi tiết ứng viên & lịch sử chat**
- **Tương tác realtime, UI mượt mà với React, TailwindCSS và framer-motion**

---

## Kiến trúc dự án

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS
- **Backend API**: Restful APIs tại https://recruitment.mekongai.com
- **Thư viện hỗ trợ**:
  - `react-router-dom` cho routing
  - `react-modal` & `framer-motion` cho modal animation
  - `axios` & `fetch` để gọi API
  - `react-icons` cho icon UI
- **Triển khai**: Build static bằng Vite, preview bằng `vite preview` hoặc serve tĩnh

---

## Công nghệ sử dụng

- React + TypeScript
- Vite (build & dev server)
- TailwindCSS (UI nhanh & responsive)
- Framer Motion (animation UI)
- React Modal (modal popup)
- Axios / Fetch API
- Git / GitHub (quản lý mã nguồn)

---

## Cài đặt & chạy dự án

```bash
# Clone repo
git clone https://github.com/your-repo/mekongai-recruitment.git
cd mekongai-recruitment

# Cài đặt dependencies
npm install
# hoặc yarn install

# Chạy dev server
npm run dev
# hoặc yarn dev

# Build project
npm run build
# hoặc yarn build

# Preview bản build
npm run preview
# hoặc serve -s dist
