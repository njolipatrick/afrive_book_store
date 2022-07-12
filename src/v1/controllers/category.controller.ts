import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import categoryService from '../services/category.service';

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
        const result = await categoryService.getCategorysByName(req);
        res.status(200).json(response('Category Found', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await categoryService.destroy(req);
        res.status(200).json(response('Category deleted Successfully', result));
    });
}
export default new OrderController;