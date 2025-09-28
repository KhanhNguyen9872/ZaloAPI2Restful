// Message Model - Tin nhắn
class Message {
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

    // Get quote
    getQuote() {
        return this.data.quote;
    }

    // Check if has quote
    hasQuote() {
        return this.data.quote !== undefined;
    }

    // Get mentions (for group messages)
    getMentions() {
        return this.data.mentions;
    }

    // Check if has mentions
    hasMentions() {
        return this.data.mentions && this.data.mentions.length > 0;
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
        return new Message(data);
    }
}

// TMessage Model
class TMessage {
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
        this.topOut = data.topOut;
        this.topOutTimeOut = data.topOutTimeOut;
        this.topOutImprTimeOut = data.topOutImprTimeOut;
        this.propertyExt = data.propertyExt;
        this.paramsExt = data.paramsExt;
        this.cmd = data.cmd;
        this.st = data.st;
        this.at = data.at;
        this.realMsgId = data.realMsgId;
        this.quote = data.quote;
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

    // Get top out
    getTopOut() {
        return this.topOut;
    }

    // Get top out timeout
    getTopOutTimeOut() {
        return this.topOutTimeOut;
    }

    // Get top out impression timeout
    getTopOutImprTimeOut() {
        return this.topOutImprTimeOut;
    }

    // Get property extension
    getPropertyExt() {
        return this.propertyExt;
    }

    // Get params extension
    getParamsExt() {
        return this.paramsExt;
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

    // Get quote
    getQuote() {
        return this.quote;
    }

    // Check if has quote
    hasQuote() {
        return this.quote !== undefined;
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
            topOut: this.topOut,
            topOutTimeOut: this.topOutTimeOut,
            topOutImprTimeOut: this.topOutImprTimeOut,
            propertyExt: this.propertyExt,
            paramsExt: this.paramsExt,
            cmd: this.cmd,
            st: this.st,
            at: this.at,
            realMsgId: this.realMsgId,
            quote: this.quote
        };
    }
}

// TGroupMessage Model
class TGroupMessage extends TMessage {
    constructor(data) {
        super(data);
        this.mentions = data.mentions;
    }

    // Get mentions
    getMentions() {
        return this.mentions;
    }

    // Check if has mentions
    hasMentions() {
        return this.mentions && this.mentions.length > 0;
    }

    // Convert to JSON
    toJSON() {
        return {
            ...super.toJSON(),
            mentions: this.mentions
        };
    }
}

// TQuote Model
class TQuote {
    constructor(data) {
        this.ownerId = data.ownerId;
        this.cliMsgId = data.cliMsgId;
        this.globalMsgId = data.globalMsgId;
        this.cliMsgType = data.cliMsgType;
        this.ts = data.ts;
        this.msg = data.msg;
        this.attach = data.attach;
        this.fromD = data.fromD;
        this.ttl = data.ttl;
    }

    // Get owner ID
    getOwnerId() {
        return this.ownerId;
    }

    // Get client message ID
    getCliMsgId() {
        return this.cliMsgId;
    }

    // Get global message ID
    getGlobalMsgId() {
        return this.globalMsgId;
    }

    // Get client message type
    getCliMsgType() {
        return this.cliMsgType;
    }

    // Get timestamp
    getTs() {
        return this.ts;
    }

    // Get message
    getMsg() {
        return this.msg;
    }

    // Get attachment
    getAttach() {
        return this.attach;
    }

    // Get from D
    getFromD() {
        return this.fromD;
    }

    // Get TTL
    getTtl() {
        return this.ttl;
    }

    // Convert to JSON
    toJSON() {
        return {
            ownerId: this.ownerId,
            cliMsgId: this.cliMsgId,
            globalMsgId: this.globalMsgId,
            cliMsgType: this.cliMsgType,
            ts: this.ts,
            msg: this.msg,
            attach: this.attach,
            fromD: this.fromD,
            ttl: this.ttl
        };
    }
}

// TMention Model
class TMention {
    constructor(data) {
        this.uid = data.uid;
        this.pos = data.pos;
        this.len = data.len;
        this.type = data.type;
    }

    // Get UID
    getUid() {
        return this.uid;
    }

    // Get position
    getPos() {
        return this.pos;
    }

    // Get length
    getLen() {
        return this.len;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Convert to JSON
    toJSON() {
        return {
            uid: this.uid,
            pos: this.pos,
            len: this.len,
            type: this.type
        };
    }
}

// TAttachmentContent Model
class TAttachmentContent {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.href = data.href;
        this.thumb = data.thumb;
        this.childnumber = data.childnumber;
        this.action = data.action;
        this.params = data.params;
        this.type = data.type;
    }

    // Get title
    getTitle() {
        return this.title;
    }

    // Get description
    getDescription() {
        return this.description;
    }

    // Get href
    getHref() {
        return this.href;
    }

    // Get thumb
    getThumb() {
        return this.thumb;
    }

    // Get child number
    getChildnumber() {
        return this.childnumber;
    }

    // Get action
    getAction() {
        return this.action;
    }

    // Get params
    getParams() {
        return this.params;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Convert to JSON
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            href: this.href,
            thumb: this.thumb,
            childnumber: this.childnumber,
            action: this.action,
            params: this.params,
            type: this.type
        };
    }
}

// TOtherContent Model
class TOtherContent {
    constructor(data) {
        this.data = data;
    }

    // Get data
    getData() {
        return this.data;
    }

    // Get value by key
    getValue(key) {
        return this.data[key];
    }

    // Set value by key
    setValue(key, value) {
        this.data[key] = value;
    }

    // Convert to JSON
    toJSON() {
        return this.data;
    }
}

// UserMessage Model
class UserMessage extends Message {
    constructor(data) {
        super({
            type: ThreadType.User,
            data: data.data,
            threadId: data.threadId,
            isSelf: data.isSelf
        });
    }
}

// GroupMessage Model
class GroupMessage extends Message {
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
    Message,
    TMessage,
    TGroupMessage,
    TQuote,
    TMention,
    TAttachmentContent,
    TOtherContent,
    UserMessage,
    GroupMessage,
    ThreadType
};