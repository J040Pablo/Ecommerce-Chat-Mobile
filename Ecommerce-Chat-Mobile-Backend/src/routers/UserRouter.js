import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.route('/user')
    .post((req, res) => UserController.createUser(req, res)); // Rota para criar um novo usuário

router.route('/user/:id')
    .get((req, res) => UserController.getUser(req, res))
    .delete((req, res) => UserController.deleteUser(req, res))
    .put((req, res) => UserController.updateUser(req, res));

export default router;