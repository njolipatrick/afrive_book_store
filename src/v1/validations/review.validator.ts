import { body} from 'express-validator'; 
export const reviewValidationRules = () => {
    return [ 
        body('rate')
            .trim()
            .isNumeric()
            .notEmpty()
            .withMessage('Please provide a valid rate'),
        body('comment')
            .trim() 
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid comment'),
        
    ];
};
