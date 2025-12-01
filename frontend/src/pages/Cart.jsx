import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();

  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const totalPrice = getTotalPrice();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customer: customerInfo,
        items: cartItems,
        totalPrice: totalPrice,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/checkout`,
        orderData
      );

      if (response.data.success) {
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderId: response.data.orderId,
            customerEmail: customerInfo.email 
          } 
        });
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa thêm món nào vào giỏ hàng</p>
            <Link to="/menu" className="btn btn-primary">
              🍹 Xem thực đơn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>🛒 Giỏ hàng của bạn</h1>
          <button 
            onClick={clearCart} 
            className="btn btn-secondary clear-btn"
          >
            🗑️ Xóa tất cả
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="40"%3E🍹%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-category">
                    <span className="category-badge">{item.category}</span>
                  </p>
                </div>

                <div className="item-price">
                  <span className="price-label">Đơn giá:</span>
                  <span className="price-value">
                    {item.price.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => decreaseQuantity(item._id)}
                    className="quantity-btn"
                    title="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item._id)}
                    className="quantity-btn"
                    title="Tăng số lượng"
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  <span className="subtotal-label">Thành tiền:</span>
                  <span className="subtotal-value">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="item-remove"
                  title="Xóa món"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Thông tin đơn hàng</h2>
              
              <div className="summary-row">
                <span>Số lượng món:</span>
                <strong>{cartItems.length} món</strong>
              </div>

              <div className="summary-row">
                <span>Tổng số lượng:</span>
                <strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Tổng tiền:</span>
                <strong className="total-price">
                  {totalPrice.toLocaleString('vi-VN')}₫
                </strong>
              </div>

              <button 
                className="btn btn-primary checkout-btn"
                onClick={handleCheckout}
              >
                💳 Thanh toán
              </button>

              <Link to="/menu" className="btn btn-secondary continue-btn">
                ← Tiếp tục mua hàng
              </Link>
            </div>
          </div>
        </div>

        {showCheckoutModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>📋 Thông tin đặt hàng</h2>
                <button className="modal-close" onClick={handleCloseModal}>✕</button>
              </div>

              <form onSubmit={handleSubmitOrder} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="0123456789"
                    pattern="[0-9]{10}"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="example@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ giao hàng *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  />
                </div>

                <div className="order-summary-mini">
                  <div className="summary-row">
                    <span>Tổng tiền:</span>
                    <strong>{totalPrice.toLocaleString('vi-VN')}₫</strong>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '⏳ Đang xử lý...' : '✅ Xác nhận đặt hàng'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
