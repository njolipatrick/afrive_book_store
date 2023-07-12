
import { Ebook } from '../models/ebook.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class EbookService {
    public create = async (data: Ebook) => {
        return await prisma.ebooks.create({ data });
    };

    public index = async () => {
        return await prisma.ebooks.findMany({});
    };

    public getEBookByBookID = async (book_id: number) => {
        return prisma.ebooks.findFirst({ where: { book_id } });
    };
    public destroy = async (id: number) => {
        return await prisma.ebooks.delete({ where: { id } });
    };
}
export default new EbookService;