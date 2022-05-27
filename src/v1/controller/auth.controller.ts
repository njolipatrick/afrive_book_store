import { Request, Response, NextFunction } from 'express';
import response from '../utile/response.util';
import AuthService from '../service/auth.service';


class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        const result = await AuthService.register(req, res, next);
        res.status(201).send(response('User created', result));
    }
}
export default new AuthController;
