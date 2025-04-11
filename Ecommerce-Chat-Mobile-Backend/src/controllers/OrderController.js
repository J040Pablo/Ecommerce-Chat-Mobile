import Order from '../models/OrderModel.js';

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const { items, total } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'O carrinho está vazio.' });
      }

      const newOrder = new Order({ items, total });
      await newOrder.save();

      res.status(201).json({ message: 'Pedido finalizado com sucesso!', order: newOrder });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro ao finalizar o pedido.' });
    }
  },
};

export default OrderController;