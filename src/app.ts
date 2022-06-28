import express, { Request, Response, Application, urlencoded, json } from 'express';
import routerV1 from './v1/routes/index.router';
const app: Application = express();
import { notFoundHandler, errorController } from './v1/utiles/errorHandler';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

//Application
app.use('/api/v1', routerV1);

// app.use(cache('1 minutes'));
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ status: 'ok', success: true });
});

app.all('*', notFoundHandler);

app.use(errorController);

export default app;
