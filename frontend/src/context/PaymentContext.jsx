import React, { createContext, useContext, useState } from 'react';
import api from '../services/api.js';

/* eslint-disable react-refresh/only-export-components */
export const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
/* eslint-enable react-refresh/only-export-components */

export const PaymentProvider = ({ children }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const processEcoCashPayment = async (phoneNumber, amount, orderId) => {
    setLoading(true);
    try {
      const response = await api.post('/payments/ecocash', {
        phoneNumber,
        amount,
        orderId,
      });
      setPaymentStatus(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      setPaymentStatus({ success: false, message: error.response?.data?.message || 'Payment failed' });
      return { success: false, error: error.response?.data?.message || 'Payment failed' };
    } finally {
      setLoading(false);
    }
  };

  // Convenience wrapper matching the {orderId, phoneNumber, amount} shape
  // used by the PaymentEcocash page.
  const processPayment = async ({ orderId, phoneNumber, amount }) => {
    setError('');
    const result = await processEcoCashPayment(phoneNumber, amount, orderId);
    if (!result.success) {
      setError(result.error || 'Payment failed');
      return { success: false };
    }
    return { success: true, transactionId: result.data?.transactionId };
  };

  const getPaymentStatus = async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  };

  const value = {
    paymentStatus,
    loading,
    error,
    processEcoCashPayment,
    processPayment,
    getPaymentStatus,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};
