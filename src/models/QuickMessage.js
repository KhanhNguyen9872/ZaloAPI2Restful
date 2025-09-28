// QuickMessage Model - Tin nhắn nhanh
class QuickMessage {
    constructor(data) {
        this.id = data.id;
        this.keyword = data.keyword;
        this.type = data.type;
        this.createdTime = data.createdTime;
        this.lastModified = data.lastModified;
        this.message = data.message;
        this.media = data.media;
    }

    // Get ID
    getId() {
        return this.id;
    }

    // Get keyword
    getKeyword() {
        return this.keyword;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get created time
    getCreatedTime() {
        return this.createdTime;
    }

    // Get last modified
    getLastModified() {
        return this.lastModified;
    }

    // Get message
    getMessage() {
        return this.message;
    }

    // Get media
    getMedia() {
        return this.media;
    }

    // Get message title
    getMessageTitle() {
        return this.message ? this.message.title : null;
    }

    // Get message params
    getMessageParams() {
        return this.message ? this.message.params : null;
    }

    // Check if has media
    hasMedia() {
        return this.media && this.media.items && this.media.items.length > 0;
    }

    // Get media items
    getMediaItems() {
        return this.media ? this.media.items : [];
    }

    // Get media item count
    getMediaItemCount() {
        return this.media && this.media.items ? this.media.items.length : 0;
    }

    // Get first media item
    getFirstMediaItem() {
        const items = this.getMediaItems();
        return items.length > 0 ? items[0] : null;
    }

    // Get last media item
    getLastMediaItem() {
        const items = this.getMediaItems();
        return items.length > 0 ? items[items.length - 1] : null;
    }

    // Get media item by index
    getMediaItem(index) {
        const items = this.getMediaItems();
        return items[index] || null;
    }

    // Add media item
    addMediaItem(mediaItem) {
        if (!this.media) {
            this.media = { items: [] };
        }
        if (!this.media.items) {
            this.media.items = [];
        }
        this.media.items.push(mediaItem);
    }

    // Remove media item
    removeMediaItem(index) {
        if (this.media && this.media.items) {
            this.media.items.splice(index, 1);
        }
    }

    // Check if has message
    hasMessage() {
        return this.message && this.message.title;
    }

    // Check if has message params
    hasMessageParams() {
        return this.message && this.message.params;
    }

    // Get formatted message
    getFormattedMessage() {
        if (!this.message) return '';
        let formatted = this.message.title;
        if (this.message.params) {
            formatted += ` (${this.message.params})`;
        }
        return formatted;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            keyword: this.keyword,
            type: this.type,
            createdTime: this.createdTime,
            lastModified: this.lastModified,
            message: this.message,
            media: this.media
        };
    }

    // Create from data
    static fromData(data) {
        return new QuickMessage(data);
    }
}

// QuickMessageMediaItem Model
class QuickMessageMediaItem {
    constructor(data) {
        this.type = data.type;
        this.photoId = data.photoId;
        this.title = data.title;
        this.width = data.width;
        this.height = data.height;
        this.previewThumb = data.previewThumb;
        this.rawUrl = data.rawUrl;
        this.thumbUrl = data.thumbUrl;
        this.normalUrl = data.normalUrl;
        this.hdUrl = data.hdUrl;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get photo ID
    getPhotoId() {
        return this.photoId;
    }

    // Get title
    getTitle() {
        return this.title;
    }

    // Get width
    getWidth() {
        return this.width;
    }

    // Get height
    getHeight() {
        return this.height;
    }

    // Get preview thumb
    getPreviewThumb() {
        return this.previewThumb;
    }

    // Get raw URL
    getRawUrl() {
        return this.rawUrl;
    }

    // Get thumb URL
    getThumbUrl() {
        return this.thumbUrl;
    }

    // Get normal URL
    getNormalUrl() {
        return this.normalUrl;
    }

    // Get HD URL
    getHdUrl() {
        return this.hdUrl;
    }

    // Get aspect ratio
    getAspectRatio() {
        return this.width / this.height;
    }

    // Check if is landscape
    isLandscape() {
        return this.width > this.height;
    }

    // Check if is portrait
    isPortrait() {
        return this.height > this.width;
    }

    // Check if is square
    isSquare() {
        return this.width === this.height;
    }

    // Get best URL (prefer HD, fallback to normal, then thumb)
    getBestUrl() {
        if (this.hdUrl) return this.hdUrl;
        if (this.normalUrl) return this.normalUrl;
        if (this.thumbUrl) return this.thumbUrl;
        if (this.rawUrl) return this.rawUrl;
        return this.previewThumb;
    }

    // Convert to JSON
    toJSON() {
        return {
            type: this.type,
            photoId: this.photoId,
            title: this.title,
            width: this.width,
            height: this.height,
            previewThumb: this.previewThumb,
            rawUrl: this.rawUrl,
            thumbUrl: this.thumbUrl,
            normalUrl: this.normalUrl,
            hdUrl: this.hdUrl
        };
    }
}

module.exports = {
    QuickMessage,
    QuickMessageMediaItem
};
