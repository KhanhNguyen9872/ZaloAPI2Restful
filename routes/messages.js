const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Gửi tin nhắn
router.post('/send', messageController.sendMessage);                // Gửi tin nhắn text
router.post('/send/voice', messageController.sendVoice);            // Gửi tin nhắn voice
router.post('/send/sticker', messageController.sendSticker);         // Gửi sticker
router.post('/send/card', messageController.sendCard);              // Gửi card
router.post('/send/poll', messageController.createPoll);           // Tạo poll

// Quản lý tin nhắn
router.delete('/:messageId', messageController.deleteMessage);      // Xóa tin nhắn
router.post('/:messageId/undo', messageController.undo);           // Hoàn tác tin nhắn
router.post('/:messageId/reaction', messageController.addReaction); // Thêm reaction
router.delete('/:messageId/reaction', messageController.removeReaction); // Xóa reaction

// Sticker
router.get('/stickers/:keyword', messageController.getStickers);     // Tìm sticker
router.get('/stickers/detail/:ids', messageController.getStickersDetail); // Chi tiết sticker

// Pin conversations
router.post('/pin', messageController.pinConversations);            // Pin cuộc trò chuyện
router.delete('/pin', messageController.unpinConversations);       // Bỏ pin cuộc trò chuyện

module.exports = router;
