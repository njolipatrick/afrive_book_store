import client from '../../../config/database';
import { CustomError } from '../utiles/error.utile';
import { User } from './auth.model';
import { Book } from './book.model';
import globalModel from './global.model';

export type Cart = {
    id?: number;
    book_id: string;
    user_id: string;
    created_at?: string;
}
export type CartDetails = {
    id?: number;
    user_name: string;
    book_name: string;
    created_at?: string;
}
export type Delivery = {
    id: number;
    phone: number;
    delivery_address: string;
    date_delivered: string;
    is_delivered: boolean;
    download_link: string;
};
class CartModel {
    public create = async (data: Cart) => {
        try {
            const { book_id, user_id } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO carts (book_id, user_id)VALUES ($1, $2) RETURNING *;';
            const values = [book_id, user_id];
            const res = await conn.query(sql, values);
            const cart: Cart = res.rows[0];
            conn.release();

            const book: Book = await globalModel.FINDONE('Books', 'id', book_id);
            const user: User = await globalModel.FINDONE('Users', 'id', String(user_id));

            const details: CartDetails = {
                id: cart.id,
                book_name: book.title,
                user_name: user.username,
                created_at: cart.created_at
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (user_id: string | number): Promise<CartDetails[]> => {
        try {
            const carts: Cart[] = await globalModel.FINDWHERE('CARTS', 'user_id', user_id);

            const all_carts = await Promise.all(carts.map(async cart => {
                const book: Book = await globalModel.FINDONE('Books', 'id', cart.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', cart.user_id);

                const details: CartDetails = {
                    id: cart.id,
                    book_name: book.title,
                    user_name: user.username,
                    created_at: cart.created_at
                };
                return details;
            }));
            return all_carts;

        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };

    public destroy = async (book_id: string | number) => {
        try {
            const cart: Cart = await globalModel.FINDONE('CARTS', 'book_id', book_id);
            const destroy = await globalModel.Destroy('CARTS', cart.id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new CartModel;