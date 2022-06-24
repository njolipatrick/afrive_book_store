import client from '../../../config/database';
import CustomError from '../utiles/error.utile'; 
import globalModel from './global.model';

export type Category = {
    id?: number;
    book_id: string;
    name: number;
}
class CategoryModel {
    public create = async (data: Category) => {
        try {
            const { book_id, name } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO categories (book_id, name)VALUES ($1, $2) RETURNING *;';
            const values = [book_id, name];
            const res = await conn.query(sql, values);
            const category: Category = res.rows[0];
            conn.release();

            return category;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (): Promise<Category[]> => {
        try {
            const categorys: Category[] = await globalModel.FINDALL('categories', 20);

            return categorys;

        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public getCategorysByName = async (name: string): Promise<Category[]> => {
        try {
            const categorys: Category[] = await globalModel.SEARCH('CATEGORIES', name, 20);
            return categorys;

        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public destroy = async (category_id: number) => {
        try {
            const destroy = await globalModel.Destroy('CATEGORIES', category_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new CategoryModel;