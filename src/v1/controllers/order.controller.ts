import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import orderService from '../services/order.service';
import { decoder } from '../utiles/auth.utile';
import bookService from '../services/book.service';
import authService from '../services/auth.service';
import { Pay, PlaceOrder } from '../models/order.model';
import { users } from '@prisma/client';
import { paystack } from '../utiles/paystack';
import { param } from 'express-validator';
const { initializePayment, verifyPayment } = paystack();

class OrderController {
    public create = async (req: Request, res: Response) => {
        try {
            const { total_order_amount, estimated_delivery_date, book_id, currency } = req.body;
            const book = await bookService.getBookById(book_id);
            if (!book) {
                throw new Error('NOT_FOUND_BOOK');
            }
            const user_id = decoder(req)._id;

            const user = await authService.getUserById(user_id);
            if (!user) {
                throw new Error('NOT_FOUND_USER');
            }

            const pay: Pay = {
                amount: total_order_amount * 100,
                email: String(user.email)
            };

            const payment = await initializePayment(pay);

            if (!payment.data.status) {
                throw new Error('PAYMENT_FAILED');
            }

            const data: PlaceOrder = {
                status: '1',
                total_order_amount,
                estimated_delivery_date,
                currency,
                user_id: user.id,
                book: book,
                txn_ref: payment.data.data.reference as string,
                checkout_url: payment.data.data.authorization_url as string
            };

            const result = await orderService.create(data);
            return res.status(201).json(response('Order Created Succesfully', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND_USER') {
                return res.status(500).json(response('Error occured. User not found'));
            }
            if ((error as any).message === 'PAYMENT_FAILED') {
                return res.status(500).json(response('Error occured. Payment failed'));
            }
            if ((error as any).message === 'NOT_FOUND_BOOK') {
                return res.status(500).json(response('Error occured. Book not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };

    public getOrdersById = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;
            const { order_id } = req.params;
            const result = await orderService.getOrdersById(order_id as unknown as number, user_id);
            if (!result) {
                throw new Error('NOT_FOUND');
            }
            return res.status(200).json(response('Order Found', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Book not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getOrdersByUserID = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;
            const result = await orderService.getOrdersByUserID(user_id);
            if (!result) {
                throw new Error('NOT_FOUND');
            }
            return res.status(200).json(response('Order Found', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Book not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public verifyPayment = async (req: Request, res: Response) => {
        try {

            const reference = req.params.reference;
            const user_id = decoder(req)._id;
            const get_order_by_txn_ref = await orderService.getOrderByTrxRef(reference, user_id);
            if (!get_order_by_txn_ref) {
                throw new Error('NOT_FOUND');
            }
            const result = await verifyPayment(get_order_by_txn_ref.txn_ref);
            if (result.data.data.status === 'success') {
                const orderStatus = await orderService.updatePaymentStatus(get_order_by_txn_ref.id, reference);

                if (!orderStatus) {
                    throw new Error('UPDATE_PAYMENT_FAILED');
                }
                const order = await orderService.getOrderByTrxRef(reference, user_id);
                if (!order) {
                    throw new Error('NOT_FOUND');
                }
                return res.status(200).json(response('Payment verified successfully', order));
            } else if (result.data.data.status === 'abandoned') {
                throw new Error('ABANDONED');
            }
            else if (result.data.data.status === 'failed') {
                throw new Error('FAILED');
            }
            else {
                throw new Error('PAYMENT_ERROR');
            }
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Book not found'));
            }
            if ((error as any).message === 'PAYMENT_ERROR') {
                return res.status(400).json(response('Error occured. Payment failed'));
            }
            if ((error as any).message === 'ABANDONED') {
                return res.status(400).json(response('Error occured. Order verification failed, Client haven\'t made payment yet'));
            }
            if ((error as any).message === 'FAILED') {
                return res.status(400).json(response('Error occured. Order verification failed, Client payment declined'));
            }
            if ((error as any).message === 'UPDATE_PAYMENT_FAILED') {
                return res.status(400).json(response('Error occured. The order not verify, please make payment'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;

            const find_order = await orderService.show(req.params.order_id as unknown as number);
            if (!find_order) {
                throw new Error('NOT_FOUND');
            }
            // user can only delete thier order alone
            if (find_order.user_id !== user_id) {
                throw new Error('ACCESS_DENIED');
            }
            const result = await orderService.destroy(find_order.id);
            if (!result) {
                throw new Error('NOT_DELETED');
            }
            return res.status(200).json(response('Order Found', result));
        } catch (error) {
            if ((error as any).message === 'ACCESS_DENIED') {
                return res.status(401).json(response('Error occured. Access denied for user'));
            }
            if ((error as any).message === 'NOT_DELETED') {
                return res.status(500).json(response('Error occured. Order not deleted'));
            }
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(500).json(response('Error occured. Order not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new OrderController;