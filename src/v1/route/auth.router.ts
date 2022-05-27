import { Router } from 'express';
import authController from '../controller/auth.controller';
const auth = Router();

auth.post('/register', authController.register);

export default auth;