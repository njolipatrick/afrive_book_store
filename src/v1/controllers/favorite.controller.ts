import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import favoriteService from '../services/favorite.service';
import { decoder } from '../utiles/auth.utile';
import { Favorite } from '../models/favorite.model';
import bookService from '../services/book.service';

class FavoriteController {
    public create = async (req: Request, res: Response) => {
        try {
            const { book_id } = req.params;
            const data: Favorite = {
                book_id: book_id as unknown as number,
                user_id: decoder(req)._id as unknown as number
            };
            const book = await bookService.getBookById(data.book_id);
            if (!book) {
                throw new Error('NOT_FOUND');
            }
            const check_user_fav = await favoriteService.getUserFav(data.user_id, data.book_id);
            if (check_user_fav) {
                throw new Error('FOUND');
            }
            const result = await favoriteService.create(data);
            res.status(201).json(response('Favorite Created Succesfully', result));
        }
        catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Favorite not found'));
            }
            if ((error as any).message === 'FOUND') {
                return res.status(200).json(response('Favorite  found. Cart already created'));
            } 
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        const result = await favoriteService.index(decoder(req)._id);
        return res.status(200).json(response('Favorites Found', result));
    };
    public destroy = async (req: Request, res: Response) => {
        const result = await favoriteService.destroy(req.params.book_id as unknown as number);
       return res.status(200).json(response('Favorite deleted Successfully', result));
    };
}
export default new FavoriteController;