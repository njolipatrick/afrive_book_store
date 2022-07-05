import globalModel from '../models/global.model';
import orderModel, { Order } from '../models/order.model';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { decoder } from '../utiles/auth.utile';

class OrderService {
    public create = async (req: Request): Promise<Order> => {
        const data: Order = req.body;
        const { txn_ref, book, total_order_amount, status, estimated_delivery_date, currency } = data;

        data.user_id = String(decoder(req)._id);
        data.book = JSON.stringify(data.book);
        // const {user_id, txn_ref, books, total_order_amount, status, estimated_delivery_date, currency, quantity}
        const rules = {
            user_id: 'required|string',
            txn_ref: 'required|string',
            book: 'required',
            total_order_amount: 'required|integer',
            status: 'required|string',
            estimated_delivery_date: 'required|string',
            currency: 'required|string'
        };
        console.log(JSON.stringify(data.book));


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

    public destroy = async (req: Request) => {
        const user_id = String(decoder(req)._id);
        const id = req.params.order_id;

        const findUser:Order = await globalModel.FINDONE('ORDERS', 'user_id', user_id);
        
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