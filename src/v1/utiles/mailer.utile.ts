import nodemailer from 'nodemailer';
import {CustomError} from './error.utile';
import { config } from 'dotenv';
import { formatMessage } from './response.util';
config();
const { MAIL_USER, MAIL_PASSWORD, MAILER, BASE_URL, MAIL_HOST, CLIENT_BASE_URL } = process.env;

const transport = nodemailer.createTransport(
    {
        service: MAIL_HOST,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD
        }
    });

export const sendConfirmationEmail = async (name: string, email: string, confirmationCode?: string) => {
    try {
        await transport.verify();
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${formatMessage(String(name))}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${CLIENT_BASE_URL}/api/v1/auth/verify/${email}/${confirmationCode}> Click here</a>
        </div>`,
        });
    } catch (error) {
        throw new CustomError('Confirmation email not sent', 500);
    }
};
export const sendWelcomeEmail = async (name: string, email: string) => {
    try {
        await transport.verify();
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${formatMessage(String(name))}</h2>
        <p>Welcome to Afrive Book Store</p>`
        });
    } catch (error) {
        throw new CustomError('Verification email not sent.', 500);
    }
};
export const ResetPasswordEmail = async (email: string, confirmationCode?: string) => {
    try {
        await transport.verify();
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Request to change your Password',
            html: `
            <div> <h1>Reset your Password</h1>
            <p>We are sending you this email because you requested to change your password.
            click on the link to change your password</p> 
            <a href=${CLIENT_BASE_URL}/reset-password?email=${email}&code=${confirmationCode}> Click here</a> 
            </div>`,
        });
    } catch (error) {
        throw new CustomError(`${error}`, 500);
    }
};
export const SuccessPasswordChange = async (email: string, name?: string) => {
    try {
        await transport.verify();
        await transport.sendMail({
            from: String(MAILER),
            to: email,
            subject: 'Request to change your Password',
            html: `
            <div> <h1>${formatMessage(String(name))} Reset your Password</h1>
             <p>Your Password has be changed successfully. if this wasn't you, please contact admin.</p>
            </div>`,
        });
    } catch (error) {
        throw new CustomError('Change Password email not sent, please try again.', 500);
    }
};