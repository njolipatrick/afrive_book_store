export type Review = {
    id?: number
    review_id?: number;
    comment: string;
    user_id:  number;
    book_id:number;
    rate: number;
    date?: string;
    updated_at?: string;
}
export type Rate = {
    review_id?: number;
    name: string;
    comment: string;
    startRating: number;
    date?: string;
}
export type DataReview = {
    book_id: number;
    user_id: number;
    comment: string;
    rate: number;
    }