import { isValidDate, formatDate, setDate } from '../formatDate';

describe('isValidDate', () => {
    test('should return true for a valid date', () => {
        expect(isValidDate('2024-02-19')).toBe(true);
    });

    test('should return false for null or undefined', () => {
        expect(isValidDate(null)).toBe(false);
        expect(isValidDate(undefined)).toBe(false);
    });

    test('should return false for invalid date strings', () => {
        expect(isValidDate('invalid-date')).toBe(false);
    });

    test('should return false for an empty string', () => {
        expect(isValidDate('')).toBe(false);
    });
});

describe('formatDate', () => {
    test('should format date correctly with default parameters', () => {
        const formattedDate = formatDate('2024-02-19');
        expect(formattedDate).toBe('19/02/2024');
    });

    test('should format date correctly with custom locale and options', () => {
        const formattedDate = formatDate('2024-02-19', 'en-US', { month: 'long', year: 'numeric' });
        expect(formattedDate).toBe('February 2024');
    });

    test('should return an empty string for an empty input', () => {
        const formattedDate = formatDate('');
        expect(formattedDate).toBe('');
    });
});

describe('setDate', () => {
    test('should return formatted date for a valid date input', () => {
        const validDate = '2024-02-19';
        const formattedDate = setDate({ date: validDate });
        expect(formattedDate).toBe('19/02/2024');
    });

    test('should return empty string for invalid date input', () => {
        const invalidDate = 'invalid-date';
        const formattedDate = setDate({ date: invalidDate });
        expect(formattedDate).toBe('');
    });

    test('should allow custom formatDateFn', () => {
        const customFormatDateFn = jest.fn(() => 'Custom formatted date');
        const formattedDate = setDate({ date: '2024-02-19', formatDateFn: customFormatDateFn });
        expect(customFormatDateFn).toHaveBeenCalledWith('2024-02-19');
        expect(formattedDate).toBe('Custom formatted date');
    });
});
