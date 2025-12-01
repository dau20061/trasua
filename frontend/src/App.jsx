import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import CategoryManagement from './pages/CategoryManagement';
import OrderSuccess from './pages/OrderSuccess';
import './styles/global.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* Có thể thêm các route khác sau */}
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
