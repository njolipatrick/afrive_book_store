import globalModel from '../models/global.model';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import  { Category } from '../models/category.model';
import { PrismaClient } from '@prisma/client';
import ebookService from './ebook.service';
import bookService from './book.service';
const prisma = new PrismaClient();

class CategoryService {
    public create = async (data: Category) => {
        return prisma.categories.create({ data });
    };

    public index = async () => {
        const category = await prisma.categories.findMany({});

        return category;
    }; 

    public getCategoryByName = async (name: string) => {
        const categories = await prisma.categories.findMany({ where: { name: { search: name } } });
        categories.map(async (category) => {
            const book_id = Number(category.book_id);
            const ebook = await ebookService.getEBookByBookID(book_id);
            const book = await bookService.getBookById(book_id);
            const rating = await bookService.rating(book_id);
            const category_array = await bookService.categories(book_id);
            return {
                id: book?.id,
                title: book?.title,
                author: book?.author,
                img: book?.image,
                description: book?.description,
                price: book?.price,
                status: book?.status,
                category: category_array,
                eBook: ebook ?? { status: null, format: null },
                bookRating: {
                    averageRating: bookService.averageRating(rating),
                    ratings: rating //Return an array of all rating to book
                }
            };
        });
    };

    public destroy = async (id: number) => {
        const category = await prisma.categories.delete({ where: { id } });
        if (!category) {
            throw new Error('NOT_DELETED');
        }
        return true;
    };
}
export default new CategoryService;