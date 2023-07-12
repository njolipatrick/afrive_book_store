import { Category } from '../models/category.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CategoryService {
    public create = async (data: Category) => {
        return prisma.categories.create({ data });
    };

    public index = async () => {
        return await prisma.categories.findMany({});
    };

    public getCategorysByName = async (name: string) => {
        return prisma.categories.findMany({ where: { name }, include: { books: true } });
    };

    public destroy = async (id: number) => {
        return await prisma.categories.delete({ where: { id } });
    };
}
export default new CategoryService;