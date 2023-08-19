import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import { CustomError } from '../utiles/error.utile';
import reviewService from '../services/review.service';
import { DataReview, Review } from '../models/review.model.ts';
import { decoder } from '../utiles/auth.utile';
import bookService from '../services/book.service';

class ReviewController {
    public create = async (req: Request, res: Response) => {
        try {
            const data: DataReview = req.body;
            const result = await reviewService.create(data);
            res.status(201).json(response('Review Created Succesfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public index = async (req: Request, res: Response) => {
        try {
            const result = await reviewService.index();
            res.status(200).json(response('Reviews Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getReviewsByUserID = async (req: Request, res: Response) => {
        try {
            const user_id = decoder(req)._id;
            const result = await reviewService.getReviewsByUserID(user_id);
            res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getReviewsByBookID = async (req: Request, res: Response) => {
        try {
            const { book_id } = req.params;
            const result = await reviewService.getReviewsByBookID(Number(book_id));
            res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public getReviewsByReviewID = async (req: Request, res: Response) => {
        try {
            const { review_id } = req.params;

            const result = await reviewService.getReviewById(Number(review_id));
            res.status(200).json(response('Review Found', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public update = async (req: Request, res: Response) => {
        try {
            const data: Review = req.body;
            data.book_id = Number(req.params.book_id);
            data.user_id = decoder(req)._id;

            const checkBook = await bookService.getBookById(data.book_id);

            if (!checkBook) {
                throw new CustomError('Book not found', 404);
            }
            const bookReview = await reviewService.getReviewById(Number(data.review_id));

            if (!bookReview) {
                throw new CustomError(`Review with ${data.review_id} does not exist`, 404);
            }

            if (bookReview?.user_id == data.user_id && bookReview?.book_id != data.book_id) {
                throw new CustomError('Review doesn\'t exist for this user or book', 404);
            }

            const result = await reviewService.update(data, decoder(req)._id);
            res.status(200).json(response('Review Updated Successfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
    public destroy = async (req: Request, res: Response) => {
        try {
            const result = await reviewService.destroy(Number(req.params.review_id));
            res.status(200).json(response('Review deleted Successfully', result));
        }
        catch (error) {
            return res.status(500).json(response('Internal server error', (error as any).message));
        }
    };
}
export default new ReviewController;