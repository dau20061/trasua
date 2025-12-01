import './DrinkCard.css';

function DrinkCard({ drink, onAddToCart }) {
  return (
    <div className="drink-card">
      <div className="drink-image">
        <img 
          src={drink.image || 'https://via.placeholder.com/300x200?text=Drink'} 
          alt={drink.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
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
            onClick={() => onAddToCart(drink)}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;
