import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { catchAsync } from '../utiles/error.utile';
import { User } from '../models/auth.model';
import { response } from '../utiles/response.util';
import { codeGenerator } from '../utiles/generator.util';
import { PasswordManager } from '../utiles/password.manager.utile';
import { sendMailv2 } from '../utiles/mailer.utile';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import EmailTemplates from '../../../common/email.templates';
import { sign } from 'jsonwebtoken';
const { TOKEN_SECRET } = process.env;
class AutheticationController {
    public googleAuthURL = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const result = await authService.googleAuthURL();
        res.status(201).json(response('Google Authentication URL Sent', result));
    });
    public googleAuthUser = catchAsync(async (req: Request, res: Response): Promise<void | User | undefined> => {
        const { id, email } = await authService.googleAuthUserSignUp(req);

        const login = await this.loginFunction(email, id);

        res.status(200).json(response('User Logged in Successfully', login));
    });
    public register = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;

            const { firstname, lastname, password, email, username } = data;
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

            if (!user) {
                return res.status(500).json(response('User not created, please reachout to admin'));
            }
            const message = new EmailTemplates();
            const mailOption = { content: message.welcomeEmail(firstname, verification_token), sentTo: email, subject: `Welcome ${firstname}` };
            await sendMailv2(mailOption);

            //Login the registered user
            const login = await this.loginFunction(email, String(password));
            return res.status(201).json(response('User Created, Please verify your email your account', login));
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
        try {
            const { email, password } = req.body;

            const login = await this.loginFunction(email, password);

            res.status(200).json(response('User Logged in Successfully', login));

        } catch (error) {

            return res.status(500).json(response('Internal server error', error, false));
        }
    };
    public loginFunction = async (email: string, password: string) => {
        //validate is email exist
        const user = await authService.getUserByEmail(email);
        if (!user) {
            throw new Error('NOT_FOUND');
        }
        //validate if password is corrrect
        const encrypt = await PasswordManager.compare(String(user.password), password);
        if (!encrypt) {
            throw new Error('ENCRPYTION_FAILED');
        }
        const token = sign({
            _id: user.id,
            role: user.role
        }, String(TOKEN_SECRET), {
            expiresIn: '7d'
        });

        //generate auth token and send to the user
        (user as any).token = token;
        const login = _.omit(user, 'password', 'verification_token');
        return login;
    };
    public verifyEmail = async (req: Request, res: Response) => {
        try {
            const { email, token } = req.query;

            const user = await authService.getUserByEmailAndToken(email as string, token as string);
            if (!user) {
                throw new Error('NOT_FOUND');
            }

            const result = await authService.verifyEmail(email as string);

            return res.status(200).json(response('User email has been successfully verified', result));
        } catch (error:any) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json(response('User not found'));
            }
            return res.status(500).json(response('Internal server error', error));
        }
    };
    public SendResetPasswordMail = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const findUser = await authService.getUserByEmail(email as string);
            if (!findUser) throw new Error('NOT_FOUND');

            const token = codeGenerator(36);

            const message = new EmailTemplates();
            const mailOption = { content: message.requestResetPassword(findUser.firstname as string, token), sentTo: email, subject: 'Requested Password Reset' };
            await sendMailv2(mailOption);


            await authService.requestPasswordReset(email, token);

            return res.status(200).json(response('Password Reset Email Sent Successfully'));
        } catch (error:any) {
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json(response('User not found'));
            }
            return res.status(500).json(response('Internal server error', error));
        }
    };
    public ResetPassword = async (req: Request, res: Response) => {

        try {
            const { email, token, password } = req.body;
            //get the user
            const user = await authService.getUserByEmail(email);
            if (!user) throw new Error('NOT_FOUND');

            if (token != user.verification_token) throw new Error('INVALID_TOKEN');

            const hashpassword = await PasswordManager.hash(password);

            const userUpdate = await authService.ResetPassword({
                email, password: hashpassword
            });

            const message = new EmailTemplates();
            const mailOption = { content: message.successResetPassword(user.firstname as string), sentTo: email, subject: 'Password Reset Successful' };
            await sendMailv2(mailOption);


            res.status(200).json(response('Password Successfully Updated'));
        } catch (error) {
            if ((error as any).message === 'INVALID_TOKEN') {
                return res.status(400).json(response('User provided an invalid token'));
            }
            if ((error as any).message === 'NOT_FOUND') {
                return res.status(404).json(response('User not found'));
            }
            return res.status(500).json(response('Internal server error', error));
        }
    };
}

export default new AutheticationController; 