// Quick Messages Routes
const express = require('express');
const router = express.Router();
const QuickMessageController = require('../controllers/QuickMessageController');
const AuthMiddleware = require('../middleware/authMiddleware');

const quickMessageController = new QuickMessageController();
const authMiddleware = new AuthMiddleware();

// Get quick message list
router.get('/', 
    authMiddleware.requireAuth(),
    quickMessageController.getQuickMessageList
);

// Add quick message
router.post('/', 
    authMiddleware.requireAuth(),
    quickMessageController.addQuickMessage
);

// Get quick message
router.get('/:itemId', 
    authMiddleware.requireAuth(),
    quickMessageController.getQuickMessage
);

// Delete quick message
router.delete('/:itemId', 
    authMiddleware.requireAuth(),
    quickMessageController.deleteQuickMessage
);

// Remove quick message
router.delete('/', 
    authMiddleware.requireAuth(),
    quickMessageController.removeQuickMessage
);

// Update quick message
router.put('/:itemId', 
    authMiddleware.requireAuth(),
    quickMessageController.updateQuickMessage
);

module.exports = router;
