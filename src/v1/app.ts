import express, { Request, Response, Application, NextFunction, urlencoded, json } from 'express';
const app: Application = express();
import CustomError from './utile/error.utile';

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/test', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', success: true });
});

//test error handler
app.use('/testH', (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.body.name == 'afrive') {
			res.status(200).json({ status: 'ok', success: true });
		} else {
			throw new CustomError(`Name not ${req.path} provided`, 400);
		}
	} catch (error) {
		next(error);
	}
});


interface ResponseError extends Error {
	statusCode?: number;
}
app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const err: ResponseError = new Error(`Route http//:${req.hostname}${req.path} not found `);
	err.statusCode = 400;
	next(err);
});

app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message,
		stack: err.stack
	});
});

export default app;
