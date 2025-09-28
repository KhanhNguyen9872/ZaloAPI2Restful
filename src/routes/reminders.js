// Reminder Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/ReminderController');
const AuthMiddleware = require('../middleware/authMiddleware');

const reminderController = new ReminderController();
const authMiddleware = new AuthMiddleware();

// Create reminder
router.post('/:threadId', 
    authMiddleware.requireAuth(),
    reminderController.validateCreateReminder,
    reminderController.createReminder
);

// Edit reminder
router.put('/:groupId', 
    authMiddleware.requireAuth(),
    reminderController.validateEditReminder,
    reminderController.editReminder
);

// Get list reminder
router.get('/:threadId', 
    authMiddleware.requireAuth(),
    reminderController.getListReminder
);

// Get reminder
router.get('/detail/:reminderId', 
    authMiddleware.requireAuth(),
    reminderController.getReminder
);

// Get reminder responses
router.get('/:reminderId/responses', 
    authMiddleware.requireAuth(),
    reminderController.getReminderResponses
);

// Remove reminder
router.delete('/:reminderId', 
    authMiddleware.requireAuth(),
    reminderController.removeReminder
);

module.exports = router;
