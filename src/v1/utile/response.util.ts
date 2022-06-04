/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */

import { User } from '../model/auth.model';

function response(message: string, data?: any, success?: boolean) {
    return {
        success: success == null ? true : success,
        message: formatMesaage(message),
        data: data || null
    };
}

function formatMesaage(str: string): string {
    if (!str) return '';
    // Make first letter capitial
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default response;