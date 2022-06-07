class CustomError extends Error {
    statusCode: number | undefined;
    isOperational: boolean;

    constructor(message: string | boolean, statusCode?: number) {
        super(String(message));
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;