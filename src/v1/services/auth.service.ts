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
import { PrismaClient, users } from '@prisma/client';
const prisma = new PrismaClient();
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
    async getUserByEmail(email: string): Promise<users | null> {
        return await prisma.users.findFirst({ where: { email } });
    }
    async getUserByEmailAndToken(email: string, verification_token: string): Promise<users | null> {
        return await prisma.users.findFirst({ where: { email, verification_token } });
    }
    async register(userData: User) {
        const user = await prisma.users.create({ data: { ...userData } });
        return user;
    }
    async verifyEmail(email: string) {

        const user = await prisma.users.update({

            where: {
                email: email,
            },
            data: {
                isverified: true,
                verification_token: null
            },
        });

        if (!user) {
            throw new Error('UPDATE_FAILED');
        }
        return user;
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
    async ResetPassword(userUpdate: { //extract this to an interface
        email: string, password: string
    }) {

        return await prisma.users.update({
            where: { email: userUpdate.email }, data: {
                password: userUpdate.password,
                verification_token: null
            },
        });
    }

}
export default new AuthService;


