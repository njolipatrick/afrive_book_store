import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import catchAsync from '../utiles/catchAsync';
import favoriteService from '../services/favorite.service';

class FavoriteController {
    public create = catchAsync(async (req: Request, res: Response) => {
        const result = await favoriteService.create(req);
        res.status(201).json(response('Favorite Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response) => {
        const result = await favoriteService.index(req);
        res.status(200).json(response('Favorites Found', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response) => {
        const result = await favoriteService.destroy(req.params.book_id as string);
        res.status(200).json(response('Favorite deleted Successfully', result));
    });
}
export default new FavoriteController;