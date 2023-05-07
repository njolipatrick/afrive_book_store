import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import ebookService from '../services/ebook.service';

class EbookController {
    // public create = catchAsync(async (req: Request, res: Response) => {
    //     const result = await ebookService.create(req);
    //     res.status(201).json(response('Ebook Created Succesfully', result));
    // });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await ebookService.index();
        res.status(200).json(response('Ebook Found', result));
    }); 
    public getEbookByBookID = catchAsync(async (req: Request, res: Response) => {
        const result = await ebookService.getEBookByBookID(req);
        res.status(200).json(response('Ebook Found', result));
    }); 
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await ebookService.destroy(req);
        res.status(200).json(response('Ebook deleted Successfully', result));
    });
}
export default new EbookController;