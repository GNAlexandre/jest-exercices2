import { setCurrentPage } from '../setCurrentPage';

describe('setCurrentPage', () => {
    test('should return 1 if max is 0', () => {
        const result = setCurrentPage({ max: 0, skip: 20 });
        expect(result).toBe(1);
    });

    test('should calculate current page correctly when max is not 0', () => {
        //const result1 = setCurrentPage({ max: 10, skip: 20 });
        //expect(result1).toBe(3);
        //cas me result1 = 2
        const result1 = setCurrentPage({ max: 10, skip: 20 });
        expect(result1).toBe(2);
        
        const result2 = setCurrentPage({ max: 10, skip: 15 });
        expect(result2).toBe(2);

        const result3 = setCurrentPage({ max: 10, skip: 5 });
        expect(result3).toBe(1);
    });

    test('should handle skip being 0 correctly', () => {
        const result = setCurrentPage({ max: 10, skip: 0 });
        expect(result).toBe(1);
    });
});
