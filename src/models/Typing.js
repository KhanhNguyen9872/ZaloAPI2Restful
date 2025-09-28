// Typing Model - Đang soạn tin nhắn
class Typing {
    constructor(data) {
        this.type = data.type;
        this.data = data.data;
        this.threadId = data.threadId;
        this.isSelf = data.isSelf;
    }

    // Get typing type
    getType() {
        return this.type;
    }

    // Get typing data
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

    // Check if user typing
    isUserTyping() {
        return this.type === ThreadType.User;
    }

    // Check if group typing
    isGroupTyping() {
        return this.type === ThreadType.Group;
    }

    // Get UID
    getUid() {
        return this.data.uid;
    }

    // Get timestamp
    getTs() {
        return this.data.ts;
    }

    // Check if is PC
    isPC() {
        return this.data.isPC === 1;
    }

    // Check if is mobile
    isMobile() {
        return this.data.isPC === 0;
    }

    // Get group ID (for group typing)
    getGroupId() {
        return this.data.gid;
    }

    // Check if has group ID
    hasGroupId() {
        return this.data.gid !== undefined;
    }

    // Get device type
    getDeviceType() {
        return this.isPC() ? 'PC' : 'Mobile';
    }

    // Get typing duration (if available)
    getTypingDuration() {
        // This would need to be calculated based on when typing started
        // For now, return null as we don't have start time
        return null;
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
        return new Typing(data);
    }
}

// TTyping Model
class TTyping {
    constructor(data) {
        this.uid = data.uid;
        this.ts = data.ts;
        this.isPC = data.isPC;
    }

    // Get UID
    getUid() {
        return this.uid;
    }

    // Get timestamp
    getTs() {
        return this.ts;
    }

    // Check if is PC
    isPC() {
        return this.isPC === 1;
    }

    // Check if is mobile
    isMobile() {
        return this.isPC === 0;
    }

    // Get device type
    getDeviceType() {
        return this.isPC() ? 'PC' : 'Mobile';
    }

    // Convert to JSON
    toJSON() {
        return {
            uid: this.uid,
            ts: this.ts,
            isPC: this.isPC
        };
    }
}

// TGroupTyping Model
class TGroupTyping extends TTyping {
    constructor(data) {
        super(data);
        this.gid = data.gid;
    }

    // Get group ID
    getGroupId() {
        return this.gid;
    }

    // Check if has group ID
    hasGroupId() {
        return this.gid !== undefined;
    }

    // Convert to JSON
    toJSON() {
        return {
            ...super.toJSON(),
            gid: this.gid
        };
    }
}

// UserTyping Model
class UserTyping extends Typing {
    constructor(data) {
        super({
            type: ThreadType.User,
            data: data.data,
            threadId: data.threadId,
            isSelf: false
        });
    }
}

// GroupTyping Model
class GroupTyping extends Typing {
    constructor(data) {
        super({
            type: ThreadType.Group,
            data: data.data,
            threadId: data.threadId,
            isSelf: false
        });
    }
}

// ThreadType enum
const ThreadType = {
    User: 0,
    Group: 1
};

module.exports = {
    Typing,
    TTyping,
    TGroupTyping,
    UserTyping,
    GroupTyping,
    ThreadType
};
