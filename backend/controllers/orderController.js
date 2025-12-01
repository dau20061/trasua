import Order from '../models/Order.js';
import Drink from '../models/Drink.js';

// Lấy tất cả đơn hàng
export const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    let filter = {};
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate('items.drinkId', 'name image')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: error.message,
    });
  }
};

// Lấy một đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.drinkId', 'name image price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin đơn hàng',
      error: error.message,
    });
  }
};

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { items, ...orderData } = req.body;

    // Kiểm tra và lấy thông tin đồ uống
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const drink = await Drink.findById(item.drinkId);
      
      if (!drink) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy đồ uống với ID: ${item.drinkId}`,
        });
      }

      if (!drink.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `${drink.name} hiện không có sẵn`,
        });
      }

      const itemPrice = item.price || drink.price;
      const itemTotal = itemPrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        drinkId: drink._id,
        drinkName: drink.name,
        quantity: item.quantity,
        price: itemPrice,
        size: item.size || 'M',
        note: item.note || '',
      });
    }

    // Tính toán tổng tiền sau giảm giá
    const discount = orderData.discount || 0;
    const finalAmount = totalAmount - discount;

    const order = await Order.create({
      ...orderData,
      items: orderItems,
      totalAmount,
      discount,
      finalAmount,
    });

    res.status(201).json({
      success: true,
      message: 'Đơn hàng đã được tạo thành công',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message,
    });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng',
      });
    }

    order.status = status;

    if (status === 'completed') {
      order.completedAt = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Trạng thái đơn hàng đã được cập nhật',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật trạng thái đơn hàng',
      error: error.message,
    });
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng',
      });
    }

    res.json({
      success: true,
      message: 'Đơn hàng đã được cập nhật',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật đơn hàng',
      error: error.message,
    });
  }
};

// Hủy đơn hàng
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy đơn hàng',
      });
    }

    if (order.status === 'completed' || order.status === 'delivering') {
      return res.status(400).json({
        success: false,
        message: 'Không thể hủy đơn hàng đang giao hoặc đã hoàn thành',
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      success: true,
      message: 'Đơn hàng đã được hủy',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi hủy đơn hàng',
      error: error.message,
    });
  }
};

// Lấy thống kê đơn hàng
export const getOrderStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$finalAmount' },
        },
      },
    ]);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê đơn hàng',
      error: error.message,
    });
  }
};
