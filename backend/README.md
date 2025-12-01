# Backend - Drink Order API

API server cho ứng dụng đặt nước uống.

## Cài đặt

```bash
npm install
```

## Chạy server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Routes

- `/api/drinks` - Quản lý đồ uống
- `/api/categories` - Quản lý danh mục
- `/api/orders` - Quản lý đơn hàng

## Environment Variables

Tạo file `.env` với nội dung:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/drink-order
NODE_ENV=development
```
