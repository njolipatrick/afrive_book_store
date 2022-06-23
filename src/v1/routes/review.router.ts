import reviewController from '../controllers/review.controller';
import { Router } from 'express';

const review = Router();

review.post('/:user_id/:book_id', reviewController.create);//done
review.get('/', reviewController.index);//done
review.get('/u/:user_id', reviewController.getReviewsByUserID);//done
// review.get('/:user_id/review', reviewController.getReviewsByReviewID);
review.get('/b/:book_id', reviewController.getReviewsByBookID);//done
review.put('/:review_id', reviewController.update);
review.delete('/:review_id', reviewController.destroy);//done

export default review;