// Context routes - Clean Architecture
const express = require('express');
const router = express.Router();
const ContextController = require('../controllers/ContextController');
const AuthMiddleware = require('../middleware/authMiddleware');

const contextController = new ContextController();
const authMiddleware = new AuthMiddleware();

// Get context
router.get('/', 
    authMiddleware.requireAuth(),
    contextController.getContext
);

// Get cookie
router.get('/cookie', 
    authMiddleware.requireAuth(),
    contextController.getCookie
);

module.exports = router;
