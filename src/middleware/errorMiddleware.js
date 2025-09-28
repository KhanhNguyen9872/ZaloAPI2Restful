// ErrorMiddleware - Error handling middleware
class ErrorMiddleware {
    // Global error handler
    static globalErrorHandler(err, req, res, next) {
        console.error('Global Error:', err);

        // Default error response
        let statusCode = 500;
        let message = 'Internal Server Error';
        let details = null;

        // Handle specific error types
        if (err.name === 'ValidationError') {
            statusCode = 400;
            message = 'Validation Error';
            details = err.details || err.message;
        } else if (err.name === 'UnauthorizedError') {
            statusCode = 401;
            message = 'Unauthorized';
        } else if (err.name === 'ForbiddenError') {
            statusCode = 403;
            message = 'Forbidden';
        } else if (err.name === 'NotFoundError') {
            statusCode = 404;
            message = 'Not Found';
        } else if (err.name === 'ConflictError') {
            statusCode = 409;
            message = 'Conflict';
        } else if (err.name === 'RateLimitError') {
            statusCode = 429;
            message = 'Too Many Requests';
        } else if (err.message && err.message.includes('Zalo API not initialized')) {
            statusCode = 401;
            message = 'Zalo API not initialized';
        } else if (err.message && err.message.includes('Authentication required')) {
            statusCode = 401;
            message = 'Authentication required';
        }

        // Send error response
        res.status(statusCode).json({
            success: false,
            error: message,
            message: err.message || message,
            details: details,
            timestamp: new Date().toISOString(),
            path: req.path,
            method: req.method
        });
    }

    // 404 handler
    static notFoundHandler(req, res, next) {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: `Route ${req.method} ${req.path} not found`,
            timestamp: new Date().toISOString()
        });
    }

    // Async error wrapper
    static asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }

    // Custom error creator
    static createError(message, statusCode = 500, name = 'CustomError') {
        const error = new Error(message);
        error.statusCode = statusCode;
        error.name = name;
        return error;
    }

    // Validation error creator
    static createValidationError(message, details = null) {
        const error = new Error(message);
        error.name = 'ValidationError';
        error.statusCode = 400;
        error.details = details;
        return error;
    }

    // Authentication error creator
    static createAuthError(message = 'Authentication required') {
        const error = new Error(message);
        error.name = 'UnauthorizedError';
        error.statusCode = 401;
        return error;
    }

    // Not found error creator
    static createNotFoundError(message = 'Resource not found') {
        const error = new Error(message);
        error.name = 'NotFoundError';
        error.statusCode = 404;
        return error;
    }

    // Conflict error creator
    static createConflictError(message = 'Resource conflict') {
        const error = new Error(message);
        error.name = 'ConflictError';
        error.statusCode = 409;
        return error;
    }
}

module.exports = ErrorMiddleware;
