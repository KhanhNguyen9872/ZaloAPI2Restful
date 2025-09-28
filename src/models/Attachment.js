// Attachment Model - Nguồn đính kèm
class Attachment {
    constructor(data) {
        if (typeof data === 'string') {
            // String path
            this.source = data;
            this.type = 'path';
        } else if (data && data.data && data.filename && data.metadata) {
            // Buffer data
            this.source = data;
            this.type = 'buffer';
            this.data = data.data;
            this.filename = data.filename;
            this.metadata = data.metadata;
        } else {
            throw new Error('Invalid attachment data');
        }
    }

    // Get attachment source
    getSource() {
        return this.source;
    }

    // Get attachment type
    getType() {
        return this.type;
    }

    // Get filename (for buffer type)
    getFilename() {
        return this.filename;
    }

    // Get metadata (for buffer type)
    getMetadata() {
        return this.metadata;
    }

    // Check if attachment is a path
    isPath() {
        return this.type === 'path';
    }

    // Check if attachment is buffer data
    isBuffer() {
        return this.type === 'buffer';
    }

    // Convert to JSON
    toJSON() {
        return {
            source: this.source,
            type: this.type,
            filename: this.filename,
            metadata: this.metadata
        };
    }

    // Create from path
    static fromPath(path) {
        return new Attachment(path);
    }

    // Create from buffer
    static fromBuffer(data, filename, metadata) {
        return new Attachment({
            data,
            filename,
            metadata
        });
    }
}

module.exports = Attachment;
