import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import CustomError from './error.utile';
import { config } from 'dotenv';
const { TOKEN_SECRET } = process.env;
config();
export type Payload = {
    _id: number;
    role: string,
    iat: number,
    exp: number
}


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const Authorization = req.headers['authorization'];
    const token = Authorization && Authorization.split(' ')[1];

    if (token === null) throw new CustomError('A token is required for authentication', 401);
    if (!token) throw new CustomError('A token is required for authentication', 401);

    try {
        jwt.verify(token, String(TOKEN_SECRET));
    } catch (err) {
        next(err);
    }
    return next();
};
export const decoder = (req: Request) => {
    const Authorization = req.headers['authorization'];
    const token = Authorization && Authorization.split(' ')[1];

    if (token === null) throw new CustomError('A token is required for authentication', 401);
    if (!token) throw new CustomError('A token is required for authentication', 401);

    const payload = jwt.verify(token, String(TOKEN_SECRET)) as Payload;

    return payload;
}; 