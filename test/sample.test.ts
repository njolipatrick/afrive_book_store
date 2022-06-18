import { codeGenerator } from '../src/v1/utiles/generator.util';

describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(codeGenerator(36)).toBeInstanceOf(String);
    });
});