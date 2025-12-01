import { useCart } from '../context/CartContext';
import './DrinkCard.css';

function DrinkCard({ drink }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(drink);
    // Hiển thị thông báo ngắn
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `✓ Đã thêm "${drink.name}" vào giỏ hàng`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <div className={`drink-card ${drink.isBestseller ? 'bestseller' : ''}`}>
      {drink.isBestseller && (
        <div className="bestseller-ribbon">⭐ Bestseller</div>
      )}
      <div className="drink-image">
        <img 
          src={drink.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="20"%3E🍹 Drink%3C/text%3E%3C/svg%3E'} 
          alt={drink.name}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f0f0f0" width="300" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial" font-size="20"%3E❌ No Image%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      
      <div className="drink-info">
        <h3 className="drink-name">{drink.name}</h3>
        <p className="drink-description">{drink.description}</p>
        
        <div className="drink-footer">
          <span className="drink-price">
            {drink.price?.toLocaleString('vi-VN')}₫
          </span>
          
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
          >
            🛒 Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;
