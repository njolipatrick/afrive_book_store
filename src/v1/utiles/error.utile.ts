class CustomError extends Error {
    statusCode: number | undefined;
    isOperational: boolean;

    constructor(message: string | boolean|string[], statusCode?: number) {
        super(String(message));
        this.statusCode = statusCode;
        this.isOperational = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;