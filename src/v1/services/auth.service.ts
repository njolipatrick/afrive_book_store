import { Request } from 'express'; 
import  { User } from '../models/auth.model'; 
import { codeGenerator, slugify } from '../utiles/generator.util'; 
import { getGoogleAuthURL, getTokens } from '../utiles/google.auth';  
import { PrismaClient, users } from '@prisma/client';
import { PasswordManager } from '../utiles/password.manager.utile';
const prisma = new PrismaClient();
class AuthService {
    async googleAuthURL() {
        return getGoogleAuthURL();
    }
    async googleAuthUserSignUp(req: Request) {

        const { name, email, id } = await getTokens(req);

        const user = await prisma.users.findFirst({ where: { email } });

        if (user) { 

            return {email, id};
        } else {
            const randomUserCode = codeGenerator(36);
            const newName = name.split(' ');

            const data: User = {
                firstname: newName[0],
                lastname: newName[1],
                email: email,
                username: slugify(name) + randomUserCode,
                password: await PasswordManager.hash(id),
                role: 'user',
                isverified: true,
            };
            const user = await prisma.users.create({ data });
            if (!user) {
                throw new Error('Error');
            }
            return {id, email};
        }
    }
    async getUserByEmail(email: string) {
        return await prisma.users.findFirst({ where: { email } });
    }
    async getUserById(id: number) {
        return await prisma.users.findFirst({ where: { id } });
    }
    async getUserByEmailAndToken(email: string, verification_token: string)  {
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
    async requestPasswordReset(email: string, verification_token: string) {
        const user = await prisma.users.update({
            where: { email }, data: {
                verification_token
            },
        });
        if (!user) {
            throw new Error('UPDATE_FAILED');
        }
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


