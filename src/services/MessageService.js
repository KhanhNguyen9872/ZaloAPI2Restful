// MessageService - Business logic for message operations
const Message = require('../models/Message');
const MessageDTO = require('../dtos/MessageDTO');
const ZaloRepository = require('../repositories/ZaloRepository');
const IMessageService = require('../interfaces/IMessageService');

class MessageService extends IMessageService {
    constructor() {
        super();
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Helper method để đảm bảo sử dụng global instance
    ensureZaloAPI() {
        if (global.zaloAPI && !this.zaloRepository.zaloAPI) {
            this.zaloRepository.zaloAPI = global.zaloAPI;
            this.zaloRepository.isInitialized = true;
        }
    }

    // Send text message with advanced features
    async sendMessage(message, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!message) {
                throw new Error('Message content is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }
            
            // Support both string and MessageContent object
            let messageContent;
            if (typeof message === 'string') {
                messageContent = { msg: message };
            } else {
                messageContent = message;
            }

            const result = await this.zaloRepository.sendMessage(messageContent, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Message sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }

    // Send voice message
    async sendVoice(voicePath, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!voicePath) {
                throw new Error('Voice path is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendVoice(voicePath, threadId, threadType);
            const messageModel = Message.createVoice(voicePath, null, threadId, threadType);
            const messageDTO = MessageDTO.fromModel(messageModel);
            
            return {
                success: true,
                data: {
                    ...messageDTO.toJSON(),
                    apiResult: result
                }
            };
        } catch (error) {
            throw new Error(`Failed to send voice: ${error.message}`);
        }
    }

    // Send sticker
    async sendSticker(stickerId, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!stickerId) {
                throw new Error('Sticker ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendSticker(stickerId, threadId, threadType);
            const messageModel = Message.createSticker(stickerId, null, threadId, threadType);
            const messageDTO = MessageDTO.fromModel(messageModel);
            
            return {
                success: true,
                data: {
                    ...messageDTO.toJSON(),
                    apiResult: result
                }
            };
        } catch (error) {
            throw new Error(`Failed to send sticker: ${error.message}`);
        }
    }

    // Send card
    async sendCard(cardData, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!cardData) {
                throw new Error('Card data is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendCard(cardData, threadId, threadType);
            
            return {
                success: true,
                data: {
                    cardData,
                    threadId,
                    threadType,
                    apiResult: result
                }
            };
        } catch (error) {
            throw new Error(`Failed to send card: ${error.message}`);
        }
    }

    // Create poll
    async createPoll(pollData, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!pollData) {
                throw new Error('Poll data is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.createPoll(pollData, threadId, threadType);
            
            return {
                success: true,
                data: {
                    pollData,
                    threadId,
                    threadType,
                    apiResult: result
                }
            };
        } catch (error) {
            throw new Error(`Failed to create poll: ${error.message}`);
        }
    }

    // Delete message
    async deleteMessage(messageId) {
        try {
            this.ensureZaloAPI();
            if (!messageId) {
                throw new Error('Message ID is required');
            }

            const result = await this.zaloRepository.deleteMessage(messageId);
            
            return {
                success: true,
                data: result,
                message: 'Message deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete message: ${error.message}`);
        }
    }

    // Undo message
    async undo(messageId, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!messageId) {
                throw new Error('Message ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.undo(messageId, threadId, threadType);
            
            return {
                success: true,
                data: result,
                message: 'Message undone successfully'
            };
        } catch (error) {
            throw new Error(`Failed to undo message: ${error.message}`);
        }
    }

    // Add reaction
    async addReaction(reaction, messageId, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!reaction) {
                throw new Error('Reaction is required');
            }
            if (!messageId) {
                throw new Error('Message ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.addReaction(reaction, messageId, threadId, threadType);
            
            return {
                success: true,
                data: result,
                message: 'Reaction added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add reaction: ${error.message}`);
        }
    }

    // Remove reaction
    async removeReaction(messageId, threadId, threadType = 1) {
        try {
            this.ensureZaloAPI();
            if (!messageId) {
                throw new Error('Message ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.removeReaction(messageId, threadId, threadType);
            
            return {
                success: true,
                data: result,
                message: 'Reaction removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove reaction: ${error.message}`);
        }
    }

    // Get stickers
    async getStickers(keyword) {
        try {
            this.ensureZaloAPI();
            if (!keyword) {
                throw new Error('Keyword is required');
            }

            const result = await this.zaloRepository.getStickers(keyword);
            
            return {
                success: true,
                data: result
            };
        } catch (error) {
            throw new Error(`Failed to get stickers: ${error.message}`);
        }
    }

    // Get stickers detail
    async getStickersDetail(stickerIds) {
        try {
            this.ensureZaloAPI();
            if (!stickerIds || !Array.isArray(stickerIds)) {
                throw new Error('Sticker IDs array is required');
            }

            const result = await this.zaloRepository.getStickersDetail(stickerIds);
            
            return {
                success: true,
                data: result
            };
        } catch (error) {
            throw new Error(`Failed to get stickers detail: ${error.message}`);
        }
    }

    // Pin conversations
    async pinConversations(threadIds) {
        try {
            this.ensureZaloAPI();
            if (!threadIds || !Array.isArray(threadIds)) {
                throw new Error('Thread IDs array is required');
            }

            const result = await this.zaloRepository.pinConversations(threadIds);
            
            return {
                success: true,
                data: result,
                message: 'Conversations pinned successfully'
            };
        } catch (error) {
            throw new Error(`Failed to pin conversations: ${error.message}`);
        }
    }

    // Unpin conversations
    async unpinConversations(threadIds) {
        try {
            this.ensureZaloAPI();
            if (!threadIds || !Array.isArray(threadIds)) {
                throw new Error('Thread IDs array is required');
            }

            const result = await this.zaloRepository.unpinConversations(threadIds);
            
            return {
                success: true,
                data: result,
                message: 'Conversations unpinned successfully'
            };
        } catch (error) {
            throw new Error(`Failed to unpin conversations: ${error.message}`);
        }
    }

    // Add unread mark
    async addUnreadMark(threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.addUnreadMark(threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Unread mark added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add unread mark: ${error.message}`);
        }
    }

    // Delete chat
    async deleteChat(lastMessage, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!lastMessage) {
                throw new Error('Last message is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.deleteChat(lastMessage, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Chat deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete chat: ${error.message}`);
        }
    }

    // Delete message (advanced)
    async deleteMessageAdvanced(dest, onlyMe = true) {
        try {
            this.ensureZaloAPI();
            if (!dest) {
                throw new Error('Message destination is required');
            }

            const result = await this.zaloRepository.deleteMessage(dest, onlyMe);
            
            return {
                success: true,
                data: result,
                message: 'Message deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete message: ${error.message}`);
        }
    }

    // Forward message
    async forwardMessage(payload, threadIds, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!payload) {
                throw new Error('Message payload is required');
            }
            if (!threadIds || !Array.isArray(threadIds)) {
                throw new Error('Thread IDs array is required');
            }

            const { message, ttl, reference } = payload;

            if (!message) {
                throw new Error('Message content is required');
            }

            const result = await this.zaloRepository.forwardMessage(payload, threadIds, type);
            
            return {
                success: true,
                data: result,
                message: 'Message forwarded successfully'
            };
        } catch (error) {
            throw new Error(`Failed to forward message: ${error.message}`);
        }
    }

    // Get archived chat list
    async getArchivedChatList() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getArchivedChatList();
            
            return {
                success: true,
                data: result,
                message: 'Archived chat list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get archived chat list: ${error.message}`);
        }
    }

    // Get auto delete chat
    async getAutoDeleteChat() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getAutoDeleteChat();
            
            return {
                success: true,
                data: result,
                message: 'Auto delete chat retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get auto delete chat: ${error.message}`);
        }
    }

    // Get hidden conversations
    async getHiddenConversations() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getHiddenConversations();
            
            return {
                success: true,
                data: result,
                message: 'Hidden conversations retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get hidden conversations: ${error.message}`);
        }
    }

    // Get pin conversations
    async getPinConversations() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getPinConversations();
            
            return {
                success: true,
                data: result,
                message: 'Pin conversations retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get pin conversations: ${error.message}`);
        }
    }

    // Get stickers
    async getStickers(keyword) {
        try {
            this.ensureZaloAPI();
            if (!keyword) {
                throw new Error('Keyword is required');
            }

            const result = await this.zaloRepository.getStickers(keyword);
            
            return {
                success: true,
                data: result,
                message: 'Stickers retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get stickers: ${error.message}`);
        }
    }

    // Get stickers detail
    async getStickersDetail(stickerIds) {
        try {
            this.ensureZaloAPI();
            if (!stickerIds) {
                throw new Error('Sticker IDs are required');
            }

            const result = await this.zaloRepository.getStickersDetail(stickerIds);
            
            return {
                success: true,
                data: result,
                message: 'Stickers detail retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get stickers detail: ${error.message}`);
        }
    }

    // Get unread mark
    async getUnreadMark() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getUnreadMark();
            
            return {
                success: true,
                data: result,
                message: 'Unread mark retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get unread mark: ${error.message}`);
        }
    }

    // Remove unread mark
    async removeUnreadMark(threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.removeUnreadMark(threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Unread mark removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove unread mark: ${error.message}`);
        }
    }

    // Reset hidden conversation pin
    async resetHiddenConversPin() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.resetHiddenConversPin();
            
            return {
                success: true,
                data: result,
                message: 'Hidden conversation pin reset successfully'
            };
        } catch (error) {
            throw new Error(`Failed to reset hidden conversation pin: ${error.message}`);
        }
    }

    // Send bank card
    async sendBankCard(payload, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!payload || !payload.binBank || !payload.numAccBank) {
                throw new Error('Payload with binBank and numAccBank is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendBankCard(payload, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Bank card sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send bank card: ${error.message}`);
        }
    }

    // Send card
    async sendCard(options, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!options || !options.userId) {
                throw new Error('Options with userId is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendCard(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Card sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send card: ${error.message}`);
        }
    }

    // Send delivered event
    async sendDeliveredEvent(isSeen, messages, type = 1) {
        try {
            this.ensureZaloAPI();
            if (typeof isSeen !== 'boolean') {
                throw new Error('isSeen must be a boolean');
            }
            if (!messages || !Array.isArray(messages)) {
                throw new Error('Messages array is required');
            }

            const result = await this.zaloRepository.sendDeliveredEvent(isSeen, messages, type);
            
            return {
                success: true,
                data: result,
                message: 'Delivered event sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send delivered event: ${error.message}`);
        }
    }

    // Send link
    async sendLink(options, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!options || !options.link) {
                throw new Error('Options with link is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendLink(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Link sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send link: ${error.message}`);
        }
    }

    // Send seen event
    async sendSeenEvent(messages, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!messages || !Array.isArray(messages)) {
                throw new Error('Messages array is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendSeenEvent(messages, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Seen event sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send seen event: ${error.message}`);
        }
    }

    // Send sticker
    async sendSticker(sticker, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!sticker || !sticker.id || !sticker.cateId || sticker.type === undefined) {
                throw new Error('Sticker with id, cateId, and type is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendSticker(sticker, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Sticker sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send sticker: ${error.message}`);
        }
    }

    // Send typing event
    async sendTypingEvent(threadId, type, destType) {
        try {
            this.ensureZaloAPI();
            if (!threadId) {
                throw new Error('Thread ID is required');
            }
            if (!type) {
                throw new Error('Type is required');
            }

            const result = await this.zaloRepository.sendTypingEvent(threadId, type, destType);
            
            return {
                success: true,
                data: result,
                message: 'Typing event sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send typing event: ${error.message}`);
        }
    }

    // Send video
    async sendVideo(options, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!options || !options.videoUrl || !options.thumbnailUrl) {
                throw new Error('Options with videoUrl and thumbnailUrl is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendVideo(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Video sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send video: ${error.message}`);
        }
    }

    // Send voice
    async sendVoice(options, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!options || !options.voiceUrl) {
                throw new Error('Options with voiceUrl is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendVoice(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Voice sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send voice: ${error.message}`);
        }
    }

    // Set hidden conversations
    async setHiddenConversations(hidden, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (typeof hidden !== 'boolean') {
                throw new Error('Hidden must be a boolean');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.setHiddenConversations(hidden, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Hidden conversations set successfully'
            };
        } catch (error) {
            throw new Error(`Failed to set hidden conversations: ${error.message}`);
        }
    }

    // Set mute
    async setMute(params, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!params || !params.action) {
                throw new Error('Params with action is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.setMute(params, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Mute set successfully'
            };
        } catch (error) {
            throw new Error(`Failed to set mute: ${error.message}`);
        }
    }

    // Set pinned conversations
    async setPinnedConversations(pinned, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (typeof pinned !== 'boolean') {
                throw new Error('Pinned must be a boolean');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.setPinnedConversations(pinned, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Pinned conversations set successfully'
            };
        } catch (error) {
            throw new Error(`Failed to set pinned conversations: ${error.message}`);
        }
    }

    // Undo message
    async undo(message) {
        try {
            this.ensureZaloAPI();
            if (!message || !message.msgId || !message.cliMsgId) {
                throw new Error('Message with msgId and cliMsgId is required');
            }

            const result = await this.zaloRepository.undo(message);
            
            return {
                success: true,
                data: result,
                message: 'Message undone successfully'
            };
        } catch (error) {
            throw new Error(`Failed to undo message: ${error.message}`);
        }
    }

    // Update auto delete chat
    async updateAutoDeleteChat(ttl, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (ttl === undefined || ttl === null) {
                throw new Error('TTL is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.updateAutoDeleteChat(ttl, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Auto delete chat updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update auto delete chat: ${error.message}`);
        }
    }

    // Update hidden conversation pin
    async updateHiddenConversPin(pin) {
        try {
            this.ensureZaloAPI();
            if (!pin) {
                throw new Error('Pin is required');
            }

            const result = await this.zaloRepository.updateHiddenConversPin(pin);
            
            return {
                success: true,
                data: result,
                message: 'Hidden conversation pin updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update hidden conversation pin: ${error.message}`);
        }
    }

    // Upload attachment
    async uploadAttachment(source, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!source) {
                throw new Error('Source is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.uploadAttachment(source, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Attachment uploaded successfully'
            };
        } catch (error) {
            throw new Error(`Failed to upload attachment: ${error.message}`);
        }
    }
}

module.exports = MessageService;
