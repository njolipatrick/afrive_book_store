import { Request } from 'express';
import Validator from 'validatorjs';
import AuthModel, { User, Data } from '../model/auth.model';
import CustomError from '../utile/error.utile';
import { sendConfirmationEmail, ResetPasswordEmail } from '../utile/mailer.utile';
import { upload } from '../utile/cloudinary.utile';
import authModel from '../model/auth.model';
import { codeGenerator } from '../utile/generator.util';

class AuthService {
    async register(req: Request): Promise<Data | undefined> {
        const data: User = req.body;

        const avatar = String(req.file?.path);

        data.avatar = await upload(avatar, 'abs_live_user');

        const { fullname, password, email, username, phone } = data;
        const rules = {
            fullname: 'required|string',
            password: 'required|string',
            password_confirmation: 'required|string',
            email: 'required|email|string',
            username: 'required|string|min:4',
            phone: 'required|string',
            avatar: 'required|string',
        };
        const validation = new Validator(data, rules);
        if (password !== req.body.password_confirmation) throw new CustomError('Password do not match', 409);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }
        if (!(fullname && username && email && password && phone)) {
            throw new CustomError(`one or more input data not provided. 
            ${email} or ${fullname} or ${username} or ${phone} `, 400);
        }

        const findUser = await AuthModel.findModel('users', 'email', email);
        if (findUser) throw new CustomError(`User with ${email} or ${username} already exist, please login`, 400);

        const user: Data = await AuthModel.register(data);
        await sendConfirmationEmail(fullname, email, user.token);
        return user;
    }
    async login(data: User): Promise<Data> {
        const { email, password } = data;
        if (!email) throw new CustomError('Input field email is required', 400);
        if (!password) throw new CustomError('Input field password is required', 400);

        const findUser = await AuthModel.findModel('users', 'email', email);
        if (findUser) {

            const user: Data | undefined = await AuthModel.login(email, password);

            return user;
        } else {
            throw new CustomError(`User with ${email} or ${findUser} not found`, 404);
        }

    }
    async verifyEmail(req: Request) {
        const { email, token } = req.params;
        if (!(email && token)) throw new CustomError('User _id or token not provided', 400);
        const findUser = await AuthModel.findModel('users', 'email', email);

        if (findUser) {
            const user = await AuthModel.verifyEmail(email, token);

            if (user) {
                return true;
            } else {
                throw new CustomError(`Provided token was invalid for user ${email}`);
            }
        } else {
            throw new CustomError(`User with ${email} does not exist`, 404);
        }
    }
    async SendResetPasswordMail(req: Request): Promise<Data> {
        const data = req.body;
        const { email } = data;
        const rules = {
            email: 'required|email|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) throw new CustomError(validation.errors.first('email'), 400);

        const findUser = await AuthModel.findModel('users', 'email', email);
        if (!findUser) throw new CustomError(`User with ${email} not found.`, 400);

        const token = codeGenerator(36);

        await ResetPasswordEmail(email, token);

        const user: Data = await authModel.SendResetPasswordMail(email, token);

        return user;
    }
}
export default new AuthService;


