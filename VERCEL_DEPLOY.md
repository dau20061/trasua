# Vercel Deploy Guide

## Bước 1: Chuẩn bị

Đảm bảo backend đã deploy trên Render và có URL, ví dụ:
```
https://drink-order-backend.onrender.com
```

## Bước 2: Push code lên GitHub

Code đã được push, bỏ qua bước này.

## Bước 3: Deploy trên Vercel

1. Truy cập https://vercel.com và đăng nhập bằng GitHub
2. Click **Add New** → **Project**
3. Import repository `trasua`
4. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `dist` (tự động)

## Bước 4: Thêm Environment Variable

Trong phần **Environment Variables**, thêm:

```
Name: VITE_API_URL
Value: https://drink-order-backend.onrender.com/api
```

**LƯU Ý:** Thay `https://drink-order-backend.onrender.com` bằng URL backend thực tế của bạn từ Render.

## Bước 5: Deploy

Click **Deploy** và đợi khoảng 1-2 phút.

## Bước 6: Cập nhật CORS Backend

Sau khi có URL Vercel (ví dụ: `https://trasua.vercel.app`), cần thêm vào CORS backend:

File `backend/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://trasua.vercel.app']
}));
```

Rồi push code backend lên GitHub để Render tự động redeploy.

## Hoàn thành! 🎉

Website của bạn đã được deploy:
- Frontend: `https://trasua.vercel.app` (hoặc domain Vercel của bạn)
- Backend: `https://drink-order-backend.onrender.com`

## Lưu ý:

- Vercel auto-deploy mỗi khi push code lên GitHub
- Free tier của Vercel không giới hạn bandwidth
- Nếu cần custom domain, thêm trong Vercel Settings → Domains
