import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import { User } from './auth.model';
import { Book } from './book.model';
import globalModel from './global.model';

export type Order = {
    id: number;
    book_id: string;
    user_id: number;
    quantity: number;
    created_at?: string;
}
export type OrderDetails = {
    order_id: number;
    book_name: string;
    order_by: string;
    quantity: number;
    created_at?: string;
}
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
            const { book_id, user_id, quantity } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (book_id, user_id, quantity)VALUES ($1, $2, $3) RETURNING *;';
            const values = [book_id, user_id, quantity];
            const res = await conn.query(sql, values);
            const order: Order = res.rows[0];
            conn.release();

            const book: Book = await globalModel.FINDONE('Books', 'id', book_id);
            const user: User = await globalModel.FINDONE('Users', 'id', String(user_id));

            const details: OrderDetails = {
                order_id: order.id,
                book_name: book.title,
                order_by: user.firstname + ' ' + user.lastname,
                quantity: order.quantity,
                created_at: order.created_at
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (): Promise<OrderDetails[]> => {
        try {
            const orders: Order[] = await globalModel.FINDALL('orders');

            const all_orders = await Promise.all(orders.map(async order => {
                const book: Book = await globalModel.FINDONE('Books', 'id', order.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', order.user_id);

                const details: OrderDetails = {
                    order_id: order.id,
                    book_name: book.title,
                    order_by: user.firstname + ' ' + user.lastname,
                    quantity: order.quantity,
                    created_at: order.created_at
                };
                return details;
            }));
            return all_orders;

        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public getOrdersByUserID = async (user_id: string) => {
        try {
            const orders = await globalModel.FINDWHERE('Orders', 'user_id', user_id);

            const all_orders = await Promise.all(orders.map(async order => {
                const book: Book = await globalModel.FINDONE('Books', 'id', order.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', order.user_id);

                const details: OrderDetails = {
                    order_id: order.id,
                    book_name: book.title,
                    order_by: user.firstname + ' ' + user.lastname,
                    quantity: order.quantity,
                    created_at: order.created_at
                };
                return details;
            }));
            return all_orders;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public getOrdersByBookID = async (book_id: string) => {
        try {
            const orders = await globalModel.FINDWHERE('Orders', 'book_id', book_id);

            const all_orders = await Promise.all(orders.map(async order => {
                const book: Book = await globalModel.FINDONE('Books', 'id', order.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', order.user_id);

                const details: OrderDetails = {
                    order_id: order.id,
                    book_name: book.title,
                    order_by: user.firstname + ' ' + user.lastname,
                    quantity: order.quantity,
                    created_at: order.created_at
                };
                return details;
            }));
            return all_orders;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public getOrdersByOrderID = async (order_id: string) => {
        try {
            const orders = await globalModel.FINDWHERE('Orders', 'id', order_id);

            const all_orders = await Promise.all(orders.map(async order => {
                const book: Book = await globalModel.FINDONE('Books', 'id', order.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', order.user_id);

                const details: OrderDetails = {
                    order_id: order.id,
                    book_name: book.title,
                    order_by: user.firstname + ' ' + user.lastname,
                    quantity: order.quantity,
                    created_at: order.created_at
                };
                return details;
            }));
            return all_orders;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public update = async (id: string, data: Order) => {
        try {
            const { book_id, user_id, quantity } = data;

            const conn = await client.connect();
            const sql = 'UPDATE Orders SET book_id = $1, user_id = $2, quantity=$3 WHERE id = $4';
            const values = [book_id, user_id, quantity, id];
            const res = await conn.query(sql, values);
            conn.release();

            const order: Order = res.rows[0];
            const book: Book = await globalModel.FINDONE('Books', 'id', book_id);
            const user: User = await globalModel.FINDONE('Users', 'id', user_id);

            const details: OrderDetails = {
                order_id: order.id,
                book_name: book.title,
                order_by: user.firstname + ' ' + user.lastname,
                quantity: order.quantity,
                created_at: order.created_at
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public destroy = async (order_id: number) => {
        try {
            const destroy = await globalModel.Destroy(order_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new OrderModel;