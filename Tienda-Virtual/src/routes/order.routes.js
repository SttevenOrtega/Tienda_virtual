import { Router } from 'express';
import { createOrder, getOrderById, getOrdersByUser } from '../controllers/order.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.post('/orders', authRequired, createOrder);
router.get('/orders/:id', authRequired, getOrderById);
router.get('/orders', authRequired, getOrdersByUser);

export default router;
