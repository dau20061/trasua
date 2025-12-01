import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Drink from './models/Drink.js';
import Category from './models/Category.js';
import connectDB from './config/database.js';

dotenv.config();

// Kết nối database
connectDB();

// Dữ liệu danh mục mẫu
const categories = [
  {
    name: 'Trà sữa',
    slug: 'tra-sua',
    description: 'Trà sữa thơm ngon với nhiều hương vị',
    icon: '🧋',
    order: 1,
  },
  {
    name: 'Cà phê',
    slug: 'ca-phe',
    description: 'Cà phê đậm đà, thơm ngon',
    icon: '☕',
    order: 2,
  },
  {
    name: 'Sinh tố',
    slug: 'sinh-to',
    description: 'Sinh tố trái cây tươi mát',
    icon: '🥤',
    order: 3,
  },
  {
    name: 'Nước ép',
    slug: 'nuoc-ep',
    description: 'Nước ép trái cây nguyên chất',
    icon: '🍹',
    order: 4,
  },
  {
    name: 'Trà trái cây',
    slug: 'tra-trai-cay',
    description: 'Trà trái cây thanh mát',
    icon: '🍵',
    order: 5,
  },
];

// Dữ liệu đồ uống mẫu
const drinks = [
  // Trà sữa
  {
    name: 'Trà sữa trân châu đường đen',
    description: 'Trà sữa thơm ngon với trân châu đường đen dai giòn, ngọt dịu',
    price: 35000,
    category: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
    isAvailable: true,
    ingredients: ['Trà', 'Sữa', 'Trân châu', 'Đường đen'],
    sizes: [
      { name: 'S', price: 30000 },
      { name: 'M', price: 35000 },
      { name: 'L', price: 40000 },
    ],
    rating: 4.5,
    reviewCount: 120,
  },
  {
    name: 'Trà sữa matcha',
    description: 'Trà sữa matcha Nhật Bản nguyên chất, béo ngậy',
    price: 40000,
    category: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    isAvailable: true,
    ingredients: ['Matcha', 'Sữa tươi', 'Đường'],
    sizes: [
      { name: 'S', price: 35000 },
      { name: 'M', price: 40000 },
      { name: 'L', price: 45000 },
    ],
    rating: 4.7,
    reviewCount: 95,
  },
  {
    name: 'Trà sữa khoai môn',
    description: 'Trà sữa vị khoai môn béo ngậy, thơm lừng',
    price: 38000,
    category: 'Trà sữa',
    image: 'https://images.unsplash.com/photo-1578133671540-edad0b3d4a4b?w=400',
    isAvailable: true,
    ingredients: ['Trà', 'Khoai môn', 'Sữa', 'Kem cheese'],
    sizes: [
      { name: 'S', price: 33000 },
      { name: 'M', price: 38000 },
      { name: 'L', price: 43000 },
    ],
    rating: 4.6,
    reviewCount: 85,
  },

  // Cà phê
  {
    name: 'Cà phê sữa đá',
    description: 'Cà phê đậm đà với sữa đặc thơm béo',
    price: 25000,
    category: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
    isAvailable: true,
    ingredients: ['Cà phê robusta', 'Sữa đặc', 'Đá'],
    sizes: [
      { name: 'S', price: 20000 },
      { name: 'M', price: 25000 },
      { name: 'L', price: 30000 },
    ],
    rating: 4.4,
    reviewCount: 150,
  },
  {
    name: 'Bạc xỉu',
    description: 'Cà phê sữa nhẹ nhàng, ngọt dịu',
    price: 25000,
    category: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    isAvailable: true,
    ingredients: ['Cà phê', 'Sữa tươi', 'Đá'],
    sizes: [
      { name: 'S', price: 20000 },
      { name: 'M', price: 25000 },
      { name: 'L', price: 30000 },
    ],
    rating: 4.3,
    reviewCount: 110,
  },
  {
    name: 'Cà phê đen đá',
    description: 'Cà phê nguyên chất đậm đà, đắng nhẹ',
    price: 20000,
    category: 'Cà phê',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    isAvailable: true,
    ingredients: ['Cà phê robusta 100%', 'Đá'],
    sizes: [
      { name: 'S', price: 15000 },
      { name: 'M', price: 20000 },
      { name: 'L', price: 25000 },
    ],
    rating: 4.5,
    reviewCount: 130,
  },

  // Sinh tố
  {
    name: 'Sinh tố bơ',
    description: 'Sinh tố bơ béo ngậy, bổ dưỡng',
    price: 30000,
    category: 'Sinh tố',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400',
    isAvailable: true,
    ingredients: ['Bơ', 'Sữa tươi', 'Đường', 'Đá'],
    sizes: [
      { name: 'M', price: 30000 },
      { name: 'L', price: 35000 },
    ],
    rating: 4.8,
    reviewCount: 140,
  },
  {
    name: 'Sinh tố dâu',
    description: 'Sinh tố dâu tươi chua ngọt thanh mát',
    price: 32000,
    category: 'Sinh tố',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400',
    isAvailable: true,
    ingredients: ['Dâu tây tươi', 'Sữa chua', 'Đường', 'Đá'],
    sizes: [
      { name: 'M', price: 32000 },
      { name: 'L', price: 37000 },
    ],
    rating: 4.6,
    reviewCount: 98,
  },
  {
    name: 'Sinh tố xoài',
    description: 'Sinh tố xoài ngọt lịm, thơm ngon',
    price: 32000,
    category: 'Sinh tố',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    isAvailable: true,
    ingredients: ['Xoài cát Hòa Lộc', 'Sữa tươi', 'Đường', 'Đá'],
    sizes: [
      { name: 'M', price: 32000 },
      { name: 'L', price: 37000 },
    ],
    rating: 4.7,
    reviewCount: 115,
  },

  // Nước ép
  {
    name: 'Nước ép cam',
    description: 'Nước cam tươi nguyên chất 100%',
    price: 28000,
    category: 'Nước ép',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    isAvailable: true,
    ingredients: ['Cam tươi'],
    sizes: [
      { name: 'M', price: 28000 },
      { name: 'L', price: 33000 },
    ],
    rating: 4.5,
    reviewCount: 88,
  },
  {
    name: 'Nước ép dứa',
    description: 'Nước ép dứa mát lạnh, thanh mát',
    price: 25000,
    category: 'Nước ép',
    image: 'https://images.unsplash.com/photo-1587408686697-fac2d3898181?w=400',
    isAvailable: true,
    ingredients: ['Dứa tươi'],
    sizes: [
      { name: 'M', price: 25000 },
      { name: 'L', price: 30000 },
    ],
    rating: 4.4,
    reviewCount: 76,
  },

  // Trà trái cây
  {
    name: 'Trà đào cam sả',
    description: 'Trà đào cam sả thơm mát, sảng khoái',
    price: 35000,
    category: 'Trà trái cây',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    isAvailable: true,
    ingredients: ['Trà xanh', 'Đào', 'Cam', 'Sả', 'Đường'],
    sizes: [
      { name: 'M', price: 35000 },
      { name: 'L', price: 40000 },
    ],
    rating: 4.8,
    reviewCount: 165,
  },
  {
    name: 'Trà chanh leo',
    description: 'Trà chanh leo chua ngọt vừa phải',
    price: 30000,
    category: 'Trà trái cây',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400',
    isAvailable: true,
    ingredients: ['Trà xanh', 'Chanh leo', 'Đường', 'Bạc hà'],
    sizes: [
      { name: 'M', price: 30000 },
      { name: 'L', price: 35000 },
    ],
    rating: 4.6,
    reviewCount: 125,
  },
];

// Import dữ liệu
const importData = async () => {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany();
    await Drink.deleteMany();

    // Thêm dữ liệu mới
    await Category.insertMany(categories);
    await Drink.insertMany(drinks);

    console.log('✅ Đã import dữ liệu thành công!');
    console.log(`   - ${categories.length} danh mục`);
    console.log(`   - ${drinks.length} đồ uống`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi import dữ liệu:', error);
    process.exit(1);
  }
};

// Xóa dữ liệu
const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Drink.deleteMany();
    
    console.log('✅ Đã xóa dữ liệu thành công!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi xóa dữ liệu:', error);
    process.exit(1);
  }
};

// Chạy script
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
