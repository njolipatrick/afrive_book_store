import globalModel from '../models/global.model';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import categoryModel, { Category } from '../models/category.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CategoryService {
    public create = async (data: Category) => {

        return prisma.categories.create({ data });
    };

    public index = async (): Promise<Category[]> => {
        const category = await categoryModel.index();

        return category;
    };

    // public getCategorysByName = async (req: Request) => {
    //     const { name } = req.body;
    //     const category = await categoryModel.getCategorysByName(name);
    //     return category;
    // };

    public destroy = async (req: Request) => {
        const { category_id } = req.params;
        const findCATEGORY = await globalModel.CHECKMODEL('CATEGORIES', 'id', category_id);
        if (!findCATEGORY) {
            throw new CustomError(`CATEGORY with ${category_id} does not exist`, 404);
        }
        const category = await categoryModel.destroy(Number(category_id));
        if (!category) {
            throw new CustomError('Error category not deleted', 400);
        }
        return 'Category Successfully Deleted';
    };
}
export default new CategoryService;