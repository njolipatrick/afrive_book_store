import client from '../../../config/database';
const { TOKEN_SECRET } = process.env;
import { sign } from 'jsonwebtoken';
import CustomError from '../utile/error.utile';
import { codeGenerator } from '../utile/generator.util';
import { PasswordManager } from '../utile/password.manager.utile';
export type User = {
    id?: number;
    fullname: string;
    username: string;
    email: string;
    avatar: string;
    password: string; //
    role: string;
    isVerified: boolean;
    phone: string;
    token?: string;
    verification_token?: string;
};
export type Data = {
    name: string;
    username: string;
    email: string;
    isVerified?: boolean;
    avatar: string;
    token: string;
}

class AuthModel {
    async register(user: User): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (fullname, username, email, avatar, password, role, isVerified, phone, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
            const hashPassword = await PasswordManager.hash(user.password);

            user.verification_token = codeGenerator(36);

            user.password = hashPassword;
            user.isVerified = false;
            const values = [
                user.fullname,
                user.username,
                user.email,
                user.avatar,
                user.password,
                user.role,
                user.isVerified,
                user.phone,
                user.verification_token
            ];

            const res = await conn.query(sql, values);
            const newUser = res.rows[0];
            const token = sign({
                username: newUser.id,
                password: newUser.username
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });

            conn.release();
            const data = {
                name: user.fullname,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                avatar: user.avatar,
                token: token
            };
            return data;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }

    }
    async login(email: User['email'], password: User['password']): Promise<Data> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users WHERE email =$1';
        const result = await conn.query(sql, [email]);
        const user: User = result.rows[0];

        const encrypt = await PasswordManager.compare(
            user.password,
            password
        );
        if (encrypt) {
            const token = sign({
                username: user.id,
                password: user.username
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });
            user.token = token;
            const data = {
                name: user.fullname,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token: token
            };
            return data;
        } else {
            throw new CustomError('Username or password is invalid', 400);
        }
    }
    async verifyEmail(email: User['email'], token: User['verification_token']) {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET isVerified=$1 WHERE email=$2 AND verification_token=';
            const values = [true, email, token];
            const res = await conn.query(sql, values);
            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 400);
        }
    }
    async findModel(model: string, table: string, value: string): Promise<boolean> {
        try {

            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${table}='${value}'`;
            const res = await conn.query(sql);

            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
}
export default new AuthModel;