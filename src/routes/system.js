// System routes
const express = require('express');
const router = express.Router();
const SystemController = require('../controllers/SystemController');
const AuthMiddleware = require('../middleware/authMiddleware');

const systemController = new SystemController();
const authMiddleware = new AuthMiddleware();

// Keep alive
router.post('/keep-alive', 
    authMiddleware.requireAuth(),
    systemController.keepAlive
);

// Parse link
router.post('/parse-link', 
    authMiddleware.requireAuth(),
    systemController.parseLink
);

module.exports = router;
