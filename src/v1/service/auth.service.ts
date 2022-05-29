
import AuthModel, { User } from '../model/auth.model';
import CustomError from '../utile/error.utile';

class AuthService {
    async register(data: User): Promise<User | undefined> {

        const { fullname, role, password, email, username, phone, } = data;

        if (!(fullname && username && email && password && phone)) {
            throw new CustomError(`one or more input data not provided. 
            ${email} or ${fullname} or ${username} or ${phone} `, 400);
        }
        const findUser = await AuthModel.findUser(email, username);
        if (findUser) {
            throw new CustomError(`User with ${email} or ${username} already exist, please login`, 400);
        }
        const user: User | undefined = await AuthModel.register(data);
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
}
export default new AuthService;


