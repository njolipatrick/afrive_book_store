import { Router } from 'express';
import verifyToken from '../utile/auth.utile';
import authController from '../controller/auth.controller';
import upload from '../utile/multer.utile';
const auth = Router();

auth.post('/register', upload.single('avatar'), authController.register);
auth.post('/login', authController.login);
auth.get('/verify/:email/:token', authController.verifyEmail);
auth.post('/send-reset-password-link', authController.SendResetPasswordMail);
auth.post('/reset-password', authController.SendResetPasswordMail);
auth.post('/test', verifyToken, (req, res, next) => {
    res.status(200).json({ message: 'Ok' });
});

export default auth;