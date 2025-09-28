// SystemController - Controller for system operations
const SystemService = require('../services/SystemService');
const ErrorMiddleware = require('../middleware/errorMiddleware');

class SystemController {
    constructor() {
        this.systemService = new SystemService();
    }

    // Keep alive
    keepAlive = async (req, res) => {
        try {
            const result = await this.systemService.keepAlive();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Parse link
    parseLink = async (req, res) => {
        try {
            const { link } = req.body;
            const result = await this.systemService.parseLink(link);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };
}

module.exports = SystemController;
