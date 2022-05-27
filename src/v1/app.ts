import express, { Request, Response, Application, NextFunction, urlencoded, json } from 'express';
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/test', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', success: true });
});

app.all('*', (req, res, next) => {
	const err = new Error(`Route http//:${req.hostname}${req.path} not found `);
	next(err);
});

app.use((err: { statusCode: number; message: string; stack: string; }, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		message: err.message,
		stack: err.stack
	});
});

export default app;
