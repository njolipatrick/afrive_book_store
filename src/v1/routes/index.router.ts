import { Router } from 'express';
import authRouter from './auth.router';
import bookRouter from './book.router';
// import orderRouter from './order.router';
const router = Router();
router.use('/auth', authRouter);
router.use('/book', bookRouter);
// router.use('/order', orderRouter);

export default router;