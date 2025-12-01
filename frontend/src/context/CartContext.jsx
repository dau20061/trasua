import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load từ localStorage khi khởi tạo
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu vào localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Thêm món vào giỏ
  const addToCart = (drink) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === drink._id);
      
      if (existingItem) {
        // Nếu món đã có, tăng số lượng
        return prevItems.map(item =>
          item._id === drink._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Nếu món chưa có, thêm mới với quantity = 1
        return [...prevItems, { ...drink, quantity: 1 }];
      }
    });
  };

  // Giảm số lượng món
  const decreaseQuantity = (drinkId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === drinkId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item._id === drinkId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Nếu quantity = 1, xóa món khỏi giỏ
        return prevItems.filter(item => item._id !== drinkId);
      }
    });
  };

  // Tăng số lượng món
  const increaseQuantity = (drinkId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === drinkId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Xóa món khỏi giỏ
  const removeFromCart = (drinkId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== drinkId));
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // Tính tổng số lượng món
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
