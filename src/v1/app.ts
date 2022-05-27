import express, { Request, Response, Application, NextFunction, urlencoded, json } from 'express';
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));



export default app;
