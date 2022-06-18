import express, { Request, Response, Application, urlencoded, json } from 'express';
import routerV1 from './v1/routes/index.router';
const app: Application = express();
import { notFoundHandler, errorController } from './v1/utiles/errorHandler';
// import apicache from 'apicache';

// // const cache = apicache.middleware;


app.use(json());
app.use(urlencoded({ extended: true }));


app.use('/api/v1', routerV1);

// app.use(cache('1 minutes'));
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', success: true });
});

app.all('*', notFoundHandler);

app.use(errorController);

export default app;
