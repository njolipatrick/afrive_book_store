import ebookController from '../controllers/ebook.controller';
import { Router } from 'express';
import { validateIds } from '../validations/book.validation';
import { validate } from '../validations/validator';

const ebook = Router();

ebook.post('/:book_id', validateIds('book_id'), validate, ebookController.create);
ebook.get('/', ebookController.index);
ebook.get('/:book_id', validateIds('book_id'), validate, ebookController.getEbookByBookID);
ebook.delete('/:book_id', validateIds('book_id'), validate, ebookController.destroy);

export default ebook;