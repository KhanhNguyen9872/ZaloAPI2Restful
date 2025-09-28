// AuthService - Business logic for authentication
const AuthSession = require('../models/AuthSession');
const ZaloRepository = require('../repositories/ZaloRepository');

class AuthService {
    constructor() {
        this.zaloRepository = new ZaloRepository();
        this.currentSession = null;
    }

    // Login with QR
    async loginQR(qrPath, userAgent, language = 'vi') {
        try {
            const zaloAPI = await this.zaloRepository.loginQR(qrPath, userAgent, language);
            const context = await this.zaloRepository.getContext();
            
            this.currentSession = AuthSession.fromZaloContext(context);
            
            return {
                success: true,
                session: this.currentSession.toJSON(),
                credentials: {
                    imei: context.imei,
                    userAgent: context.userAgent,
                    cookies: Buffer.from(JSON.stringify(context.cookie.toJSON()?.cookies || [])).toString('base64')
                }
            };
        } catch (error) {
            throw new Error(`QR Login failed: ${error.message}`);
        }
    }

    // Login with Cookie
    async loginCookie(cookie, imei, userAgent, language = 'vi') {
        try {
            const credentials = {
                cookie: typeof cookie === 'string' ? JSON.parse(Buffer.from(cookie, 'base64').toString()) : cookie,
                imei: imei,
                userAgent: userAgent,
                language: language
            };

            const zaloAPI = await this.zaloRepository.loginCookie(credentials);
            const context = await this.zaloRepository.getContext();
            
            this.currentSession = AuthSession.fromZaloContext(context);
            
            return {
                success: true,
                session: this.currentSession.toJSON()
            };
        } catch (error) {
            throw new Error(`Cookie Login failed: ${error.message}`);
        }
    }

    // Login with Proxy
    async loginWithProxy(proxy, credentials) {
        try {
            const zaloAPI = await this.zaloRepository.loginWithProxy(credentials, proxy);
            const context = await this.zaloRepository.getContext();
            
            this.currentSession = AuthSession.fromZaloContext(context);
            
            return {
                success: true,
                session: this.currentSession.toJSON()
            };
        } catch (error) {
            throw new Error(`Proxy Login failed: ${error.message}`);
        }
    }

    // Get authentication status
    getStatus() {
        return {
            connected: !!this.currentSession && this.currentSession.isSessionValid(),
            session: this.currentSession ? this.currentSession.toJSON() : null
        };
    }

    // Get context
    async getContext() {
        if (!this.currentSession || !this.currentSession.isSessionValid()) {
            throw new Error('No active session');
        }
        return await this.zaloRepository.getContext();
    }

    // Get cookie
    async getCookie() {
        if (!this.currentSession || !this.currentSession.isSessionValid()) {
            throw new Error('No active session');
        }
        return await this.zaloRepository.getCookie();
    }

    // Get QR code
    async getQR() {
        if (!this.currentSession || !this.currentSession.isSessionValid()) {
            throw new Error('No active session');
        }
        return await this.zaloRepository.getQR();
    }

    // Get own ID
    async getOwnId() {
        if (!this.currentSession || !this.currentSession.isSessionValid()) {
            throw new Error('No active session');
        }
        return await this.zaloRepository.getOwnId();
    }

    // Logout
    logout() {
        this.currentSession = null;
        return {
            success: true,
            message: 'Logged out successfully'
        };
    }

    // Check if authenticated
    isAuthenticated() {
        return this.currentSession && this.currentSession.isSessionValid();
    }

    // Get current session
    getCurrentSession() {
        return this.currentSession;
    }
}

module.exports = AuthService;
