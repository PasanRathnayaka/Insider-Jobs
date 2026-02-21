

export const globalErrorHandler = (err, _req, res, _next) => {
    
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Cast Error (Invalid ObjectId)
    if (err.name === "CastError") {
        message = `Invalid ${err.path}: ${err.value}`;
        statusCode = 400;
    }

    // Mongoose Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value for field: ${field}`;
        statusCode = 400;
    }

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(el => el.message);
        message = errors.join(", ");
        statusCode = 400;
    }

    if (err.name === "JsonWebTokenError") {
        message = "Invalid token";
        statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
        message = "Token expired";
        statusCode = 401;
    }

    if (process.env.NODE_ENV === "production") {
        if (err.isOperational) {
            return res.status(statusCode).json({
                success: false,
                message,
            });
        }

        // Unknown errors
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }

    return res.status(statusCode).json({
        success: false,
        message,
        stack: err.stack,
        error: err,
    });
};
