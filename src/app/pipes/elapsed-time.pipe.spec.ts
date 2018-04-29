import { ElapsedTimePipe } from './elapsed-time.pipe';

describe('ElapsedTimePipe', () => {

    let pipe: ElapsedTimePipe;
    let value: Date;

    beforeEach(() => {
        value = new Date();
        pipe = new ElapsedTimePipe();

    });

    it('must return a null value when an null value is given', () => {
        let str: string = pipe.transform(null);
        expect(str).toBeNull();
    });

    it('must return a null value when an undefined value is given', () => {
        let str: string = pipe.transform(undefined);
        expect(str).toBeNull();
    });

    it('must return "Invalid date" when an invalid date is given', () => {
        let str: string = pipe.transform('not a real date');
        expect(str).toBe('Invalid date');
    });

    it('must return "in a day"', () => {
        value.setDate(value.getDate() + 1);
        let str: string = pipe.transform(value);
        expect(str).toBe('in a day');
    });

    it('must return "a few second ago"', () => {
        let str: string = pipe.transform(value);
        expect(str).toBe('a few seconds ago');
    });

    it('must return "a day ago"', () => {
        value.setDate(value.getDate() - 1);
        let str:  string = pipe.transform(value);
        expect(str).toBe('a day ago');
    });

    it('must return "in a month"', () => {
        value.setMonth(value.getMonth() + 1);
        let str: string = pipe.transform(value);
        expect(str).toBe('in a month');
    });

    it('must return "a month ago"', () => {
        value.setMonth(value.getMonth() - 1);
        let str: string = pipe.transform(value);
        expect(str).toBe('a month ago');
    });

});
