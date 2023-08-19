 
import { CustomError } from '../utiles/error.utile'; 
import {  PrismaClient, reviews } from '@prisma/client';
import userService from '../services/auth.service';
import { DataReview } from '../models/review.model.ts';
const prisma = new PrismaClient();
class ReviewService {
    public create = async (data: DataReview) => {
        return await prisma.reviews.create({ data });
    };


    public index = async () => {
        const reviews = await prisma.reviews.findMany({ take: 20 });
        return await this.indexer(reviews);
    };
    public indexer = async (reviews: reviews[]) => {
        await Promise.all(reviews.map(async review => {
            const user = await userService.getUserById(Number(review.user_id));
            return {
                review_id: review.id,
                name: `${user?.firstname} ${user?.lastname}`,
                comment: review.comment,
                startRating: review.rate,
                date: review.updated_at
            };
        }));
    };
    public getReviewsByUserID = async (user_id: number) => {
        const reviews = await prisma.reviews.findMany({ where: { user_id }, take: 20 });
        return await this.indexer(reviews);
    };
    public getReviewsByBookID = async (book_id: number) => {
        const reviews = await prisma.reviews.findMany({ where: { book_id }, take: 20 });
        return await this.indexer(reviews);
    };
    public getReviewById = async (id: number) => {
        const review = await prisma.reviews.findFirst({ where: { id }}); 
        return review; 
    };
    public update = async (data: {
        comment: string;
        user_id: number ,
        book_id: number,
        rate: number,
        date?: string
    }, id: number) => {
        return await prisma.reviews.update({ where: { id }, data });
    };
    public destroy = async (id: number) => {
        try {
            const destroy = await prisma.reviews.delete({ where: { id } });
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new ReviewService;