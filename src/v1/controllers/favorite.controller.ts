import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { CustomError } from '../utiles/error.utile';
import favoriteService from '../services/favorite.service';
import { Favorite } from '../models/favorite.model';
import { decoder } from '../utiles/auth.utile';
import bookService from '../services/book.service';

class FavoriteController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: Favorite = req.body;
            data.book_id = Number(req.params.book_id);
            data.user_id = decoder(req)._id;

            const checkBook = await bookService.getBookById(data.book_id);

            if (!checkBook) {
                throw new CustomError('Book not found', 404);
            }
            const bookReview = await favoriteService.getFavoriteByBookId(Number(data.book_id));

            if (!bookReview) {
                throw new CustomError(`Book with ${data.book_id} does not exist`, 404);
            }
            const checkFavoriteBook = await favoriteService.getFavoriteByBookId(Number(data.book_id));
            const checkFavoriteUser = await favoriteService.getFavoriteByUserId(data.user_id);
            if (checkFavoriteBook && checkFavoriteUser) throw new CustomError(`Book with ID ${data.book_id} already added to Favorite for User ID ${data.user_id}`, 409);

            const result = await favoriteService.create(data);
            res.status(201).json(response('Favorite Created Succesfully', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;
            const result = await favoriteService.index(user_id);
            res.status(200).json(response('Favorites Found', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const result = await favoriteService.destroy(Number(req.params.id));
            res.status(200).json(response('Favorite deleted Successfully', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new FavoriteController;