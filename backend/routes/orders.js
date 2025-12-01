import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
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
router.patch('/:id/status', updateOrderStatus);
router.put('/:id', updateOrder);
router.patch('/:id/cancel', cancelOrder);

export default router;
