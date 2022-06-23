import { Router } from 'express';
import authRouter from './auth.router';
import bookRouter from './book.router';
import reviewRouter from './review.router';
// import orderRouter from './order.router';
const router = Router();
router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/review', reviewRouter);
// router.use('/order', orderRouter);

export default router;