import reviewController from '../controllers/review.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validate } from '../validations/validator';
import { validateIds } from '../validations/book.validation';
import { reviewValidationRules } from '../validations/review.validator';

const review = Router();

review.post('/:book_id',validateIds('book_id'), reviewValidationRules(),validate, verifyToken, reviewController.create);
review.get('/', reviewController.index);
review.get('/user', verifyToken, reviewController.getReviewsByUserID);
review.get('/:user_id/review', reviewController.getReviewsByReviewID);
review.get('/b/:book_id',validateIds('book_id'),validate, reviewController.getReviewsByBookID);
review.put('/:book_id',validateIds('book_id'),validate, reviewController.update);
review.delete('/:review_id',validateIds('review_id'),validate, reviewController.destroy);

export default review;