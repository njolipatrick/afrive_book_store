import bookModel, { Book } from '../model/book.model';
import CustomError from '../utile/error.utile';

class BookService {
    public create = async (data: Book) => {
        if (!(data.ISBN && data.author && data.category && data.genre && data.name && data.publisher)) {
            throw new CustomError('Invalid Data input', 400);
        }
        const book = await bookModel.create(data);
        return book;
    };
    public index = async () => {
        const book = bookModel.index();
        return book;
    };
    public show = async (id: number) => {
        const book = bookModel.show(id);
        return book;
    };
}
export default new BookService;