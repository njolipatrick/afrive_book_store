import { Router } from 'express';
import verifyToken from '../utiles/auth.utile';
import authController from '../controllers/auth.controller';
import upload from '../utiles/multer.utile';
const auth = Router();

auth.post('/register', upload.single('avatar'), authController.register);
auth.get('/google-login-url', authController.googleAuthURL);
auth.post('/google-login', authController.googleAuthUser); 
auth.post('/login', authController.login);
auth.get('/verify/:email/:token', authController.verifyEmail);
auth.post('/send-reset-password-link', authController.SendResetPasswordMail);
auth.post('/reset-password', authController.ResetPassword);
auth.post('/test', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Ok' });
});

export default auth;