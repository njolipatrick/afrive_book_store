import client from '../../../config/database';
import bcrypt from 'bcrypt';
const { SALT_ROUNDS, pepper, TOKEN_SECRET } = process.env;
import { sign, verify } from 'jsonwebtoken';
import CustomError from '../utile/error.utile';
import { NextFunction } from 'express';
export type User = {
    id?: number;
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    phone: string;
    token?: string;
};

class AuthModel {
    async register(user: User): Promise<User | undefined> {
        if (user) {

            const conn = await client.connect();
            const sql = 'INSERT INTO users (fullname, username, email, password, role, isVerified, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
            const hashPassword = await bcrypt.hash(user.password + String(pepper), Number(SALT_ROUNDS));

            user.password = hashPassword;

            const values = [
                user.fullname,
                user.username,
                user.email,
                user.password,
                user.role,
                user.isVerified,
                user.phone
            ];
            const res = await conn.query(sql, values);

            const token = sign({ user: res.rows[0] }, String(TOKEN_SECRET), {
                expiresIn: '7d'
            });
            user.token = token;
            conn.release();
            return user;

        } else {
            throw new CustomError('Internal Server Error', 500);
        }

    }
    async findUser(email: User['email'], username: User['username']): Promise<boolean> {
        if (email || username) {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email=$1 OR username=$2';
            const value = [email, username];
            const res = await conn.query(sql, value);

            return res.rowCount >= 1 ? true : false;
        }
        else {
            throw new CustomError('User not found', 404);
        }
    }
}
export default new AuthModel;