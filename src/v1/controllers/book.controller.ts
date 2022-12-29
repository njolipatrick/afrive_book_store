import {  Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import bookService from '../services/book.service';

class BookController {
    public create = catchAsync(async (req: Request, res: Response) => {
        const result = await bookService.create(req);
        res.status(201).json(response('Book Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await bookService.index(req);
        res.status(200).json(response('Books Found', result));
    });
    public show = catchAsync(async (req: Request, res: Response) => {
        const result = await bookService.show(req.params.id);
        res.status(200).json(response('Book Found', result));
    });
    public update = catchAsync(async (req: Request, res: Response) => {
        const result = await bookService.update(req.params.id, req.body);
        res.status(200).json(response('Book updated Successfully', result));
    });
    public SearcBooksCategoryByName = catchAsync(async (req: Request, res: Response) => {      
        const result = await bookService.SearcBooksCategoryByName(req);
        res.status(200).json(response('Books Found', result));
    });
    public SearcBooksByTitle = catchAsync(async (req: Request, res: Response) => {      
        const result = await bookService.SearcBooksByTitle(req);
        res.status(200).json(response('Books Found', result));
    });
    public SearcBooksByAuthor = catchAsync(async (req: Request, res: Response) => {      
        const result = await bookService.SearcBooksByAuthor(req);
        res.status(200).json(response('Books Found', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await bookService.destroy(req.params.id);
        res.status(200).json(response('Book deleted Successfully', result));
    });
}
export default new BookController;