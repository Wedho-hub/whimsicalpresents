import api from './api.js';

// Process EcoCash payment
export const processEcoCashPayment = async (paymentData) => {
  const response = await api.post('/payments/ecocash', paymentData);
  return response.data;
};

// Get payment by ID
export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};

// Get user's payments
export const getMyPayments = async () => {
  const response = await api.get('/payments/my');
  return response.data;
};

// Get all payments (admin only)
export const getPayments = async () => {
  const response = await api.get('/payments');
  return response.data;
};
