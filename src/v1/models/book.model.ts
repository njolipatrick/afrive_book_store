import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import globalModel from './global.model';

export type Book = {
    id: number;
    title: string;
    author: string;
    image: string;
    description: string;
    price: number;
    status: string;
}
class BookModel {

    public create = async (data: Book) => {
        try {
            const { title, author, image, description, price, status } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO books (title, author, image, description, price, status)VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
            const values = [title, author, image, description, Number(price), status];
            const res = await conn.query(sql, values);
            const book: Book = res.rows[0];

            conn.release();
            return book;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (limit: number) => {
        try {
            const books: Book[] = await globalModel.FINDALL('Books', limit);
            return books;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public show = async (id: number) => {
        try {
            const book: Book = await globalModel.FINDONE('BOOKS', 'id', id);
            console.log(book);

            return book;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public update = async (id: number, data: Book) => {
        try {
            const { title, author, image, description, price, status } = data;

            const conn = await client.connect();
            const sql = 'UPDATE books SET title = $1, author = $2, image=$3, description=$4, price=$5, status=$6 WHERE id = $7';
            const values = [title, author, image, description, price, status, id];
            const result = await conn.query(sql, values);
            return result.rows[0];
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public destroy = async (book_id: number) => {
        try {
            const destroy = await globalModel.Destroy('BOOKS', book_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new BookModel;