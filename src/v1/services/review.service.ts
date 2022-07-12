import globalModel from '../models/global.model';
import reviewModel, { Review, Rate } from '../models/review.model.ts';
import { CustomError } from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';
import { decoder } from '../utiles/auth.utile'; 

class ReviewService {
    public create = async (req: Request): Promise<Rate> => {

        const data: Review = {
            book_id: req.params.book_id,
            user_id: decoder(req)._id,
            comment: req.body.comment,
            rate: req.body.rate
        };
        const { rate, user_id, comment, book_id } = data;
        const rules = {
            book_id: 'required|integer',
            user_id: 'required|integer',
            comment: 'required|string',
            rate: 'required|integer|max:5'
        };

        if (rate > 5) throw new CustomError('Rate cannot be more that 5', 400);
        const validation = new Validator(data, rules);

        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const bookReview = await globalModel.FINDONE('REVIEWS', 'user_id', data.user_id);

        if (bookReview.book_id == data.book_id && bookReview.user_id == data.user_id) {
            throw new CustomError('Review already exists for this book. User can only update review', 409);
        }

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} doesn't exist`, 404);

        const review: Rate = await reviewModel.create(data);
        return review;
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
        const review: Rate[] = await reviewModel.getReviewsByUserID(user_id);
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