import client from '../../../config/database';
const { TOKEN_SECRET } = process.env;
import { sign } from 'jsonwebtoken';
import CustomError from '../utiles/error.utile';
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
                username: newUser.id,
                password: newUser.username,
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
    async register(user: User): Promise<Data> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, email, password, role, isverified, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
            const hashPassword = await PasswordManager.hash(String(user.password));

            user.verification_token = codeGenerator(36);

            user.password = hashPassword;
            const isverified = false;
            const role = 'user';
            const values = [
                user.firstname,
                user.lastname,
                user.username,
                user.email,
                user.password,
                role,
                isverified,
                user.verification_token
            ];            

            const res = await conn.query(sql, values);
            const newUser: User = res.rows[0]; 
            
            const token = sign({
                username: newUser.id,
                password: newUser.username,
                role: newUser.role
            }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });

            conn.release();
            const data = {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                email: newUser.email,
                isverified: newUser.isverified,
                verification_token: newUser.verification_token,
                token: token,
                created_at: newUser.created_at,
                updated_at: newUser.updated_at
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
        } else {
            throw new CustomError('Username or password is invalid', 400);
        }
    }
    async verifyEmail(email: User['email'], token: User['verification_token']): Promise<boolean> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET isverified=$1 WHERE email=$2 AND verification_token=$3';
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
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
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
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    email: user.email,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                };
                return data;
            } else {
                throw new CustomError('Provided token is invalid', 400);
            }
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    }
}
export default new AuthModel;