
import { Favorite } from '../models/favorite.model';
import { CustomError } from '../utiles/error.utile';
import { PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

class FavoriteService {
    public create = async (data: Favorite) => {
        try {
            return await prisma.favorites.create({ data });
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public getFavoriteByBookId = async (book_id:number)=>{
        return await prisma.favorites.findFirst({where:{book_id}});
    
    };
    public getFavoriteByUserId = async (user_id:number)=>{
        return await prisma.favorites.findFirst({where:{user_id}});
    };
    public index = async (user_id: number) => {
        try {
            return await prisma.favorites.findFirst({ where: { user_id } });
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public destroy = async (id: number) => {
        try {
            const destroy = await prisma.favorites.delete({ where: { id } });
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new FavoriteService;