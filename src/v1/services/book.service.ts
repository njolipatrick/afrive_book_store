import bookModel, { Book, NEWBOOKOBJ } from '../models/book.model';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import globalModel from '../models/global.model';
import { decoder } from '../utiles/auth.utile';
class BookService {
    public create = async (req: Request) => {
        const data: Book = req.body;

        const rules = {
            title: 'required|string',
            image: 'required|string',
            author: 'required|string',
            price: 'required|string',
            description: 'required|string',
            status: 'required|boolean',
        };


        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }
        data.user_id = decoder(req)._id;
        data.img = data.image;

        const { author } = data;
        const findAuthor = await globalModel.CHECKMODEL('BOOKS', 'author', author);
        if (findAuthor) throw new CustomError(`Book with ${author} already exist`, 400);

        const book = await bookModel.create(data);
        return book;
    };
    public index = async (req: Request) => {
        const { limit } = req.query;
        if (typeof (limit) === 'string') {
            const data = Number(limit);
            if (isNaN(data) || data === 0) {
                const book = bookModel.index(20);
                return book;
            }
            const book = bookModel.index(data);
            return book;
        }
        const book = bookModel.index(20);
        return book;

    };
    public SearcBooksCategoryByName = async (req: Request) => {
        const { name } = req.body;
        const category = await bookModel.SearcBooksCategoryByName(name);
        return category;
    };
    public show = async (id: string) => {
        const findBook = await globalModel.CHECKMODEL('BOOKS', 'id', id);
        if (!findBook) {
            throw new CustomError(`Book with ${id} does not exist`, 404);
        }
        const book = await bookModel.show(Number(id));
        return book;
    };
    public update = async (id: string, data: Book) => {
        const findBook = await globalModel.CHECKMODEL('BOOKS', 'id', id);
        if (!findBook) {
            throw new CustomError(`Book with ${id} does not exist`, 404);
        }
        const book = await bookModel.update(Number(id), data);
        return book;
    };
    public destroy = async (id: string) => {
        const findBook = await globalModel.CHECKMODEL('BOOKS', 'id', id);
        if (!findBook) {
            throw new CustomError(`Book with ${id} does not exist`, 404);
        }
        const book = bookModel.destroy(Number(id));
        if (!book) {
            throw new CustomError('Error book not deleted', 400);
        }
        return 'Book Successfully Deleted';
    };
}
export default new BookService;

 