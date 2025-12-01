# Cloudinary Setup Guide

## Bước 1: Đăng ký Cloudinary (FREE)

1. Truy cập https://cloudinary.com/users/register_free
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

## Bước 2: Lấy API Credentials

1. Sau khi đăng nhập, vào Dashboard
2. Copy các thông tin:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Bước 3: Cập nhật .env

Thay thế trong file `backend/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

## Bước 4: Thêm vào Render Environment

Vào Render Dashboard → Service → Environment, thêm:
```
CLOUDINARY_CLOUD_NAME=<your_value>
CLOUDINARY_API_KEY=<your_value>
CLOUDINARY_API_SECRET=<your_value>
```

## Bước 5: Deploy

```bash
git add .
git commit -m "Add Cloudinary image upload"
git push
```

Render sẽ tự động redeploy.

## Lợi ích:

✅ Hình ảnh lưu vĩnh viễn trên cloud
✅ Không mất ảnh khi redeploy
✅ CDN tự động - load nhanh toàn cầu
✅ Free tier: 25GB storage, 25GB bandwidth/tháng
✅ Tự động tối ưu ảnh

## Test:

Sau khi setup xong, thử thêm món mới với ảnh. Ảnh sẽ được upload lên Cloudinary và URL sẽ dạng:
```
https://res.cloudinary.com/your_cloud_name/image/upload/...
```
