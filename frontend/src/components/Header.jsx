import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🍹 Drink Order</h1>
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Trang chủ</Link>
            <Link to="/menu" className="nav-link">Thực đơn</Link>
            <Link to="/admin" className="nav-link">Quản lý</Link>
            <Link to="/orders" className="nav-link">Đơn hàng</Link>
            <Link to="/cart" className="nav-link cart-link">
              <span>🛒</span>
              <span className="cart-badge">0</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
