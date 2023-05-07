import globalModel from '../models/global.model';
import reviewModel, { Review, Rate } from '../models/review.model.ts';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { decoder } from '../utiles/auth.utile';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
class ReviewService {
    public create = async (data: {
        book_id: number,
        user_id: number,
        comment: string,
        rate: number
    }) => {
        return await prisma.reviews.create({ data });
    };
    

    public index = async (): Promise<Rate[]> => {
        const review: Rate[] = await reviewModel.index();
        return review;
    };

    public getReviewsByUserID = async (req: Request): Promise<Rate[]> => {
        const user_id = decoder(req)._id;
        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'user_id', user_id);
        if (!findReview) {
            throw new CustomError(`Review with UserID ${user_id} does not exist`, 404);
        }
        const review: Rate[] = await reviewModel.getReviewsByUserID(user_id as unknown as string);
        return review;
    };
    public getReviewsByBookID = async (book_id: string): Promise<Rate[]> => {
        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'book_id', book_id);

        if (!findReview) {
            throw new CustomError(`Review with BookID ${book_id} does not exist`, 404);
        }

        const review: Rate[] = await reviewModel.getReviewsByBookID(book_id);
        return review;
    };
    public update = async (req: Request): Promise<Rate> => {
        const data: Review = req.body;
        data.book_id = req.params.book_id;
        data.user_id = decoder(req)._id;

        const rules = {
            book_id: 'integer',
            user_id: 'integer',
            comment: 'string',
            rate: 'integer|max:5',
            review_id: 'integer'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const CheckBook = await globalModel.CHECKMODEL('BOOKS', 'id', data.book_id);

        if (!CheckBook) {
            throw new CustomError('Book not found', 404);
        }
        const bookReview = await globalModel.FINDONE('REVIEWS', 'id', data.review_id);

        if (bookReview.user_id == data.user_id && bookReview.book_id != data.book_id) {
            throw new CustomError('Review doesn\'t exist for this user or book', 404);
        }


        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'id', data.review_id);
        if (!findReview) {
            throw new CustomError(`Review with ${data.review_id} does not exist`, 404);
        }
        const review: Rate = await reviewModel.update(data);
        return review;
    };

    public destroy = async (id: string) => {
        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'id', id);
        if (!findReview) {
            throw new CustomError(`Review with ${id} does not exist`, 404);
        }
        const review = reviewModel.destroy(id);
        if (!review) {
            throw new CustomError('Error review not deleted', 400);
        }
        return 'Review Successfully Deleted';
    };
}
export default new ReviewService;