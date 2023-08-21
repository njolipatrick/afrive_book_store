import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import ebookService from '../services/ebook.service';
import { Ebook } from '../models/ebook.model';

class EbookController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: Ebook = req.body;
            const result = await ebookService.create(data);
            res.status(201).json(response('Ebook Created Succesfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const result = await ebookService.index();
            res.status(200).json(response('Ebook Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getEbookByBookID = async (req: Request, res: Response) => {
        try {
            const { book_id } = req.params;
            const result = await ebookService.getEBookByBookID(Number(book_id));
            res.status(200).json(response('Ebook Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await ebookService.destroy(Number(id));
            res.status(200).json(response('Ebook deleted Successfully', result));  
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new EbookController;