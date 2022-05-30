import nodemailer from 'nodemailer';
import CustomError from './error.utile';
import { config } from 'dotenv';
config();
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAILER, PORT, ADDRESS } = process.env;


const transport = nodemailer.createTransport(
    {
        host: String(MAIL_HOST),
        port: Number(MAIL_PORT),
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        }
    });

export const sendConfirmationEmail = async (name: string, email: string, confirmationCode?: string) => {
    try {
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://${ADDRESS}:${PORT}/api/v1/auth/verify/${email}/${confirmationCode}> Click here</a>
        </div>`,
        });
    } catch (error) {
        throw new CustomError(`Email not sent ${error}`, 400);
    }
};