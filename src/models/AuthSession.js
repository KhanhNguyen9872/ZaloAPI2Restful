// AuthSession Model - Entity layer
class AuthSession {
    constructor(data = {}) {
        this.id = data.id || null;
        this.userId = data.userId || null;
        this.imei = data.imei || '';
        this.userAgent = data.userAgent || '';
        this.cookies = data.cookies || {};
        this.isActive = data.isActive || true;
        this.lastActivity = data.lastActivity || new Date();
        this.createdAt = data.createdAt || new Date();
        this.expiresAt = data.expiresAt || null;
    }

    // Validation methods
    isValid() {
        return this.id && this.userId && this.imei && this.userAgent;
    }

    // Business logic methods
    isExpired() {
        if (!this.expiresAt) return false;
        return new Date() > this.expiresAt;
    }

    isSessionValid() {
        return this.isActive && !this.isExpired();
    }

    updateActivity() {
        this.lastActivity = new Date();
    }

    deactivate() {
        this.isActive = false;
    }

    extendSession(expirationTime) {
        this.expiresAt = new Date(Date.now() + expirationTime);
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            imei: this.imei,
            userAgent: this.userAgent,
            cookies: this.cookies,
            isActive: this.isActive,
            lastActivity: this.lastActivity,
            createdAt: this.createdAt,
            expiresAt: this.expiresAt
        };
    }

    // Factory methods
    static fromZaloContext(context) {
        return new AuthSession({
            id: context.id || null,
            userId: context.userId || null,
            imei: context.imei,
            userAgent: context.userAgent,
            cookies: context.cookie ? context.cookie.toJSON() : {},
            isActive: true
        });
    }

    static create(userId, imei, userAgent, cookies = {}) {
        return new AuthSession({
            userId,
            imei,
            userAgent,
            cookies,
            isActive: true
        });
    }
}

module.exports = AuthSession;
