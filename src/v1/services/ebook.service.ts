import globalModel from '../models/global.model';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import ebookModel, { Ebook } from '../models/ebook.model';

class EbookService {
    public create = async (req: Request): Promise<Ebook> => {
        const data: Ebook = req.body;
        const { status, format } = data;
        const { book_id } = req.params;
        data.book_id = book_id;
        const rules = {
            book_id: 'required|string',
            status: 'required|boolean',
            format: 'required|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} doesn't already exist`, 400);

        const ebook: Ebook = await ebookModel.create(data);
        return ebook;
    };

    public index = async (): Promise<Ebook[]> => {
        const ebook: Ebook[] = await ebookModel.index();
        return ebook;
    };

    public getEBookByBookID = async (req: Request): Promise<Ebook> => {
        const { book_id } = req.params;
        const findReview = await globalModel.CHECKMODEL('EBOOKS', 'book_id', book_id);

        if (!findReview) {
            throw new CustomError(`Ebook with BookID ${book_id} does not exist`, 404);
        }
        const ebook: Ebook = await ebookModel.getEBookByBookID(book_id);
        return ebook;
    };
    public destroy = async (req: Request) => {
        const {book_id} = req.params;         
        const findEBOOK = await globalModel.CHECKMODEL('EBOOKS', 'book_id', book_id);
        if (!findEBOOK) {
            throw new CustomError(`EBOOKS with bookID ${book_id} does not exist`, 404);
        }
        console.log(findEBOOK);
        
        const ebook = ebookModel.destroy(Number(book_id));
        if (!ebook) {
            throw new CustomError('Error ebook not deleted', 400);
        }
        return 'EBOOKS Successfully Deleted';
    };
}
export default new EbookService;