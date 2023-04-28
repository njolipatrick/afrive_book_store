import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

interface ValidatorError {
    type: string;
    path: string;
    msg: string;
    vaalue: string;
    location: string;
}
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const resultErrors: Record<string, string>[] = [];
    errors.array().map((err) => {
        resultErrors.push({ [(err as unknown as ValidatorError).path]: err.msg });
    });
    const errorObject = Object.assign({}, ...resultErrors);
    
    return res.status(422).json(errorObject);
};


