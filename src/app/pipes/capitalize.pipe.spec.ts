import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {

    let pipe: CapitalizePipe;

    beforeEach(() => {
        pipe = new CapitalizePipe();
    });

    it('must return an empty string when an empty string is given', () => {
        let str: string = pipe.transform('');
        expect(str).toBe('');
    });

    it('must return a string with the first letter capitalized', () => {
        let expectation = 'Hola mundo';
        let result: string = pipe.transform('hola mundo');
        expect(result).toEqual(expectation);
    });

    it('must return a null string when a null value is given', () => {
        let str: string = pipe.transform(null);
        expect(str).toBeNull();
    });

    it('must return a undefined string when an undefined value is given', () => {
        let str: string = pipe.transform(undefined);
        expect(str).toBeUndefined();
    });

});
