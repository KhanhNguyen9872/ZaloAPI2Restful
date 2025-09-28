const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Webhook events
router.post('/message', webhookController.handleMessage);          // Xử lý tin nhắn
router.post('/reaction', webhookController.handleReaction);        // Xử lý reaction
router.post('/undo', webhookController.handleUndo);                // Xử lý undo
router.post('/group-event', webhookController.handleGroupEvent);   // Xử lý sự kiện nhóm

// Webhook management
router.post('/start', webhookController.startListener);            // Bắt đầu listener
router.post('/stop', webhookController.stopListener);             // Dừng listener
router.get('/status', webhookController.getListenerStatus);        // Trạng thái listener

module.exports = router;
