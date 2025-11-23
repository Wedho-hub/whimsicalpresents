import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { processEcoCashPayment as processPayment } from '../utils/ecocashHelper.js';

// @desc    Process EcoCash payment
// @route   POST /api/payments/ecocash
// @access  Private
const processEcoCashPayment = async (req, res) => {
  try {
    const { orderId, phoneNumber, amount } = req.body;
    const user = req.user._id;

    // Check if order exists and belongs to user
    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== user.toString()) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Simulate EcoCash payment processing
    const paymentResult = await processPayment(phoneNumber, amount);

    if (paymentResult.success) {
      // Create payment record
      const payment = new Payment({
        order: orderId,
        user,
        amount,
        method: 'ecocash',
        status: 'completed',
        transactionId: paymentResult.transactionId,
      });
      await payment.save();

      // Update order payment status
      order.paymentStatus = 'paid';
      await order.save();

      res.json({
        message: 'Payment successful',
        transactionId: paymentResult.transactionId,
      });
    } else {
      // Create failed payment record
      const payment = new Payment({
        order: orderId,
        user,
        amount,
        method: 'ecocash',
        status: 'failed',
      });
      await payment.save();

      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('order user', 'name email');
    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user payments
// @route   GET /api/payments/my
// @access  Private
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate('order', 'totalAmount status');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate('order user', 'name email totalAmount');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  processEcoCashPayment,
  getPaymentById,
  getMyPayments,
  getPayments,
};
