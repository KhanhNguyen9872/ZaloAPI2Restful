// Label Model - Thẻ phân loại
class Label {
    constructor(data) {
        this.id = data.id;
        this.text = data.text;
        this.textKey = data.textKey;
        this.conversations = data.conversations;
        this.color = data.color;
        this.offset = data.offset;
        this.emoji = data.emoji;
        this.createTime = data.createTime;
    }

    // Get label ID
    getId() {
        return this.id;
    }

    // Get label text
    getText() {
        return this.text;
    }

    // Get text key
    getTextKey() {
        return this.textKey;
    }

    // Get conversations
    getConversations() {
        return this.conversations;
    }

    // Get color
    getColor() {
        return this.color;
    }

    // Get offset
    getOffset() {
        return this.offset;
    }

    // Get emoji
    getEmoji() {
        return this.emoji;
    }

    // Get create time
    getCreateTime() {
        return this.createTime;
    }

    // Check if has conversations
    hasConversations() {
        return this.conversations && this.conversations.length > 0;
    }

    // Get conversation count
    getConversationCount() {
        return this.conversations ? this.conversations.length : 0;
    }

    // Check if has emoji
    hasEmoji() {
        return this.emoji && this.emoji.length > 0;
    }

    // Check if has color
    hasColor() {
        return this.color && this.color.length > 0;
    }

    // Add conversation
    addConversation(conversationId) {
        if (!this.conversations) {
            this.conversations = [];
        }
        if (!this.conversations.includes(conversationId)) {
            this.conversations.push(conversationId);
        }
    }

    // Remove conversation
    removeConversation(conversationId) {
        if (this.conversations) {
            this.conversations = this.conversations.filter(id => id !== conversationId);
        }
    }

    // Check if has conversation
    hasConversation(conversationId) {
        return this.conversations && this.conversations.includes(conversationId);
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            text: this.text,
            textKey: this.textKey,
            conversations: this.conversations,
            color: this.color,
            offset: this.offset,
            emoji: this.emoji,
            createTime: this.createTime
        };
    }

    // Create from data
    static fromData(data) {
        return new Label(data);
    }
}

module.exports = Label;
