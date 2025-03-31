import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './src/routers/UserRouter.js';
import ProductRouter from './src/routers/ProductRouter.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
