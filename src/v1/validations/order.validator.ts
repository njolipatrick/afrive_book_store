/**
 * user_id: 'required|integer',
            txn_ref: 'required|string',
            book: 'required',
            total_order_amount: 'required|integer',
            status: 'required|string',
            estimated_delivery_date: 'required|string',
            currency: 'required|string'
 */
import { body, check, validationResult, query, param } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const orderValidationRules = () => {
    return [
        body('total_order_amount')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid total_order_amount'),
        body('status')
            .trim()
            .isString()
            .notEmpty()
            .withMessage('Please provide a valid last name'),
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
