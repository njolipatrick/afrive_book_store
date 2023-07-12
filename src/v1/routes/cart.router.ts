import cartController from '../controllers/cart.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validateIds } from '../validations/book.validation';
import { validate } from '../validations/validator';

const cart = Router();

cart.post('/:book_id', validateIds('book_id'), validate, verifyToken, cartController.create);
cart.get('/', verifyToken, cartController.index);
cart.delete('/:book_id', verifyToken, cartController.destroy);

export default cart;