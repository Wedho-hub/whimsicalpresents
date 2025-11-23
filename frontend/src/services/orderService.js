import api from './api.js';

// Create new order
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get user's orders
export const getMyOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};

// Get single order by ID
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Update order to paid
export const updateOrderToPaid = async (id, paymentResult) => {
  const response = await api.put(`/orders/${id}/pay`, paymentResult);
  return response.data;
};

// Update order status (admin only)
export const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};

// Get all orders (admin only)
export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};
