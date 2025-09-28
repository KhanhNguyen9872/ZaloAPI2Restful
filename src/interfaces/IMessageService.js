// IMessageService - Interface for Message business logic
class IMessageService {
    // Send messages
    async sendMessage(message, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async sendVoice(voicePath, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async sendSticker(stickerId, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async sendCard(cardData, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async createPoll(pollData, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    // Message management
    async deleteMessage(messageId) {
        throw new Error('Method not implemented');
    }

    async undo(messageId, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async addReaction(reaction, messageId, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    async removeReaction(messageId, threadId, threadType) {
        throw new Error('Method not implemented');
    }

    // Stickers
    async getStickers(keyword) {
        throw new Error('Method not implemented');
    }

    async getStickersDetail(stickerIds) {
        throw new Error('Method not implemented');
    }

    // Conversations
    async pinConversations(threadIds) {
        throw new Error('Method not implemented');
    }

    async unpinConversations(threadIds) {
        throw new Error('Method not implemented');
    }
}

module.exports = IMessageService;
