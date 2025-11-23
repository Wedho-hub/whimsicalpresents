import api from './api.js';

// Login user
export const login = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Register user
export const register = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

// Get all users (admin only)
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Get user by ID (admin only)
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Update user (admin only)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

// Delete user (admin only)
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
