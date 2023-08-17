import bookController from '../controllers/book.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validate } from '../validations/validator';
import { createBookValidationRules,updateBookValidationRules, validateIds } from '../validations/book.validation';

const book = Router();

book.post('/', createBookValidationRules(), validate, verifyToken, bookController.create);
book.get('/', bookController.index);
book.get('/:book_id/show', validateIds('book_id'), validate, bookController.show);
book.put('/:book_id',validateIds('book_id'),  updateBookValidationRules(), validate, bookController.update);
book.delete('/:book_id', validateIds('book_id'), validate, verifyToken, bookController.destroy);

export default book;