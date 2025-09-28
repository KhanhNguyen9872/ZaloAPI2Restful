// MessageDTO - Data Transfer Object
class MessageDTO {
    constructor(data = {}) {
        this.id = data.id;
        this.content = data.content;
        this.type = data.type;
        this.senderId = data.senderId;
        this.threadId = data.threadId;
        this.threadType = data.threadType;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
        this.isDeleted = data.isDeleted;
        this.reactions = data.reactions;
        this.replyTo = data.replyTo;
        this.attachments = data.attachments;
        this.metadata = data.metadata;
    }

    // Validation
    static validate(data) {
        const errors = [];
        
        if (!data.content && data.type === 'text') errors.push('Content is required for text messages');
        if (!data.senderId) errors.push('Sender ID is required');
        if (!data.threadId) errors.push('Thread ID is required');
        if (!data.type) errors.push('Message type is required');
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Factory methods
    static fromModel(message) {
        return new MessageDTO({
            id: message.id,
            content: message.content,
            type: message.type,
            senderId: message.senderId,
            threadId: message.threadId,
            threadType: message.threadType,
            timestamp: message.timestamp,
            isEdited: message.isEdited,
            isDeleted: message.isDeleted,
            reactions: message.reactions,
            replyTo: message.replyTo,
            attachments: message.attachments,
            metadata: message.metadata
        });
    }

    static fromZaloData(zaloData) {
        return new MessageDTO({
            id: zaloData.id,
            content: zaloData.content,
            type: zaloData.type || 'text',
            senderId: zaloData.senderId,
            threadId: zaloData.threadId,
            threadType: zaloData.threadType,
            timestamp: zaloData.timestamp,
            isEdited: zaloData.isEdited || false,
            isDeleted: zaloData.isDeleted || false,
            reactions: zaloData.reactions || [],
            replyTo: zaloData.replyTo,
            attachments: zaloData.attachments || [],
            metadata: zaloData.metadata || {}
        });
    }

    // Create specific message types
    static createText(content, senderId, threadId, threadType = 1) {
        return new MessageDTO({
            content,
            type: 'text',
            senderId,
            threadId,
            threadType,
            timestamp: new Date()
        });
    }

    static createVoice(voicePath, senderId, threadId, threadType = 1) {
        return new MessageDTO({
            content: voicePath,
            type: 'voice',
            senderId,
            threadId,
            threadType,
            timestamp: new Date(),
            attachments: [{ type: 'voice', path: voicePath }]
        });
    }

    static createSticker(stickerId, senderId, threadId, threadType = 1) {
        return new MessageDTO({
            content: stickerId,
            type: 'sticker',
            senderId,
            threadId,
            threadType,
            timestamp: new Date(),
            metadata: { stickerId }
        });
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            content: this.content,
            type: this.type,
            senderId: this.senderId,
            threadId: this.threadId,
            threadType: this.threadType,
            timestamp: this.timestamp,
            isEdited: this.isEdited,
            isDeleted: this.isDeleted,
            reactions: this.reactions,
            replyTo: this.replyTo,
            attachments: this.attachments,
            metadata: this.metadata
        };
    }

    // Response format
    toResponse() {
        return {
            success: true,
            data: this.toJSON()
        };
    }
}

module.exports = MessageDTO;
