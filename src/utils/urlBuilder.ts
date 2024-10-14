type UrlParams = Record<string, string>;

/**
 * A flexible URL builder function that constructs a URL from a base URL and a params object.
 *
 * @param baseUrl - The base URL to which query parameters should be appended.
 * @param params - An object containing key-value pairs representing query parameters.
 * @returns The constructed URL string with the provided query parameters.
 */
export const createUrl = (baseUrl: string, params: UrlParams): string => {
    const urlParams = new URLSearchParams(params);
    return `${baseUrl}?${urlParams.toString()}`;
};