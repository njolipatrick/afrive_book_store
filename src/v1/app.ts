import express, { Request, Response, Application, NextFunction, urlencoded, json } from 'express';
import router from './route/index.router';
import CustomError from './utile/error.utile';
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
	throw new CustomError(`Requested URL http://${req.hostname}${req.path} not found`, 404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message,
		stack: err.stack
	});
});

export default app;
