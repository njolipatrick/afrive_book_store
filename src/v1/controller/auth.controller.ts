import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
class AutheticationController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authService.register(req.body, next);
            res.status(201).json(
                {
                    status: 200,
                    result: result,
                    register: true
                });
        } catch (err) {
            next(err);
        }
    }
}

export default new AutheticationController;