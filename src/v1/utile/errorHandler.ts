import express, { NextFunction, Request, Response } from 'express';
import CustomError from './error.utile';
import dotenv from 'dotenv';
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
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.stack,
        });
    } else {
        res.status(statusCode).json({
            success: false,
            message: 'Something went wrong, please contact Admin',
        });
    }

};

const errorController = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else {
        sendErrorProd(err, res);
    }
};

export default errorController;