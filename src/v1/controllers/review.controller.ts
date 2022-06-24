import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import catchAsync from '../utiles/catchAsync';
import reviewService from '../services/review.service';

class ReviewController {
    public create = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.create(req);
        res.status(201).json(response('Review Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.index();
        res.status(200).json(response('Reviews Found', result));
    });
    public getReviewsByUserID = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.getReviewsByUserID(req.params.user_id);
        res.status(200).json(response('Review Found', result));
    });
    public getReviewsByBookID = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.getReviewsByBookID(req.params.book_id);
        res.status(200).json(response('Review Found', result));
    });
    public getReviewsByReviewID = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.getReviewsByBookID(req.params.book_id);
        res.status(200).json(response('Review Found', result));
    });
    public update = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.update(req.params.review_id, req.body);
        res.status(200).json(response('Review Updated Successfully', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await reviewService.destroy(req.params.review_id);
        res.status(200).json(response('Review deleted Successfully', result));
    });
}
export default new ReviewController;