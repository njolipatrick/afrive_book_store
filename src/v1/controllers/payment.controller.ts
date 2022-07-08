import { Request, Response } from 'express';
import { response } from '../utiles/response.util';
import catchAsync from '../utiles/catchAsync';
import paymentService from '../services/payment.service';

class PaymentController {
    public pay = catchAsync(async (req: Request, res: Response) => {
        const result = await paymentService.pay(req);
        res.status(200).json(response('Payment Link Created Succesfully', result));
    });
    public verifyPayment = catchAsync(async (req: Request, res: Response) => {
        const result = await paymentService.verifyPayment(req);
        res.status(200).json(response('Payment Verfied', result));
    });
}
export default new PaymentController;