import globalModel from '../models/global.model';
import reviewModel, { Review, Rate } from '../models/review.model.ts';
import CustomError from '../utiles/error.utile';
import Validator from 'validatorjs';
import { Request } from 'express';

class ReviewService {
    public create = async (req: Request): Promise<Rate> => {
        const data: Review = req.body;
        const { comment, rate } = data;
        const { user_id, book_id } = req.params;
        data.user_id = Number(user_id);
        data.book_id = Number(book_id);
        data.rate = Number(rate);
        
        const rules = {
            book_id: 'required|integer',
            user_id: 'required|integer',
            comment: 'required|string',
            rate: 'required|integer|max:5'
        };
        if(rate > 5)throw new CustomError('Rate cannot be more that 5', 400);
        const validation = new Validator(data, rules);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        } 

        const CheckBook = await globalModel.CHECKMODEL('Books', 'id', book_id);
        if (!CheckBook) throw new CustomError(`Book with ${book_id} already exist`, 400);

        const CheckUser = await globalModel.CHECKMODEL('Users', 'id', user_id);
        if (!CheckUser) throw new CustomError(`User with ${user_id} doesn't exist`, 400);

        const review: Rate = await reviewModel.create(data);
        return review;
    };

    public index = async (): Promise<Rate[]> => {
        const review: Rate[] = await reviewModel.index();
        return review;
    };

    public getReviewsByUserID = async (user_id: string): Promise<Rate[]> => {
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
    public update = async (id: string, data: Review): Promise<Rate> => {
        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'id', id);
        if (!findReview) {
            throw new CustomError(`Review with ${id} does not exist`, 404);
        }
        const review: Rate = await reviewModel.update(id, data);
        return review;
    };

    public destroy = async (id: string) => {
        const findReview = await globalModel.CHECKMODEL('REVIEWS', 'id', id);
        if (!findReview) {
            throw new CustomError(`Review with ${id} does not exist`, 404);
        }
        const review = reviewModel.destroy(Number(id));
        if (!review) {
            throw new CustomError('Error review not deleted', 400);
        }
        return 'Review Successfully Deleted';
    };
}
export default new ReviewService;