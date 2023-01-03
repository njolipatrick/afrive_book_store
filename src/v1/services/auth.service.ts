import { Request } from 'express';
import Validator from 'validatorjs';
import AuthModel, { User, Data } from '../models/auth.model';
import { CustomError } from '../utiles/error.utile';
import { sendConfirmationEmail, ResetPasswordEmail, SuccessPasswordChange, sendWelcomeEmail } from '../utiles/mailer.utile';
import authModel from '../models/auth.model';
import { codeGenerator, slugify } from '../utiles/generator.util';
import globalModel from '../models/global.model';
import { getGoogleAuthURL, getTokens } from '../utiles/google.auth';
const { TOKEN_SECRET } = process.env;
import { sign } from 'jsonwebtoken';

class AuthService {
    async googleAuthURL(req: Request) {
        return getGoogleAuthURL();
    }
    async googleAuthUserSignUp(req: Request) {

        const { name, email, picture } = await getTokens(req);

        const checkUser = await globalModel.CHECKMODEL('USERS', 'email', email);
        if (checkUser) {
            const user: User = await globalModel.FINDONE('USERS', 'email', email);

            const token = sign({
                _id: user.id,
                role: user.role
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });

            const data = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                isverified: user.isverified,
                token: token
            };
            return data;
        } else {
            const randomUserCode = codeGenerator(36);
            const newName = name.split(' ');

            const data: User = {
                firstname: newName[0],
                lastname: newName[1],
                email: email,
                username: slugify(name) + randomUserCode,
                password: '',
                role: 'user',
                isverified: true,
            };
            const user: Data = await AuthModel.googleAuthUserSignUp(data);
            await sendWelcomeEmail(data.firstname, email);
            return user;
        }
    }
    async register(req: Request): Promise<Data | undefined> {
        const data: User = req.body;

        const { firstname, lastname, password, email, username, password_confirmation } = data;
        const rules = {
            firstname: 'required|string',
            lastname: 'required|string',
            password: 'required|string|min:8',
            password_confirmation: 'required|string|min:8',
            email: 'required|email|string',
            username: 'required|string|min:4',
        };
        const validation = new Validator(data, rules);
        if (password !== password_confirmation) throw new CustomError('Password do not match with confirm password.', 409);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const findUser = await globalModel.CHECKMODEL('users', 'email', email);
        if (findUser) throw new CustomError(`User with ${email} already exist, please login`, 400);

        const user: Data = await AuthModel.register(data);
        await sendConfirmationEmail(firstname, email, user.verification_token);
        return user;
    }
    async login(data: User): Promise<Data> {
        const { email, password } = data;
        if (!email) throw new CustomError('Input field email is required', 400);
        if (!password) throw new CustomError('Input field password is required', 400);

        const findUser = await globalModel.CHECKMODEL('users', 'email', email);
        if (findUser) {

            const user: Data | undefined = await AuthModel.login(email, password);

            return user;
        } else {
            throw new CustomError(`User with ${email} not found`, 404);
        }

    }
    async verifyEmail(req: Request) {
        const { email, token } = req.params;
        if (!(email && token)) throw new CustomError('User _id or token not provided', 400);
        const findUser = await globalModel.CHECKMODEL('users', 'email', email); 

        if (!findUser) {
            throw new CustomError(`User with ${findUser} does not exist`, 404);
        }
        const user = await AuthModel.verifyEmail(email, token);

        if (!user) {
            throw new CustomError(`Provided token was invalid for user ${email}`);
        } 
        const VerifiedUser: User = await globalModel.FINDONE('users', 'email', email);
        return `${VerifiedUser.firstname} ${VerifiedUser.lastname} has been successfully verified`;
    }
    async SendResetPasswordMail(req: Request): Promise<Data> {
        const data = req.body;
        const { email } = data;
        const rules = {
            email: 'required|email|string'
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) throw new CustomError(validation.errors.first('email'), 400);

        const findUser = await globalModel.CHECKMODEL('users', 'email', email);
        if (!findUser) throw new CustomError(`User with ${email} not found.`, 400);

        const token = codeGenerator(36);

        await ResetPasswordEmail(email, token);

        const user: Data = await authModel.SendResetPasswordMail(email, token);

        return user;
    }
    async ResetPassword(req: Request): Promise<Data> {
        const data = req.body;
        const { email, token, password, password_confirmation } = data;
        const rules = {
            email: 'required|email|string',
            token: 'required|string|min:8',
            password: 'required|string|min:8',
            password_confirmation: 'required|string:min:8',
        };

        const validation = new Validator(data, rules);
        if (validation.fails()) throw new CustomError('There was a problem with your input data', 400);
        if (password !== password_confirmation) throw new CustomError('Password do not match with confirm password.', 409);

        const user: Data = await AuthModel.ResetPassword(email, token, password);
        await SuccessPasswordChange(email, user.firstname);
        return user;
    }

}
export default new AuthService;


