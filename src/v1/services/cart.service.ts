import globalModel from '../models/global.model';
import cartModel, { Cart, CartDetails } from '../models/cart.model';
import { decoder } from '../utiles/auth.utile';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';

class CartService {
    public create = async (req: Request): Promise<CartDetails> => {

        const { book_id } = req.params;
        const data: Cart = {
            book_id,
            user_id: decoder(req)._id as unknown as string
        };

        const rules = {
            book_id: 'required|string',
            user_id: 'required|integer'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} doesn't exist`, 400);

        const CheckCartBook = await globalModel.CHECKMODEL('Carts', 'book_id', book_id);
        const CheckCartUser = await globalModel.CHECKMODEL('Carts', 'user_id', data.user_id);
        if (CheckCartBook && CheckCartUser) throw new CustomError(`Book with ID ${book_id} already added to cart for User ID ${1}`, 409);

        const CheckUser = await globalModel.CHECKMODEL('Users', 'id', data.user_id);
        if (!CheckUser) throw new CustomError(`User with ${data.user_id} doesn't exist`, 400);

        const cart = await cartModel.create(data);
        return cart;
    };

    public index = async (req: Request): Promise<CartDetails[]> => {
        const user_id = decoder(req)._id;

        const cart = await cartModel.index(user_id);
        return cart;
    };


    public destroy = async (book_id: string) => {
        const findCart = await globalModel.CHECKMODEL('CARTS', 'book_id', book_id);
        if (!findCart) {
            throw new CustomError(`Cart with ${book_id} does not exist`, 404);
        }
        const cart = cartModel.destroy(book_id);
        if (!cart) {
            throw new CustomError('Error cart not deleted', 400);
        }
        return 'Cart Successfully Deleted';
    };
}
export default new CartService;