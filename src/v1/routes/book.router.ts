import bookController from '../controllers/book.controller';
import { Router } from 'express';
import {verifyToken} from '../utiles/auth.utile';

const book = Router();

book.post('/', verifyToken, bookController.create);
book.get('/', bookController.index);
book.get('/search', bookController.SearcBooksCategoryByName);
book.get('/:id', bookController.show);
book.put('/:id', bookController.update);
book.delete('/:id', bookController.destroy);

export default book;