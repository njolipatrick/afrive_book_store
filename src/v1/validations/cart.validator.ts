
import { check } from 'express-validator';

export const cartValidationRules = (type:string) => {
    return [
        check(type)
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid ' + type)

    ];
};
