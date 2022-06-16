import { NextFunction, Request, Response } from 'express';
import { response } from '../utile/response.util';
import catchAsync from '../utile/catchAsync';
import orderService from '../service/order.service';

class OrderController {
    public create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.create(req);
        res.status(201).json(response('Order Created Succesfully', result));
    });
    public index = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.index();
        res.status(200).json(response('Orders Found', result));
    });
    public getOrdersByUserID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   

        const result = await orderService.getOrdersByUserID(req.params.user_id);
        res.status(200).json(response('Order Found', result));
    });
    public getOrdersByBookID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.getOrdersByBookID(req.params.book_id);
        res.status(200).json(response('Order Found', result));
    });
    public getOrdersByOrderID = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.getOrdersByBookID(req.params.book_id);
        res.status(200).json(response('Order Found', result));
    });
    public update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.update(req.params.order_id, req.body);
        res.status(200).json(response('Order Updated Successfully', result));
    });
    public destroy = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await orderService.destroy(req.params.order_id);
        res.status(200).json(response('Order deleted Successfully', result));
    });
}
export default new OrderController;