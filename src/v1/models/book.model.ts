import { Category } from './category.model';
import { Ebook } from './ebook.model';
import { Review } from './review.model.ts';

export type Book = {
    id: number;
    title?: string|null;
    author?: string|null;
    img?: string;
    image?: string|null;
    description?: string|null;
    price?: number|null;
    status?: string|null;
    category_name?: string;
    format?: string;
    comment?: string;
    user_id?: string;
    rate?: string; 
}

export interface newBook { title?: string, image?: string, author?: string, description?: string, prices?: number, status?: string }
/*
 
class BookModel {

    
    
    public rating = async (book_id: string | number): Promise<Rate[]> => {

        const reviews: Review[] = await globalModel.FINDWHERE('REVIEWS', 'book_id', book_id);

        const all_reviews: Rate[] = await Promise.all(reviews.map(async review => {
            const user: User = await globalModel.FINDONE('Users', 'id', review.user_id);

            const details: Rate = {
                review_id: review.id,
                name: `${user.firstname} ${user.lastname}`,
                comment: review.comment,
                startRating: review.rate > 0 ? review.rate : 1,
                date: review.updated_at
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
        const rate = count / length;
        return rate > 0 ? rate : 1;
    };
    public index = async (limit: number) => {
        try {
            const books: Book[] = await globalModel.FINDALL('Books', limit);

            const all_books = await Promise.all(books.map(async book => {
                const ebook: Ebook = await globalModel.FINDONE('ebooks', 'book_id', book.id);
                let newEbook: Ebook = { status: null, format: null };
                if (ebook === undefined) {
                    newEbook = { status: null, format: null };

                } else {
                    newEbook = { status: ebook.status, format: [String(ebook.format)] };

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
                    eBook: newEbook,
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
    public SearcBooksCategoryByName = async (name: string): Promise<ReturnedBook[]> => {
        try {

            const categorys: Category[] = await globalModel.SEARCH('CATEGORIES', 'name', name, 20);

            const all_books = await Promise.all(categorys.map(async category => {
                const ebook: Ebook = await globalModel.FINDONE('CATEGORIES', 'book_id', category.book_id);
                const book: Book = await globalModel.FINDONE('BOOKS', 'id', category.book_id);

                let newEbook: Ebook = { status: null, format: null };

                if (ebook === undefined) {
                    newEbook = { status: null, format: null };
                } else {
                    newEbook = { status: ebook.status, format: [String(ebook.format)] };
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
                    eBook: newEbook,
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
    public SearcBooksByAuthor = async (author: string): Promise<ReturnedBook[]> => {
        try {
            const books: Book[] = await globalModel.SEARCH('Books', 'author', author, 3);

            const all_books = await Promise.all(books.map(async book => {
                const ebook: Ebook = await globalModel.FINDONE('EBOOKS', 'book_id', book.id);

                let newEbook: Ebook = { status: null, format: null };

                if (ebook === undefined) {
                    newEbook = { status: null, format: null };
                } else {
                    newEbook = { status: ebook.status, format: [String(ebook.format)] };
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
                    eBook: newEbook,
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
    public SearcBooksByTitle = async (title: string): Promise<ReturnedBook[]> => {
        try {

            const books: Book[] = await globalModel.SEARCH('Books', 'title', title, 10);

            const all_books = await Promise.all(books.map(async book => {
                const ebook: Ebook = await globalModel.FINDONE('EBOOKS', 'book_id', book.id);

                let newEbook: Ebook = { status: null, format: null };

                if (ebook === undefined) {
                    newEbook = { status: null, format: null };
                } else {
                    newEbook = { status: ebook.status, format: [String(ebook.format)] };
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
                    eBook: newEbook,
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

            let newEbook: Ebook = { status: null, format: null };

            if (ebook === undefined) {
                newEbook = { status: null, format: null };
            } else {
                newEbook = { status: ebook.status, format: [String(ebook.format)] };
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
                eBook: newEbook,
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
*/