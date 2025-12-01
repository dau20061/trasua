import Order from '../models/Order.js';
import Drink from '../models/Drink.js';
import axios from 'axios';

// Tạo đơn hàng mới và gửi email qua Brevo
export const createOrderWithEmail = async (req, res) => {
  try {
    const { customer, items, totalPrice } = req.body;

    // Tạo đơn hàng mới với schema đúng
    const order = await Order.create({
      customerName: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: {
        fullAddress: customer.address,
      },
      items: items.map(item => ({
        drinkId: item._id,
        drinkName: item.name,
        quantity: item.quantity,
        price: item.price,
        size: 'M',
      })),
      totalAmount: totalPrice,
      discount: 0,
      finalAmount: totalPrice,
      paymentMethod: 'cash',
      status: 'pending',
    });

    // Tạo nội dung HTML cho email
    const itemsHTML = items.map(item => `
      <tr style="border-bottom: 1px solid #e0e0e0;">
        <td style="padding: 15px; text-align: left;">
          <strong>${item.name}</strong><br>
          <small style="color: #666;">${item.description || ''}</small>
        </td>
        <td style="padding: 15px; text-align: center;">${item.quantity}</td>
        <td style="padding: 15px; text-align: right;">${item.price.toLocaleString('vi-VN')}₫</td>
        <td style="padding: 15px; text-align: right;"><strong>${(item.price * item.quantity).toLocaleString('vi-VN')}₫</strong></td>
      </tr>
    `).join('');

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #90EE90 0%, #66BB6A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #66BB6A; }
          .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
          .order-table th { background: #66BB6A; color: white; padding: 15px; text-align: left; }
          .total-row { background: #e8f5e9; font-size: 18px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🧋 XÁC NHẬN ĐƠN HÀNG</h1>
            <p style="margin: 10px 0 0 0;">Cảm ơn bạn đã đặt hàng!</p>
          </div>
          
          <div class="content">
            <div class="info-box">
              <h2 style="margin-top: 0; color: #66BB6A;">📋 Thông tin đơn hàng</h2>
              <p><strong>Mã đơn hàng:</strong> #${order._id}</p>
              <p><strong>Ngày đặt:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>
              <p><strong>Trạng thái:</strong> Đang xử lý</p>
            </div>

            <div class="info-box">
              <h2 style="margin-top: 0; color: #66BB6A;">👤 Thông tin khách hàng</h2>
              <p><strong>Họ tên:</strong> ${customer.name}</p>
              <p><strong>Số điện thoại:</strong> ${customer.phone}</p>
              <p><strong>Email:</strong> ${customer.email}</p>
              <p><strong>Địa chỉ:</strong> ${customer.address}</p>
            </div>

            <h2 style="color: #66BB6A;">🍹 Chi tiết đơn hàng</h2>
            <table class="order-table">
              <thead>
                <tr>
                  <th>Món</th>
                  <th style="text-align: center;">SL</th>
                  <th style="text-align: right;">Đơn giá</th>
                  <th style="text-align: right;">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
                <tr class="total-row">
                  <td colspan="3" style="padding: 15px; text-align: right;">TỔNG CỘNG:</td>
                  <td style="padding: 15px; text-align: right; color: #66BB6A;">${totalPrice.toLocaleString('vi-VN')}₫</td>
                </tr>
              </tbody>
            </table>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="margin: 0;"><strong>📱 Lưu ý:</strong> Nhân viên sẽ liên hệ với bạn trong vòng 15-30 phút để xác nhận đơn hàng.</p>
            </div>
          </div>

          <div class="footer">
            <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi! 💚</p>
            <p style="font-size: 12px; color: #999;">Email này được gửi tự động, vui lòng không trả lời.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Gửi email qua Brevo HTTP API
    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: {
            name: process.env.SHOP_NAME || 'Quán Trà Sữa',
            email: process.env.SHOP_EMAIL,
          },
          to: [
            { email: customer.email, name: customer.name },
            { email: process.env.SHOP_EMAIL, name: process.env.SHOP_NAME || 'Quán Trà Sữa' },
          ],
          subject: `🧋 Xác nhận đơn hàng #${order._id}`,
          htmlContent: emailHTML,
        },
        {
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('✅ Email đã gửi thành công');
    } catch (emailError) {
      console.error('❌ Lỗi gửi email:', emailError.response?.data || emailError.message);
      // Không throw error để đơn hàng vẫn được tạo
    }

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công! Email xác nhận đã được gửi.',
      orderId: order._id,
      data: order,
    });
  } catch (error) {
    console.error('❌ Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xử lý đơn hàng',
      error: error.message,
    });
  }
};

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
