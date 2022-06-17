import bookController from '../controllers/book.controller';
import upload from '../utiles/multer.utile';
import { Router } from 'express';

const book = Router();

book.post('/', upload.single('image_link'), bookController.create);
book.get('/', bookController.index);
book.post('/:id', bookController.show);
book.put('/:id', bookController.update);
book.delete('/:id', bookController.destroy);

export default book;