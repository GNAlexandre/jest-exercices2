import manageConfig, { API_URL } from '../manageConfig';

describe('manageConfig', () => {
    test('should return full fetchAuthConfig for API_URL.BASE', () => {
        const fetchAuthConfig = {
            headers: {
                Authorization: 'Bearer token',
            },
            method: 'GET',
        };

        const result = manageConfig(API_URL.BASE, fetchAuthConfig);

        expect(result).toEqual(fetchAuthConfig);
    });

    test('should return fetchAuthConfig without headers for other API URLs', () => {
        const fetchAuthConfig = {
            headers: {
                Authorization: 'Bearer token',
            },
            method: 'GET',
        };

        const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);

        expect(result).toEqual({
            method: 'GET',
        });
    });

    test('should return fetchAuthConfig as is if apiName is not recognized', () => {
        const fetchAuthConfig = {
            headers: {
                Authorization: 'Bearer token',
            },
            method: 'GET',
        };

        const result = manageConfig('unknown_api', fetchAuthConfig);

        expect(result).toEqual(fetchAuthConfig);
    });

    test('should handle empty fetchAuthConfig', () => {
        const result = manageConfig(API_URL.BASE, {});

        expect(result).toEqual({});
    });

    test('should handle undefined fetchAuthConfig', () => {
        const result = manageConfig(API_URL.BASE);

        expect(result).toEqual({});
    });
});
