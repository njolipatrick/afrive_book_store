import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import categoryService from '../services/category.service';
import { Category } from '../models/category.model';

class CategoryController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: Category = req.body;
            const result = await categoryService.create(data);
            return res.status(201).json(response('Category Created Succesfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        const result = await categoryService.index();
        res.status(200).json(response('Categorys Found', result));
    };

    public getCategorysByName = async (req: Request, res: Response) => {
        const { name } = req.body;
        const result = await categoryService.getCategorysByName(name as unknown as string);
        res.status(200).json(response('Category Found', result));
    };
    public destroy = async (req: Request, res: Response) => {
        const { category_id } = req.params;
        const result = await categoryService.destroy(category_id as unknown as number);
        res.status(200).json(response('Category deleted Successfully', result));
    };
}
export default new CategoryController;