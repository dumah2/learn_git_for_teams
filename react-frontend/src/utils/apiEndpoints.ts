import type IApiEndpointContainer from "../interfaces/Auth/TApiEndpointContainer";

// Auth endpoints
export const Auth: IApiEndpointContainer = {
    login: "auth/login",
    logout: "auth/logout",
    register: "auth/register",
};

/**
 * Normalizes api endpoints
 * @param {string} relaEndpoint The relative endpoint
 * @returns {string} Normalized enpoint
 */
export const getEndpoint = (relaEndpoint: string): string => {
    // Normalize base api url
    const NOT_CLEAN_BASE_URL: string = import.meta.env.VITE_API_V1_BASE_URL;
    const CLEAN_BASE_URL = NOT_CLEAN_BASE_URL.endsWith("/")
        ? NOT_CLEAN_BASE_URL
        : `${NOT_CLEAN_BASE_URL}/`;
    const cleanRelaEndpoint: string = relaEndpoint.startsWith("/")
        ? relaEndpoint.slice(1)
        : relaEndpoint;

    const endpoint = `${CLEAN_BASE_URL}${cleanRelaEndpoint}`;
    console.log(endpoint);
    return endpoint;
};

getEndpoint(Auth.login);
