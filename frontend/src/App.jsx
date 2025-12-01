import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            {/* Có thể thêm các route khác sau */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
