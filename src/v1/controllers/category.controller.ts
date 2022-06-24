import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import catchAsync from '../utiles/catchAsync';
import categoryService from '../services/category.model';

class OrderController {
    public create = catchAsync(async (req: Request, res: Response) => {
        const result = await categoryService.create(req);
        res.status(201).json(response('Category Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await categoryService.index();
        res.status(200).json(response('Categorys Found', result));
    });

    public getCategorysByName = catchAsync(async (req: Request, res: Response) => {
        const result = await categoryService.getCategorysByName(req.params.book_id);
        res.status(200).json(response('Category Found', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await categoryService.destroy(req.params.order_id);
        res.status(200).json(response('Category deleted Successfully', result));
    });
}
export default new OrderController;