const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID);
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET);
const SERVER_ROOT_URI = 'http://localhost:5000/api/v1/auth/google-login';
const UI_ROOT_URI = 'http://localhost:3000';
const JWT_SECRET = 'shhhhh';
const COOKIE_NAME = 'auth_token';
const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
import axios from 'axios';
import CustomError from './error.utile';
import url from 'url';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

type Result = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export function getGoogleAuthURL() {
    const options = {
        redirect_uri: `${SERVER_ROOT_URI}`,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    const querystring = new URLSearchParams(options);
    return `${rootUrl}?${querystring}`;
}


export async function getTokens(req: Request): Promise<Result> {
    try {
        /*
        * Uses the code to get tokens
        * that can be used to fetch the user's profile
        */

        const code = req.query.code as string;
        const urld = 'https://oauth2.googleapis.com/token';
        const values = {
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: SERVER_ROOT_URI,
        };
        const client = new OAuth2Client(String(process.env.GOOGLE_CLIENT_ID), String(process.env.GOOGLE_CLIENT_SECRET), SERVER_ROOT_URI);
        const r = await client.getToken(code);
        console.log(r);
        const { data } = await axios({ url: urld, data: values, method: 'POST' });

        return data;
    } catch (error) {
        throw new CustomError(`${error}`, 500);
    }
}