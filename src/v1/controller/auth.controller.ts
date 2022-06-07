import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
import catchAsync from '../utile/catchAsync';
import { User } from '../model/auth.model';
import {response} from '../utile/response.util';
class AutheticationController {
    public register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.register(req);
        res.status(201).json(response('User Created, Please verify your email your account', result));
    });
    public login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.login(req.body);
        res.status(200).json(response('User Logged in Successfully', result));
    });
    public verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.verifyEmail(req);
        res.status(200).json(response('User email has be successfully verified', result));
    });
    public SendResetPasswordMail = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.SendResetPasswordMail(req);
        res.status(200).json(response('Password Resent Email Sent Successfully', result));
    });
    public ResetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined> => {
        const result = await authService.ResetPassword(req);
        res.status(200).json(response('Password Successfully Updated', result));
    });
}

export default new AutheticationController; 