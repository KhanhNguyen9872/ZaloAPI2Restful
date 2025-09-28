const express = require('express');
const router = express.Router();
const QuickMessageController = require('../src/controllers/QuickMessageController');
const AuthMiddleware = require('../src/middleware/authMiddleware');

const quickMessageController = new QuickMessageController();
const authMiddleware = new AuthMiddleware();

// Lấy danh sách tin nhắn nhanh
router.get('/', 
    authMiddleware.requireAuth(),
    quickMessageController.getQuickMessageList
);

// Remove quick message
router.delete('/remove', 
    authMiddleware.requireAuth(),
    quickMessageController.removeQuickMessage
);

module.exports = router;
