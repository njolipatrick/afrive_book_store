
import { CreateUpdateReview } from '../models/review.model.ts';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class ReviewService {
    public create = async (data: CreateUpdateReview) => {
        return await prisma.reviews.create({ data });
    };

    public index = async () => {
        return await prisma.reviews.findMany({ include: { users: true } });
    };

    public getReviewsByUserID = async (user_id: number) => {
        return await prisma.reviews.findMany({ where: { user_id } });
    };
    public getReviewsByBookID = async (book_id: number) => {
        return await prisma.reviews.findMany({ where: { book_id } });
    };
    public getReviewsByReviewID = async (id: number) => {
        return await prisma.reviews.findFirst({ where: { id } });
    };
    public update = async (id: number, data: CreateUpdateReview) => {
        return await prisma.reviews.update({ where: { id }, data });
    };

    public destroy = async (id: number) => {
        return await prisma.reviews.delete({ where: { id } });
    };
}
export default new ReviewService;