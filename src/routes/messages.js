// Message Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');
const AuthMiddleware = require('../middleware/authMiddleware');

const messageController = new MessageController();
const authMiddleware = new AuthMiddleware();

// Gửi tin nhắn
router.post('/send', 
    authMiddleware.requireAuth(),
    messageController.validateSendMessage,
    messageController.sendMessage
);

router.post('/send/voice', 
    authMiddleware.requireAuth(),
    messageController.validateSendVoice,
    messageController.sendVoice
);

router.post('/send/sticker', 
    authMiddleware.requireAuth(),
    messageController.validateSendSticker,
    messageController.sendSticker
);

router.post('/send/card', 
    authMiddleware.requireAuth(),
    messageController.validateSendCard,
    messageController.sendCard
);

router.post('/send/poll', 
    authMiddleware.requireAuth(),
    messageController.validateCreatePoll,
    messageController.createPoll
);

// Quản lý tin nhắn
router.delete('/:messageId', 
    authMiddleware.requireAuth(),
    messageController.deleteMessage
);

router.post('/:messageId/undo', 
    authMiddleware.requireAuth(),
    messageController.validateUndo,
    messageController.undo
);

router.post('/:messageId/reaction', 
    authMiddleware.requireAuth(),
    messageController.validateAddReaction,
    messageController.addReaction
);

router.delete('/:messageId/reaction', 
    authMiddleware.requireAuth(),
    messageController.validateRemoveReaction,
    messageController.removeReaction
);

// Sticker
router.get('/stickers/:keyword', 
    authMiddleware.requireAuth(),
    messageController.getStickers
);

router.get('/stickers/detail/:ids', 
    authMiddleware.requireAuth(),
    messageController.getStickersDetail
);

// Pin conversations
router.post('/pin', 
    authMiddleware.requireAuth(),
    messageController.validatePinConversations,
    messageController.pinConversations
);

router.delete('/pin', 
    authMiddleware.requireAuth(),
    messageController.validateUnpinConversations,
    messageController.unpinConversations
);

// Add unread mark
router.post('/:threadId/unread', 
    authMiddleware.requireAuth(),
    messageController.addUnreadMark
);

// Delete chat
router.delete('/:threadId/chat', 
    authMiddleware.requireAuth(),
    messageController.deleteChat
);

// Delete message (advanced)
router.delete('/advanced', 
    authMiddleware.requireAuth(),
    messageController.deleteMessageAdvanced
);

// Forward message
router.post('/forward', 
    authMiddleware.requireAuth(),
    messageController.forwardMessage
);

// Get archived chat list
router.get('/archived', 
    authMiddleware.requireAuth(),
    messageController.getArchivedChatList
);

// Get auto delete chat
router.get('/auto-delete', 
    authMiddleware.requireAuth(),
    messageController.getAutoDeleteChat
);

// Get hidden conversations
router.get('/hidden', 
    authMiddleware.requireAuth(),
    messageController.getHiddenConversations
);

// Get pin conversations
router.get('/pin', 
    authMiddleware.requireAuth(),
    messageController.getPinConversations
);

// Get stickers
router.get('/stickers', 
    authMiddleware.requireAuth(),
    messageController.getStickers
);

// Get stickers detail
router.post('/stickers/detail', 
    authMiddleware.requireAuth(),
    messageController.getStickersDetail
);

// Get unread mark
router.get('/unread', 
    authMiddleware.requireAuth(),
    messageController.getUnreadMark
);

// Remove unread mark
router.delete('/unread', 
    authMiddleware.requireAuth(),
    messageController.removeUnreadMark
);

// Reset hidden conversation pin
router.post('/reset-hidden-pin', 
    authMiddleware.requireAuth(),
    messageController.resetHiddenConversPin
);

// Send bank card
router.post('/:threadId/bank-card/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendBankCard
);

// Send card
router.post('/:threadId/card/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendCard
);

// Send delivered event
router.post('/:threadId/delivered/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendDeliveredEvent
);

// Send link
router.post('/:threadId/link/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendLink
);

// Send seen event
router.post('/:threadId/seen/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendSeenEvent
);

// Send sticker
router.post('/:threadId/sticker/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendSticker
);

// Send typing event
router.post('/:threadId/typing/:type/:destType?', 
    authMiddleware.requireAuth(),
    messageController.sendTypingEvent
);

// Send video
router.post('/:threadId/video/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendVideo
);

// Send voice
router.post('/:threadId/voice/:type?', 
    authMiddleware.requireAuth(),
    messageController.sendVoice
);

// Set hidden conversations
router.post('/:threadId/hidden/:type?', 
    authMiddleware.requireAuth(),
    messageController.setHiddenConversations
);

// Set mute
router.post('/:threadId/mute/:type?', 
    authMiddleware.requireAuth(),
    messageController.setMute
);

// Set pinned conversations
router.post('/:threadId/pinned/:type?', 
    authMiddleware.requireAuth(),
    messageController.setPinnedConversations
);

// Undo message
router.post('/undo', 
    authMiddleware.requireAuth(),
    messageController.undo
);

// Update auto delete chat
router.post('/:threadId/auto-delete/:type?', 
    authMiddleware.requireAuth(),
    messageController.updateAutoDeleteChat
);

// Update hidden conversation pin
router.post('/hidden-pin', 
    authMiddleware.requireAuth(),
    messageController.updateHiddenConversPin
);

// Upload attachment
router.post('/:threadId/upload/:type?', 
    authMiddleware.requireAuth(),
    messageController.uploadAttachment
);

module.exports = router;
