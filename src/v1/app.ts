import express, { Request, Response, Application, NextFunction, urlencoded, json } from 'express';
import routerV1 from './routes/index.router';
const app: Application = express();
import errorHandler, { ResponseError } from './utiles/errorHandler';
import CustomError from './utiles/error.utile';
import apicache from 'apicache';

const cache = apicache.middleware;

app.use(cache('1 minutes'));

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/test', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', success: true });
});

app.use('/api/v1', routerV1);
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

app.all('*', (req: Request, res: Response, next: NextFunction) => {
	const err: ResponseError = new Error(`Route http//:${req.hostname}${req.path} not found `);
	err.statusCode = 400;
	next(err);
});

app.use(errorHandler);

export default app;
