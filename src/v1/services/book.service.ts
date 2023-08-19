
import { Prisma, PrismaClient, books } from '@prisma/client';
import { newBook } from '../models/book.model';
import { Rate } from '../models/review.model.ts';
const prisma = new PrismaClient();
class BookService {
    public create = async (data: newBook) => {

        return await prisma.books.create({
            data
        });

    };
    public index = async () => {
        return await prisma.books.findMany({ include: { ebooks: true, categories: true, reviews: true } });
    };
    public show = async (book_id: number) => {
        return await prisma.books.findFirst({ where: { id: book_id }, include: { ebooks: true, categories: true, reviews: true } });
    };
    public getBookById = async (book_id: number) => {
        return await prisma.books.findFirst({ where: { id: book_id } });
    };
    public search = async (search: string) => {
        const books = prisma.books.findMany({ where: { title: search } });
        const categories = prisma.books.findMany({ where: { title: search } });
        const authors = prisma.books.findMany({ where: { author: search } });
        return { books, categories, authors };
    };
    public update = async (id: number, data: newBook) => {
        return prisma.books.update({
            where: { id  },
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
    public categories = async (book_id: number): Promise<string[]> => {
        //Get all Category
        const all_category = await prisma.categories.findMany({ where: { book_id } });

        const categories: string[] = [];

        all_category.forEach((category) => {
            categories.push(String(category.name));
        });
        return categories;
    };
    public rating = async (book_id: number): Promise<Rate[]> => {
        const reviews = await prisma.reviews.findMany({ where: { book_id } });

        return await Promise.all(reviews.map(async (review) => {
            const user = await prisma.users.findUnique({ where: { id: Number(review.user_id) } });
            return {
                review_id: review.id,
                name: `${user?.firstname} ${user?.lastname}`,
                comment: String(review.comment),
                startRating: Number(review?.rate) > 0 ? Number(review?.rate) : 1,
                date: String(review?.updated_at)
            };
        }));

    }; 
    public averageRating = async (reviewsRate: Rate[]) => {
        let count = 0;
        reviewsRate.forEach(element => {
            count += element.startRating;
        });
        const length = reviewsRate.length;
        const rate = count / length;
        return rate > 0 ? rate : 1;
    };
}
export default new BookService;

