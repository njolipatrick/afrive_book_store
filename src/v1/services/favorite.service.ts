import globalModel from '../models/global.model';
import FavoriteModel, { Favorite, FavoriteDetails } from '../models/favorite.model';
import { decoder } from '../utiles/auth.utile';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';

class FavoriteService {
    public create = async (req: Request): Promise<FavoriteDetails> => {

        const { book_id } = req.params;
        const data: Favorite = {
            book_id,
            user_id: decoder(req)._id
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

        const CheckFavoriteBook = await globalModel.CHECKMODEL('Favorites', 'book_id', book_id);
        const CheckFavoriteUser = await globalModel.CHECKMODEL('Favorites', 'user_id', data.user_id);
        if (CheckFavoriteBook && CheckFavoriteUser) throw new CustomError(`Book with ID ${book_id} already added to Favorite for User ID ${1}`, 409);

        const CheckUser = await globalModel.CHECKMODEL('Users', 'id', data.user_id);
        if (!CheckUser) throw new CustomError(`User with ${data.user_id} doesn't exist`, 400);

        const Favorite = await FavoriteModel.create(data);
        return Favorite;
    };

    public index = async (req: Request): Promise<FavoriteDetails[]> => {
        const user_id = decoder(req)._id;

        const Favorite = await FavoriteModel.index(user_id);
        return Favorite;
    };


    public destroy = async (book_id: string) => {
        const findFavorite = await globalModel.CHECKMODEL('FavoriteS', 'book_id', book_id);
        if (!findFavorite) {
            throw new CustomError(`Favorite with ${book_id} does not exist`, 404);
        }
        const Favorite = FavoriteModel.destroy(book_id);
        if (!Favorite) {
            throw new CustomError('Error Favorite not deleted', 400);
        }
        return 'Favorite Successfully Deleted';
    };
}
export default new FavoriteService;