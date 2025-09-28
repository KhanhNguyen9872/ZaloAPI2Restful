// ReminderController - Clean Architecture controller for reminder operations
const ReminderService = require('../services/ReminderService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class ReminderController {
    constructor() {
        this.reminderService = new ReminderService();
        this.validation = new ValidationMiddleware();
    }

    // Create reminder
    createReminder = async (req, res) => {
        try {
            const { threadId } = req.params;
            const { title, emoji, startTime, repeat } = req.body;
            const { type = 1 } = req.query;
            
            const result = await this.reminderService.createReminder({
                title,
                emoji,
                startTime,
                repeat
            }, threadId, parseInt(type));
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Edit reminder
    editReminder = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { title, topicId, emoji, startTime, repeat } = req.body;
            const { type = 1 } = req.query;
            
            const result = await this.reminderService.editReminder({
                title,
                topicId,
                emoji,
                startTime,
                repeat
            }, groupId, parseInt(type));
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get list reminder
    getListReminder = async (req, res) => {
        try {
            const { threadId } = req.params;
            const { page = 1, count = 20 } = req.query;
            const { type = 1 } = req.query;
            const options = {
                page: parseInt(page),
                count: parseInt(count)
            };
            
            const result = await this.reminderService.getListReminder(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get reminder
    getReminder = async (req, res) => {
        try {
            const { reminderId } = req.params;
            const result = await this.reminderService.getReminder(reminderId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get reminder responses
    getReminderResponses = async (req, res) => {
        try {
            const { reminderId } = req.params;
            const result = await this.reminderService.getReminderResponses(reminderId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove reminder
    removeReminder = async (req, res) => {
        try {
            const { reminderId } = req.params;
            const { threadId, type = 1 } = req.body;
            const result = await this.reminderService.removeReminder(reminderId, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateCreateReminder = [
        this.validation.validateRequired(['title']),
        (req, res, next) => next()
    ];

    validateEditReminder = [
        this.validation.validateRequired(['title', 'topicId']),
        (req, res, next) => next()
    ];
}

module.exports = ReminderController;
