import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import cartService from '../services/cart.service';
import { decoder } from '../utiles/auth.utile';
import { Cart } from '../models/cart.model';
import bookService from '../services/book.service';

class CartController {
    public create = async (req: Request, res: Response) => {
        try {
            const { book_id } = req.params;
            const data: Cart = {
                book_id: book_id as unknown as number,
                user_id: decoder(req)._id as unknown as number
            };
            const book = await bookService.getBookById(data.book_id);
            if (!book) {
                throw new Error('NOT_FOUND');
            }
            const check_user_cart = await cartService.getUserCart(data.user_id, data.book_id);
            if (check_user_cart) {
                throw new Error('FOUND');
            }
            const result = await cartService.create(data);
            res.status(201).json(response('Cart Created Succesfully', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Cart not found'));
            }
            if ((error as any).message === 'FOUND') {
                return res.status(200).json(response('Cart  found. Cart already created'));
            }
            if ((error as any).message === 'UPDATE_FAILED') {
                return res.status(500).json(response('Error occured. Book not updated'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        const result = await cartService.index(decoder(req)._id as unknown as number);
        res.status(200).json(response('Carts Found', result));
    };
    public destroy = async (req: Request, res: Response) => {
        const result = await cartService.destroy(req.params.book_id as unknown as number);
        res.status(200).json(response('Cart deleted Successfully', result));
    };
}
export default new CartController;