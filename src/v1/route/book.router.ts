
import bookController from '../controller/book.controller';
import { Router } from 'express';

const book = Router();
book.post('/', bookController.create);
book.get('/', bookController.index);
book.post('/:id', bookController.show);

export default book;