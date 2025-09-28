// AutoReply Model - Tự động trả lời
class AutoReply {
    constructor(data) {
        this.id = data.id;
        this.weight = data.weight;
        this.enable = data.enable;
        this.modifiedTime = data.modifiedTime;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.content = data.content;
        this.scope = data.scope;
        this.uids = data.uids;
        this.ownerId = data.ownerId;
        this.recurrence = data.recurrence;
        this.createdTime = data.createdTime;
    }

    // Get auto reply ID
    getId() {
        return this.id;
    }

    // Get weight
    getWeight() {
        return this.weight;
    }

    // Check if enabled
    isEnabled() {
        return this.enable;
    }

    // Get content
    getContent() {
        return this.content;
    }

    // Get scope
    getScope() {
        return this.scope;
    }

    // Get UIDs
    getUids() {
        return this.uids;
    }

    // Get owner ID
    getOwnerId() {
        return this.ownerId;
    }

    // Get recurrence
    getRecurrence() {
        return this.recurrence;
    }

    // Get created time
    getCreatedTime() {
        return this.createdTime;
    }

    // Get modified time
    getModifiedTime() {
        return this.modifiedTime;
    }

    // Get start time
    getStartTime() {
        return this.startTime;
    }

    // Get end time
    getEndTime() {
        return this.endTime;
    }

    // Check if auto reply is active
    isActive() {
        const now = Date.now();
        return this.enable && now >= this.startTime && now <= this.endTime;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            weight: this.weight,
            enable: this.enable,
            modifiedTime: this.modifiedTime,
            startTime: this.startTime,
            endTime: this.endTime,
            content: this.content,
            scope: this.scope,
            uids: this.uids,
            ownerId: this.ownerId,
            recurrence: this.recurrence,
            createdTime: this.createdTime
        };
    }

    // Create from data
    static fromData(data) {
        return new AutoReply(data);
    }
}

// AutoReplyScope enum
const AutoReplyScope = {
    Everyone: 0,
    Stranger: 1,
    SpecificFriends: 2,
    FriendsExcept: 3
};

module.exports = { AutoReply, AutoReplyScope };
