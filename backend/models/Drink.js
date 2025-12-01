import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Tên đồ uống không được để trống'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Mô tả không được để trống'],
    },
    price: {
      type: Number,
      required: [true, 'Giá không được để trống'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Danh mục không được để trống'],
    },
    image: {
      type: String,
      default: '/images/default-drink.jpg',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    ingredients: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        name: {
          type: String,
          enum: ['S', 'M', 'L'],
        },
        price: {
          type: Number,
          min: 0,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;
