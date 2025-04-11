import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

router.post('/order', OrderController.createOrder);

export default router;