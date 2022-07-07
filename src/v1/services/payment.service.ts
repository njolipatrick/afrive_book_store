import globalModel from '../models/global.model';
import orderModel, { Order, Pay } from '../models/order.model';
import { decoder } from '../utiles/auth.utile';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { paystack } from '../utiles/paystack';
const { initializePayment, verifyPayment } = paystack();

class PaymentService {
    public pay = async (req: Request) => {
        const { amount, email } = req.body;
        const order_id = req.params.order_id;
        const data: Pay = {
            amount: amount,
            email: email,
            user_id: decoder(req)._id,
            order_id: order_id
        };

        const rules = {
            email: 'required|email',
            amount: 'required|integer',
            user_id: 'required|integer',
            order_id: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const res = await initializePayment(data);
        data.reference = res.data.data.reference;

        const order = await orderModel.updateTXNREF(data);
        if (!order) {
            throw new CustomError('There was a problem with order please check back after a few minutes', 400);
        }

        return res.data.data;
    };

    public verifyPayment = async (req: Request) => {
        const order_id = req.params.order_id;
        const user_id = decoder(req)._id;

        const orderRef: Order = await globalModel.FINDONE('ORDERS', 'id', order_id);

        const res = await verifyPayment(orderRef.txn_ref);
        if (res.data.data.status === 'success') {
            const orderStatus = await orderModel.updateStatus(user_id, order_id);

            if (!orderStatus) {
                throw new CustomError('The order not verify, please make payment', 400);
            }
            const order: Order = await globalModel.FINDONE('ORDERS', 'id', order_id);
            return order;
        } else {
            throw new CustomError('Order verification failed, Client should make payment again', 400);
        }

    };
}
export default new PaymentService;