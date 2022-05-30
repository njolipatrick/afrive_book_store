
import AuthModel, { User } from '../model/auth.model';
import CustomError from '../utile/error.utile';
import { codeGenerator } from '../utile/generator.util';
import { sendConfirmationEmail } from '../utile/mailer.utile';

class AuthService {
    async register(data: User): Promise<User | undefined> {

        const { fullname, password, email, username, phone, } = data;

        if (!(fullname && username && email && password && phone)) {
            throw new CustomError(`one or more input data not provided. 
            ${email} or ${fullname} or ${username} or ${phone} `, 400);
        }
        const findUser = await AuthModel.findUser(email, username);

        if (findUser) {
            throw new CustomError(`User with ${email} or ${username} already exist, please login`, 400);
        }
        const user: User = await AuthModel.register(data);
        await sendConfirmationEmail(fullname, email, user.verification_token);
        return user;
    }
    async login(data: User): Promise<User> {
        const { email, username, password } = data;
        if (!(email || username)) throw new CustomError('Input field email or username is required', 400);
        if (!password) throw new CustomError('Input field password is required', 400);

        const findUser = await AuthModel.findUser(email, username);
        if (findUser) {

            const user: User | undefined = await AuthModel.login(username, password);

            return user;
        } else {
            throw new CustomError(`User with ${email} or ${findUser} not found`, 404);
        }

    }
    async verifyEmail(data: { email: string; token: string; }) {
        const { email, token } = data;
        if (!(email && token)) throw new CustomError('User _id or token not provided', 400);
        const findUser = await AuthModel.findUser(email);
        
        if (findUser) {
            const user = await AuthModel.verifyEmail(email, token);
            console.log(findUser);
            if (user) {
                return 'User email has be successfully verified';
            } else {
                throw new CustomError(`Provided token was invalid for user ${email}`);
            }
        } else {
            throw new CustomError(`User with ${email} does not exist`, 404);
        }

        console.log(email, token);


    }
}
export default new AuthService;


