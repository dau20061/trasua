import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  drinkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drink',
    required: true,
  },
  drinkName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L'],
    default: 'M',
  },
  note: {
    type: String,
    default: '',
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Tên khách hàng không được để trống'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Số điện thoại không được để trống'],
      match: [/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      street: String,
      ward: String,
      district: String,
      city: String,
      fullAddress: String,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'momo', 'banking', 'card'],
      default: 'cash',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'delivering', 'completed', 'cancelled'],
      default: 'pending',
    },
    note: {
      type: String,
      default: '',
    },
    deliveryTime: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Tạo mã đơn hàng tự động
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderNumber = `ORD${dateStr}${randomNum}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
