
export type Favorite = { 
    book_id: number;
    user_id: number;
    created_at?: string;
    updated_at?: string;
}
export type FavoriteDetails = {
    id?: number;
    user_name: string;
    book_name: string;
    created_at?: string;
}