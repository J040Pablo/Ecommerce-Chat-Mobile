import express from 'express';
import { saveMessage, getMessages } from '../controllers/MessageController.js';

const router = express.Router();

router.post('/messages', saveMessage); // Endpoint para salvar mensagens
router.get('/messages', getMessages); // Endpoint para buscar mensagens

export default router;