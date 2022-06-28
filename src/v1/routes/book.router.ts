import bookController from '../controllers/book.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const book = Router();

book.post('/', verifyToken, bookController.create);
book.get('/', verifyToken, bookController.index);
book.get('/search/category', verifyToken, bookController.SearcBooksCategoryByName);
book.get('/search/title', verifyToken, bookController.SearcBooksByTitle);
book.get('/search/author', verifyToken, bookController.SearcBooksByAuthor);
book.get('/:id', verifyToken, bookController.show);
book.put('/:id', verifyToken, bookController.update);
book.delete('/:id', verifyToken, bookController.destroy);

export default book;