import favoriteController from '../controllers/favorite.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const favorite = Router();

favorite.post('/:book_id', verifyToken, favoriteController.create);
favorite.get('/', verifyToken, favoriteController.index);
favorite.delete('/:book_id', verifyToken, favoriteController.destroy);

export default favorite;