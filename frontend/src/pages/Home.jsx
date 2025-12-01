import { useEffect, useState } from 'react';
import { drinkService } from '../services/api';
import DrinkCard from '../components/DrinkCard';
import CategoryFilter from '../components/CategoryFilter';
import './Home.css';

function Home() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadDrinks();
  }, []);

  const loadDrinks = async () => {
    try {
      const response = await drinkService.getAllDrinks();
      setDrinks(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách đồ uống:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (drink) => {
    console.log('Thêm vào giỏ hàng:', drink);
    alert(`Đã thêm ${drink.name} vào giỏ hàng!`);
  };

  const filteredDrinks = selectedCategory === 'all' 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Chào mừng đến với Drink Order</h1>
            <p className="hero-subtitle">
              Thưởng thức những thức uống tươi ngon được pha chế từ nguyên liệu cao cấp
            </p>
            <button className="btn btn-primary hero-btn">
              Khám phá thực đơn
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section">
        <div className="container">
          <h2 className="section-title">Thực đơn</h2>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="loading">
              <p>Đang tải thực đơn...</p>
            </div>
          ) : (
            <div className="drinks-grid">
              {filteredDrinks.length > 0 ? (
                filteredDrinks.map((drink) => (
                  <DrinkCard 
                    key={drink.id} 
                    drink={drink}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <p className="no-drinks">Không có đồ uống nào trong danh mục này.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🍃</div>
              <h3>Nguyên liệu tươi</h3>
              <p>100% nguyên liệu tự nhiên, tươi ngon mỗi ngày</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Giao hàng nhanh</h3>
              <p>Giao hàng trong vòng 30 phút</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Thanh toán dễ dàng</h3>
              <p>Nhiều phương thức thanh toán tiện lợi</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Chất lượng đảm bảo</h3>
              <p>Cam kết chất lượng hoặc hoàn tiền 100%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
