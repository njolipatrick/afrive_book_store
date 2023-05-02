
export type Book = {
    id: number;
    title: string;
    author: string;
    img?: string;
    image?: string;
    description: string;
    price: number;
    status: string;
    category_name?: string;
    format?: string;
    comment?: string;
    user_id?: string;
    rate?: string;
}

export interface newBook { title?: string, image?: string, author?: string, description?: string, prices?: number, status?: string }