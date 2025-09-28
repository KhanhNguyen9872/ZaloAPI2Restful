// MessageController - Clean Architecture controller for message operations
const MessageService = require('../services/MessageService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class MessageController {
    constructor() {
        this.messageService = new MessageService();
        this.validation = new ValidationMiddleware();
    }

    // Send text message with advanced features
    sendMessage = async (req, res) => {
        try {
            const { message, threadId, type = 1 } = req.body;
            const result = await this.messageService.sendMessage(message, threadId, type);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send voice message
    sendVoice = async (req, res) => {
        try {
            const { voicePath, threadId, threadType } = req.body;
            const result = await this.messageService.sendVoice(voicePath, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send sticker
    sendSticker = async (req, res) => {
        try {
            const { stickerId, threadId, threadType } = req.body;
            const result = await this.messageService.sendSticker(stickerId, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send card
    sendCard = async (req, res) => {
        try {
            const { cardData, threadId, threadType } = req.body;
            const result = await this.messageService.sendCard(cardData, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Create poll
    createPoll = async (req, res) => {
        try {
            const { pollData, threadId, threadType } = req.body;
            const result = await this.messageService.createPoll(pollData, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete message
    deleteMessage = async (req, res) => {
        try {
            const { messageId } = req.params;
            const result = await this.messageService.deleteMessage(messageId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Undo message
    undo = async (req, res) => {
        try {
            const { messageId } = req.params;
            const { threadId, threadType } = req.body;
            const result = await this.messageService.undo(messageId, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add reaction
    addReaction = async (req, res) => {
        try {
            const { messageId } = req.params;
            const { reaction, threadId, threadType } = req.body;
            const result = await this.messageService.addReaction(reaction, messageId, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove reaction
    removeReaction = async (req, res) => {
        try {
            const { messageId } = req.params;
            const { threadId, threadType } = req.body;
            const result = await this.messageService.removeReaction(messageId, threadId, threadType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get stickers
    getStickers = async (req, res) => {
        try {
            const { keyword } = req.params;
            const result = await this.messageService.getStickers(keyword);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get stickers detail
    getStickersDetail = async (req, res) => {
        try {
            const { ids } = req.params;
            const stickerIds = ids.split(',');
            const result = await this.messageService.getStickersDetail(stickerIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Pin conversations
    pinConversations = async (req, res) => {
        try {
            const { threadIds } = req.body;
            const result = await this.messageService.pinConversations(threadIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Unpin conversations
    unpinConversations = async (req, res) => {
        try {
            const { threadIds } = req.body;
            const result = await this.messageService.unpinConversations(threadIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add unread mark
    addUnreadMark = async (req, res) => {
        try {
            const { threadId } = req.params;
            const { type = 1 } = req.body;
            const result = await this.messageService.addUnreadMark(threadId, type);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete chat
    deleteChat = async (req, res) => {
        try {
            const { threadId } = req.params;
            const { lastMessage } = req.body;
            const { type = 1 } = req.query;
            const result = await this.messageService.deleteChat(lastMessage, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete message (advanced)
    deleteMessageAdvanced = async (req, res) => {
        try {
            const { dest, onlyMe = true } = req.body;
            const result = await this.messageService.deleteMessageAdvanced(dest, onlyMe);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Forward message
    forwardMessage = async (req, res) => {
        try {
            const { message, ttl, reference } = req.body;
            const { threadIds } = req.body;
            const { type = 1 } = req.query;
            
            const result = await this.messageService.forwardMessage({
                message,
                ttl,
                reference
            }, threadIds, parseInt(type));
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get archived chat list
    getArchivedChatList = async (req, res) => {
        try {
            const result = await this.messageService.getArchivedChatList();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get auto delete chat
    getAutoDeleteChat = async (req, res) => {
        try {
            const result = await this.messageService.getAutoDeleteChat();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get hidden conversations
    getHiddenConversations = async (req, res) => {
        try {
            const result = await this.messageService.getHiddenConversations();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get pin conversations
    getPinConversations = async (req, res) => {
        try {
            const result = await this.messageService.getPinConversations();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get stickers
    getStickers = async (req, res) => {
        try {
            const { keyword } = req.query;
            const result = await this.messageService.getStickers(keyword);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get stickers detail
    getStickersDetail = async (req, res) => {
        try {
            const { stickerIds } = req.body;
            const result = await this.messageService.getStickersDetail(stickerIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get unread mark
    getUnreadMark = async (req, res) => {
        try {
            const result = await this.messageService.getUnreadMark();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove unread mark
    removeUnreadMark = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.body;
            const result = await this.messageService.removeUnreadMark(threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Reset hidden conversation pin
    resetHiddenConversPin = async (req, res) => {
        try {
            const result = await this.messageService.resetHiddenConversPin();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send bank card
    sendBankCard = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { binBank, numAccBank, nameAccBank } = req.body;
            const payload = { binBank, numAccBank, nameAccBank };
            const result = await this.messageService.sendBankCard(payload, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send card
    sendCard = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { userId, phoneNumber, ttl } = req.body;
            const options = { userId, phoneNumber, ttl };
            const result = await this.messageService.sendCard(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send delivered event
    sendDeliveredEvent = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { isSeen, messages } = req.body;
            const result = await this.messageService.sendDeliveredEvent(isSeen, messages, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send link
    sendLink = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { msg, link, ttl } = req.body;
            const options = { msg, link, ttl };
            const result = await this.messageService.sendLink(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send seen event
    sendSeenEvent = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { messages } = req.body;
            const result = await this.messageService.sendSeenEvent(messages, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send sticker
    sendSticker = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { id, cateId, type: stickerType } = req.body;
            const sticker = { id, cateId, type: stickerType };
            const result = await this.messageService.sendSticker(sticker, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send typing event
    sendTypingEvent = async (req, res) => {
        try {
            const { threadId, type, destType } = req.params;
            const result = await this.messageService.sendTypingEvent(threadId, parseInt(type), destType);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send video
    sendVideo = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { msg, videoUrl, thumbnailUrl, duration, width, height, ttl } = req.body;
            const options = { msg, videoUrl, thumbnailUrl, duration, width, height, ttl };
            const result = await this.messageService.sendVideo(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send voice
    sendVoice = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { voiceUrl, ttl } = req.body;
            const options = { voiceUrl, ttl };
            const result = await this.messageService.sendVoice(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Set hidden conversations
    setHiddenConversations = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { hidden } = req.body;
            const result = await this.messageService.setHiddenConversations(hidden, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Set mute
    setMute = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { duration, action } = req.body;
            const params = { duration, action };
            const result = await this.messageService.setMute(params, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Set pinned conversations
    setPinnedConversations = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { pinned } = req.body;
            const result = await this.messageService.setPinnedConversations(pinned, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Undo message
    undo = async (req, res) => {
        try {
            const { msgId, cliMsgId } = req.body;
            const message = { msgId, cliMsgId };
            const result = await this.messageService.undo(message);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update auto delete chat
    updateAutoDeleteChat = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { ttl } = req.body;
            const result = await this.messageService.updateAutoDeleteChat(ttl, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update hidden conversation pin
    updateHiddenConversPin = async (req, res) => {
        try {
            const { pin } = req.body;
            const result = await this.messageService.updateHiddenConversPin(pin);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Upload attachment
    uploadAttachment = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { source } = req.body;
            const result = await this.messageService.uploadAttachment(source, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateSendMessage = [
        ValidationMiddleware.validateRequired(['message', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateSendVoice = [
        ValidationMiddleware.validateRequired(['voicePath', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateSendSticker = [
        ValidationMiddleware.validateRequired(['stickerId', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateSendCard = [
        ValidationMiddleware.validateRequired(['cardData', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateCreatePoll = [
        ValidationMiddleware.validateRequired(['pollData', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateUndo = [
        ValidationMiddleware.validateRequired(['threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateAddReaction = [
        ValidationMiddleware.validateRequired(['reaction', 'threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validateRemoveReaction = [
        ValidationMiddleware.validateRequired(['threadId']),
        ValidationMiddleware.validateThreadType(),
        (req, res, next) => next()
    ];

    validatePinConversations = [
        ValidationMiddleware.validateArray('threadIds'),
        (req, res, next) => next()
    ];

    validateUnpinConversations = [
        ValidationMiddleware.validateArray('threadIds'),
        (req, res, next) => next()
    ];
}

module.exports = MessageController;
