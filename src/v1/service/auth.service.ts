import { Request, Response, NextFunction } from 'express';
import AuthModel, { User } from '../model/auth.model';
import CustomError from '../utile/error.utile';
// import catchAsync from '../utile/catchAsync';
class AuthService {
    async register(data: User): Promise<User | undefined> {

        const { fullname, role, password, email, username, phone, } = data;


        if (!fullname || !username || !email || !password || !phone) {
            throw new CustomError(`one or more input data not provided. ${email} or ${username} or ${username} or ${password} or  ${role}`, 400);
        }
        const findUser = await AuthModel.findUser(email, username);
        if (findUser) {
            throw new CustomError(`User with ${email} or ${username} already exist, please login`, 400);
        }

        const user: User | undefined = await AuthModel.register(data);
        return user;
    }
}
export default new AuthService;


