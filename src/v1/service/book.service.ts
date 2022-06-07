import authModel, { User } from '../model/auth.model';
import bookModel, { Book } from '../model/book.model';
import CustomError from '../utile/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { upload } from '../utile/cloudinary.utile';
class BookService {
    public create = async (req: Request) => {
        const data: Book = req.body;
        const image_link = String(req.file?.path);

        data.image_link = await upload(image_link, 'abs_books_image');

        const rules = {
            title: 'required|string',
            isbn: 'required|string',
            author: 'required|string',
            price: 'required|string',
            description: 'required|string',
            publisher: 'required|string',
            hasEbook: 'required|boolean',
            image_link: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const { isbn, author } = data;
        const findBook = await authModel.findModel('BOOKS', 'isbn', isbn);
        if (findBook) throw new CustomError(`Book with ${isbn} already exist`, 400);

        const findAuthor = await authModel.findModel('BOOKS', 'author', author);
        if (findAuthor) throw new CustomError(`Book with ${author} already exist`, 400);

        const book = await bookModel.create(data);
        return book;
    };
    public index = async () => {
        const book = bookModel.index();
        //return array length as books number found after kingsley sends in DS
        return book;
    };
    public show = async (id: string) => {
        const findBook = await authModel.findModel('BOOKS', 'id', id);
        if (!findBook) {
            throw new CustomError(`Book with ${id} does not exist`, 404);
        }
        const book = await bookModel.show(Number(id));
        return book;
    };
    public update = async (id: string, data: Book) => {
        const findBook = await authModel.findModel('BOOKS', 'id', id);
        if (!findBook) {
            throw new CustomError(`Book with ${id} does not exist`, 404);
        }
        const book = await bookModel.update(Number(id), data);
        return book;
    };
    public destroy = async (id: string) => {
        const findBook = await authModel.findModel('BOOKS', 'id', id);
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