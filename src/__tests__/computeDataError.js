import { computeDataError } from '../computeDataError';
import { setResponseError, STATUS_HTTP_MESSAGES } from '../setResponseError';

// Mocking setResponseError function and STATUS_HTTP_MESSAGES
jest.mock('../setResponseError', () => ({
    setResponseError: jest.fn(),
    STATUS_HTTP_MESSAGES: {
        400: 'Bad Request',
        404: 'Not Found',
        // Add more status codes as needed for testing
    },
}));

describe('computeDataError', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should call setResponseError with JSON data and response status', async () => {
        const response = { status: 200, json: jest.fn().mockResolvedValueOnce({ error: 'Some error' }) };

        await computeDataError(response);

        expect(response.json).toHaveBeenCalled();
        expect(setResponseError).toHaveBeenCalledWith({
            response: { error: 'Some error', status: 200 },
        });
    });

    test('should call setResponseError with anomaly object for failed JSON parsing', async () => {
        const response = { status: 404, json: jest.fn().mockRejectedValueOnce('JSON parsing error') };

        await computeDataError(response);

        expect(response.json).toHaveBeenCalled();
        expect(setResponseError).toHaveBeenCalledWith({
            response: {
                anomaly: { label: STATUS_HTTP_MESSAGES[404] },
                status: 404,
            },
        });
    });
});
