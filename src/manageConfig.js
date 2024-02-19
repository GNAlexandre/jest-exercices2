export const API_URL = {
  BASE: 'base',
  GITHUB: 'github',
};

const manageConfig = (apiName, fetchAuthConfig) => {
    fetchAuthConfig = fetchAuthConfig || {};

    const { headers, ...restFetchAuthConfig } = fetchAuthConfig;


    //Creation de cas pour les differents URL API
    switch (apiName) {
        case API_URL.BASE:
            return { headers, ...restFetchAuthConfig };
        case API_URL.GITHUB:
            return restFetchAuthConfig; // Retourner fetchAuthConfig sans headers pour les autres URL API
        default:
            return fetchAuthConfig;
    }
};



export default manageConfig;
