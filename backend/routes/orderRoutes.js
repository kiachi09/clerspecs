import express from 'express';
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	getOrders,
	getUserOrders,
	updateOrdertoDelivered,
	updateOrdertoPaid,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrdertoPaid);
router.route('/:id/deliver').put(protect, admin, updateOrdertoDelivered);

export default router;
