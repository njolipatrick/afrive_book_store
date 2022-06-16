import orderController from '../controller/order.controller';
import { Router } from 'express';

const order = Router();

order.post('/:user_id', orderController.create);
order.get('/', orderController.index);
order.get('/:user_id', orderController.getOrdersByUserID);
order.get('/:user_id/order', orderController.getOrdersByOrderID);
order.get('/:book_id', orderController.getOrdersByBookID);
order.put('/:order_id', orderController.update);
order.delete('/:order_id', orderController.destroy);

export default order;