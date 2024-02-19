import { setResponseError, STATUS_HTTP, STATUS_API, STATUS_HTTP_MESSAGES } from '../setResponseError';

describe('setResponseError', () => {
    test('should return empty object for unknown status', () => {
        const response = {
            status: 999,
            anomaly: {
                label: 'Unknown Error',
                detail: 'Some details',
            },
        };
        const result = setResponseError({ response });
        expect(result).toEqual({});
    });

    test('should return warning object for status starting with WARNING', () => {
        const response = {
            status: STATUS_API.WARNING,
            anomaly: {
                label: 'Warning',
                detail: 'Some warning details',
            },
        };
        const result = setResponseError({ response });
        expect(result).toEqual({
            label: 'Warning',
            detail: 'Some warning details',
            type: 'danger',
            iconName: 'alert',
        });
    });

    test('should return error object for status starting with ERROR', () => {
        const response = {
            status: STATUS_API.ERROR,
            anomaly: {
                label: 'Error',
                detail: 'Some error details',
            },
        };
        const result = setResponseError({ response });
        expect(result).toEqual({
            label: 'Error',
            detail: 'Some error details',
        });
    });

    test('should use default message for status from STATUS_HTTP_MESSAGES if anomaly label is not provided', () => {
        const response = {
            status: STATUS_HTTP.NOTFOUND,
            anomaly: {},
        };
        const result = setResponseError({ response });
        expect(result).toEqual({
            label: STATUS_HTTP_MESSAGES[STATUS_HTTP.NOTFOUND],
            detail: '',
        });
    });

    test('should use default message for status from STATUS_HTTP_MESSAGES if anomaly is not provided', () => {
        const response = {
            status: STATUS_HTTP.BAD_REQUEST,
        };
        const result = setResponseError({ response });
        expect(result).toEqual({
            label: STATUS_HTTP_MESSAGES[STATUS_HTTP.BAD_REQUEST],
            detail: '',
        });
    });
});
