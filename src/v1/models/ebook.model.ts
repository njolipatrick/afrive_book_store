import client from '../../../config/database';
import { CustomError } from '../utiles/error.utile';
import globalModel from './global.model';

export type Ebook = {
    id?: number;
    book_id?: string | null;
    status?: boolean | null;
    format?: string[] | null;
}
class EbooksModel {
    public create = async (data: Ebook) => {
        try {
            const { book_id, status, format } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO ebooks (book_id, status, format)VALUES ($1, $2, $3) RETURNING *;';
            const values = [book_id, status, format];
            const res = await conn.query(sql, values);
            const ebook: Ebook = res.rows[0];
            conn.release();

            return ebook;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (): Promise<Ebook[]> => {
        try {
            const ebooks: Ebook[] = await globalModel.FINDALL('ebooks', 20);

            return ebooks;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public getEBookByBookID = async (book_id: string): Promise<Ebook> => {
        try {
            const ebook: Ebook = await globalModel.FINDONE('EBOOKS', 'book_id', book_id);
            return ebook;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };

    public destroy = async (book_id: number) => {
        try {
            const ebook: Ebook = await globalModel.FINDONE('EBOOKS', 'book_id', book_id);


            const destroy = await globalModel.Destroy('EBOOKS', Number(ebook.id));
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new EbooksModel;