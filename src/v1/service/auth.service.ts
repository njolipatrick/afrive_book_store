import { NextFunction, Router, Request, Response } from 'express';
import CustomError from '../utile/error.utile';
interface User {
    name: string;

}

class AutheticationService {
    public register = async (data: User, next: NextFunction): Promise<string> => {

        if (data.name) {
            console.log('kkk');

            return 'False';
        } else {
            console.log('fff');
            throw new CustomError('returned true', 400);
        }
    };
}

export default new AutheticationService;