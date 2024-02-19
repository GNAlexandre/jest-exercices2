import setConfirmClassModifier from '../setConfirmClassModifier';

describe('setConfirmClassModifier', () => {
    test('should return classModifier without modification if hasErrors is false', () => {
        const result = setConfirmClassModifier(false, 'confirm');
        expect(result).toBe('confirm success');
    });

    test('should return classModifier with "disabled" suffix if hasErrors is true', () => {
        const result = setConfirmClassModifier(true, 'confirm');
        expect(result).toBe('confirm disabled');
    });

    test('should use default classModifier ("confirm") if not provided', () => {
        const result = setConfirmClassModifier(false);
        expect(result).toBe('confirm success');
    });

    test('should return "confirm success" if hasErrors is false and classModifier is not provided', () => {
        const result = setConfirmClassModifier(false, '');
        expect(result).toBe(' success');
    });

    test('should return "confirm disabled" if hasErrors is true and classModifier is not provided', () => {
        const result = setConfirmClassModifier(true, '');
        expect(result).toBe(' disabled');
    });
});
