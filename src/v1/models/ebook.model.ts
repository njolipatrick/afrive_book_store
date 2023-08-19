import client from '../../../config/database';
import ebook from '../routes/ebook.router';
import { CustomError } from '../utiles/error.utile';
import globalModel from './global.model';
import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

export type Ebook = {
    id?: number;
    book_id?: number ;
    status?: boolean;
    format?: string;
} 