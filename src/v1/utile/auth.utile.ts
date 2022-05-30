import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import CustomError from './error.utile';
import { config } from 'dotenv';
config();

const { TOKEN_SECRET } = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string =
        req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        throw new CustomError('A token is required for authentication', 400);
    }
    try {
        jwt.verify(token, String(TOKEN_SECRET));

    } catch (err) {
        next(err);
    }
    return next();
};

export default verifyToken;