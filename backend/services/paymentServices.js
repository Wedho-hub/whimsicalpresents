import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import ecocashHelper from '../utils/ecocashHelper.js';

// Process payment
const processPayment = async (orderId, userId, paymentData) => {
  try {
    const { method, amount, phoneNumber } = paymentData;

    // Verify order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== userId.toString()) {
      throw new Error('Order not found or access denied');
    }

    let paymentResult;
    if (method === 'ecocash') {
      paymentResult = await ecocashHelper.processPayment(phoneNumber, amount);
    } else {
      // Placeholder for other payment methods
      paymentResult = { success: true, transactionId: `TXN_${Date.now()}` };
    }

    // Create payment record
    const payment = new Payment({
      order: orderId,
      user: userId,
      amount,
      method,
      status: paymentResult.success ? 'completed' : 'failed',
      transactionId: paymentResult.transactionId,
    });

    const savedPayment = await payment.save();

    // Update order payment status if successful
    if (paymentResult.success) {
      order.paymentStatus = 'paid';
      await order.save();
    }

    return {
      payment: savedPayment,
      success: paymentResult.success,
      transactionId: paymentResult.transactionId,
    };
  } catch (error) {
    throw new Error(`Error processing payment: ${error.message}`);
  }
};

// Get payment by ID
const getPaymentById = async (id) => {
  try {
    const payment = await Payment.findById(id).populate('order user');
    if (!payment) throw new Error('Payment not found');
    return payment;
  } catch (error) {
    throw new Error(`Error fetching payment: ${error.message}`);
  }
};

// Get payments by user
const getPaymentsByUser = async (userId) => {
  try {
    return await Payment.find({ user: userId }).populate('order').sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching user payments: ${error.message}`);
  }
};

// Get all payments (admin)
const getAllPayments = async () => {
  try {
    return await Payment.find({}).populate('order user').sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching payments: ${error.message}`);
  }
};

// Refund payment (placeholder)
const refundPayment = async (paymentId) => {
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error('Payment not found');

    // Placeholder refund logic
    payment.status = 'refunded';
    await payment.save();

    // Update order status
    const order = await Order.findById(payment.order);
    if (order) {
      order.status = 'cancelled';
      await order.save();
    }

    return payment;
  } catch (error) {
    throw new Error(`Error refunding payment: ${error.message}`);
  }
};

export {
  processPayment,
  getPaymentById,
  getPaymentsByUser,
  getAllPayments,
  refundPayment,
};
