// Secret Key Middleware - Bảo vệ API với secret key
const crypto = require('crypto');

class SecretKeyMiddleware {
    constructor() {
        this.secretKey = process.env.SECRET_KEY || 'default-secret-key-2024';
    }

    // Middleware để kiểm tra secret key
    requireSecretKey() {
        return (req, res, next) => {
            try {
                const providedKey = req.headers['x-secret-key'] || req.query.secret_key;
                
                if (!providedKey) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Secret key is required',
                        details: 'Please provide secret key in header x-secret-key or query parameter secret_key'
                    });
                }

                // Kiểm tra secret key
                if (providedKey !== this.secretKey) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Invalid secret key',
                        details: 'The provided secret key is incorrect'
                    });
                }

                // Secret key hợp lệ, tiếp tục
                next();
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                    message: 'Failed to validate secret key',
                    details: error.message
                });
            }
        };
    }

    // Middleware để tạo hash từ secret key (cho các trường hợp cần hash)
    createHash(secretKey) {
        return crypto.createHash('sha256').update(secretKey).digest('hex');
    }

    // Middleware để kiểm tra hash
    requireHash() {
        return (req, res, next) => {
            try {
                const providedHash = req.headers['x-secret-hash'] || req.query.secret_hash;
                
                if (!providedHash) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Secret hash is required',
                        details: 'Please provide secret hash in header x-secret-hash or query parameter secret_hash'
                    });
                }

                const expectedHash = this.createHash(this.secretKey);
                
                if (providedHash !== expectedHash) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Invalid secret hash',
                        details: 'The provided secret hash is incorrect'
                    });
                }

                next();
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                    message: 'Failed to validate secret hash',
                    details: error.message
                });
            }
        };
    }

    // Middleware để kiểm tra timestamp (tránh replay attacks)
    requireTimestamp() {
        return (req, res, next) => {
            try {
                const timestamp = req.headers['x-timestamp'] || req.query.timestamp;
                const currentTime = Math.floor(Date.now() / 1000);
                const maxAge = 300; // 5 phút

                if (!timestamp) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Timestamp is required',
                        details: 'Please provide timestamp in header x-timestamp or query parameter timestamp'
                    });
                }

                const requestTime = parseInt(timestamp);
                if (isNaN(requestTime)) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Invalid timestamp format',
                        details: 'Timestamp must be a valid Unix timestamp'
                    });
                }

                if (Math.abs(currentTime - requestTime) > maxAge) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Request expired',
                        details: 'Request timestamp is too old or too far in the future'
                    });
                }

                next();
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                    message: 'Failed to validate timestamp',
                    details: error.message
                });
            }
        };
    }

    // Middleware kết hợp (secret key + timestamp)
    requireFullAuth() {
        return (req, res, next) => {
            try {
                const providedKey = req.headers['x-secret-key'] || req.query.secret_key;
                const timestamp = req.headers['x-timestamp'] || req.query.timestamp;
                const currentTime = Math.floor(Date.now() / 1000);
                const maxAge = 300; // 5 phút

                // Kiểm tra secret key
                if (!providedKey || providedKey !== this.secretKey) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Invalid secret key',
                        details: 'Please provide valid secret key in header x-secret-key or query parameter secret_key'
                    });
                }

                // Kiểm tra timestamp
                if (!timestamp) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Timestamp is required',
                        details: 'Please provide timestamp in header x-timestamp or query parameter timestamp'
                    });
                }

                const requestTime = parseInt(timestamp);
                if (isNaN(requestTime) || Math.abs(currentTime - requestTime) > maxAge) {
                    return res.status(401).json({
                        success: false,
                        error: 'Unauthorized',
                        message: 'Request expired',
                        details: 'Request timestamp is too old or too far in the future'
                    });
                }

                next();
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                    message: 'Failed to validate authentication',
                    details: error.message
                });
            }
        };
    }
}

module.exports = SecretKeyMiddleware;
