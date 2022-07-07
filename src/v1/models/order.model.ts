import client from '../../../config/database'; 
import CustomError from '../utiles/error.utile'; 
import globalModel from './global.model';

export type Pay = {
    user_id?: string;
    amount: number;
    email: string;
    reference?: string;
    order_id: string;
}
export type ReturnBookOrder = {
    book_name: string;
    total_amount: number;
    format: string;
}
export type Order = {
    id?: number | string;
    order_id: string | number | undefined;
    user_id?: string | number | undefined;
    txn_ref: string;
    quantity: number;
    book?: string;
    date?: string;
    total_order_amount: number;
    status: string;
    completed?: boolean;
    estimated_delivery_date: string;
    currency: string;
    created_at?: string;
};

export type Delivery = {
    order_id: number;
    phone: number;
    delivery_address: string;
    date_delivered: string;
    is_delivered: boolean;
    download_link: string;
};
class OrderModel {
    public create = async (data: Order) => {
        try {
            const { user_id, txn_ref, book, total_order_amount, status, estimated_delivery_date, currency } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, txn_ref, book, total_order_amount, status, estimated_delivery_date, currency)VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
            const values = [user_id, txn_ref, book, total_order_amount, status, estimated_delivery_date, currency];
            const res = await conn.query(sql, values);
            const order: Order = res.rows[0];
            conn.release();


            const details: Order = {
                order_id: order.id,
                txn_ref: order.txn_ref,
                quantity: order.quantity,
                book: order.book,
                date: order.created_at,
                total_order_amount: order.total_order_amount,
                status: order.status,
                completed: order.completed,
                estimated_delivery_date: order.estimated_delivery_date,
                currency: order.currency,
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };

    public getOrdersByUserID = async (user_id: string): Promise<Order[]> => {
        try {
            const orders: Order[] = await globalModel.FINDWHERE('ORDERS', 'user_id', user_id);
            const all_orders = await Promise.all(orders.map(async order => {
                const details: Order = {
                    order_id: order.id,
                    txn_ref: order.txn_ref,
                    quantity: order.quantity,
                    book: order.book,
                    date: order.created_at,
                    completed: order.completed,
                    total_order_amount: order.total_order_amount,
                    status: order.status,
                    estimated_delivery_date: order.estimated_delivery_date,
                    currency: order.currency,
                };
                return details;
            }));

            return all_orders;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public updateTXNREF = async (data: Pay) => {
        try {
            const conn = await client.connect();
            const sql = `UPDATE orders SET txn_ref = '${data.reference}' WHERE user_id = ${data.user_id} AND id = ${data.order_id} RETURNING txn_ref`;
            const res = await conn.query(sql);
            conn.release();

            const order: Order = await globalModel.FINDONE('ORDERS', 'txn_ref', data.reference);

            return order.txn_ref === res.rows[0].txn_ref ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public updateStatus = async (user_id: string, order_id: string) => {
        try {
            const conn = await client.connect();
            const sql = `UPDATE orders SET completed = true WHERE user_id = '${user_id}' AND id = '${order_id}' RETURNING *`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows[0].completed === true ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public destroy = async (order_id: number) => {
        try {
            const destroy = await globalModel.Destroy('ORDERS', order_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new OrderModel;