import client from '../../../config/database';
const { TOKEN_SECRET } = process.env;
import { sign } from 'jsonwebtoken';
import { CustomError } from '../utiles/error.utile';
import { codeGenerator } from '../utiles/generator.util';
import { PasswordManager } from '../utiles/password.manager.utile';
export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
    isverified?: boolean;
    token?: string;
    verification_token?: string;
    password_confirmation?: string;
    created_at?: string;
    updated_at?: string;
};
export type Data = {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    isverified?: boolean;
    verification_token?: string;
    token?: string;
    created_at?: string;
    updated_at?: string;
}

class AuthModel {
    async googleAuthUserSignUp(user: User): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, email, role, isverified, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';

            const values = [
                user.firstname,
                user.lastname,
                user.username,
                user.email,
                user.role,
                user.isverified,
                user.verification_token
            ];

            const res = await conn.query(sql, values);
            const newUser = res.rows[0];
            const token = sign({
                _id: newUser.id,
                role: newUser.role
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });

            conn.release();
            const data = {
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                isverified: user.isverified,
                token: token,
                created_at: user.created_at,
                updated_at: user.updated_at
            };
            return data;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }

    }
}
export default new AuthModel;