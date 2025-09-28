// AuthController - Clean Architecture controller for authentication
const AuthService = require('../services/AuthService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.validation = new ValidationMiddleware();
    }

    // Login with QR
    loginQR = async (req, res) => {
        try {
            const { qrPath, userAgent, language } = req.body;
            
            const result = await this.authService.loginQR(
                qrPath || './qr.png',
                userAgent,
                language || 'vi'
            );
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Login with Cookie
    loginCookie = async (req, res) => {
        try {
            const { cookie, imei, userAgent, language } = req.body;
            
            const result = await this.authService.loginCookie(cookie, imei, userAgent, language);
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Login with Proxy
    loginWithProxy = async (req, res) => {
        try {
            const { proxy, credentials } = req.body;
            
            const result = await this.authService.loginWithProxy(proxy, credentials);
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get authentication status
    getStatus = async (req, res) => {
        try {
            const status = this.authService.getStatus();
            res.json({
                success: true,
                ...status
            });
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get context
    getContext = async (req, res) => {
        try {
            const context = await this.authService.getContext();
            res.json({
                success: true,
                data: context
            });
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get cookie
    getCookie = async (req, res) => {
        try {
            const cookie = await this.authService.getCookie();
            res.json({
                success: true,
                data: cookie
            });
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get QR code
    getQR = async (req, res) => {
        try {
            const qr = await this.authService.getQR();
            res.json({
                success: true,
                data: qr
            });
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get own ID
    getOwnId = async (req, res) => {
        try {
            const ownId = await this.authService.getOwnId();
            res.json({
                success: true,
                data: { ownId }
            });
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Logout
    logout = async (req, res) => {
        try {
            const result = this.authService.logout();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateLoginQR = [
        this.validation.validateRequired(['userAgent']),
        (req, res, next) => next()
    ];

    validateLoginCookie = [
        this.validation.validateRequired(['cookie', 'imei', 'userAgent']),
        (req, res, next) => next()
    ];

    validateLoginProxy = [
        this.validation.validateRequired(['proxy', 'credentials']),
        (req, res, next) => next()
    ];
}

module.exports = AuthController;
