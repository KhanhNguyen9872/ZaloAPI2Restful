// ValidationMiddleware - Input validation middleware
class ValidationMiddleware {
    // Validate required fields
    validateRequired(fields) {
        return (req, res, next) => {
            const errors = [];
            
            fields.forEach(field => {
                if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
                    errors.push(`${field} is required`);
                }
            });
            
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: 'Missing required fields',
                    details: errors
                });
            }
            
            next();
        };
    }

    // Validate email format
    validateEmail(field = 'email') {
        return (req, res, next) => {
            const email = req.body[field];
            if (email && !this.isValidEmail(email)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: 'Invalid email format'
                });
            }
            next();
        };
    }

    // Validate phone format
    validatePhone(field = 'phone') {
        return (req, res, next) => {
            const phone = req.body[field];
            if (phone && !this.isValidPhone(phone)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: 'Invalid phone format'
                });
            }
            next();
        };
    }

    // Validate array
    validateArray(field) {
        return (req, res, next) => {
            const value = req.body[field];
            if (value && !Array.isArray(value)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: `${field} must be an array`
                });
            }
            next();
        };
    }

    // Validate string length
    validateLength(field, minLength = 1, maxLength = 255) {
        return (req, res, next) => {
            const value = req.body[field];
            if (value && (value.length < minLength || value.length > maxLength)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: `${field} must be between ${minLength} and ${maxLength} characters`
                });
            }
            next();
        };
    }

    // Validate thread type
    validateThreadType() {
        return (req, res, next) => {
            const threadType = req.body.threadType;
            if (threadType && ![1, 2].includes(threadType)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: 'Thread type must be 1 (personal) or 2 (group)'
                });
            }
            next();
        };
    }

    // Validate message type
    validateMessageType() {
        return (req, res, next) => {
            const messageType = req.body.type;
            const validTypes = ['text', 'voice', 'sticker', 'card', 'poll', 'image', 'file'];
            if (messageType && !validTypes.includes(messageType)) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: `Message type must be one of: ${validTypes.join(', ')}`
                });
            }
            next();
        };
    }

    // Helper methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone);
    }

    // Custom validator
    customValidator(validator) {
        return (req, res, next) => {
            try {
                const result = validator(req.body);
                if (!result.isValid) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validation failed',
                        message: result.message,
                        details: result.errors
                    });
                }
                next();
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    message: error.message
                });
            }
        };
    }

    // Static methods for easy access
    static validateRequired(fields) {
        const validation = new ValidationMiddleware();
        return validation.validateRequired(fields);
    }

    static validateThreadType() {
        const validation = new ValidationMiddleware();
        return validation.validateThreadType();
    }

    static validateEmail() {
        const validation = new ValidationMiddleware();
        return validation.validateEmail();
    }

    static validatePhone() {
        const validation = new ValidationMiddleware();
        return validation.validatePhone();
    }

    static validateNumber() {
        const validation = new ValidationMiddleware();
        return validation.validateNumber();
    }

    static validateString() {
        const validation = new ValidationMiddleware();
        return validation.validateString();
    }

    static validateArray(field) {
        const validation = new ValidationMiddleware();
        return validation.validateArray(field);
    }
}

module.exports = ValidationMiddleware;
