# Backend API Documentation

## Kết nối MongoDB

Backend đã được kết nối với MongoDB Atlas thành công!

### Connection String
```
mongodb+srv://dauvo041_db_user:115251325hien@cluster0.d1jdp9n.mongodb.net/drink-order
```

## Database Models

### 1. Drink Model (Đồ uống)
```javascript
{
  name: String,              // Tên đồ uống
  description: String,       // Mô tả
  price: Number,            // Giá
  category: String,         // Danh mục
  image: String,            // URL hình ảnh
  isAvailable: Boolean,     // Còn hàng
  ingredients: [String],    // Nguyên liệu
  sizes: [{                 // Các size
    name: String (S/M/L),
    price: Number
  }],
  rating: Number,           // Đánh giá
  reviewCount: Number,      // Số lượt đánh giá
  timestamps: true          // createdAt, updatedAt
}
```

### 2. Order Model (Đơn hàng)
```javascript
{
  orderNumber: String,      // Mã đơn hàng (tự động)
  customerName: String,     // Tên khách hàng
  phone: String,           // Số điện thoại
  email: String,           // Email
  address: {               // Địa chỉ giao hàng
    street: String,
    ward: String,
    district: String,
    city: String,
    fullAddress: String
  },
  items: [{                // Các món trong đơn
    drinkId: ObjectId,
    drinkName: String,
    quantity: Number,
    price: Number,
    size: String,
    note: String
  }],
  totalAmount: Number,     // Tổng tiền
  discount: Number,        // Giảm giá
  finalAmount: Number,     // Thành tiền
  paymentMethod: String,   // cash/momo/banking/card
  status: String,          // pending/confirmed/preparing/delivering/completed/cancelled
  note: String,           // Ghi chú
  deliveryTime: Date,     // Thời gian giao
  completedAt: Date,      // Thời gian hoàn thành
  timestamps: true
}
```

### 3. Category Model (Danh mục)
```javascript
{
  name: String,            // Tên danh mục
  slug: String,           // URL slug
  description: String,    // Mô tả
  icon: String,          // Icon emoji
  isActive: Boolean,     // Kích hoạt
  order: Number,         // Thứ tự hiển thị
  timestamps: true
}
```

## API Endpoints

### Drinks (Đồ uống)
- `GET /api/drinks` - Lấy tất cả đồ uống
  - Query params: `category`, `available`
- `GET /api/drinks/search?q=keyword` - Tìm kiếm đồ uống
- `GET /api/drinks/:id` - Lấy một đồ uống
- `POST /api/drinks` - Tạo đồ uống mới
- `PUT /api/drinks/:id` - Cập nhật đồ uống
- `DELETE /api/drinks/:id` - Xóa đồ uống

### Orders (Đơn hàng)
- `GET /api/orders` - Lấy tất cả đơn hàng
  - Query params: `status`
- `GET /api/orders/stats` - Thống kê đơn hàng
- `GET /api/orders/:id` - Lấy một đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái
- `PATCH /api/orders/:id/cancel` - Hủy đơn hàng

### Categories (Danh mục)
- `GET /api/categories` - Lấy tất cả danh mục
- `GET /api/categories/:slug` - Lấy danh mục theo slug
- `GET /api/categories/:slug/drinks` - Lấy đồ uống theo danh mục
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

## Dữ liệu mẫu

Database đã được import với:
- ✅ 5 danh mục: Trà sữa, Cà phê, Sinh tố, Nước ép, Trà trái cây
- ✅ 13 đồ uống với đầy đủ thông tin

### Commands

```bash
# Import dữ liệu mẫu
npm run seed

# Xóa tất cả dữ liệu
npm run seed:delete

# Chạy server
npm run dev
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Notes

- Frontend KHÔNG truy cập trực tiếp database
- Mọi thao tác database đều thông qua API
- Backend xử lý tất cả business logic và validation
