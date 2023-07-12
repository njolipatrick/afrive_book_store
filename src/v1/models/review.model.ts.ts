export type ReviewX = {
    id?: number
    review_id?: number;
    comment: string;
    user_id: string | number;
    book_id: string | number;
    rate: number;
    date?: string;
    updated_at?: string;
}

export type CreateUpdateReview = {
    comment: string;
    user_id: number;
    book_id: number;
    rate: number;
}
export type Rate = {
    review_id?: number;
    name: string;
    comment: string;
    startRating: number;
    date?: string;
}
