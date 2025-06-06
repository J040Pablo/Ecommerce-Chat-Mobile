import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/product', ProductController.getAllProducts); // Rota para obter todos os produtos

router.route('/product/:id')
.get((req, res) => ProductController.getProduct(req, res)) // Rota para obter um produto específico

export default router;