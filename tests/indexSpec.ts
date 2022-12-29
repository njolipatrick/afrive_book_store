import {codeGenerator} from '../src/v1/utiles/generator.util';

describe('Converter returns an number', () => {
    it('recieve a string', () => {
        const check = codeGenerator(36);
        expect(String(check)).toBeInstanceOf(String);
    });
});