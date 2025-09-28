// ListenerController - Clean Architecture controller for listener operations
const ListenerService = require('../services/ListenerService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class ListenerController {
    constructor() {
        this.listenerService = new ListenerService();
        this.validation = new ValidationMiddleware();
    }

    // Start listener
    startListener = async (req, res) => {
        try {
            const result = await this.listenerService.startListener();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Stop listener
    stopListener = async (req, res) => {
        try {
            const result = await this.listenerService.stopListener();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add message listener
    addMessageListener = async (req, res) => {
        try {
            const { callback } = req.body;
            
            // Create a callback function from the provided string
            const callbackFunction = new Function('message', callback);
            
            const result = await this.listenerService.addMessageListener(callbackFunction);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add reaction listener
    addReactionListener = async (req, res) => {
        try {
            const { callback } = req.body;
            
            // Create a callback function from the provided string
            const callbackFunction = new Function('reaction', callback);
            
            const result = await this.listenerService.addReactionListener(callbackFunction);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add undo listener
    addUndoListener = async (req, res) => {
        try {
            const { callback } = req.body;
            
            // Create a callback function from the provided string
            const callbackFunction = new Function('undo', callback);
            
            const result = await this.listenerService.addUndoListener(callbackFunction);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add group event listener
    addGroupEventListener = async (req, res) => {
        try {
            const { callback } = req.body;
            
            // Create a callback function from the provided string
            const callbackFunction = new Function('data', callback);
            
            const result = await this.listenerService.addGroupEventListener(callbackFunction);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove listener
    removeListener = async (req, res) => {
        try {
            const { eventType, callback } = req.body;
            
            // Create a callback function from the provided string
            const callbackFunction = new Function('data', callback);
            
            const result = await this.listenerService.removeListener(eventType, callbackFunction);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get listener status
    getListenerStatus = async (req, res) => {
        try {
            const result = await this.listenerService.getListenerStatus();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateAddListener = [
        this.validation.validateRequired(['callback']),
        (req, res, next) => next()
    ];

    validateRemoveListener = [
        this.validation.validateRequired(['eventType', 'callback']),
        (req, res, next) => next()
    ];
}

module.exports = ListenerController;
