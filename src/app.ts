import express, { Request, Response } from 'express';
const app = express();

app.get('/test', (req: Request, res: Response) => {
	res.status(200).json({ message: 'server running' });
});

export default app;
