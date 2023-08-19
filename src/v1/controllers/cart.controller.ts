import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import cartService from '../services/cart.service';
import { decoder } from '../utiles/auth.utile';
import { Cart } from '../models/cart.model';
import bookService from '../services/book.service';

class CartController {
    public create = async (req: Request, res: Response) => {
        try {
            const { book_id } = req.params;
            const data: Cart = {
                book_id,
                user_id: decoder(req)._id as unknown as string
            };
            const book = await bookService.getBookById(Number(book_id));
            if (!book) throw new Error('BOOK_NOT_FOUND');

            const cart = await cartService.findByBookIdAndUserId(Number(book_id), decoder(req)._id);
            if (cart) throw new Error('CART_EXIST');

            const result = await cartService.create(data);
            if (!result) throw new Error('NOT_CREATED');

            return res.status(201).json(response('Cart Created Succesfully', result));

        } catch (err: any) {
            return res.status(500).json(response('Internal server error', err.message));
        }
    };
    public show = async (req: Request, res: Response) => {
        try {
            const { cart_id } = req.params;
            const result = await cartService.show(decoder(req)._id, Number(cart_id));

            if (!result) throw new Error('NOT_FOUND');

            return res.status(200).json(response('Carts Found', result));
        } catch (err: any) {
            return res.status(500).json(response('Internal server error', err.message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const result = await cartService.index(decoder(req)._id);
            return res.status(200).json(response('Carts Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {try{
        
        const result = await cartService.destroy(Number(req.params.cart_id));
        res.status(200).json(response('Cart deleted Successfully', result));
    } catch (error) {
        return res.status(500).json(response('Internal server error', (error as any).message));
    }
    };
}
export default new CartController;