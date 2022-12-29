import bookController from '../controllers/book.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const book = Router();

book.post('/', verifyToken, bookController.create);
book.get('/', bookController.index);
book.get('/search/category', bookController.SearcBooksCategoryByName);
book.get('/search/title', bookController.SearcBooksByTitle);
book.get('/search/author', bookController.SearcBooksByAuthor);
book.get('/:id', bookController.show);
book.put('/:id', bookController.update);
book.delete('/:id', verifyToken, bookController.destroy);

export default book;