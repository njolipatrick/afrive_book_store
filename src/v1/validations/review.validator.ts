
import { body } from 'express-validator';

export const reviewValidationRules = () => {
    return [
        body('book_id')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid total_order_amount'),
        body('rate')
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid rate'),
        body('comment')
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid comment'),
        body('review_id')
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid comment'),

    ];
};
