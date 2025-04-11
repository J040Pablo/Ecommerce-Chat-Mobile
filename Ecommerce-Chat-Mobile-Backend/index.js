import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './src/routers/UserRouter.js';
import ProductRouter from './src/routers/ProductRouter.js';
import MessageRouter from './src/routers/MessageRouter.js';
import OrderRouter from './src/routers/OrderRouter.js';
import http from 'http';
import { WebSocketServer } from 'ws';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

const clients = new Set();

ws.on('connection', (client) => {
    clients.add(client);

    client.on('message', async (message) => {
        try {
            const msg = JSON.parse(message.toString());
            console.log('Mensagem recebida do cliente:', msg); // Você pode manter este log simples, se necessário.

            const aiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{ text: msg.text }],
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Remover ou comentar o log detalhado da resposta
            // console.log('Resposta completa da API:', JSON.stringify(aiResponse.data, null, 2));

            const candidates = aiResponse.data?.candidates;
            if (!candidates || !Array.isArray(candidates) || candidates.length === 0) {
                console.error('Resposta inesperada da API: candidates ausente ou vazio');
                return;
            }

            const content = candidates[0]?.content?.parts;
            if (!content || !Array.isArray(content) || content.length === 0) {
                console.error('Resposta inesperada da API: parts ausente ou vazio');
                return;
            }

            const text = content[0]?.text;
            if (!text) {
                console.error('Resposta inesperada da API: text ausente');
                return;
            }

            const formattedMessage = {
                text: text.trim(),
                sentBy: 'Gemini',
            };

            for (let c of clients) {
                if (c.readyState === WebSocket.OPEN) {
                    c.send(JSON.stringify(formattedMessage));
                }
            }
        } catch (error) {
            console.error('Erro ao processar a mensagem ou chamar a API de IA:', error);
        }
    });

    client.on('close', () => {
        clients.delete(client);
        console.log('Cliente desconectado');
    });
});

app.use(express.json());
app.use(cors());
app.use('/api', UserRouter);
app.use('/api', ProductRouter);
app.use('/api', MessageRouter);
app.use('/api', OrderRouter);

// MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});