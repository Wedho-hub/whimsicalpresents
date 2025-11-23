import api from './api.js';

// Get all products
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Search products
export const searchProducts = async (query) => {
  const response = await api.get('/products/search', { params: { q: query } });
  return response.data;
};

// Get products by category
export const getProductsByCategory = async (category) => {
  const response = await api.get('/products/category', { params: { category } });
  return response.data;
};

// Create new product (admin only)
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// Update product (admin only)
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// Delete product (admin only)
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
