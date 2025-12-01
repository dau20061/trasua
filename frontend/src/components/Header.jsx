import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

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
            <Link to="/cart" className="nav-link cart-link">
              <span>🛒</span>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
