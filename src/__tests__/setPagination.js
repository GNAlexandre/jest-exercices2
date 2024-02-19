import { setPagination } from '../setPagination';

// Mock setCurrentPage and setNumberPages functions
jest.mock('../setCurrentPage', () => ({
    setCurrentPage: jest.fn(({ max, skip }) => Math.ceil(skip / max)),
}));

jest.mock('../setNumberPages', () => ({
    setNumberPages: jest.fn(({ total, max }) => Math.ceil(total / max)),
}));

describe('setPagination', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return pagination object with default parameters', () => {
        const result = setPagination({});
        expect(result).toEqual({
            total: 1,
            numberItems: 1,
            numberPages: 1,
            currentPage: 1,
        });
    });

    test('should call setCurrentPage and setNumberPages with correct parameters', () => {
        const total = 50;
        const skip = 20;
        const max = 10;
        const setCurrentPageFn = jest.requireMock('../setCurrentPage').setCurrentPage;
        const setNumberPagesFn = jest.requireMock('../setNumberPages').setNumberPages;

        setPagination({ total, skip, max, setCurrentPageFn, setNumberPagesFn });

        expect(setCurrentPageFn).toHaveBeenCalledWith({ max, skip });
        expect(setNumberPagesFn).toHaveBeenCalledWith({ total, max });
    });

    test('should return pagination object with calculated values', () => {
        const total = 50;
        const skip = 20;
        const max = 10;

        const setCurrentPageFn = jest.requireMock('../setCurrentPage').setCurrentPage;
        const setNumberPagesFn = jest.requireMock('../setNumberPages').setNumberPages;

        setCurrentPageFn.mockReturnValue(3);
        setNumberPagesFn.mockReturnValue(5);

        const result = setPagination({ total, skip, max });

        expect(result).toEqual({
            total: 50,
            numberItems: 10,
            numberPages: 5, // Correction ici
            currentPage: 3,
        });
    });
});
