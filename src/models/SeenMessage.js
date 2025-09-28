// SeenMessage Model - Tin nhắn đã xem
class SeenMessage {
    constructor(data) {
        this.type = data.type;
        this.data = data.data;
        this.threadId = data.threadId;
        this.isSelf = data.isSelf;
    }

    // Get message type
    getType() {
        return this.type;
    }

    // Get message data
    getData() {
        return this.data;
    }

    // Get thread ID
    getThreadId() {
        return this.threadId;
    }

    // Check if self
    isSelf() {
        return this.isSelf;
    }

    // Check if user message
    isUserMessage() {
        return this.type === ThreadType.User;
    }

    // Check if group message
    isGroupMessage() {
        return this.type === ThreadType.Group;
    }

    // Get message ID
    getMsgId() {
        return this.data.msgId;
    }

    // Get real message ID
    getRealMsgId() {
        return this.data.realMsgId;
    }

    // Get ID to (for user messages)
    getIdTo() {
        return this.data.idTo;
    }

    // Get group ID (for group messages)
    getGroupId() {
        return this.data.groupId;
    }

    // Get seen UIDs (for group messages)
    getSeenUids() {
        return this.data.seenUids;
    }

    // Check if has seen UIDs
    hasSeenUids() {
        return this.data.seenUids && this.data.seenUids.length > 0;
    }

    // Get seen UID count
    getSeenUidCount() {
        return this.data.seenUids ? this.data.seenUids.length : 0;
    }

    // Check if UID has seen
    hasUidSeen(uid) {
        return this.data.seenUids && this.data.seenUids.includes(uid);
    }

    // Convert to JSON
    toJSON() {
        return {
            type: this.type,
            data: this.data,
            threadId: this.threadId,
            isSelf: this.isSelf
        };
    }

    // Create from data
    static fromData(data) {
        return new SeenMessage(data);
    }
}

// TUserSeenMessage Model
class TUserSeenMessage {
    constructor(data) {
        this.idTo = data.idTo;
        this.msgId = data.msgId;
        this.realMsgId = data.realMsgId;
    }

    // Get ID to
    getIdTo() {
        return this.idTo;
    }

    // Get message ID
    getMsgId() {
        return this.msgId;
    }

    // Get real message ID
    getRealMsgId() {
        return this.realMsgId;
    }

    // Convert to JSON
    toJSON() {
        return {
            idTo: this.idTo,
            msgId: this.msgId,
            realMsgId: this.realMsgId
        };
    }
}

// TGroupSeenMessage Model
class TGroupSeenMessage {
    constructor(data) {
        this.msgId = data.msgId;
        this.groupId = data.groupId;
        this.seenUids = data.seenUids;
    }

    // Get message ID
    getMsgId() {
        return this.msgId;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get seen UIDs
    getSeenUids() {
        return this.seenUids;
    }

    // Check if has seen UIDs
    hasSeenUids() {
        return this.seenUids && this.seenUids.length > 0;
    }

    // Get seen UID count
    getSeenUidCount() {
        return this.seenUids ? this.seenUids.length : 0;
    }

    // Check if UID has seen
    hasUidSeen(uid) {
        return this.seenUids && this.seenUids.includes(uid);
    }

    // Add seen UID
    addSeenUid(uid) {
        if (!this.seenUids) {
            this.seenUids = [];
        }
        if (!this.seenUids.includes(uid)) {
            this.seenUids.push(uid);
        }
    }

    // Remove seen UID
    removeSeenUid(uid) {
        if (this.seenUids) {
            this.seenUids = this.seenUids.filter(id => id !== uid);
        }
    }

    // Convert to JSON
    toJSON() {
        return {
            msgId: this.msgId,
            groupId: this.groupId,
            seenUids: this.seenUids
        };
    }
}

// UserSeenMessage Model
class UserSeenMessage extends SeenMessage {
    constructor(data) {
        super({
            type: ThreadType.User,
            data: data.data,
            threadId: data.threadId,
            isSelf: false
        });
    }
}

// GroupSeenMessage Model
class GroupSeenMessage extends SeenMessage {
    constructor(data) {
        super({
            type: ThreadType.Group,
            data: data.data,
            threadId: data.threadId,
            isSelf: data.isSelf
        });
    }
}

// ThreadType enum
const ThreadType = {
    User: 0,
    Group: 1
};

module.exports = {
    SeenMessage,
    TUserSeenMessage,
    TGroupSeenMessage,
    UserSeenMessage,
    GroupSeenMessage,
    ThreadType
};
