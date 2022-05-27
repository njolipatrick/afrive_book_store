class CustomError extends Error {
    statusCode: number | undefined;
    isOperational: boolean;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;