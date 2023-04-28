import { body, check, validationResult, query, param } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { isEmpty } from 'lodash';
const prisma = new PrismaClient();
export const registerValidationRules = () => {
    return [
        body('firstname')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid first name'),
        body('lastname')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid last name'),
        body('password')
            .isLength({ min: 6 })
            .trim()
            .withMessage('Please provide a valid password'),
        body('password_confirmation')
            .custom((value, { req }) => {
                return value === req.body.password;
            })
            .withMessage('Password mismatch')
        ,
        body('email').custom(async value => {
            const user = await prisma.users.findUnique({ where: { email: value } });
            if (user) {
                throw new Error('E-mail already in use');
            }
        }),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
        body('username')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid username'),
    ];
};


export const loginValidationRules = () => {
    return [
        body('password')
            .trim()
            .isString()
            .withMessage('Please provide a valid password'),
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email')
    ];
};
export const verifyEmailValidationRules = () => {
    return [
        query('token')
            .isLength({ min: 10, max: 15 })
            .withMessage('Please provide a valid token'),
        query('email')
            .isEmail()
            .withMessage('Please provide a valid email')
    ];
};
export const sendResetPasswordEmailValidationRules = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
    ];
};

export const resetPasswordValidationRules = () => {
    return [
        body('token')
            .trim()
            .isString()
            .isLength({ min: 12, max: 20 })
            .notEmpty()
            .withMessage('Please provide a valid token'),
        body('email')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid username'),
        body('password')
            .isLength({ min: 6 })
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid password'),
        body('password_confirmation').custom((value, { req }) => {
            return value === req.body.password;
        }),
    ];
};





