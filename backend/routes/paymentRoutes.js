import express from 'express';
import {
  processEcoCashPayment,
  getPaymentById,
  getMyPayments,
  getPayments,
} from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.route('/ecocash').post(protect, processEcoCashPayment);
router.route('/my').get(protect, getMyPayments);
router.route('/:id').get(protect, getPaymentById);

// Admin routes
router.route('/').get(protect, admin, getPayments);

export default router;
