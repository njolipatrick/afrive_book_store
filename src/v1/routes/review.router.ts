import reviewController from '../controllers/review.controller';
import { Router } from 'express';
import { verifyToken } from '../utiles/auth.utile';

const review = Router();

review.post('/:book_id', verifyToken, reviewController.create);//done
review.get('/', reviewController.index);//done
review.get('/user', verifyToken, reviewController.getReviewsByUserID);//done
// review.get('/:user_id/review', reviewController.getReviewsByReviewID);
review.get('/b/:book_id', reviewController.getReviewsByBookID);//done
review.put('/:book_id', reviewController.update);
review.delete('/:review_id', reviewController.destroy);//done

export default review;