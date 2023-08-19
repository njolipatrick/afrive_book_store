import globalModel from '../models/global.model';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import  { Ebook } from '../models/ebook.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class EbookService {
    public create = async (data: Ebook) => {
        try {
            return await prisma.ebooks.create({data});
         } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async () => {
        try {
            const ebooks = await prisma.ebooks.findMany({take: 20});
            return ebooks;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public getEBookByBookID = async (book_id: number)  => {
        try {
            return await prisma.ebooks.findFirst({where:{book_id}});
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };

    public destroy = async (id: number) => {
        try { 
            const destroy = await prisma.ebooks.delete({where:{id}});
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new EbookService;