class ResponseError extends Error {
    constructor(statusCode, type, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.type = type;
    }
}

export default ResponseError;
