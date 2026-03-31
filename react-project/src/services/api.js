import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // User signup
  signup: (data) => api.post('/auth/signup', data),
  
  // User login
  login: (data) => api.post('/auth/login', data),
  
  // Admin login
  adminLogin: (data) => api.post('/auth/admin/login', data),
  
  // Verify token
  verify: () => api.get('/auth/verify'),
  
  // Logout
  logout: () => api.post('/auth/logout')
};

// Admin API
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Products
  getProducts: () => api.get('/admin/products'),
  getProduct: (id) => api.get(`/admin/products/${id}`),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Customers
  getCustomers: () => api.get('/admin/customers'),
  getCustomer: (id) => api.get(`/admin/customers/${id}`),
  updateCustomerStatus: (id, status) => api.patch(`/admin/customers/${id}/status`, { status }),
  
  // Orders
  getOrders: () => api.get('/admin/orders'),
  getOrder: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  
  // Inventory
  getInventory: () => api.get('/admin/inventory'),
  updateStock: (id, stock) => api.patch(`/admin/inventory/${id}/stock`, { stock }),
  
  // Reports
  getSalesReport: () => api.get('/admin/reports/sales')
};

// Public Products API (no auth required)
export const productsAPI = {
  // Get all products
  getAll: (params) => api.get('/products', { params }),
  
  // Get single product
  getById: (id) => api.get(`/products/${id}`),
  
  // Get featured products
  getFeatured: () => api.get('/products/featured/list'),
  
  // Get products by category
  getByCategory: (category) => api.get(`/products/category/${category}`),
  
  // Get all categories
  getCategories: () => api.get('/products/categories/list')
};

// Orders API
export const ordersAPI = {
  // Create order (authenticated)
  create: (data) => api.post('/orders/create', data),
  
  // Create guest order (no auth)
  createGuest: (data) => api.post('/orders/guest/create', data),
  
  // Get my orders (authenticated)
  getMyOrders: () => api.get('/orders/my-orders'),
  
  // Get single order (authenticated)
  getOrder: (id) => api.get(`/orders/${id}`)
};

export default api;
