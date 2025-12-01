import { useLocation, Link, Navigate } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const location = useLocation();
  const { orderId, customerEmail } = location.state || {};

  // Nếu không có thông tin đơn hàng, redirect về trang chủ
  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h1>Đặt hàng thành công!</h1>
          <p className="success-message">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận.
          </p>

          <div className="order-info">
            <div className="info-item">
              <span className="info-label">Mã đơn hàng:</span>
              <strong className="info-value">#{orderId}</strong>
            </div>
            <div className="info-item">
              <span className="info-label">Email nhận thông báo:</span>
              <strong className="info-value">{customerEmail}</strong>
            </div>
          </div>

          <div className="success-note">
            <p>📧 Chúng tôi đã gửi thông tin đơn hàng đến email của bạn.</p>
            <p>📱 Nhân viên sẽ liên hệ với bạn sớm để xác nhận đơn hàng.</p>
          </div>

          <div className="success-actions">
            <Link to="/menu" className="btn btn-primary">
              🍹 Tiếp tục mua hàng
            </Link>
            <Link to="/" className="btn btn-secondary">
              🏠 Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
