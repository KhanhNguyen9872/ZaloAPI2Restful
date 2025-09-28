// AuthMiddleware - Authentication middleware
const AuthService = require('../services/AuthService');

class AuthMiddleware {
    constructor() {
        this.authService = AuthService.getInstance();
    }

    // Singleton instance
    static getInstance() {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    // Check if user is authenticated
    requireAuth() {
        return (req, res, next) => {
            try {
                
                if (!this.authService.isAuthenticated()) {
                    return res.status(401).json({
                        success: false,
                        error: 'Authentication required',
                        message: 'Please login first'
                    });
                }
                next();
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    error: 'Authentication check failed',
                    message: error.message
                });
            }
        };
    }

    // Optional authentication (doesn't fail if not authenticated)
    optionalAuth() {
        return (req, res, next) => {
            try {
                req.isAuthenticated = this.authService.isAuthenticated();
                req.session = this.authService.getCurrentSession();
                next();
            } catch (error) {
                req.isAuthenticated = false;
                req.session = null;
                next();
            }
        };
    }

    // Get current session info
    getSessionInfo() {
        return (req, res, next) => {
            try {
                req.session = this.authService.getCurrentSession();
                req.isAuthenticated = this.authService.isAuthenticated();
                next();
            } catch (error) {
                req.session = null;
                req.isAuthenticated = false;
                next();
            }
        };
    }
}

module.exports = AuthMiddleware;
