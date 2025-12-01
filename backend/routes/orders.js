import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  createOrderWithEmail,
  updateOrderStatus,
  updateOrder,
  cancelOrder,
  getOrderStats,
} from '../controllers/orderController.js';

const router = express.Router();

// Routes
router.get('/', getAllOrders);
router.get('/stats', getOrderStats);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.post('/checkout', createOrderWithEmail); // Route mới cho checkout với email
router.patch('/:id/status', updateOrderStatus);
router.put('/:id', updateOrder);
router.patch('/:id/cancel', cancelOrder);

export default router;
