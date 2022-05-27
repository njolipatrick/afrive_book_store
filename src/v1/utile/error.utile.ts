class CustomError extends Error {
    statusCode: number;
    isOperational: boolean;

    /**
     * Create custom error
     * 
     * @param {*} message Error message for request response
     * @param {number} statusCode HTTP status code. Default is 500
     *  
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;