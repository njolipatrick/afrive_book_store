/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */

export const response = (message: string, data?: any, success?: boolean) => {
    return {
        success: success == null ? true : success,
        message: formatMessage(message),
        data: data || null
    };
};

export const formatMessage = (str: string): string => {
    if (!str) return '';
    // Make first letter capitial
    return str.charAt(0).toUpperCase() + str.slice(1);
};
