import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import ebookService from '../services/ebook.service';
import { Ebook } from '../models/ebook.model';

class EbookController {
    public create = async (req: Request, res: Response) => {
        const data: Ebook = req.body;
        const result = await ebookService.create(data);
        res.status(201).json(response('Ebook Created Succesfully', result));
    };
    public index = async (req: Request, res: Response) => {
        const result = await ebookService.index();
        res.status(200).json(response('Ebook Found', result));
    };
    public getEbookByBookID = async (req: Request, res: Response) => {
        const { book_id } = req.body;
        const result = await ebookService.getEBookByBookID(book_id as unknown as number);
        res.status(200).json(response('Ebook Found', result));
    };
    public destroy = async (req: Request, res: Response) => {
        const { ebook_id } = req.body;
        const result = await ebookService.destroy(ebook_id as unknown as number);
        res.status(200).json(response('Ebook deleted Successfully', result));
    };
}
export default new EbookController;