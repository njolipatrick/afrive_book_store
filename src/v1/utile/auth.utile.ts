import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import CustomError from './error.utile';

const { TOKEN_SECRET } = process.env;
const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        throw new CustomError('A token is required for authentication', 400);
    }
    try {
        const decoded = jwt.verify(token, String(TOKEN_SECRET));
        console.log(decoded);

        // req.user = decoded;
    } catch (err) {
        next(err);
    }
    return next();
};

export default verifyToken;