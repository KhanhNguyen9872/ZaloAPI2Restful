// ContextController - Clean Architecture controller for context operations
const ContextService = require('../services/ContextService');
const ErrorMiddleware = require('../middleware/errorMiddleware');

class ContextController {
    constructor() {
        this.contextService = new ContextService();
    }

    // Get context
    getContext = async (req, res) => {
        try {
            const result = await this.contextService.getContext();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get cookie
    getCookie = async (req, res) => {
        try {
            const result = await this.contextService.getCookie();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };
}

module.exports = ContextController;
