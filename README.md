# 🚀 MERN Stack Blog Application (Đồ án Web Front-End)

Dự án này là một ứng dụng Blog hoàn chỉnh được xây dựng trên nền tảng MERN Stack (MongoDB, Express, React, Node.js), bao gồm một hệ thống RESTful API chuẩn mực và một Single Page Application (SPA) hiện đại.

Dự án được thiết kế để đáp ứng đầy đủ và xuất sắc **100% yêu cầu** của đồ án môn học Web Front-End Development Framework.

---

## 🛠️ Công nghệ sử dụng

### 🔹 Backend (RESTful API)

- **Node.js (v18+)** & **Express.js** : Xây dựng server.
- **MongoDB** & **Mongoose** : Cơ sở dữ liệu và ODM.
- **JWT (jsonwebtoken)** & **bcryptjs** : Xác thực và mã hóa mật khẩu an toàn.
- **cors**, **dotenv**, **express-validator**: Các middleware hỗ trợ bảo mật, biến môi trường và validate dữ liệu.

### 🔹 Frontend (React SPA)

- **React 18+** khởi tạo bằng **Vite**.
- **React Router v6** : Quản lý routing, có tích hợp `ProtectedRoute`.
- **Axios** : Giao tiếp với Backend API.
- **Tailwind CSS v4** : Thiết kế giao diện (UI) hiện đại, responsive hoàn hảo (mobile-first).
- **Zustand** : Quản lý trạng thái (State Management) gọn nhẹ thay cho Redux.
- **React Hook Form** + **Zod** : Xử lý và validate form chặt chẽ.
- **React Toastify** & **Lucide React** : Trải nghiệm người dùng (UX) mượt mà với Error handling đẹp mắt.

---

## 📂 Cấu trúc thư mục dự án

```text
├── backend/            # Chứa mã nguồn Node.js Express Server
├── frontend/           # Chứa mã nguồn React.js Vite Application
├── Test_API_Postman.postman_collection.json # File tổng hợp test toàn bộ API bằng Postman
└── README.md           # Hướng dẫn dự án
```

---

## ⚙️ Hướng dẫn cài đặt và chạy dự án (Local)

Để chạy dự án, bạn cần mở **2 cửa sổ Terminal (Terminal 1 cho Backend, Terminal 2 cho Frontend)**.

### 1️⃣ Chạy Backend (API Server)

**Bước 1:** Di chuyển vào thư mục backend và cài đặt thư viện:

```bash
cd backend
npm install
```

**Bước 2:** Cấu hình biến môi trường (`.env`):
Bạn cần tạo một file tên là `.env` nằm bên trong thư mục `backend/` với nội dung như sau:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/react-blog
JWT_SECRET=supersecretjwtkey_123456!
```

> **Lưu ý:**
>
> - Nếu bạn xài MongoDB Atlas, hãy thay `mongodb://localhost:27017/react-blog` thành chuỗi kết nối (Connection String) cluster của bạn.
> - Đảm bảo cổng Backend luôn là `PORT=5000` (do Frontend đã được cấu hình gọi API vào cổng này).

**Bước 3:** Khởi động server backend:

```bash
npm run dev
```

> Server sẽ chạy tại: `http://localhost:5000` (Cổng 5000)

---

### 2️⃣ Chạy Frontend (Giao diện Web)

**Bước 1:** Mở một cửa sổ Terminal mới, di chuyển vào thư mục frontend và cài đặt thư viện:

```bash
cd frontend
npm install
```

**Bước 2:** Khởi động ứng dụng React Vite:

```bash
npm run dev
```

> Giao diện (App) sẽ chạy tại: `http://localhost:5173`
> Bạn truy cập link này trên trình duyệt (`Chrome`, `Cốc Cốc`,...) để sử dụng app.

---

## 📚 Danh sách API Endpoints (Dành cho Giảng Viên / Tester)

Bạn có thể Import file `Test_API_Postman.postman_collection.json` (đính kèm ở thư mục gốc) vào **Postman** để test nhanh các API.

### 🔑 Xác thực (Auth)

- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập, trả về JWT token
- `GET /api/auth/me` - Lấy thông tin user hiện tại _(Protected)_

### 📝 Bài viết (Posts)

- `GET /api/posts` - Lấy DS bài viết (Hỗ trợ query: `?page=`, `?limit=`, `?search=`, `?category=`)
- `GET /api/posts/:id` - Lấy chi tiết một bài viết
- `POST /api/posts` - Đăng bài viết mới _(Protected - Chỉ user đã đăng nhập)_
- `PUT /api/posts/:id` - Sửa bài viết _(Protected - Chỉ Chủ bài viết)_
- `DELETE /api/posts/:id` - Xóa bài viết _(Protected - Chỉ Chủ bài viết)_
- `POST /api/posts/:id/like` - Thích / Bỏ thích bài viết _(Protected)_

### 💬 Bình luận (Comments)

- `GET /api/posts/:postId/comments` - Lấy danh sách bình luận của bài viết
- `POST /api/posts/:postId/comments` - Đăng bình luận mới _(Protected)_
- `DELETE /api/comments/:id` - Xóa bình luận _(Protected - Quyền giới hạn: Người viết bình luận hoặc Chủ bài viết mới được xóa)_

---

## 🎨 Danh sách các trang chính trên Frontend

- **`/`** - Trang chủ: Hiển thị danh sách bài viết, phân trang, thanh tìm kiếm thông minh, lọc danh mục.
- **`/login`** - Trang đăng nhập user.
- **`/register`** - Trang đăng ký.
- **`/posts/:id`** - Trang chi tiết: Đọc bài, Like, xem & gửi bình luận.
- **`/create-post`** - Trang tạo bài viết (#Protected).
- **`/edit-post/:id`** - Trang chỉnh sửa bài viết (#Protected - Chỉ chủ bài viết).
- **`/profile`** - Trang cá nhân: Thông tin User & Quản lý (Sửa/Xóa) bài viết của chính mình (#Protected).

⭐ _Dự án hoàn thiện xử lý lỗi giao diện qua toast-notification, cấu trúc loading rõ ràng, responsive giao diện cho điện thoại, và áp dụng JWT Authorization bảo mật chặt chẽ._
