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
        throw new CustomError('Verification email not sent.', 400);
    }
};
export const ResetPasswordEmail = async (email: string, confirmationCode?: string) => {
    try {
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Request to change your Password',
            html: `
            <div> <h1>Reset your Password</h1>
            <p>We are sending you this email because you requested to change your password.
            click on the link to change your password</p>
            <h3>Code: <strong>${confirmationCode}</strong></h3>
            <p>Please Pass this as your request body.</p>
            </div>`,
        });
    } catch (error) {
        throw new CustomError('Reset Password email not sent, please try again.', 400);
    }
};