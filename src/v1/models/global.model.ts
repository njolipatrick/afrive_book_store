import client from '../../../config/database';
import CustomError from '../utiles/error.utile';

class GlobalQuery {
    async CHECKMODEL(model: string, table: string, value: string): Promise<boolean> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${table}='${value}'`;

            const res = await conn.query(sql);
            conn.release();

            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async FINDONE(model: string, table: string, value: string | number) {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${table}='${value}' ORDER BY id DESC LIMIT 1`;
            const res = await conn.query(sql);

            conn.release();
            return res.rows[0];
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async FINDWHERE(model: string, table: string, value: string | number) {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${table}='${value}' ORDER BY id DESC LIMIT 10`;

            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async FINDALL(model: string, limit: number) {
        try {
            if (isNaN(limit)) limit = 10;

            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} ORDER BY id DESC LIMIT ${limit}`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async SEARCH(model: string, column_name: string, pattern: string, limit: number) {
        try {
            const conn = await client.connect();
            // const sql = `SELECT * FROM ${model} WHERE ${column_name} LIKE ${pattern} ORDER BY id DESC LIMIT ${limit}`;
            const sql = `SELECT * FROM ${model} WHERE ${column_name} LIKE '%${pattern}%' ORDER BY id ASC LIMIT ${limit}`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async Destroy(model: string, id: number | string) {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM ${model} WHERE id=${id};`;
            const res = await conn.query(sql);
            conn.release();
            
            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    }
}
export default new GlobalQuery;