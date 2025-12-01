# 🍹 Drink Order - Hệ thống đặt nước uống online

Dự án web order nước uống với thiết kế hiện đại, tone màu trắng và xanh lá nhạt.

## 📋 Mô tả dự án

Đây là một ứng dụng web full-stack cho phép người dùng:
- Xem danh sách đồ uống theo danh mục
- Thêm đồ uống vào giỏ hàng
- Đặt hàng và theo dõi đơn hàng
- Quản lý menu (admin)

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 19** - Thư viện UI
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS Modules** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** (optional) - Database
- **CORS** - Cross-origin support

## 📁 Cấu trúc dự án

```
Dự Án Quán/
├── frontend/                 # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── DrinkCard.jsx
│   │   │   └── CategoryFilter.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── styles/          # Global styles
│   │   │   └── global.css
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── vite.config.js
│
└── backend/                 # Backend Node.js application
    ├── routes/              # API routes
    │   ├── drinks.js
    │   ├── orders.js
    │   └── categories.js
    ├── models/              # Database models (ready to add)
    ├── controllers/         # Route controllers (ready to add)
    ├── server.js            # Main server file
    ├── .env                 # Environment variables
    └── package.json
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm >= 9.x

### 1. Cài đặt Backend

```powershell
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Chạy server development
npm run dev

# Hoặc chạy production
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

### 2. Cài đặt Frontend

```powershell
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 🎨 Thiết kế UI/UX

### Theme màu sắc
- **Màu chính**: Xanh lá nhạt (#90EE90)
- **Màu phụ**: Trắng (#FFFFFF)
- **Màu text**: Đen (#212529)
- **Màu accent**: Xanh lá đậm (#7AD67A)

### Đặc điểm thiết kế
- ✨ Giao diện sáng sủa, thân thiện
- 🎯 Layout responsive, mobile-first
- 🌟 Animations mượt mà
- 🖼️ Card-based design
- 🔘 Buttons có shadow và hover effects

## 📡 API Endpoints

### Drinks (Đồ uống)
```
GET    /api/drinks          # Lấy tất cả đồ uống
GET    /api/drinks/:id      # Lấy một đồ uống
POST   /api/drinks          # Thêm đồ uống mới
PUT    /api/drinks/:id      # Cập nhật đồ uống
DELETE /api/drinks/:id      # Xóa đồ uống
```

### Categories (Danh mục)
```
GET    /api/categories              # Lấy tất cả danh mục
GET    /api/categories/:slug/drinks # Lấy đồ uống theo danh mục
```

### Orders (Đơn hàng)
```
GET    /api/orders          # Lấy tất cả đơn hàng
GET    /api/orders/:id      # Lấy một đơn hàng
POST   /api/orders          # Tạo đơn hàng mới
PATCH  /api/orders/:id/status # Cập nhật trạng thái đơn hàng
```

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/drink-order
NODE_ENV=development
```

## 📦 Deployment

### Backend
Dự án backend có thể deploy lên:
- Heroku
- Railway
- Render
- DigitalOcean

### Frontend
Dự án frontend có thể deploy lên:
- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

### Build Frontend
```powershell
cd frontend
npm run build
# Folder dist/ chứa file production
```

## 🔜 Tính năng có thể mở rộng

- [ ] Xác thực người dùng (Authentication)
- [ ] Tích hợp thanh toán online
- [ ] Quản lý đơn hàng real-time
- [ ] Upload ảnh đồ uống
- [ ] Đánh giá và bình luận
- [ ] Hệ thống khuyến mãi
- [ ] Thông báo push
- [ ] Tracking đơn hàng GPS

## 👨‍💻 Phát triển

### Cấu trúc Component
```
components/
  ├── Header         # Navigation bar
  ├── DrinkCard      # Card hiển thị đồ uống
  └── CategoryFilter # Lọc theo danh mục
```

### Thêm route mới
Sửa file `frontend/src/App.jsx`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

## 📄 License

MIT License

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

---

**Chúc bạn code vui vẻ! 🎉**
