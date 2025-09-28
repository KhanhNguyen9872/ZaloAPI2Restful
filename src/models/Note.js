// Note Model - Entity layer
class Note {
    constructor(data = {}) {
        this.id = data.id || null;
        this.title = data.title || '';
        this.content = data.content || '';
        this.authorId = data.authorId || null;
        this.threadId = data.threadId || null;
        this.threadType = data.threadType || 1;
        this.isPublic = data.isPublic || false;
        this.tags = data.tags || [];
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Validation methods
    isValid() {
        return this.id && this.title && this.content && this.authorId;
    }

    // Business logic methods
    isAuthor(userId) {
        return this.authorId === userId;
    }

    canEdit(userId) {
        return this.isAuthor(userId);
    }

    canDelete(userId) {
        return this.isAuthor(userId);
    }

    updateContent(title, content) {
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            this.updatedAt = new Date();
        }
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
        this.updatedAt = new Date();
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            threadId: this.threadId,
            threadType: this.threadType,
            isPublic: this.isPublic,
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Factory methods
    static fromZaloData(zaloData) {
        return new Note({
            id: zaloData.id,
            title: zaloData.title,
            content: zaloData.content,
            authorId: zaloData.authorId,
            threadId: zaloData.threadId,
            threadType: zaloData.threadType,
            isPublic: zaloData.isPublic || false,
            tags: zaloData.tags || []
        });
    }

    static create(title, content, authorId, threadId, threadType = 1) {
        return new Note({
            title,
            content,
            authorId,
            threadId,
            threadType
        });
    }
}

module.exports = Note;
