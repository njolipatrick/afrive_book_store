import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import bookModel, { Book, ReturnedBook } from './book.model';
import { Ebook } from './ebook.model';
import globalModel from './global.model';

export type Category = {
    id?: number;
    book_id: string;
    name: string;
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
    public getCategorysByName = async (name: string): Promise<Book[]> => {
        try {
            
            const categorys: Category[] = await globalModel.SEARCH('CATEGORIES', 'name', name, 20);
            

            const all_books = await Promise.all(categorys.map(async category => {
                const ebook: Ebook = await globalModel.FINDONE('CATEGORIES', 'book_id', category.book_id);
                console.log(category);
                const book: Book = await globalModel.FINDONE('BOOKS', 'id', category.book_id);

                let EBOOK: Ebook = { status: null, format: null };

                if (ebook === undefined) {
                    EBOOK = { status: null, format: null };
                } else {
                    EBOOK = { status: ebook.status, format: ebook.format };
                }
                const rating = await bookModel.rating(category.book_id);

                const category_array = await bookModel.categories(category.book_id);
                const details: ReturnedBook = {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    img: book.image,
                    description: book.description,
                    price: book.price,
                    status: book.status,
                    category: category_array,
                    eBook: EBOOK,
                    bookRating: {
                        averageRating: bookModel.averageRating(rating),
                        ratings: rating //Return an array of all rating to book
                    }

                };
                return details;
            }));

            return all_books;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
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