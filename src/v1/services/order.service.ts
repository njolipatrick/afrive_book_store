import globalModel from '../models/global.model';
import orderModel, { Order, Pay } from '../models/order.model';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { decoder } from '../utiles/auth.utile';
import { codeGenerator } from '../utiles/generator.util';

import { paystack } from '../utiles/paystack';
import { User } from '../models/auth.model';
const { initializePayment, verifyPayment } = paystack();
class OrderService {
    public create = async (req: Request): Promise<Order> => {
        const data: Order = req.body;
        const { txn_ref, book, total_order_amount, status, estimated_delivery_date, currency } = data;

        data.user_id = decoder(req)._id;
        data.book = JSON.stringify(data.book);
        const user: User = await globalModel.FINDONE('USERS', 'id', data.user_id);

        const pay: Pay = {
            amount: data.total_order_amount * 100,
            email: user.email
        };

        const res = await initializePayment(pay);

        data.txn_ref = res.data.data.reference;
        data.checkout_url = res.data.data.authorization_url;

        const rules = {
            user_id: 'required|integer',
            txn_ref: 'required|string',
            book: 'required',
            total_order_amount: 'required|integer',
            status: 'required|string',
            estimated_delivery_date: 'required|string',
            currency: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckUser = await globalModel.CHECKMODEL('Users', 'id', data.user_id);

        if (!CheckUser) throw new CustomError(`User with ${data.user_id} doesn't exist`, 400);

        const order = await orderModel.create(data);
        return order;
    };

    public getOrdersByUserID = async (req: Request) => {
        const user_id = String(decoder(req)._id);
        const findOrder = await globalModel.CHECKMODEL('ORDERS', 'user_id', user_id);
        if (!findOrder) {
            throw new CustomError(`Order with UserID ${user_id} does not exist`, 404);
        }
        const order = await orderModel.getOrdersByUserID(user_id);
        return order;
    };
    public verifyPayment = async (req: Request) => {
        const reference = req.params.reference;
        const user_id = decoder(req)._id;

        const orderRef: Order = await globalModel.FINDONE('ORDERS', 'txn_ref', reference);

        if (!orderRef) throw new CustomError(`Order not found for txn_ref ${reference}`, 404);

        const res = await verifyPayment(orderRef.txn_ref);
        console.log(res.data.data.status);

        if (res.data.data.status === 'success') {
            const orderStatus = await orderModel.updateStatus(user_id, reference);

            if (!orderStatus) {
                throw new CustomError('The order not verify, please make payment', 400);
            }
            const order: Order = await globalModel.FINDONE('ORDERS', 'txn_ref', reference);
            return order;
        } else if (res.data.data.status === 'abandoned') {
            throw new CustomError('Order verification failed, Client haven\'t made payment yet', 400);
        }
        else if (res.data.data.status === 'failed') {
            throw new CustomError('Order verification failed, Client payment declined', 400);
        }
        else {
            throw new CustomError('Order verification failed, Client payment not success', 400);
        }
    };

    public destroy = async (req: Request) => {
        const user_id = String(decoder(req)._id);
        const id = req.params.order_id;

        const findUser: Order = await globalModel.FINDONE('ORDERS', 'user_id', user_id);

        if (findUser.user_id != user_id) {
            throw new CustomError(`Order with User ID ${id} does not exist`, 404);
        }

        const findOrder = await globalModel.CHECKMODEL('ORDERS', 'id', id);
        if (!findOrder) {
            throw new CustomError(`Order with ${id} does not exist`, 404);
        }
        const order = orderModel.destroy(Number(id));
        if (!order) {
            throw new CustomError('Error order not deleted', 400);
        }
        return 'Order Successfully Deleted';
    };
}
export default new OrderService;