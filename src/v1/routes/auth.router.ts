import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import authController from '../controllers/auth.controller';
import {
    registerValidationRules,
    verifyEmailValidationRules,
    loginValidationRules,
    sendResetPasswordEmailValidationRules,
    resetPasswordValidationRules
} from '../validations/auth.validator';
import { validate } from '../validations/validator';
const auth = Router();

auth.post('/register', registerValidationRules(), validate, authController.register);
auth.post('/login', loginValidationRules(), validate, authController.login);
auth.get('/verify/:email/:token',verifyEmailValidationRules(), validate, authController.verifyEmail);
auth.post('/send-reset-password-link/',sendResetPasswordEmailValidationRules(), validate, authController.SendResetPasswordMail);
auth.post('/reset-password/', resetPasswordValidationRules(), validate, authController.ResetPassword);
auth.get('/google-login-url', authController.googleAuthURL);
auth.post('/google-login', authController.googleAuthUser);
auth.get('/test', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Ok' });
});

export default auth;