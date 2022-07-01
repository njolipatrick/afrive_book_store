import cartController from '../controllers/cart.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const cart = Router();

cart.post('/:book_id', verifyToken, cartController.create);
cart.get('/', verifyToken, cartController.index);
cart.delete('/:book_id', verifyToken, cartController.destroy);

export default cart;