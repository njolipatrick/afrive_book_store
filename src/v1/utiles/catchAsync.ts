import { NextFunction, Request, Response } from 'express';
import { User } from '../models/auth.model';


const use = (fn: { (req: Request, res: Response, next: NextFunction): Promise<void | User | undefined>; }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default use;