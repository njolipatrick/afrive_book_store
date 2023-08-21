import orderController from '../controllers/order.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { orderValidationRules } from '../validations/order.validator';
import { validate } from '../validations/validator';
import { validateIds } from '../validations/book.validation';

const order = Router();

order.post('/', orderValidationRules(), validate, verifyToken, orderController.create);
order.get('/', verifyToken, orderController.getOrdersByUserID);
order.get('/:order_id', verifyToken, orderController.getOrdersById);
order.get('/:reference/verify', validateIds('reference', true), validate, verifyToken, orderController.verifyPayment);
order.delete('/:order_id', validateIds('order_id'), validate, verifyToken, orderController.destroy);

export default order;