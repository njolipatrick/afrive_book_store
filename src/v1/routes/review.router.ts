import reviewController from '../controllers/review.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';
import { validate } from '../validations/validator';
import { validateIds } from '../validations/book.validation';

const review = Router();

review.post('/:book_id',validateIds('book_id'),validate, verifyToken, reviewController.create);//done
review.get('/', reviewController.index);//done
review.get('/user', verifyToken, reviewController.getReviewsByUserID);//done
review.get('/:user_id/review', reviewController.getReviewsByReviewID);
review.get('/b/:book_id',validateIds('book_id'),validate, reviewController.getReviewsByBookID);//done
review.put('/:book_id',validateIds('book_id'),validate, reviewController.update);
review.delete('/:review_id',validateIds('review_id'),validate, reviewController.destroy);//done

export default review;