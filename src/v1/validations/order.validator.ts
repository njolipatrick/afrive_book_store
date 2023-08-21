import { body} from 'express-validator'; 
export const orderValidationRules = () => {
    return [
        body('total_order_amount')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid total_order_amount'),
        body('status')
            .trim()
            .isBoolean()
            .notEmpty()
            .withMessage('Please provide a valid status'),
        body('book_id')
            .trim()
            .isNumeric()
            .notEmpty()
            .withMessage('Please provide a valid book_id'),
        body('currency')
            .trim()
            .notEmpty()
            .withMessage('Please provide a valid currency'),
        body('estimated_delivery_date')
            .trim() 
            .notEmpty()
            .withMessage('Please provide a valid estimated_delivery_date'),
        
    ];
};
