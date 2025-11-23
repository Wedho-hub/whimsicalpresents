import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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

  const processEcoCashPayment = async (phoneNumber, amount, orderId) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/ecocash`, {
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

  const getPaymentStatus = async (paymentId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  };

  const value = {
    paymentStatus,
    loading,
    processEcoCashPayment,
    getPaymentStatus,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};
