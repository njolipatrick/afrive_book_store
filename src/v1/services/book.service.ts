
import { Prisma, PrismaClient, books } from '@prisma/client';
const prisma = new PrismaClient();
class BookService {
    public create = async (data: { title?: string, image?: string, author?: string, description?: string, prices?: number, status?: string }) => {

        const book = await prisma.books.create({
            data
        });
        return book;
    };
    public index = async () => {
        return await prisma.books.findMany({ include: { ebooks: true, categories: true, reviews: true } });
    };
    public show = async (book_id: number) => {
        return await prisma.books.findFirst({ where: { id: book_id }, include: { ebooks: true, categories: true, reviews: true } });
    };
    public search = async (search: string) => {
        const books: Prisma.PrismaPromise<books[]> = prisma.books.findMany({ where: { title: search } });
        const categories = prisma.books.findMany({ where: { title: search } });
        const authors = prisma.books.findMany({ where: { author: search } });
        return { books, categories, authors };
    };
    public update = async (book_id: number, data: { title?: string, image?: string, author?: string, description?: string, prices?: number, status?: string }) => {
        console.log(data);

        return prisma.books.update({
            where: { id: book_id },
            data
        });
    };
    public destroy = async (book_id: number) => {
        const book = await prisma.books.delete({ where: { id: book_id } });
        if (!book) {
            throw new Error('NOT_DELETED');
        }
        return true;
    };
}
export default new BookService;

