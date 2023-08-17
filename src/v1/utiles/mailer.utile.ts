import { formatMessage } from './response.util';
import { CustomError } from './error.utile';
import sgMail from '@sendgrid/mail';
import nodemailer, { TestAccount } from 'nodemailer';
import Email from '../../../common/email.templates';

const { SENDGRID_API_KEY, MAILER, CLIENT_BASE_URL } = process.env;
sgMail.setApiKey(String(SENDGRID_API_KEY));

export const sendConfirmationEmail = async (name: string, email: string, confirmationCode?: string) => {
    try {
        const msg = {
            from: String(MAILER),
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${formatMessage(String(name))}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${CLIENT_BASE_URL}/api/v1/auth/verify/${email}/${confirmationCode}> Click here</a>
            </div>`,
        };

        await sgMail.send(msg);
    } catch (error) {
        throw new CustomError('Confirmation email not sent', 500);
    }
};

export const sendWelcomeEmail = async (name: string, email: string) => {
    try {
        const msg = {
            from: String(MAILER),
            to: email,
            subject: 'Please confirm your account',
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${formatMessage(String(name))}</h2>
        <p>Welcome to Afrive Book Store</p>`
        };

        await sgMail.send(msg);
    } catch (error) {
        throw new CustomError('Verification email not sent.', 500);
    }
};
export const ResetPasswordEmail = async (email: string, confirmationCode?: string) => {
    try {
        const msg = {
            from: String(MAILER),
            to: email,
            subject: 'Request to change your Password',
            html: `
            <div> <h1>Reset your Password</h1>
            <p>We are sending you this email because you requested to change your password.
            click on the link to change your password</p> 
            <a href=${CLIENT_BASE_URL}/reset-password?email=${email}&code=${confirmationCode}> Click here</a> 
            </div>`,
        };
        await sgMail.send(msg);
    } catch (error) {
        throw new CustomError(`${error}`, 500);
    }
};
export const SuccessPasswordChange = async (email: string, name?: string) => {
    try {
        const msg = {
            from: String(MAILER),
            to: email,
            subject: 'Request to change your Password',
            html: `
            <div> <h1>${formatMessage(String(name))} Reset your Password</h1>
             <p>Your Password has be changed successfully. if this wasn't you, please contact admin.</p>
            </div>`,
        };
        await sgMail.send(msg);
    } catch (error) {
        throw new CustomError('Change Password email not sent, please try again.', 500);
    }
};

export const sendMail = async (
    template_data: { name?: string | null, confirmationCode?: string | null, subject?: string | null },
    reciever?: string | null) => {


    const message = {
        to: reciever as string,
        from: 'ogmaro@gmail.com',
        templateId: 'd-5fc693b79cc44ca3800bc14052e69ff4',
        dynamic_tempate_data: template_data ?? {}
    };

    await sgMail.send(message);

    // return (send as any)?.response;
};

export const sendMailv2 = async (mailOptions: { content: string, sentTo?: string, subject?: string }) => {
    const template_message = new Email();

    const message = {
        to: mailOptions.sentTo,
        from: 'ogmaro@gmail.com',// set to .env
        subject: mailOptions.subject, // Subject line 
        html: mailOptions.content, // html body
    };

    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: 'bbbb426802b7ae',
            pass: '7c669296175717'
        }
    });

    // send mail with defined transport object
    const info = await transport.sendMail(message); 
};