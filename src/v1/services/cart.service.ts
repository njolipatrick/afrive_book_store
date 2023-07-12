
import { Cart } from '../models/cart.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class CartService {
    public create = async (data: Cart) => {
        return await prisma.carts.create({ data });
    };

    public index = async (user_id: number) => {
        return prisma.carts.findMany({ where: { user_id } });
    };

    public getUserCart = async (user_id: number, book_id: number) => {
        return await prisma.carts.findFirst({ where: { user_id, book_id } });
    };
    public destroy = async (id: number) => {
        return await prisma.carts.delete({ where: { id } });
    };
}
export default new CartService;