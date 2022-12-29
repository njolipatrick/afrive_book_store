import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/auth.model';
dotenv.config();

export interface ResponseError extends Error {
    statusCode?: number;
}

const sendErrorDev = (err: CustomError, res: Response) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err: CustomError, res: Response,) => {
    const statusCode = err.statusCode || 500;
    if (!err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.stack,
        });
    } else {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            stack: 'Something went wrong, please contact Admin',
        });
    }

};

export const errorController = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err: ResponseError = new Error(`Route http//:${req.hostname}${req.path} not found `);
    err.statusCode = 400;
    next(err);
};
export class CustomError extends Error {
    statusCode: number | undefined;
    isOperational: boolean;

    constructor(message: string | boolean | string[], statusCode?: number) {
        super(String(message));
        this.statusCode = statusCode;
        this.isOperational = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const catchAsync = (fn: { (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined>; }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

