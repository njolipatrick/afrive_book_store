import globalModel from '../model/global.model';
import orderModel, { Order, OrderDetails } from '../model/order.model';
import CustomError from '../utile/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';

class OrderService {
    public create = async (req: Request): Promise<OrderDetails> => {
        const data = req.body;
        const { book_id, quantity } = data;
        const { user_id } = req.params;
        data.user_id = user_id;
        const rules = {
            book_id: 'required|string',
            user_id: 'required|string',
            quantity: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} already exist`, 400);

        const CheckUser = await globalModel.CHECKMODEL('Users', 'id', user_id);
        if (!CheckUser) throw new CustomError(`User with ${user_id} already exist`, 400);

        const order = await orderModel.create(data);
        return order;
    };

    public index = async (): Promise<OrderDetails[]> => {
        const order = await orderModel.index();

        return order;
    };

    public getOrdersByUserID = async (user_id: string) => {
        const findOrder = await globalModel.CHECKMODEL('Orders', 'user_id', user_id);
        if (!findOrder) {
            throw new CustomError(`Order with UserID ${user_id} does not exist`, 404);
        }
        const order = await orderModel.getOrdersByUserID(user_id);
        return order;
    };
    public getOrdersByBookID = async (book_id: string) => {
        const findOrder = await globalModel.CHECKMODEL('Orders', 'book_id', book_id);
        if (!findOrder) {
            throw new CustomError(`Order with UserID ${book_id} does not exist`, 404);
        }
        const order = await orderModel.getOrdersByBookID(book_id);
        return order;
    };
    public getOrdersByOrderID = async (book_id: string) => {
        const findOrder = await globalModel.CHECKMODEL('Orders', 'book_id', book_id);
        if (!findOrder) {
            throw new CustomError(`Order with UserID ${book_id} does not exist`, 404);
        }
        const order = await orderModel.getOrdersByOrderID(book_id);
        return order;
    };

    public update = async (id: string, data: Order) => {
        const findOrder = await globalModel.CHECKMODEL('OrderS', 'id', id);
        if (!findOrder) {
            throw new CustomError(`Order with ${id} does not exist`, 404);
        }
        const order = await orderModel.update(id, data);
        return order;
    };

    public destroy = async (id: string) => {
        const findOrder = await globalModel.CHECKMODEL('OrderS', 'id', id);
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