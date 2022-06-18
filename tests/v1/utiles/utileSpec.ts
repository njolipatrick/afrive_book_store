import { codeGenerator, slugify } from '../../../src/v1/utiles/generator.util';

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