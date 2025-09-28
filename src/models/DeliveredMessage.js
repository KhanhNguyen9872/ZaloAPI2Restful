// DeliveredMessage Model - Tin nhắn đã nhận
class DeliveredMessage {
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

    // Get message ID
    getMsgId() {
        return this.data.msgId;
    }

    // Get seen status
    getSeen() {
        return this.data.seen;
    }

    // Get delivered UIDs
    getDeliveredUids() {
        return this.data.deliveredUids;
    }

    // Get seen UIDs
    getSeenUids() {
        return this.data.seenUids;
    }

    // Get real message ID
    getRealMsgId() {
        return this.data.realMsgId;
    }

    // Get MSTs
    getMSTs() {
        return this.data.mSTs;
    }

    // Check if is user message
    isUserMessage() {
        return this.type === ThreadType.User;
    }

    // Check if is group message
    isGroupMessage() {
        return this.type === ThreadType.Group;
    }

    // Get group ID (for group messages)
    getGroupId() {
        return this.data.groupId;
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
        return new DeliveredMessage(data);
    }
}

// TDeliveredMessage Model
class TDeliveredMessage {
    constructor(data) {
        this.msgId = data.msgId;
        this.seen = data.seen;
        this.deliveredUids = data.deliveredUids;
        this.seenUids = data.seenUids;
        this.realMsgId = data.realMsgId;
        this.mSTs = data.mSTs;
    }

    // Get message ID
    getMsgId() {
        return this.msgId;
    }

    // Get seen status
    getSeen() {
        return this.seen;
    }

    // Get delivered UIDs
    getDeliveredUids() {
        return this.deliveredUids;
    }

    // Get seen UIDs
    getSeenUids() {
        return this.seenUids;
    }

    // Get real message ID
    getRealMsgId() {
        return this.realMsgId;
    }

    // Get MSTs
    getMSTs() {
        return this.mSTs;
    }

    // Convert to JSON
    toJSON() {
        return {
            msgId: this.msgId,
            seen: this.seen,
            deliveredUids: this.deliveredUids,
            seenUids: this.seenUids,
            realMsgId: this.realMsgId,
            mSTs: this.mSTs
        };
    }
}

// TGroupDeliveredMessage Model
class TGroupDeliveredMessage extends TDeliveredMessage {
    constructor(data) {
        super(data);
        this.groupId = data.groupId;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Convert to JSON
    toJSON() {
        return {
            ...super.toJSON(),
            groupId: this.groupId
        };
    }
}

// UserDeliveredMessage Model
class UserDeliveredMessage extends DeliveredMessage {
    constructor(data) {
        super({
            type: ThreadType.User,
            data: data.data,
            threadId: data.threadId,
            isSelf: false
        });
    }
}

// GroupDeliveredMessage Model
class GroupDeliveredMessage extends DeliveredMessage {
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
    DeliveredMessage,
    TDeliveredMessage,
    TGroupDeliveredMessage,
    UserDeliveredMessage,
    GroupDeliveredMessage,
    ThreadType
};
