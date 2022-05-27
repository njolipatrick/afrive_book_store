import { Request, Response, NextFunction } from 'express';
import AuthModel, { User } from '../model/auth.model';
import CustomError from '../utile/error.utile';
import catchAsync from '../utile/catchAsync';
class AuthService {
    async register(req: Request, res: Response, next: NextFunction): Promise<User | undefined> {
        try {
            const { email, username } = req.body;
            const data = req.body;
            const findUser = await AuthModel.findUser(email, username);
            console.log(findUser);

            if (findUser) {
                throw new CustomError(`User with ${email} already exist, please login`, 400);
            }
            // const user: User | undefined = await AuthModel.register(data, next);
            return data;
        } catch (error) {
            next(error);
        }
    }
}
export default new AuthService;