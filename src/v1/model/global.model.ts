import client from '../../../config/database';
import CustomError from '../utile/error.utile';

class GlobalQuery {
    async CHECKMODEL(model: string, table: string, value: string): Promise<boolean> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} WHERE ${table}='${value}'`;

            const res = await conn.query(sql);

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

            return res.rows;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async FINDALL(model: string) {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM ${model} ORDER BY id DESC LIMIT 10`;
            const res = await conn.query(sql);
            conn.release();

            return res.rows;
        } catch (error) {
            throw new CustomError(`${error}`, 404);
        }
    }
    async Destroy(id: number) {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=$1;';
            const values = [id];
            const res = await conn.query(sql, values);

            return res.rowCount >= 1 ? true : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    }
}
export default new GlobalQuery;