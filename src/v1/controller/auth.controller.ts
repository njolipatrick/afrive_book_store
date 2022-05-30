import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
import catchAsync from '../utile/catchAsync';
import { User } from '../model/auth.model';
import response from '../utile/response.util';
class AutheticationController {
    public register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.register(req.body);
        res.status(201).json(response('User Created, Please verify your email your account', result));
    });
    public login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.login(req.body);
        res.status(200).json(response('User Logged in Successfully', result));
    });
    public verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const data = { email: req.params.email, token: req.params.token };
        const result = await authService.verifyEmail(data);
        res.status(200).json(response('User Logged in Successfully', result));
    });
}

export default new AutheticationController; 