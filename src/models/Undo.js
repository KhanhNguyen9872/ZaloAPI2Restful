// Undo Model - Tin nhắn đã thu hồi
class Undo {
    constructor(data) {
        this.data = data.data;
        this.threadId = data.threadId;
        this.isSelf = data.isSelf;
        this.isGroup = data.isGroup;
    }

    // Get undo data
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

    // Check if group
    isGroup() {
        return this.isGroup;
    }

    // Get action ID
    getActionId() {
        return this.data.actionId;
    }

    // Get message ID
    getMsgId() {
        return this.data.msgId;
    }

    // Get client message ID
    getCliMsgId() {
        return this.data.cliMsgId;
    }

    // Get message type
    getMsgType() {
        return this.data.msgType;
    }

    // Get UID from
    getUidFrom() {
        return this.data.uidFrom;
    }

    // Get ID to
    getIdTo() {
        return this.data.idTo;
    }

    // Get display name
    getDName() {
        return this.data.dName;
    }

    // Get timestamp
    getTs() {
        return this.data.ts;
    }

    // Get status
    getStatus() {
        return this.data.status;
    }

    // Get content
    getContent() {
        return this.data.content;
    }

    // Get notify
    getNotify() {
        return this.data.notify;
    }

    // Get TTL
    getTtl() {
        return this.data.ttl;
    }

    // Get user ID
    getUserId() {
        return this.data.userId;
    }

    // Get UIN
    getUin() {
        return this.data.uin;
    }

    // Get command
    getCmd() {
        return this.data.cmd;
    }

    // Get status
    getSt() {
        return this.data.st;
    }

    // Get at
    getAt() {
        return this.data.at;
    }

    // Get real message ID
    getRealMsgId() {
        return this.data.realMsgId;
    }

    // Get undo content
    getUndoContent() {
        return this.data.content;
    }

    // Get global message ID
    getGlobalMsgId() {
        return this.data.content ? this.data.content.globalMsgId : null;
    }

    // Get client message ID from content
    getCliMsgIdFromContent() {
        return this.data.content ? this.data.content.cliMsgId : null;
    }

    // Get delete message flag
    getDeleteMsg() {
        return this.data.content ? this.data.content.deleteMsg : null;
    }

    // Get source ID
    getSrcId() {
        return this.data.content ? this.data.content.srcId : null;
    }

    // Get destination ID
    getDestId() {
        return this.data.content ? this.data.content.destId : null;
    }

    // Check if message is deleted
    isMessageDeleted() {
        return this.getDeleteMsg() === 1;
    }

    // Check if has undo content
    hasUndoContent() {
        return this.data.content !== null && this.data.content !== undefined;
    }

    // Get undo type
    getUndoType() {
        if (!this.hasUndoContent()) return 'Unknown';
        
        const content = this.getUndoContent();
        if (content.deleteMsg === 1) return 'Delete';
        if (content.srcId && content.destId) return 'Forward';
        return 'Undo';
    }

    // Convert to JSON
    toJSON() {
        return {
            data: this.data,
            threadId: this.threadId,
            isSelf: this.isSelf,
            isGroup: this.isGroup
        };
    }

    // Create from data
    static fromData(data) {
        return new Undo(data);
    }
}

// TUndo Model
class TUndo {
    constructor(data) {
        this.actionId = data.actionId;
        this.msgId = data.msgId;
        this.cliMsgId = data.cliMsgId;
        this.msgType = data.msgType;
        this.uidFrom = data.uidFrom;
        this.idTo = data.idTo;
        this.dName = data.dName;
        this.ts = data.ts;
        this.status = data.status;
        this.content = data.content;
        this.notify = data.notify;
        this.ttl = data.ttl;
        this.userId = data.userId;
        this.uin = data.uin;
        this.cmd = data.cmd;
        this.st = data.st;
        this.at = data.at;
        this.realMsgId = data.realMsgId;
    }

    // Get action ID
    getActionId() {
        return this.actionId;
    }

    // Get message ID
    getMsgId() {
        return this.msgId;
    }

    // Get client message ID
    getCliMsgId() {
        return this.cliMsgId;
    }

    // Get message type
    getMsgType() {
        return this.msgType;
    }

    // Get UID from
    getUidFrom() {
        return this.uidFrom;
    }

    // Get ID to
    getIdTo() {
        return this.idTo;
    }

    // Get display name
    getDName() {
        return this.dName;
    }

    // Get timestamp
    getTs() {
        return this.ts;
    }

    // Get status
    getStatus() {
        return this.status;
    }

    // Get content
    getContent() {
        return this.content;
    }

    // Get notify
    getNotify() {
        return this.notify;
    }

    // Get TTL
    getTtl() {
        return this.ttl;
    }

    // Get user ID
    getUserId() {
        return this.userId;
    }

    // Get UIN
    getUin() {
        return this.uin;
    }

    // Get command
    getCmd() {
        return this.cmd;
    }

    // Get status
    getSt() {
        return this.st;
    }

    // Get at
    getAt() {
        return this.at;
    }

    // Get real message ID
    getRealMsgId() {
        return this.realMsgId;
    }

    // Get undo content
    getUndoContent() {
        return this.content;
    }

    // Get global message ID
    getGlobalMsgId() {
        return this.content ? this.content.globalMsgId : null;
    }

    // Get client message ID from content
    getCliMsgIdFromContent() {
        return this.content ? this.content.cliMsgId : null;
    }

    // Get delete message flag
    getDeleteMsg() {
        return this.content ? this.content.deleteMsg : null;
    }

    // Get source ID
    getSrcId() {
        return this.content ? this.content.srcId : null;
    }

    // Get destination ID
    getDestId() {
        return this.content ? this.content.destId : null;
    }

    // Check if message is deleted
    isMessageDeleted() {
        return this.getDeleteMsg() === 1;
    }

    // Check if has undo content
    hasUndoContent() {
        return this.content !== null && this.content !== undefined;
    }

    // Get undo type
    getUndoType() {
        if (!this.hasUndoContent()) return 'Unknown';
        
        const content = this.getUndoContent();
        if (content.deleteMsg === 1) return 'Delete';
        if (content.srcId && content.destId) return 'Forward';
        return 'Undo';
    }

    // Convert to JSON
    toJSON() {
        return {
            actionId: this.actionId,
            msgId: this.msgId,
            cliMsgId: this.cliMsgId,
            msgType: this.msgType,
            uidFrom: this.uidFrom,
            idTo: this.idTo,
            dName: this.dName,
            ts: this.ts,
            status: this.status,
            content: this.content,
            notify: this.notify,
            ttl: this.ttl,
            userId: this.userId,
            uin: this.uin,
            cmd: this.cmd,
            st: this.st,
            at: this.at,
            realMsgId: this.realMsgId
        };
    }
}

// TUndoContent Model
class TUndoContent {
    constructor(data) {
        this.globalMsgId = data.globalMsgId;
        this.cliMsgId = data.cliMsgId;
        this.deleteMsg = data.deleteMsg;
        this.srcId = data.srcId;
        this.destId = data.destId;
    }

    // Get global message ID
    getGlobalMsgId() {
        return this.globalMsgId;
    }

    // Get client message ID
    getCliMsgId() {
        return this.cliMsgId;
    }

    // Get delete message flag
    getDeleteMsg() {
        return this.deleteMsg;
    }

    // Get source ID
    getSrcId() {
        return this.srcId;
    }

    // Get destination ID
    getDestId() {
        return this.destId;
    }

    // Check if message is deleted
    isMessageDeleted() {
        return this.deleteMsg === 1;
    }

    // Check if has source and destination
    hasSourceAndDestination() {
        return this.srcId && this.destId;
    }

    // Get undo type
    getUndoType() {
        if (this.deleteMsg === 1) return 'Delete';
        if (this.hasSourceAndDestination()) return 'Forward';
        return 'Undo';
    }

    // Convert to JSON
    toJSON() {
        return {
            globalMsgId: this.globalMsgId,
            cliMsgId: this.cliMsgId,
            deleteMsg: this.deleteMsg,
            srcId: this.srcId,
            destId: this.destId
        };
    }
}

module.exports = {
    Undo,
    TUndo,
    TUndoContent
};
