import globalModel from '../models/global.model';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import ebookModel, { Ebook } from '../models/ebook.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class EbookService {
    public create = async (data: Ebook) => {
        return await prisma.ebooks.create({ data });
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
        const { book_id } = req.params;
        const findEBOOK = await globalModel.CHECKMODEL('EBOOKS', 'book_id', book_id);
        if (!findEBOOK) {
            throw new CustomError(`EBOOKS with bookID ${book_id} does not exist`, 404);
        }

        const ebook = ebookModel.destroy(Number(book_id));
        if (!ebook) {
            throw new CustomError('Error ebook not deleted', 400);
        }
        return 'EBOOKS Successfully Deleted';
    };
}
export default new EbookService;