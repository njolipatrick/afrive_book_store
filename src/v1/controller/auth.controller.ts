import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
import catchAsync from '../utile/catchAsync';
import { User } from '../model/auth.model';
class AutheticationController {
    public register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.register(req.body);
        res.status(201).json({ status: 200, result: result, register: true });
    });
}

export default new AutheticationController; 