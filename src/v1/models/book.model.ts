export type Book = {
    id: number;
    title?: string|null;
    author?: string|null;
    img?: string;
    image?: string|null;
    description?: string|null;
    price?: number|null;
    status?: string|null;
    category_name?: string;
    format?: string;
    comment?: string;
    user_id?: string;
    rate?: string; 
}

export interface newBook { title?: string, image?: string, author?: string, description?: string, prices?: number, status?: string }
