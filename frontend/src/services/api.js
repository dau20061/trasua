import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const drinkService = {
  // Lấy tất cả đồ uống
  getAllDrinks: async () => {
    const response = await api.get('/drinks');
    return response.data;
  },

  // Lấy một đồ uống theo ID
  getDrinkById: async (id) => {
    const response = await api.get(`/drinks/${id}`);
    return response.data;
  },

  // Thêm đồ uống mới
  createDrink: async (drinkData) => {
    const response = await api.post('/drinks', drinkData);
    return response.data;
  },

  // Cập nhật đồ uống
  updateDrink: async (id, drinkData) => {
    const response = await api.put(`/drinks/${id}`, drinkData);
    return response.data;
  },

  // Xóa đồ uống
  deleteDrink: async (id) => {
    const response = await api.delete(`/drinks/${id}`);
    return response.data;
  },

  // Toggle bestseller
  toggleBestseller: async (id) => {
    const response = await api.patch(`/drinks/${id}/bestseller`);
    return response.data;
  },
};

export const categoryService = {
  // Lấy tất cả danh mục
  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Lấy một danh mục theo ID
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Lấy đồ uống theo danh mục
  getDrinksByCategory: async (slug) => {
    const response = await api.get(`/categories/${slug}/drinks`);
    return response.data;
  },

  // Thêm danh mục mới
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Cập nhật danh mục
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Xóa danh mục
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export const orderService = {
  // Lấy tất cả đơn hàng
  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Lấy một đơn hàng theo ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export const uploadService = {
  // Upload một ảnh
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Upload nhiều ảnh
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default api;
