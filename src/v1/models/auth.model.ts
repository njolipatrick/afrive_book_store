import client from '../../../config/database';
const { TOKEN_SECRET } = process.env;
import { sign } from 'jsonwebtoken';
import CustomError from '../utiles/error.utile';
import { codeGenerator } from '../utiles/generator.util';
import { PasswordManager } from '../utiles/password.manager.utile';
export type User = {
    id?: number;
    fullname: string;
    username: string;
    email: string;
    avatar: string;
    password?: string; //
    role?: string;
    isVerified?: boolean;
    phone?: string;
    token?: string;
    verification_token?: string;
    password_confirmation?: string;
};
export type Data = {
    name?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    avatar?: string;
    token?: string;
}

class AuthModel {
    async googleAuthUserSignUp(user: User): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (fullname, username, email, avatar, role, isVerified, phone, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
            console.log(user);
            
            const values = [
                user.fullname,
                user.username,
                user.email,
                user.avatar,
                user.role,
                user.isVerified,
                user.phone,
                user.verification_token
            ];

            const res = await conn.query(sql, values);
            const newUser = res.rows[0];
            const token = sign({
                username: newUser.id,
                password: newUser.username,
                role: newUser.role
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
    async register(user: User): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (fullname, username, email, avatar, password, role, isVerified, phone, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;';
            const hashPassword = await PasswordManager.hash(String(user.password));

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
                password: newUser.username,
                role: newUser.role
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
            String(user.password),
            String(password)
        );
        if (encrypt) {
            const token = sign({
                username: user.id,
                password: user.username,
                role: user.role
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });
            user.token = token;
            conn.release();
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
    async verifyEmail(email: User['email'], token: User['verification_token']): Promise<boolean> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET isVerified=$1 WHERE email=$2 AND verification_token=$3';
            const values = [true, email, token];
            const res = await conn.query(sql, values);
            conn.release();
            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 400);
        }
    }
    async SendResetPasswordMail(email: User['email'], token: User['verification_token']): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET verification_token=$1 WHERE email=$2 RETURNING *;';

            const values = [token, email];
            const res = await conn.query(sql, values);

            conn.release();

            const user: User = res.rows[0];
            const data: Data = {
                email: user.email,
            };
            return data;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    }
    async ResetPassword(email: User['email'], token: User['verification_token'], password: User['password']): Promise<Data> {
        try {
            const conn = await client.connect();
            let sql = 'SELECT * FROM users WHERE email =$1';
            let values = [email];
            const result = await conn.query(sql, values);
            const checkToken = result.rows[0].verification_token;
            if (checkToken === token) {
                sql = 'UPDATE users SET password=$1 WHERE email=$2 AND verification_token=$3 RETURNING *;';
                const hashPassword = await PasswordManager.hash(String(password));
                values = [hashPassword, email, String(token)];
                const res = await conn.query(sql, values);
                conn.release();
                const user: User = res.rows[0];
                const data: Data = {
                    name: user.fullname,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                };
                return data;
            } else {
                throw Error('Token provided was invalid');
            }
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    }
}
export default new AuthModel;