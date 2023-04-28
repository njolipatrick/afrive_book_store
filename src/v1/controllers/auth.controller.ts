import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { catchAsync } from '../utiles/error.utile';
import { User } from '../models/auth.model';
import { response } from '../utiles/response.util';
import { codeGenerator } from '../utiles/generator.util';
import { PasswordManager } from '../utiles/password.manager.utile';
import { sendMail, sendMailv2 } from '../utiles/mailer.utile';
import { Prisma } from '@prisma/client';
import { isEmpty } from 'lodash';
import EmailTemplates from '../../../common/email.templates';
class AutheticationController {
    public googleAuthURL = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.googleAuthURL(req);
        res.status(201).json(response('Google Authentication URL Sent', result));
    });
    public googleAuthUser = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.googleAuthUserSignUp(req);
        res.status(201).json(response('User Logged in Successfully', result));
    });
    public register = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;

            const { firstname, lastname, password, email, username, password_confirmation } = data;
            // Check if user by email already exist
            const isUserExist = await authService.getUserByEmail(email);

            if (isUserExist) {
                return res.status(400).json(response(`User with email ${email} already exist`, isUserExist));
            }
            // encrypt password
            const hashPassword = await PasswordManager.hash(password);
            //Generate veriification token
            const verification_token = codeGenerator(36);
            // // Structure data and send to service
            const userData = {
                firstname,
                lastname,
                password: hashPassword,
                email,
                username,
                verification_token
            };

            const user = await authService.register(userData);

            if (isEmpty(user) === true) {
                return res.status(500).json(response('User not created, please reachout to admin'));
            }
            const message = new EmailTemplates();
            const mailOption = { content: message.welcomeEmail(firstname, verification_token), sentTo: email, subject: `Welcome ${firstname}` };
            await sendMailv2(mailOption);

            return res.status(201).json(response('User Created, Please verify your email your account', data));
        }
        catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    return res.status(500).json(response('There is a unique constraint violation, a new user cannot be created with this ' + (e as any)?.meta.target));
                }
            }
            return res.status(500).json(response('Internal server error', e));

        }
    };
    public login = async (req: Request, res: Response) => {
        // const result = await authService.login(req.body);
        // res.status(200).json(response('User Logged in Successfully', result));
    };
    public verifyEmail = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.verifyEmail(req);
        res.status(200).json(response('User email has be successfully verified', result));
    });
    public SendResetPasswordMail = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.SendResetPasswordMail(req);
        res.status(200).json(response('Password Reset Email Sent Successfully', result));
    });
    public ResetPassword = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.ResetPassword(req);
        res.status(200).json(response('Password Successfully Updated', result));
    });
}

export default new AutheticationController; 