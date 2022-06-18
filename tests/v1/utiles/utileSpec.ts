import { codeGenerator, slugify } from '../../../src/v1/utiles/generator.util';
import { upload } from '../../../src/v1/utiles/cloudinary.utile';

describe('Return Instance of a string', () => {
    it('Return Instance of a string', () => {
        const check = codeGenerator(36);
        expect(check).toBeInstanceOf(String);
    });
    it('Return a slug of a any string', () => {
        const check = slugify('afrive book store');
        expect(check).toBeInstanceOf(String);
    });
});

describe('Return a Secure Cloudinary image link', async () => {
    it('Returns a string', async () => {
        const imageAddress = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
        const avatar = await upload(imageAddress, 'abs_live_user');
        expect(avatar).toBeInstanceOf(String);
    });
});