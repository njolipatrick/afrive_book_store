

export type Cart = {
    book_id: number;
    user_id: number;
}
export type CartDetails = {
    id?: number;
    user_name: string;
    book_name: string;
    created_at?: string;
}
export type Delivery = {
    id: number;
    phone: number;
    delivery_address: string;
    date_delivered: string;
    is_delivered: boolean;
    download_link: string;
};