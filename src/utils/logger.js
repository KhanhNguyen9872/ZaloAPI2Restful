// Logger utility
class Logger {
    constructor() {
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }

    // Log with timestamp
    log(level, message, data = null) {
        if (this.levels[level] <= this.levels[this.logLevel]) {
            const timestamp = new Date().toISOString();
            const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
            
            if (data) {
                console.log(logMessage, data);
            } else {
                console.log(logMessage);
            }
        }
    }

    // Error logging
    error(message, error = null) {
        this.log('error', message, error);
    }

    // Warning logging
    warn(message, data = null) {
        this.log('warn', message, data);
    }

    // Info logging
    info(message, data = null) {
        this.log('info', message, data);
    }

    // Debug logging
    debug(message, data = null) {
        this.log('debug', message, data);
    }

    // API request logging
    logRequest(req, res, next) {
        const start = Date.now();
        
        res.on('finish', () => {
            const duration = Date.now() - start;
            this.info(`${req.method} ${req.path}`, {
                status: res.statusCode,
                duration: `${duration}ms`,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            });
        });
        
        next();
    }

    // API response logging
    logResponse(req, res, next) {
        const originalSend = res.send;
        
        res.send = function(data) {
            logger.info(`Response sent for ${req.method} ${req.path}`, {
                status: res.statusCode,
                dataSize: data ? data.length : 0
            });
            originalSend.call(this, data);
        };
        
        next();
    }
}

// Create singleton instance
const logger = new Logger();

module.exports = logger;
