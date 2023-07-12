import { Book } from './book.model';

export type Pay = {
    user_id?: string;
    amount: number;
    email: string;
    txn_ref?: string;
    reference?: string;
}
export interface PlaceOrder {
    user_id: number
    txn_ref: string
    total_order_amount: string
    status: string
    completed?: boolean | null
    estimated_delivery_date: string
    currency: string
    checkout_url: string
    book?: Book
}
export type ReturnBookOrder = {
    book_name: string;
    total_amount: number;
    format: string;
}
export type Order = {
    id?: number | string;
    order_id: string | number | undefined;
    user_id?: string | number | undefined;
    txn_ref?: string;
    quantity: number;
    book?: string;
    date?: string;
    total_order_amount: number;
    status: string;
    completed?: boolean;
    estimated_delivery_date: string;
    currency: string;
    created_at?: string;
    checkout_url?: string;
};

export type Delivery = {
    order_id: number;
    phone: number;
    delivery_address: string;
    date_delivered: string;
    is_delivered: boolean;
    download_link: string;
};