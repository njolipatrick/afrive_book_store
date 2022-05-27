import express, { Request, Response, NextFunction } from 'express';
import { User } from '../model/auth.model';

const use = (fn: { (req: Request, res: Response, next: NextFunction): Promise<User>; }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((e) => next(e));
    };
};

export default use;