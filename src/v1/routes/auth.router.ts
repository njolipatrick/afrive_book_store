import { Router } from 'express';
import {verifyToken} from '../utiles/auth.utile';
import authController from '../controllers/auth.controller';
const auth = Router();

auth.post('/register', authController.register);
auth.get('/google-login-url', authController.googleAuthURL);
auth.post('/google-login', authController.googleAuthUser);
auth.post('/login', authController.login);
auth.get('/verify/:email/:token', authController.verifyEmail);
auth.post('/send-reset-password-link/', authController.SendResetPasswordMail);
auth.post('/reset-password/', authController.ResetPassword);
auth.get('/test', (req, res) => {
    res.status(200).json({ message: 'Ok' });
});

export default auth;