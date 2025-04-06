import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './src/routers/UserRouter.js';
import ProductRouter from './src/routers/ProductRouter.js';
import http from 'http';
import { WebSocketServer } from 'ws';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const ws = new WebSocketServer({ server });

const clients = new Set();

ws.on('connection', (client) => {
    clients.add(client);
    client.on('message', (message) => {
      try {
        const msg = JSON.parse(message.toString()); // Garante que a mensagem recebida seja um JSON válido
        console.log('Mensagem recebida do cliente:', msg);
  
        // Formata a mensagem corretamente antes de enviar para os outros clientes
        const formattedMessage = {
          text: msg.text, // O texto enviado pelo cliente
          sentBy: msg.sentBy || 'Gemini', // O remetente enviado pelo cliente ou "Usuário" como padrão
        };
  
        for (let c of clients) {
          if (c.readyState === WebSocket.OPEN) {
            c.send(JSON.stringify(formattedMessage)); // Envia a mensagem formatada
          }
        }
      } catch (error) {
        console.error('Erro ao processar a mensagem:', error);
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

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Error connecting to MongoDB: ', err));

// Ouvir na porta definida no .env ou 3000 como fallback
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});