import express from 'express';
import {
	createOrder,
	getOrder,
	updateOrder,
	deleteOrder,
	getAllOrders,
} from '../controller/ordercontroller';
import { authenticateToken } from '../middleware/authmiddleware';

const router = express.Router();

router.post('/', authenticateToken, createOrder);
router.get('/:id', authenticateToken, getOrder);
router.get('/', authenticateToken, getAllOrders);
router.put('/', authenticateToken, updateOrder);
router.delete('/', authenticateToken, deleteOrder);

export default router;
