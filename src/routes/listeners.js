// Listeners Routes
const express = require('express');
const router = express.Router();
const ListenerController = require('../controllers/ListenerController');
const AuthMiddleware = require('../middleware/authMiddleware');

const listenerController = new ListenerController();
const authMiddleware = new AuthMiddleware();

// Start listener
router.post('/start', 
    authMiddleware.requireAuth(),
    listenerController.startListener
);

// Stop listener
router.post('/stop', 
    authMiddleware.requireAuth(),
    listenerController.stopListener
);

// Get listener status
router.get('/status', 
    authMiddleware.requireAuth(),
    listenerController.getListenerStatus
);

// Add message listener
router.post('/message', 
    authMiddleware.requireAuth(),
    listenerController.validateAddListener,
    listenerController.addMessageListener
);

// Add reaction listener
router.post('/reaction', 
    authMiddleware.requireAuth(),
    listenerController.validateAddListener,
    listenerController.addReactionListener
);

// Add undo listener
router.post('/undo', 
    authMiddleware.requireAuth(),
    listenerController.validateAddListener,
    listenerController.addUndoListener
);

// Add group event listener
router.post('/group-event', 
    authMiddleware.requireAuth(),
    listenerController.validateAddListener,
    listenerController.addGroupEventListener
);

// Remove listener
router.delete('/', 
    authMiddleware.requireAuth(),
    listenerController.validateRemoveListener,
    listenerController.removeListener
);

module.exports = router;
