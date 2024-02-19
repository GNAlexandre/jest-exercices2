import { buildResponse } from '../buildResponse';
import { computeDataError } from '../computeDataError';
import {STATUS_API, STATUS_HTTP} from '../setResponseError';



// Mocking computeDataError function
jest.mock('../computeDataError', () => ({
    computeDataError: jest.fn(),
}));

describe('buildResponse', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw error for ERROR status', async () => {
        const response = { status: STATUS_API.ERROR };
        computeDataError.mockResolvedValueOnce('Error message');

        await expect(buildResponse(response)).rejects.toEqual('Error message');

        expect(computeDataError).toHaveBeenCalledWith(response);
    });

    test('should throw error for WARNING status', async () => {
        const response = { status: STATUS_API.WARNING };
        computeDataError.mockResolvedValueOnce('Warning message');

        await expect(buildResponse(response)).rejects.toEqual('Warning message');

        expect(computeDataError).toHaveBeenCalledWith(response);
    });

    test('should return blob if config.blob is true and status is SUCCESS', async () => {
        const response = { status: STATUS_API.SUCCESS, blob: jest.fn() };
        const config = { blob: true };

        const result = await buildResponse(response, config);

        expect(result).toBe(response.blob());
    });

    test('should return text if config.text is true and status is SUCCESS', async () => {
        const response = { status: STATUS_API.SUCCESS, text: jest.fn() };
        const config = { text: true };

        const result = await buildResponse(response, config);

        expect(result).toBe(response.text());
    });

    test('should return JSON response if config.blob and config.text are false and status is SUCCESS', async () => {
        const jsonResponse = { data: 'some data', status: STATUS_API.SUCCESS };
        const response = { status: STATUS_API.SUCCESS, json: jest.fn().mockResolvedValueOnce(jsonResponse) };
        const config = { blob: false, text: false };

        const result = await buildResponse(response, config);

        expect(result).toEqual({
            ...jsonResponse,
            statusHttp: STATUS_API.SUCCESS,
        });
    });

    test('should return statusHttp for SUCCESS status', async () => {
        const response = { status: STATUS_HTTP.SUCCESS };
        const config = { blob: false, text: false, json: true };
        const result = await buildResponse(response, config);

        expect(result).toEqual({
            statusHttp: STATUS_API.SUCCESS,
        });
    });

    test('should return statusHttp for other status codes', async () => {
        const response = { status: STATUS_HTTP.NOTFOUND };
        const config = { blob: false, text: false, json: true };
        const result = await buildResponse(response, config);

        expect(result).toEqual({
            statusHttp: 404,
        });
    });
});
