const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST /api/messages/send - Gửi tin nhắn
router.post('/send', messageController.sendMessage);

// GET /api/messages/conversation/:userId - Lấy cuộc trò chuyện
router.get('/conversation/:userId', messageController.getConversation);

// POST /api/messages/upload - Upload file
router.post('/upload', messageController.uploadFile);

module.exports = router;
