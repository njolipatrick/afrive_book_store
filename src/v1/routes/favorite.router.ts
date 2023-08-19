import favoriteController from '../controllers/favorite.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validateIds } from '../validations/book.validation';
import { validate } from '../validations/validator';

const favorite = Router();

favorite.post('/:book_id',validateIds('book_id'),validate, verifyToken, favoriteController.create);
favorite.get('/', verifyToken, favoriteController.index);
favorite.delete('/:book_id',validateIds('book_id'),validate, verifyToken, favoriteController.destroy);

export default favorite;