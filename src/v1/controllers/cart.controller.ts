import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import cartService from '../services/cart.service';

class CartController {
    public create = catchAsync(async (req: Request, res: Response) => {
        const result = await cartService.create(req);
        res.status(201).json(response('Cart Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await cartService.index(req);
        res.status(200).json(response('Carts Found', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await cartService.destroy(req.params.book_id as string);
        res.status(200).json(response('Cart deleted Successfully', result));
    });
}
export default new CartController;