# 🥛 Nature Milk (NutMilk Frontend)

Ứng dụng web bán **sữa hạt thiên nhiên**, gồm:
- **Frontend cho người dùng** (xem sản phẩm, giỏ hàng, tài khoản)
- **Admin Dashboard** (quản lý sản phẩm/kho)

Dự án xây dựng bằng **React + Vite + TypeScript + Tailwind CSS**  
Phù hợp cho **đồ án / bài tập lớn / demo frontend – fullstack**.

---

## 🚀 Công nghệ sử dụng

- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔀 React Router DOM
- 🧠 Custom Hooks (`useCart`, `useAuth`)
- 💾 LocalStorage (giỏ hàng, auth mock)

---

## 📁 Cấu trúc thư mục (CHUẨN THEO PROJECT)

```txt
nutmilk-frontend/
├─ public/
│  ├─ assets/                # Ảnh public
│  └─ favicon.svg            # Favicon logo lá Nature Milk
│
├─ src/
│  ├─ assets/                # Ảnh dùng trong code (hero, product, icons…)
│
│  ├─ components/
│  │  ├─ admin/              # COMPONENT ADMIN
│  │  │  ├─ AdminLayout.tsx
│  │  │  ├─ AdminSidebar.tsx
│  │  │  └─ ProductTable.tsx
│  │  │
│  │  ├─ auth/
│  │  │  └─ AuthLayout.tsx
│  │  │
│  │  ├─ common/             # Component tái sử dụng
│  │  │  ├─ Badge.tsx
│  │  │  ├─ Button.tsx
│  │  │  └─ Input.tsx
│  │  │
│  │  ├─ dashboard/          # Dashboard người dùng
│  │  │  ├─ Favorites.tsx
│  │  │  ├─ Orders.tsx
│  │  │  ├─ OverView.tsx
│  │  │  └─ SideBar.tsx
│  │  │
│  │  ├─ layout/             # Layout user
│  │  │  ├─ Header.tsx
│  │  │  ├─ Footer.tsx
│  │  │  └─ MainLayout.tsx
│  │  │
│  │  └─ product/            # Component sản phẩm
│  │     ├─ ProductCard.tsx
│  │     ├─ ProductFilter.tsx
│  │     ├─ ProductGridCard.tsx
│  │     └─ ProductHero.tsx
│  │
│  ├─ data/                  # Mock data
│  │  ├─ products.ts         # Sản phẩm frontend user
│  │  └─ adminProducts.ts    # Sản phẩm admin
│  │
│  ├─ hooks/
│  │  ├─ useAuth.ts
│  │  └─ useCart.ts
│  │
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ Products.tsx
│  │  ├─ Cart.tsx
│  │  ├─ Login.tsx
│  │  ├─ Register.tsx
│  │  ├─ UserDashboard.tsx
│  │  └─ ProductAdmin.tsx    # Trang admin quản lý sản phẩm
│  │
│  ├─ routes/
│  │  └─ RequireAuth.tsx
│  │
│  ├─ styles/
│  │  └─ index.css
│  │
│  ├─ utils/
│  │  ├─ auth.ts
│  │  └─ cart.ts
│  │
│  ├─ App.tsx
│  └─ main.tsx
│
├─ index.html
├─ tailwind.config.js
├─ vite.config.ts
├─ package.json
└─ README.md
👤 Chức năng người dùng (Frontend)

Xem danh sách sản phẩm

Trang sản phẩm (Products Page) với:

Hero banner

Filter theo loại

Grid sản phẩm

Thêm sản phẩm vào giỏ hàng

Quản lý giỏ hàng

Đăng nhập / đăng ký (mock)

Dashboard người dùng:

Đơn hàng

Yêu thích

🛠️ Chức năng Admin

Giao diện Admin Dashboard riêng

Quản lý kho sản phẩm

Hiển thị:

Tên sản phẩm + ảnh

Danh mục

Giá bán

Trạng thái (Còn hàng / Hết hàng / Sắp hết)

Tồn kho

Giao diện đúng chuẩn dashboard thực tế

👉 Truy cập:

/admin/products

🔐 Routing & Layout

User routes dùng MainLayout

Admin routes dùng AdminLayout

Route bảo vệ bằng RequireAuth

Admin tách biệt hoàn toàn frontend user

🖼️ Branding & Favicon

Favicon sử dụng logo hình lá Nature Milk

Đồng bộ với logo header

Đặt tại:

public/favicon.svg

▶️ Cách chạy project
1️⃣ Cài dependencies
npm install

2️⃣ Chạy dev server
npm run dev

3️⃣ Truy cập
http://localhost:5173

📌 Ghi chú

Hiện tại sử dụng mock data

Chưa kết nối backend

Dễ dàng mở rộng sang:

Spring Boot REST API

JWT Authentication

Upload ảnh sản phẩm

Thanh toán online

📈 Hướng phát triển tiếp

CRUD sản phẩm (Admin)

Search / Filter / Pagination

Phân quyền ADMIN – USER

Dashboard thống kê

Kết nối backend Spring Boot

Deploy (Vercel / Netlify)
