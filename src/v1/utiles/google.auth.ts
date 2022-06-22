const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID);
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET);
const SERVER_ROOT_URI = 'https://afrive-books.vercel.app/api/v1/auth';
const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
import axios from 'axios';
import CustomError from './error.utile';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

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


export async function getTokens(req: Request) {
    try {
        /*
        * Uses the code to get tokens
        * that can be used to fetch the user's profile
        */

        const code = req.query.code as string;
        const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SERVER_ROOT_URI);
        const { res } = await client.getToken(code);

        const data = {
            id_token: res?.data.id_token as string,
            access_token: res?.data.access_token as string
        };
        const googleUser = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${data.id_token}`,
                },
            }
        );

        return googleUser.data;
    } catch (error) {
        throw new CustomError(`${error}`, 500);
    }
}