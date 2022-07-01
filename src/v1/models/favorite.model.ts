import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import { User } from './auth.model';
import { Book } from './book.model';
import globalModel from './global.model';

export type Favorite = {
    id?: number;
    book_id: string;
    user_id: string;
    created_at?: string;
}
export type FavoriteDetails = {
    id?: number;
    user_name: string;
    book_name: string;
    created_at?: string;
}

class FavoriteModel {
    public create = async (data: Favorite) => {
        try {
            const { book_id, user_id } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO favorites (book_id, user_id)VALUES ($1, $2) RETURNING *;';
            const values = [book_id, user_id];
            const res = await conn.query(sql, values);
            const favorite: Favorite = res.rows[0];
            conn.release();

            const book: Book = await globalModel.FINDONE('Books', 'id', book_id);
            const user: User = await globalModel.FINDONE('Users', 'id', String(user_id));

            const details: FavoriteDetails = {
                id: favorite.id,
                book_name: book.title,
                user_name: user.username,
                created_at: favorite.created_at
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (user_id:string|number): Promise<FavoriteDetails[]> => {
        try {
            const favorites: Favorite[] = await globalModel.FINDWHERE('FAVORITES', 'user_id', user_id);

            const all_favorites = await Promise.all(favorites.map(async favorite => {
                const book: Book = await globalModel.FINDONE('Books', 'id', favorite.book_id);
                const user: User = await globalModel.FINDONE('Users', 'id', favorite.user_id);

                const details: FavoriteDetails = {
                    id: favorite.id,
                    book_name: book.title,
                    user_name: user.username,
                    created_at: favorite.created_at
                };
                return details;
            }));
            return all_favorites;

        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };

    public destroy = async (book_id: string | number) => {
        try {
            const favorite: Favorite = await globalModel.FINDONE('FAVORITES', 'book_id', book_id);
            const destroy = await globalModel.Destroy('FAVORITES', favorite.id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new FavoriteModel;