import  { Favorite } from '../models/favorite.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class FavoriteService {
    public create = async (data: Favorite) => {

        return await prisma.favorites.create({ data });
    };
    public getUserFav = async (user_id: number, book_id: number) => {
        return await prisma.favorites.findFirst({ where: { user_id, book_id } });
    };
    public index = async (user_id: number) => {
        return await prisma.favorites.findMany({ where: { user_id } });
    };

    public destroy = async (id: number) => {
        return await prisma.favorites.delete({ where: { id } });
    };
}
export default new FavoriteService;