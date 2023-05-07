import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import bookService from '../services/book.service';
import { decoder } from '../utiles/auth.utile';
import { Book } from '../models/book.model';
import categoryService from '../services/category.service';
import ebookService from '../services/ebook.service';
import reviewService from '../services/review.service';

class BookController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: Book = req.body;

            const bookData = {
                price: Number(data.price),
                title: data.title as string,
                status: data.status  as string,
                description: data.description  as string,
                author: data.author  as string
            };

            const result = await bookService.create(bookData);
            if (!result) {
                throw new Error('NOT_CREATED');
            }
            const category = await categoryService.create({ name: data.category_name, book_id: result.id });
            if (!category) {
                throw new Error('NOT_CREATED');
            }
            const ebook = await ebookService.create({ status: Boolean(result.status), format: data.format, book_id: result.id });
            if (!ebook) {
                throw new Error('NOT_CREATED');
            }

            const review = await reviewService.create({
                book_id: result.id,
                user_id: Number(decoder(req)._id),
                comment: String(data.comment),
                rate: Number(data.rate)
            });
            if (!review) {
                throw new Error('NOT_CREATED');
            }
            const book = await bookService.show(result.id);

            return res.status(201).json(response('Book Created Succesfully', book));
        } catch (error) {
            if ((error as any).message === 'NOT_CREATED') {
                return res.status(500).json(response('Error occured. Book not created'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const result = await bookService.index();
            res.status(200).json(response('Books Found', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public show = async (req: Request, res: Response) => {
        try {
            const result = await bookService.show(Number(req.params.book_id));
            res.status(200).json(response('Book Found', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public update = async (req: Request, res: Response) => {
        try {
            const { title, author, image, description, price, status } = req.body;
            const book = await bookService.show(Number(req.params.book_id));
            if (!book) {
                throw new Error('NOT_FOUND');
            }
            const bookData = {
                price: Number(price),
                title,
                status,
                description,
                author
            };
            const result = await bookService.update(Number(req.params.book_id), bookData);
            if (!result) {
                throw new Error('UPDATE_FAILED');
            }
            return res.status(200).json(response('Book updated Successfully', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Book not found. may have already been deleted.'));
            }
            if ((error as any).message === 'UPDATE_FAILED') {
                return res.status(500).json(response('Error occured. Book not updated'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));

        }
    };
    public search = async (req: Request, res: Response) => {
        try {
            const search = req.query;
            const result = await bookService.search(String(search));
            return res.status(200).json(response('Books Found', result));
        } catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const book = await bookService.show(Number(req.params.book_id));
            if (!book) {
                throw new Error('NOT_FOUND');
            }
            const result = await bookService.destroy(Number(req.params.book_id));
            return res.status(200).json(response('Book deleted successfully', result));
        } catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Book not found. may have already been deleted.'));
            }
            if ((error as any).message === 'NOT_DELETED') {
                return res.status(500).json(response('Error occured. Book not deleted'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));

        }
    };
}
export default new BookController;