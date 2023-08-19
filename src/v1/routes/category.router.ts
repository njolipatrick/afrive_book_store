import categoryController from '../controllers/category.controller';
import { Router } from 'express';
import { validateIds } from '../validations/book.validation';
import { validate } from '../validations/validator';

const category = Router();

category.post('/:book_id', validateIds('book_id'),validate, categoryController.create);
category.get('/', categoryController.index);
category.get('/search', categoryController.getCategorysByName);
category.delete('/:id',validateIds('id'),validate, categoryController.destroy);

export default category;