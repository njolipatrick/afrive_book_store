export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
    isverified?: boolean;
    token?: string;
    verification_token?: string;
    password_confirmation?: string;
    created_at?: string;
    updated_at?: string;
};
export type Data = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    isverified: boolean;
    verification_token: string;
    token: string;
    created_at: string;
    updated_at: string;
}
