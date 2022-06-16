import { Request } from 'express';
import Validator from 'validatorjs';
import AuthModel, { User, Data } from '../model/auth.model';
import CustomError from '../utile/error.utile';
import { sendConfirmationEmail, ResetPasswordEmail, SuccessPasswordChange } from '../utile/mailer.utile';
import { upload } from '../utile/cloudinary.utile';
import authModel from '../model/auth.model';
import { codeGenerator } from '../utile/generator.util';
import globalModel from '../model/global.model';
import { getGoogleAuthURL, getTokens } from '../utile/google.auth';
import axios from 'axios';

//export to a seperate file
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();
const client = new OAuth2Client(String(process.env.GOOGLE_CLIENT_ID));

class AuthService {
    async googleAuthURL(req: Request) {
        return getGoogleAuthURL();

    }
    async googleAuthUser(req: Request) {

        const { id_token, access_token } = await getTokens(req);

        // Fetch the user's profile with the access token and bearer
        const googleUser = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        return googleUser;
    }
    async register(req: Request): Promise<Data | undefined> {
        const data: User = req.body;

        const avatar = String(req.file?.path);

        data.avatar = await upload(avatar, 'abs_live_user');

        const { fullname, password, email, username, phone, password_confirmation } = data;
        const rules = {
            fullname: 'required|string',
            password: 'required|string|min:8',
            password_confirmation: 'required|string|min:8',
            email: 'required|email|string',
            username: 'required|string|min:4',
            phone: 'required|string',
            avatar: 'required|string',
        };
        const validation = new Validator(data, rules);
        if (password !== password_confirmation) throw new CustomError('Password do not match with confirm password.', 409);
        if (validation.fails()) {
            throw new CustomError('There was a problem with your input data', 400);
        }

        const findUser = await globalModel.CHECKMODEL('users', 'email', email);
        if (findUser) throw new CustomError(`User with ${email} or ${username} already exist, please login`, 400);

        const user: Data = await AuthModel.register(data);
        await sendConfirmationEmail(fullname, email, user.token);
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
            throw new CustomError(`User with ${email} or ${findUser} not found`, 404);
        }

    }
    async verifyEmail(req: Request) {
        const { email, token } = req.params;
        if (!(email && token)) throw new CustomError('User _id or token not provided', 400);
        const findUser = await globalModel.CHECKMODEL('users', 'email', email);

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
        await SuccessPasswordChange(email, user.name);
        return user;
    }

}
export default new AuthService;


