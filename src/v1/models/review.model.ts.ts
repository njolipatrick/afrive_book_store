import client from '../../../config/database';
import CustomError from '../utiles/error.utile';
import { User } from './auth.model';
import { Book } from './book.model';
import globalModel from './global.model';

export type Review = {
    id?: number
    review_id?: number;
    comment: string;
    user_id: string | number;
    book_id: string | number;
    rate: number;
}
export type Rate = {
    review_id?: number;
    name: string;
    comment: string;
    startRating: number;
}

class ReviewModel {
    public create = async (data: Review): Promise<Rate> => {
        try {
            const { comment, user_id, book_id, rate } = data;
            const conn = await client.connect();
            const sql = 'INSERT INTO reviews (comment, user_id, book_id, rate)VALUES ($1, $2, $3, $4) RETURNING *;';
            const values = [comment, user_id, book_id, rate];
            const res = await conn.query(sql, values);
            const review: Review = res.rows[0];
            conn.release();

            const user: User = await globalModel.FINDONE('Users', 'id', String(user_id));

            const details: Rate = {
                review_id: review.id,
                name: `${user.firstname} ${user.lastname}`,
                comment: review.comment,
                startRating: review.rate
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public index = async (): Promise<Rate[]> => {
        try {

            const reviews: Review[] = await globalModel.FINDALL('REVIEWS', 20);

            const all_reviews = await Promise.all(reviews.map(async review => {
                const user: User = await globalModel.FINDONE('Users', 'id', review.user_id);

                const details: Rate = {
                    review_id: review.id,
                    name: `${user.firstname} ${user.lastname}`,
                    comment: review.comment,
                    startRating: review.rate
                };
                return details;
            }));
            return all_reviews;

        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public getReviewsByUserID = async (user_id: string) => {
        try {
            const reviews: Review[] = await globalModel.FINDWHERE('REVIEWS', 'user_id', user_id);

            const all_reviews = await Promise.all(reviews.map(async review => {
                const user: User = await globalModel.FINDONE('Users', 'id', review.user_id);

                const details: Rate = {
                    review_id: review.id,
                    name: `${user.firstname} ${user.lastname}`,
                    comment: review.comment,
                    startRating: review.rate
                };
                return details;
            }));
            return all_reviews;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public getReviewsByBookID = async (book_id: string) => {
        try {
            const reviews = await globalModel.FINDWHERE('REVIEWS', 'book_id', book_id);


            const all_reviews = await Promise.all(reviews.map(async review => {
                const user: User = await globalModel.FINDONE('Users', 'id', review.user_id);

                const details: Rate = {
                    review_id: review.id,
                    name: `${user.firstname} ${user.lastname}`,
                    comment: review.comment,
                    startRating: review.rate
                };
                return details;
            }));
            return all_reviews;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
    public update = async (data: Review) => {
        try {
            const { comment, user_id, book_id, rate, review_id } = data;

            const conn = await client.connect();
            const sql = 'UPDATE Reviews SET comment = $1, rate=$2 WHERE user_id = $3 AND book_id = $4 AND id = $5 RETURNING *;';
            const values = [comment, rate, user_id, book_id, review_id];
            const res = await conn.query(sql, values); 


            conn.release();

            const review: Review = res.rows[0];
            const user: User = await globalModel.FINDONE('Users', 'id', user_id);

            const details: Rate = {
                name: `${user.firstname} ${user.lastname}`,
                comment: review.comment,
                startRating: review.rate
            };
            return details;
        } catch (error) {
            throw new CustomError(`${error}`, 500);
        }
    };
    public destroy = async (review_id: string | number) => {
        try {
            const destroy = await globalModel.Destroy('REVIEWS', review_id);
            return destroy ? destroy : false;
        } catch (error) {
            throw new CustomError('Internal Server Error', 500);
        }
    };
}
export default new ReviewModel;