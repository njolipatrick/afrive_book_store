import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import globalModel from './global.model';

export type Book = {
    id: number;
    title: string;
    isbn: string;
    author: string;
    publisher: string;
    genre: string;
    description: string;
    price: number;
    status: string;
    format?: string;
    hasEbook: boolean;
    category?: string[] | string;
    averageRating?: string[];
    eBook?: {
        status: string;
        format?: string[];
    },
}
class BookModel {

    public create = async (data: Book) => {
        try {
            const { title, isbn, author, publisher, genre, format, category, hasEbook, description, price, status, averageRating, eBook } = data;
            const conn = await client.connect();
            let sql = 'INSERT INTO books (title, ISBN, author, publisher, genre, hasEbook, description, price)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
            let values = [title, isbn, author, publisher, genre, hasEbook, description, price];
            const res = await conn.query(sql, values);
            const book: Book = res.rows[0];
            const book_id = res.rows[0].id;

            if (hasEbook) {
                sql = 'INSERT INTO ebooks(status, format, book_id)VALUES($1, $2, $3)RETURNING *;';
                values = [status, format, book_id];
                const addEbook = await conn.query(sql, values);
                book.eBook = {
                    status: addEbook.rows[0].status,
                    format: [addEbook.rows[0].format]
                };
            }
            if (!category) {
                conn.release();
                return book;
            }
            sql = 'INSERT INTO categories(name, book_id)VALUES($1, $2) RETURNING *;';
            values = [category, book_id];
            const addCategory = await conn.query(sql, values);
            book.category = [addCategory.rows[0].name];
            conn.release();
            return book;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async () => {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM books ORDER BY id DESC;';
            const res = await conn.query(sql);

            const books = res.rows;

            return books;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public show = async (id: number) => {
        try {
            const conn = await client.connect();
            let sql = 'SELECT * FROM books WHERE id=$1 RETURNING *;';
            let values = [id];
            const res = await conn.query(sql, values);
            const book: Book = res.rows[0];
            sql = 'SELECT * FROM categories WHERE book_id=$1 ORDER BY book_id DESC RETURNING *;';
            values = [book.id];
            const category = await conn.query(sql, values);
            book.category = [category.rows[0].category];
            if (book.hasEbook) {
                sql = 'SELECT * FROM ebooks WHERE book_id=$1 ORDER BY book_id DESC RETURNING *;';
                values = [book.id];
                const addEbook = await conn.query(sql, values);
                book.eBook = {
                    status: addEbook.rows[0].status,
                    format: [addEbook.rows[0].format]
                };
                return book;
            }
            return book;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public update = async (id: number, data: Book) => {
        try {
            const { title, isbn, author, publisher,
                genre, description,
                status, price, format, hasEbook } = data;

            const conn = await client.connect();
            const sql = 'UPDATE books SET title = $1, isbn = $2, author=$3, publisher=$4, genre=$5, description=$7, price=$8, format=$9, status=$10 hasEbook=$11  WHERE id = $12';
            const values = [title, isbn, author, publisher, genre, description, String(price), String(format), status, String(hasEbook)];
            const result = await conn.query(sql, values);
            return result.rows[0];
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public destroy = async (book_id: number) => {
        try {
            const destroy = await globalModel.Destroy(book_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new BookModel;