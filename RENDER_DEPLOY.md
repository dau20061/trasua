# Render Deploy Guide

## Bước 1: Push code lên GitHub (nếu chưa có)

```bash
cd backend
git add .
git commit -m "Prepare for Render deployment"
git push
```

## Bước 2: Deploy trên Render

1. Truy cập https://render.com và đăng nhập
2. Click **New +** → **Web Service**
3. Connect GitHub repository của bạn
4. Chọn repository `trasua`
5. Cấu hình:
   - **Name**: `drink-order-backend`
   - **Region**: Singapore (gần Việt Nam nhất)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

## Bước 3: Thêm Environment Variables

Trong phần **Environment**, thêm các biến:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
BREVO_API_KEY=<your_brevo_api_key>
SHOP_NAME=Quán Trà Sữa
SHOP_EMAIL=<your_shop_email>
```

**Lấy giá trị từ file `.env` của bạn**

## Bước 4: Deploy

Click **Create Web Service** và đợi deploy xong (khoảng 3-5 phút)

## Bước 5: Lấy URL Backend

Sau khi deploy xong, bạn sẽ có URL dạng:
```
https://drink-order-backend.onrender.com
```

## Bước 6: Cập nhật Frontend

Sửa file `frontend/.env`:
```
VITE_API_URL=https://drink-order-backend.onrender.com/api
```

## Lưu ý:

- Free tier của Render sẽ **sleep sau 15 phút không hoạt động**
- Request đầu tiên sau khi sleep có thể mất 30-60s
- Để giữ server luôn hoạt động, cần upgrade lên paid plan ($7/tháng)
