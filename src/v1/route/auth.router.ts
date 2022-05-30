import { Router } from 'express';
import verifyToken from '../utile/auth.utile';
import authController from '../controller/auth.controller';
const auth = Router();

auth.post('/register', authController.register);
auth.post('/login', authController.login);
auth.get('/verify/:email/:token', authController.verifyEmail);
auth.post('/test', verifyToken, (req, res, next) => {
    res.status(200).json({ message: 'Ok' });
});

export default auth;