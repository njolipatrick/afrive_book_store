import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import categoryService from '../services/category.service';
import { Category } from '../models/category.model';

class OrderController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: Category = req.body;
            const result = await categoryService.create(data);
            res.status(201).json(response('Category Created Succesfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const result = await categoryService.index();
            res.status(200).json(response('Categorys Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };

    public getCategorysByName = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const result = await categoryService.getCategoryByName(name);
            res.status(200).json(response('Category Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await categoryService.destroy(Number(id));
            res.status(200).json(response('Category deleted Successfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new OrderController;