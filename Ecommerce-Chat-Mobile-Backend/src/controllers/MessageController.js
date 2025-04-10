import Message from '../models/MessageModel.js';

export const saveMessage = async (req, res) => {
    const { text, sentBy } = req.body;

    try {
        const newMessage = new Message({ text, sentBy });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Mensagem salva com sucesso.' });
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        res.status(500).json({ success: false, message: 'Erro ao salvar mensagem.' });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 }); // Ordena por data
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({ success: false, message: 'Erro ao buscar mensagens.' });
    }
};