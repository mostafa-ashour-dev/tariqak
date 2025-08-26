import { NODE_ENV } from "../config/env.config";

const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    const type = error.type || "error";
    res.status(statusCode).json({
        success: false,
        type: type,
        message: message,
        ...(NODE_ENV == "development" && { stack: error.stack }),
    });
    return;
};

export default errorHandler;
