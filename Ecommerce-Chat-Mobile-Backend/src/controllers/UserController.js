import { fileURLToPath } from 'url'; // Adicione esta linha
import User from '../models/UserModel.js';
import aiService from '../services/IaService.js';
import path from 'path';

// Obtenha o diretório atual do arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UserController = {
    createUser: async (req, res) => {
        try {
            const result = await User.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const result = await User.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const result = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateUserById: async (req, res) => {
        try {
            const result = await User.findByIdAndUpdate(req.params.id, req.body, req.body, { new: true });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    promptWithGemini: async (req, res) => {
        const result = await aiService.prompt(req.body.prompt)
        res.status(200).json(result.text())
    },
    longContext: async (req, res) => {
        // Use um caminho absoluto para o arquivo PDF
        const pdfPath = path.resolve(__dirname, '../context/CV_English.pdf');
        try {
            const result = await aiService.longContext(req.body.prompt, pdfPath);
            res.status(200).json(result.text());
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default UserController;