// FriendEvent Model - Các sự kiện bạn bè
class FriendEvent {
    constructor(data) {
        this.type = data.type;
        this.data = data.data;
        this.threadId = data.threadId;
        this.isSelf = data.isSelf;
    }

    // Get event type
    getType() {
        return this.type;
    }

    // Get event data
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

    // Check if add event
    isAddEvent() {
        return this.type === FriendEventType.ADD;
    }

    // Check if remove event
    isRemoveEvent() {
        return this.type === FriendEventType.REMOVE;
    }

    // Check if request event
    isRequestEvent() {
        return this.type === FriendEventType.REQUEST;
    }

    // Check if block event
    isBlockEvent() {
        return this.type === FriendEventType.BLOCK;
    }

    // Check if pin event
    isPinEvent() {
        return this.type === FriendEventType.PIN_UNPIN || this.type === FriendEventType.PIN_CREATE;
    }

    // Get to UID (for request/reject/undo events)
    getToUid() {
        return this.data.toUid;
    }

    // Get from UID (for request/reject/undo events)
    getFromUid() {
        return this.data.fromUid;
    }

    // Get message (for request events)
    getMessage() {
        return this.data.message;
    }

    // Get source (for request events)
    getSource() {
        return this.data.src;
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
        return new FriendEvent(data);
    }
}

// TFriendEventBase Model
class TFriendEventBase {
    constructor(data) {
        this.uid = data;
    }

    // Get UID
    getUid() {
        return this.uid;
    }

    // Convert to JSON
    toJSON() {
        return this.uid;
    }
}

// TFriendEventRejectUndo Model
class TFriendEventRejectUndo {
    constructor(data) {
        this.toUid = data.toUid;
        this.fromUid = data.fromUid;
    }

    // Get to UID
    getToUid() {
        return this.toUid;
    }

    // Get from UID
    getFromUid() {
        return this.fromUid;
    }

    // Convert to JSON
    toJSON() {
        return {
            toUid: this.toUid,
            fromUid: this.fromUid
        };
    }
}

// TFriendEventRequest Model
class TFriendEventRequest {
    constructor(data) {
        this.toUid = data.toUid;
        this.fromUid = data.fromUid;
        this.src = data.src;
        this.message = data.message;
    }

    // Get to UID
    getToUid() {
        return this.toUid;
    }

    // Get from UID
    getFromUid() {
        return this.fromUid;
    }

    // Get source
    getSource() {
        return this.src;
    }

    // Get message
    getMessage() {
        return this.message;
    }

    // Convert to JSON
    toJSON() {
        return {
            toUid: this.toUid,
            fromUid: this.fromUid,
            src: this.src,
            message: this.message
        };
    }
}

// TFriendEventSeenRequest Model
class TFriendEventSeenRequest {
    constructor(data) {
        this.uids = data;
    }

    // Get UIDs
    getUids() {
        return this.uids;
    }

    // Convert to JSON
    toJSON() {
        return this.uids;
    }
}

// TFriendEventPinCreateTopicParams Model
class TFriendEventPinCreateTopicParams {
    constructor(data) {
        this.senderUid = data.senderUid;
        this.senderName = data.senderName;
        this.client_msg_id = data.client_msg_id;
        this.global_msg_id = data.global_msg_id;
        this.msg_type = data.msg_type;
        this.title = data.title;
    }

    // Get sender UID
    getSenderUid() {
        return this.senderUid;
    }

    // Get sender name
    getSenderName() {
        return this.senderName;
    }

    // Get client message ID
    getClientMsgId() {
        return this.client_msg_id;
    }

    // Get global message ID
    getGlobalMsgId() {
        return this.global_msg_id;
    }

    // Get message type
    getMsgType() {
        return this.msg_type;
    }

    // Get title
    getTitle() {
        return this.title;
    }

    // Convert to JSON
    toJSON() {
        return {
            senderUid: this.senderUid,
            senderName: this.senderName,
            client_msg_id: this.client_msg_id,
            global_msg_id: this.global_msg_id,
            msg_type: this.msg_type,
            title: this.title
        };
    }
}

// TFriendEventPinTopic Model
class TFriendEventPinTopic {
    constructor(data) {
        this.topicId = data.topicId;
        this.topicType = data.topicType;
    }

    // Get topic ID
    getTopicId() {
        return this.topicId;
    }

    // Get topic type
    getTopicType() {
        return this.topicType;
    }

    // Convert to JSON
    toJSON() {
        return {
            topicId: this.topicId,
            topicType: this.topicType
        };
    }
}

// TFriendEventPinCreateTopic Model
class TFriendEventPinCreateTopic {
    constructor(data) {
        this.type = data.type;
        this.color = data.color;
        this.emoji = data.emoji;
        this.startTime = data.startTime;
        this.duration = data.duration;
        this.params = data.params;
        this.id = data.id;
        this.creatorId = data.creatorId;
        this.createTime = data.createTime;
        this.editorId = data.editorId;
        this.editTime = data.editTime;
        this.repeat = data.repeat;
        this.action = data.action;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get color
    getColor() {
        return this.color;
    }

    // Get emoji
    getEmoji() {
        return this.emoji;
    }

    // Get start time
    getStartTime() {
        return this.startTime;
    }

    // Get duration
    getDuration() {
        return this.duration;
    }

    // Get params
    getParams() {
        return this.params;
    }

    // Get ID
    getId() {
        return this.id;
    }

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get create time
    getCreateTime() {
        return this.createTime;
    }

    // Get editor ID
    getEditorId() {
        return this.editorId;
    }

    // Get edit time
    getEditTime() {
        return this.editTime;
    }

    // Get repeat
    getRepeat() {
        return this.repeat;
    }

    // Get action
    getAction() {
        return this.action;
    }

    // Convert to JSON
    toJSON() {
        return {
            type: this.type,
            color: this.color,
            emoji: this.emoji,
            startTime: this.startTime,
            duration: this.duration,
            params: this.params,
            id: this.id,
            creatorId: this.creatorId,
            createTime: this.createTime,
            editorId: this.editorId,
            editTime: this.editTime,
            repeat: this.repeat,
            action: this.action
        };
    }
}

// TFriendEventPinCreate Model
class TFriendEventPinCreate {
    constructor(data) {
        this.oldTopic = data.oldTopic;
        this.topic = data.topic;
        this.actorId = data.actorId;
        this.oldVersion = data.oldVersion;
        this.version = data.version;
        this.conversationId = data.conversationId;
    }

    // Get old topic
    getOldTopic() {
        return this.oldTopic;
    }

    // Get topic
    getTopic() {
        return this.topic;
    }

    // Get actor ID
    getActorId() {
        return this.actorId;
    }

    // Get old version
    getOldVersion() {
        return this.oldVersion;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get conversation ID
    getConversationId() {
        return this.conversationId;
    }

    // Convert to JSON
    toJSON() {
        return {
            oldTopic: this.oldTopic,
            topic: this.topic,
            actorId: this.actorId,
            oldVersion: this.oldVersion,
            version: this.version,
            conversationId: this.conversationId
        };
    }
}

// TFriendEventPinUnpin Model
class TFriendEventPinUnpin {
    constructor(data) {
        this.topic = data.topic;
        this.actorId = data.actorId;
        this.oldVersion = data.oldVersion;
        this.version = data.version;
        this.conversationId = data.conversationId;
    }

    // Get topic
    getTopic() {
        return this.topic;
    }

    // Get actor ID
    getActorId() {
        return this.actorId;
    }

    // Get old version
    getOldVersion() {
        return this.oldVersion;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get conversation ID
    getConversationId() {
        return this.conversationId;
    }

    // Convert to JSON
    toJSON() {
        return {
            topic: this.topic,
            actorId: this.actorId,
            oldVersion: this.oldVersion,
            version: this.version,
            conversationId: this.conversationId
        };
    }
}

// FriendEventType enum
const FriendEventType = {
    ADD: 0,
    REMOVE: 1,
    REQUEST: 2,
    UNDO_REQUEST: 3,
    REJECT_REQUEST: 4,
    SEEN_FRIEND_REQUEST: 5,
    BLOCK: 6,
    UNBLOCK: 7,
    BLOCK_CALL: 8,
    UNBLOCK_CALL: 9,
    PIN_UNPIN: 10,
    PIN_CREATE: 11,
    UNKNOWN: 12
};

module.exports = {
    FriendEvent,
    TFriendEventBase,
    TFriendEventRejectUndo,
    TFriendEventRequest,
    TFriendEventSeenRequest,
    TFriendEventPinCreateTopicParams,
    TFriendEventPinTopic,
    TFriendEventPinCreateTopic,
    TFriendEventPinCreate,
    TFriendEventPinUnpin,
    FriendEventType
};
