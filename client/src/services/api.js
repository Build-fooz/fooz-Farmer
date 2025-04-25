import axios from 'axios';

// Use Vite's environment variables system (import.meta.env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });
        
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        // If refresh token fails, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  verifyOTP: (otpData) => api.post('/api/auth/verify-otp', otpData),
  sendOTP: (phoneData) => api.post('/api/auth/send-otp', phoneData),
  refreshToken: (refreshToken) => api.post('/api/auth/refresh', { refreshToken }),
};

export const productAPI = {
  getAllProducts: () => api.get('/api/products'),
  getUserProducts: (userId) => api.get(`/api/products?userId=${userId}`),
  getProduct: (id) => api.get(`/api/products/${id}`),
  createProduct: (productData) => api.post('/api/products', productData),
  updateProduct: (id, productData) => api.put(`/api/products/${id}`, productData),
  updateProductStatus: (id, status) => api.patch(`/api/products/${id}/status`, { status }),
  deleteProduct: (id) => api.delete(`/api/products/${id}`),
  // Draft APIs
  saveDraft: (draftData) => api.post('/api/products/draft', draftData),
  getDrafts: (userId) => api.get(`/api/products/draft/${userId}`),
  deleteDraft: (id) => api.delete(`/api/products/draft/${id}`),
  publishDraft: (id) => api.post(`/api/products/draft/${id}/publish`),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/api/orders', orderData),
  getOrders: () => api.get('/api/orders'),
  getOrder: (id) => api.get(`/api/orders/${id}`),
  updateOrderStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
};

export default api; 