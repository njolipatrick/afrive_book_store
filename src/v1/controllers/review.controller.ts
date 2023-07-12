import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { catchAsync } from '../utiles/error.utile';
import reviewService from '../services/review.service';
import { decoder } from '../utiles/auth.utile';
import bookService from '../services/book.service';
import { CreateUpdateReview, ReviewX } from '../models/review.model.ts';

class ReviewController {
    public create = async (req: Request, res: Response) => {
        try {
            const user_review: CreateUpdateReview = req.body;

            user_review.user_id = decoder(req)._id;
            const book = await bookService.getBookById(user_review.book_id);
            if (!book) {
                throw new Error('NOT_FOUND');
            }
            const result = await reviewService.create(user_review);
            if (!result) {
                throw new Error('NOT_CREATED');
            }
            return res.status(201).json(response('Review Created Succesfully', result));
        } catch (error) {
            if ((error as any).message === 'NOT_CREATED') {
                return res.status(500).json(response('Error occured. Review not created'));
            }
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        const result = await reviewService.index();
        res.status(200).json(response('Reviews Found', result));
    };
    public getReviewsByUserID = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;

            const result = await reviewService.getReviewsByUserID(user_id as unknown as number);

            if (!result) {
                throw new Error(`Review with UserID ${user_id} does not exist`);
            }

            return res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getReviewsByBookID = async (req: Request, res: Response) => {

        try {
            const { book_id } = req.params;
            const result = await reviewService.getReviewsByBookID(book_id as unknown as number);

            if (!result) {
                throw new Error(`Review with book Id ${book_id} does not exist`);
            }

            return res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getReviewsByReviewID = async (req: Request, res: Response) => {

        try {
            const { review_id } = req.params;
            const result = await reviewService.getReviewsByBookID(review_id as unknown as number);

            if (!result) {
                throw new Error(`Review with Id ${review_id} does not exist`);
            }

            return res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public update = async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;
            const { comment, rate, book_id } = req.body;
            const update: CreateUpdateReview = {
                comment: comment as unknown as string,
                book_id: book_id as unknown as number,
                rate: rate as unknown as number,
                user_id: decoder(req)._id
            };
            const book = await bookService.getBookById(update.book_id);
            if (!book) {
                throw new Error('NOT_FOUND_BOOK');
            }
            const check_review = await reviewService.getReviewsByReviewID(review_id as unknown as number);
            if (!check_review) {
                throw new Error('NOT_FOUND');
            }
            if (check_review.user_id == update.user_id && check_review.book_id != update.book_id) {
                throw new Error('UN_AUTHORIZED');
            }

            const review = await reviewService.update(review_id as unknown as number, update);

            if (!review) {
                throw new Error(`Review with Id ${review_id} does not exist`);
            }

            return res.status(200).json(response('Review Updated', review));
        }
        catch (error) {
            if ((error as any).message === 'NOT_FOUND_BOOK') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('Error occured. Review not found'));
            }
            if ((error as any).message === 'UN_AUTHORIZED') {
                return res.status(404).json(response('Error occured. Access denied'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;
            const result = await reviewService.destroy(review_id as unknown as number);
            res.status(200).json(response('Review deleted Successfully', result));
        }
        catch (error) {

            if ((error as any).message === 'UN_AUTHORIZED') {
                return res.status(404).json(response('Error occured. Access denied'));
            }
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new ReviewController;
