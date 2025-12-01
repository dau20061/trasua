import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Drink from '../models/Drink.js';
import Category from '../models/Category.js';

dotenv.config();

const migrateCategoryToSlug = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Đã kết nối MongoDB');

    // Lấy tất cả categories
    const categories = await Category.find();
    console.log(`✅ Tìm thấy ${categories.length} danh mục`);

    // Tạo map từ tên sang slug
    const nameToSlugMap = {};
    categories.forEach(cat => {
      nameToSlugMap[cat.name] = cat.slug;
    });

    // Lấy tất cả drinks
    const drinks = await Drink.find();
    console.log(`✅ Tìm thấy ${drinks.length} món`);

    let updatedCount = 0;
    for (const drink of drinks) {
      // Nếu category là tên, chuyển sang slug
      if (nameToSlugMap[drink.category]) {
        drink.category = nameToSlugMap[drink.category];
        await drink.save();
        updatedCount++;
        console.log(`✅ Cập nhật "${drink.name}": ${drink.category}`);
      }
    }

    console.log(`\n🎉 Hoàn thành! Đã cập nhật ${updatedCount} món.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

migrateCategoryToSlug();
