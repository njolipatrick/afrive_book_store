import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import globalModel from './global.model';
import { Category } from './category.model';
import { Ebook } from './ebook.model';
import { Rate, Review } from './review.model.ts';
import reviewService from '../services/review.service';
import { User } from './auth.model';
export type NEWBOOKOBJ = {
    title: string;
    image: string;
    author: string;
    price: string;
    description: string;
    status: string;
}

export type Book = {
    id: number;
    title: string;
    author: string;
    img?: string;
    image?: string;
    description: string;
    price: number;
    status: string;
    name?: string;
    format?: string;
    comment?: string;
    user_id?: number;
    rate?: string;
}
export type ReturnedBook = {
    id: number;
    title: string;
    author: string;
    img?: string;
    description: string;
    price: number,
    status: string;

    category?: string[],

    eBook?: { status?: boolean | null; format?: string | null };
    bookRating?: {
        averageRating?: number;
        ratings?: Rate[]
    }
}

class BookModel {

    public create = async (data: Book) => {
        try {
            const { rate, comment, user_id, name, format, title, author, img, description, price, status } = data;
            const conn = await client.connect();

            //Create book
            let sql = 'INSERT INTO books (title, author, image, description, price, status)VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;';
            let values = [title, author, img, description, price, status];
            const resB = await conn.query(sql, values);
            const book: Book = resB.rows[0];

            //Create Category
            sql = 'INSERT INTO categories (book_id, name)VALUES ($1, $2) RETURNING *;';
            values = [book.id, name];
            await conn.query(sql, values);
            // const category: Category = resC.rows[0];

            //Create Ebook
            sql = 'INSERT INTO ebooks (book_id, status, format)VALUES ($1, $2, $3) RETURNING *;';
            values = [book.id, status, format];
            const resE = await conn.query(sql, values);
            const ebook: Ebook = resE.rows[0];

            //Create Review
            sql = 'INSERT INTO reviews (comment, user_id, book_id, rate)VALUES ($1, $2, $3, $4) RETURNING *;';
            values = [comment, user_id, book.id, rate];
            const resR = await conn.query(sql, values);
            const review: Review = resR.rows[0];

            const category_array = await this.categories(book.id);
            const rating = await this.rating(book.id);

            const newBook: ReturnedBook = {
                id: book.id,
                title: book.title,
                author: book.author,
                img: book.image,
                description: book.description,
                price: book.price,
                status: book.status,
                category: category_array,
                eBook: { status: ebook.status, format: ebook.format },
                bookRating: {
                    averageRating: this.averageRating(rating),
                    ratings: rating //Return an array of all rating to book
                }
            };

            conn.release();
            return newBook;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public categories = async (book_id: string | number): Promise<string[]> => {
        //Get all Category
        const all_category: Category[] = await globalModel.FINDWHERE('CATEGORIES', 'book_id', book_id);

        const categories: string[] = [];

        all_category.forEach((category) => {
            categories.push(category.name);
        });
        return categories;
    };
    public rating = async (book_id: string | number): Promise<Rate[]> => {

        const reviews: Review[] = await globalModel.FINDWHERE('REVIEWS', 'book_id', book_id);

        const all_reviews: Rate[] = await Promise.all(reviews.map(async review => {
            const user: User = await globalModel.FINDONE('Users', 'id', review.user_id);

            const details: Rate = {
                name: `${user.firstname} ${user.lastname}`,
                comment: review.comment,
                startRating: review.rate
            };
            return details;
        }));

        return all_reviews;
    };
    public averageRating = (reviewsRate: Rate[]) => {
        let count = 0;
        reviewsRate.forEach(element => {
            count += element.startRating;
        });
        const length = reviewsRate.length;
        return count / length;
    };
    public index = async (limit: number) => {
        try {
            const books: Book[] = await globalModel.FINDALL('Books', limit); 

            const all_books = await Promise.all(books.map(async book => {
                const ebook: Ebook = await globalModel.FINDONE('ebooks', 'book_id', book.id);
                let EBOOK: Ebook = { status: null, format: null };
                if (ebook === undefined) {
                    EBOOK = { status: null, format: null };

                } else {
                    EBOOK = { status: ebook.status, format: ebook.format };

                }
                const rating = await this.rating(book.id);

                const category_array = await this.categories(book.id);
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
                        averageRating: this.averageRating(rating),
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
    public SearcBooksCategoryByName = async (name: string): Promise<Book[]> => {
        try {

            const categorys: Category[] = await globalModel.SEARCH('CATEGORIES', 'name', name, 20);

            const all_books = await Promise.all(categorys.map(async category => {
                const ebook: Ebook = await globalModel.FINDONE('CATEGORIES', 'book_id', category.book_id);
                const book: Book = await globalModel.FINDONE('BOOKS', 'id', category.book_id);

                let EBOOK: Ebook = { status: null, format: null };

                if (ebook === undefined) {
                    EBOOK = { status: null, format: null };
                } else {
                    EBOOK = { status: ebook.status, format: ebook.format };
                }
                const rating = await this.rating(category.book_id);

                const category_array = await this.categories(category.book_id);
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
                        averageRating: this.averageRating(rating),
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
    public getBooksByName = async (name: string): Promise<Book[]> => {
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
                const rating = await this.rating(category.book_id);

                const category_array = await this.categories(category.book_id);
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
                        averageRating: this.averageRating(rating),
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
    public show = async (id: number) => {
        try {

            const book: Book = await globalModel.FINDONE('BOOKS', 'id', id);

            const ebook: Ebook = await globalModel.FINDONE('EBOOKS', 'book_id', book.id);

            const category_array = await this.categories(book.id);

            let EBOOK: Ebook = { status: null, format: null };
            if (ebook === undefined) {
                EBOOK = { status: null, format: null };

            } else {
                EBOOK = { status: ebook.status, format: ebook.format };

            }

            const rating = await this.rating(book.id);

            const newBook: ReturnedBook = {
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
                    averageRating: this.averageRating(rating),
                    ratings: rating //Return an array of all rating to book
                }
            };

            return newBook;

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