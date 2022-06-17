import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import catchAsync from '../utiles/catchAsync';
import { User } from '../models/auth.model';
import { response } from '../utiles/response.util';
class AutheticationController {
    public googleAuthURL = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.googleAuthURL(req);
        res.status(201).json(response('Google Authentication URL sent', result));
    });
    public googleAuthUser = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.googleAuthUserSignUp(req);
        res.status(201).json(response('Google User', result));
    });
    public register = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.register(req);
        res.status(201).json(response('User Created, Please verify your email your account', result));
    });
    public login = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.login(req.body);
        res.status(200).json(response('User Logged in Successfully', result));
    });
    public verifyEmail = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.verifyEmail(req);
        res.status(200).json(response('User email has be successfully verified', result));
    });
    public SendResetPasswordMail = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.SendResetPasswordMail(req);
        res.status(200).json(response('Password Resent Email Sent Successfully', result));
    });
    public ResetPassword = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.ResetPassword(req);
        res.status(200).json(response('Password Successfully Updated', result));
    });
}

export default new AutheticationController; 