import client from '../../../config/database';
import CustomError from '../utile/error.utile';

export type Book = {
    id?: number;
    name: string;
    ISBN: string;
    author: string;
    publisher: string;
    genre: string;
    category: string;
}
class BookModel {
    public create = async (data: Book) => {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO books (name, ISBN, author, publisher, genre, category)VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
            const values = [data.name, data.ISBN, data.author, data.publisher, data.genre, data.category];
            const res = await conn.query(sql, values);
            const book = res.rows[0];
            return book;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public index = async () => {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM books;';
            const res = await conn.query(sql);
            const books = res.rows;
            return books;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public show = async (id: number) => {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM books WHERE id=$1 RETURNING *;';
            const values = [id];
            const res = await conn.query(sql, values);
            const book = res.rows;
            return book;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new BookModel;