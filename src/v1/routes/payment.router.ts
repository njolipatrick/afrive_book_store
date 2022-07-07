import paymentController from '../controllers/payment.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const payment = Router();

payment.post('/:order_id/pay', verifyToken, paymentController.pay);
payment.get('/:order_id/verify', verifyToken, paymentController.verifyPayment);

export default payment;