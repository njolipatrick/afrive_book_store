import { Category } from './category.model';
import { Ebook } from './ebook.model'; 

export type Book = {
    id: number;
    title?: string | null;
    author?: string | null;
    img?: string;
    image?: string | null;
    description?: string | null;
    price?: number | null;
    status?: string | null;
    category_name?: string;
    format?: string;
    comment?: string;
    user_id?: string;
    rate?: string;
}

export interface newBook {
    title: string;
    author: string;
    description: string;
    price: number;
    status: string
}