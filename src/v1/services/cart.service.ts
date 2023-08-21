import { Cart, CartDetails } from '../models/cart.model';
import { PrismaClient, carts } from '@prisma/client';
import userService from '../services/auth.service';
const prisma = new PrismaClient();

class CartService {
    public create = async (data: { book_id: number, user_id: number }) => {
        return await prisma.carts.create({ data });
    };

    public index = async (user_id: number)=> {
        const carts = await prisma.carts.findMany({ where: { user_id } });
        const all_cart = await Promise.all(carts.map(async (item) => {
            const book = await prisma.books.findUnique({ where: { id: Number(item.book_id) } });
            const user = await userService.getUserById(Number(item.user_id));
            return {
                id: item.id,
                book_name: book?.title as unknown as string,
                user_name: user?.username as unknown as string,
                created_at: item.created_at as unknown as string
            };
        }));
        return all_cart;
    };
    public show = async (user_id: number, id: number) => {
        return prisma.carts.findFirst({ where: { id, user_id } });
    };
    public findByBookIdAndUserId = async (book_id: number, user_id: number) => {
        return prisma.carts.findFirst({ where: { book_id, user_id } });
    };

    public destroy = async (id: number) => {
        const cart = await prisma.carts.delete({ where: { id } });
        if (!cart) {
            throw new Error('NOT_DELETED');
        }
        return true;
    };
}
export default new CartService;