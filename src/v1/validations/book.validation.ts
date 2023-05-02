import { body, check, validationResult, query, param } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { isEmpty } from 'lodash';
const prisma = new PrismaClient();

export const validateIds = (id: string) => {
    return [
        check(id)
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid ' + id)
    ];
};
export const createBookValidationRules = () => {
    return [
        body('title')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid title'),
        body('title')
            .custom(async value => {
                const book = await prisma.books.findFirst({ where: { title: value } });
                if (book) {
                    throw new Error('Title already in use');
                }
            }),
        body('image')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid image'),
        body('format')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a author'),
        body('category_name')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a category_name'),
        body('comment')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a comment'),
        body('rate')
            .trim()
            .isNumeric()
            .notEmpty()
            .withMessage('Please provide a rate'),
        body('rate')
            .custom(value => {
                return value <= 5;
            })
            .withMessage('Rate must not be more than 5'),
        body('author')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a author'),
        body('author')
            .custom(async value => {
                const book = await prisma.books.findFirst({ where: { author: value } });
                if (book) {
                    throw new Error('Author already in use');
                }
            }),
        body('price')
            .trim()
            .isDecimal()
            .notEmpty()
            .withMessage('Please provide a price'),
        body('description')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid description'),
        body('status')
            .isBoolean()
            .notEmpty()
            .withMessage('Please provide a valid status'),
    ];
};




export const updateBookValidationRules = () => {
    return [
        body('title')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid title'),
        body('title')
            .custom(async value => {
                const book = await prisma.books.findFirst({ where: { title: value } });
                if (book) {
                    throw new Error('Title already in use');
                }
            }),
        body('image')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid image'),
        body('author')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a author'),
        body('author')
            .custom(async value => {
                const book = await prisma.books.findFirst({ where: { author: value } });
                if (book) {
                    throw new Error('Author already in use');
                }
            }),
        body('price')
            .trim()
            .isDecimal()
            .notEmpty()
            .withMessage('Please provide a price'),
        body('description')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid description'),
        body('status')
            .isBoolean()
            .notEmpty()
            .withMessage('Please provide a valid status'),
    ];
};

