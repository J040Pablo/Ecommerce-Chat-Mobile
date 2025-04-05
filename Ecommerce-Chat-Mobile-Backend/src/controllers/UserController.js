import User from '../models/UserModel.js';
import aiService from '../services/IaService.js';
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
    }
};

export default UserController;