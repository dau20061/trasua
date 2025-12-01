import express from 'express';
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

// Upload single image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có file nào được upload',
      });
    }

    console.log('📤 Uploading to Cloudinary:', req.file.filename);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'drink-order',
      resource_type: 'image',
    });

    console.log('✅ Cloudinary upload success:', result.secure_url);

    // Xóa file local sau khi upload lên Cloudinary
    try {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (unlinkError) {
      console.warn('Không thể xóa file local:', unlinkError.message);
    }
    
    res.json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        filename: req.file.filename,
        url: result.secure_url,
        publicId: result.public_id,
        size: req.file.size,
      },
    });
  } catch (error) {
    // Xóa file nếu có lỗi và file tồn tại
    try {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    } catch (unlinkError) {
      console.warn('Không thể xóa file local:', unlinkError.message);
    }
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
});

// Upload multiple images
router.post('/images', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không có file nào được upload',
      });
    }

    const images = req.files.map(file => ({
      filename: file.filename,
      url: `/uploads/${file.filename}`,
      size: file.size,
    }));

    res.json({
      success: true,
      message: `Upload ${images.length} ảnh thành công`,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi upload ảnh',
      error: error.message,
    });
  }
});

export default router;
