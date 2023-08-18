import cartController from '../controllers/cart.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validate } from '../validations/validator';
import { cartValidationRules } from '../validations/cart.validator';

const cart = Router();

cart.post('/:book_id', cartValidationRules('book_id'), validate,  verifyToken, cartController.create);
cart.get('/', verifyToken, cartController.index);
cart.get('/:cart_id', cartValidationRules('cart_id'), validate, verifyToken, cartController.show);
cart.delete('/:cart_id', cartValidationRules('cart_id'), validate, verifyToken, cartController.destroy);

export default cart;