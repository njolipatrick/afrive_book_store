import { Router } from 'express';
import verifyToken from '../utile/auth.utile';
import authController from '../controller/auth.controller';
const auth = Router();

auth.post('/register', authController.register);
auth.post('/login', authController.login);
auth.post('/test', verifyToken, (req, res, next) => {
    res.send(200);
});

export default auth;