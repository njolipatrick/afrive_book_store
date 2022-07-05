import orderController from '../controllers/order.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const order = Router();

order.post('/', verifyToken, orderController.create);
order.get('/', verifyToken, orderController.getOrdersByUserID);
order.delete('/:order_id', verifyToken, orderController.destroy);

export default order;