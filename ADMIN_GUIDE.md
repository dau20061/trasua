# 🛠️ Trang Admin - Quản lý thực đơn

## Truy cập
Truy cập trang admin tại: `http://localhost:5173/admin`

## Chức năng

### ✅ Xem danh sách món
- Hiển thị tất cả món trong bảng
- Xem hình ảnh, tên, giá, nhóm món, mô tả
- Thống kê tổng số món và danh mục

### ➕ Thêm món mới
1. Click nút "➕ Thêm món mới"
2. Điền thông tin:
   - **Tên món** (bắt buộc)
   - **Giá tiền** (VNĐ, bắt buộc)
   - **Nhóm món** (chọn từ danh sách, bắt buộc)
   - **URL Hình ảnh** (bắt buộc)
   - **Mô tả** (bắt buộc)
3. Xem trước hình ảnh ngay trên form
4. Click "➕ Thêm món" để lưu

### ✏️ Sửa món
1. Click nút ✏️ ở cột "Hành động"
2. Form sẽ hiện ra với dữ liệu đã có
3. Chỉnh sửa thông tin cần thiết
4. Click "💾 Cập nhật" để lưu

### 🗑️ Xóa món
1. Click nút 🗑️ ở cột "Hành động"
2. Xác nhận xóa trong popup
3. Món sẽ bị xóa khỏi database

## Gợi ý URL hình ảnh miễn phí

### Unsplash (Chất lượng cao)
```
https://images.unsplash.com/photo-[ID]?w=400
```

### Placeholder (Test)
```
https://via.placeholder.com/400x300?text=Tên+Món
```

### Tips
- Nên dùng ảnh kích thước 400x300 hoặc lớn hơn
- Format: JPG, PNG, WebP
- Nên host ảnh trên CDN để load nhanh

## Validation

Form sẽ kiểm tra:
- ✅ Tất cả trường bắt buộc phải điền
- ✅ Giá tiền phải là số dương
- ✅ URL hình ảnh hợp lệ
- ✅ Xem trước ảnh trước khi lưu

## Responsive

Trang admin hoạt động tốt trên:
- 💻 Desktop (1920px+)
- 💻 Laptop (1024px - 1920px)
- 📱 Tablet (768px - 1024px)
- 📱 Mobile (< 768px)

Trên mobile, bảng có thể scroll ngang.

## Design Features

- 🎨 Theme xanh lá nhạt & trắng
- ✨ Animations mượt mà
- 🖼️ Preview ảnh realtime
- 📊 Thống kê nhanh
- 🔍 Bảng dễ đọc với hover effects
- ⚡ Modal popup đẹp mắt
- ✅ Confirm xóa an toàn

## Lưu ý

- Dữ liệu được lưu trực tiếp vào MongoDB
- Mọi thao tác đều qua API backend
- Không cần đăng nhập (có thể thêm sau)
- Cẩn thận khi xóa món (không thể khôi phục)
