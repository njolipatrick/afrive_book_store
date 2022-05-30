import { NextFunction, Request, Response } from 'express';
import response from '../utile/response.util';
import catchAsync from '../utile/catchAsync';
import bookService from '../service/book.service';

class BookController {
    public create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await bookService.create(req.body);
        res.status(201).json(response('Book Created, Please verify your email your account', result));
    });

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await bookService.index();
        res.status(201).json(response('Book Created, Please verify your email your account', result));
    });
    public show = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await bookService.show(Number(req.params.id));
        res.status(201).json(response('Book Created, Please verify your email your account', result));
    });
}
export default new BookController;