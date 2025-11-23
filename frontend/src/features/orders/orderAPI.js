import api from '../../services/api.js';

// Get user's orders
export const getMyOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Create new order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Update order status (admin)
export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};

// Get all orders (admin)
export const getAllOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};
