import { setNumberPages } from '../setNumberPages';

describe('setNumberPages', () => {
    test('should return 1 if total is 1 or max is 1', () => {
        const result1 = setNumberPages({ total: 1, max: 1 });
        expect(result1).toBe(1);

        const result2 = setNumberPages({ total: 1, max: 10 });
        expect(result2).toBe(1);
    });

    test('should return correct number of pages for total greater than max', () => {
        const result1 = setNumberPages({ total: 10, max: 5 });
        expect(result1).toBe(1);

        const result2 = setNumberPages({ total: 15, max: 5 });
        expect(result2).toBe(2);

        const result3 = setNumberPages({ total: 20, max: 7 });
        expect(result3).toBe(2);
    });

    test('should return 1 if max is greater than or equal to total', () => {
        const result1 = setNumberPages({ total: 5, max: 5 });
        expect(result1).toBe(1);

        const result2 = setNumberPages({ total: 5, max: 10 });
        expect(result2).toBe(1);
    });
});
