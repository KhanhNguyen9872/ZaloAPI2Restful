// QuickMessageController - Clean Architecture controller for quick message operations
const QuickMessageService = require('../services/QuickMessageService');
const ErrorMiddleware = require('../middleware/errorMiddleware');

class QuickMessageController {
    constructor() {
        this.quickMessageService = new QuickMessageService();
    }

    // Get quick message list
    getQuickMessageList = async (req, res) => {
        try {
            const result = await this.quickMessageService.getQuickMessageList();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove quick message
    removeQuickMessage = async (req, res) => {
        try {
            const { itemIds } = req.body;
            const result = await this.quickMessageService.removeQuickMessage(itemIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add quick message
    addQuickMessage = async (req, res) => {
        try {
            const { keyword, title, media } = req.body;
            const result = await this.quickMessageService.addQuickMessage({ keyword, title, media });
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get quick message
    getQuickMessage = async (req, res) => {
        try {
            const { itemId } = req.params;
            const result = await this.quickMessageService.getQuickMessage(parseInt(itemId));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete quick message
    deleteQuickMessage = async (req, res) => {
        try {
            const { itemId } = req.params;
            const result = await this.quickMessageService.deleteQuickMessage(parseInt(itemId));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update quick message
    updateQuickMessage = async (req, res) => {
        try {
            const { itemId } = req.params;
            const { keyword, title, media } = req.body;
            const updatePayload = { keyword, title, media };
            const result = await this.quickMessageService.updateQuickMessage(updatePayload, parseInt(itemId));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };
}

module.exports = QuickMessageController;
