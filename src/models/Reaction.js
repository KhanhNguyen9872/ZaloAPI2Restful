// Reaction Model - Cảm xúc tin nhắn
class Reaction {
    constructor(data) {
        this.data = data.data;
        this.threadId = data.threadId;
        this.isSelf = data.isSelf;
        this.isGroup = data.isGroup;
    }

    // Get reaction data
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

    // Get content
    getContent() {
        return this.data.content;
    }

    // Get timestamp
    getTs() {
        return this.data.ts;
    }

    // Get TTL
    getTtl() {
        return this.data.ttl;
    }

    // Get reaction icon
    getReactionIcon() {
        return this.data.content ? this.data.content.rIcon : null;
    }

    // Get reaction type
    getReactionType() {
        return this.data.content ? this.data.content.rType : null;
    }

    // Get source
    getSource() {
        return this.data.content ? this.data.content.source : null;
    }

    // Get reaction messages
    getReactionMessages() {
        return this.data.content ? this.data.content.rMsg : [];
    }

    // Check if has reaction messages
    hasReactionMessages() {
        return this.data.content && this.data.content.rMsg && this.data.content.rMsg.length > 0;
    }

    // Get reaction message count
    getReactionMessageCount() {
        return this.hasReactionMessages() ? this.data.content.rMsg.length : 0;
    }

    // Get first reaction message
    getFirstReactionMessage() {
        const messages = this.getReactionMessages();
        return messages.length > 0 ? messages[0] : null;
    }

    // Get last reaction message
    getLastReactionMessage() {
        const messages = this.getReactionMessages();
        return messages.length > 0 ? messages[messages.length - 1] : null;
    }

    // Get reaction message by index
    getReactionMessage(index) {
        const messages = this.getReactionMessages();
        return messages[index] || null;
    }

    // Check if is heart reaction
    isHeartReaction() {
        return this.getReactionIcon() === Reactions.HEART;
    }

    // Check if is like reaction
    isLikeReaction() {
        return this.getReactionIcon() === Reactions.LIKE;
    }

    // Check if is haha reaction
    isHahaReaction() {
        return this.getReactionIcon() === Reactions.HAHA;
    }

    // Check if is wow reaction
    isWowReaction() {
        return this.getReactionIcon() === Reactions.WOW;
    }

    // Check if is cry reaction
    isCryReaction() {
        return this.getReactionIcon() === Reactions.CRY;
    }

    // Check if is angry reaction
    isAngryReaction() {
        return this.getReactionIcon() === Reactions.ANGRY;
    }

    // Check if is kiss reaction
    isKissReaction() {
        return this.getReactionIcon() === Reactions.KISS;
    }

    // Check if is tears of joy reaction
    isTearsOfJoyReaction() {
        return this.getReactionIcon() === Reactions.TEARS_OF_JOY;
    }

    // Check if is love reaction
    isLoveReaction() {
        return this.getReactionIcon() === Reactions.LOVE;
    }

    // Check if is dislike reaction
    isDislikeReaction() {
        return this.getReactionIcon() === Reactions.DISLIKE;
    }

    // Get reaction name
    getReactionName() {
        const icon = this.getReactionIcon();
        if (!icon) return 'Unknown';
        
        const reactionNames = {
            [Reactions.HEART]: 'Heart',
            [Reactions.LIKE]: 'Like',
            [Reactions.HAHA]: 'Haha',
            [Reactions.WOW]: 'Wow',
            [Reactions.CRY]: 'Cry',
            [Reactions.ANGRY]: 'Angry',
            [Reactions.KISS]: 'Kiss',
            [Reactions.TEARS_OF_JOY]: 'Tears of Joy',
            [Reactions.LOVE]: 'Love',
            [Reactions.DISLIKE]: 'Dislike',
            [Reactions.ROSE]: 'Rose',
            [Reactions.BROKEN_HEART]: 'Broken Heart',
            [Reactions.CONFUSED]: 'Confused',
            [Reactions.WINK]: 'Wink',
            [Reactions.SUN]: 'Sun',
            [Reactions.BIRTHDAY]: 'Birthday',
            [Reactions.BOMB]: 'Bomb',
            [Reactions.OK]: 'OK',
            [Reactions.PEACE]: 'Peace',
            [Reactions.THANKS]: 'Thanks',
            [Reactions.PUNCH]: 'Punch',
            [Reactions.SHARE]: 'Share',
            [Reactions.PRAY]: 'Pray',
            [Reactions.NO]: 'No',
            [Reactions.BAD]: 'Bad',
            [Reactions.LOVE_YOU]: 'Love You',
            [Reactions.SAD]: 'Sad',
            [Reactions.VERY_SAD]: 'Very Sad',
            [Reactions.COOL]: 'Cool',
            [Reactions.NERD]: 'Nerd',
            [Reactions.BIG_SMILE]: 'Big Smile',
            [Reactions.SUNGLASSES]: 'Sunglasses',
            [Reactions.NEUTRAL]: 'Neutral',
            [Reactions.SAD_FACE]: 'Sad Face',
            [Reactions.BYE]: 'Bye',
            [Reactions.SLEEPY]: 'Sleepy',
            [Reactions.WIPE]: 'Wipe',
            [Reactions.DIG]: 'Dig',
            [Reactions.ANGUISH]: 'Anguish',
            [Reactions.HANDCLAP]: 'Handclap',
            [Reactions.ANGRY_FACE]: 'Angry Face',
            [Reactions.F_CHAIR]: 'F Chair',
            [Reactions.L_CHAIR]: 'L Chair',
            [Reactions.R_CHAIR]: 'R Chair',
            [Reactions.SILENT]: 'Silent',
            [Reactions.SURPRISE]: 'Surprise',
            [Reactions.EMBARRASSED]: 'Embarrassed',
            [Reactions.AFRAID]: 'Afraid',
            [Reactions.SAD2]: 'Sad 2',
            [Reactions.BIG_LAUGH]: 'Big Laugh',
            [Reactions.RICH]: 'Rich',
            [Reactions.BEER]: 'Beer',
            [Reactions.NONE]: 'None'
        };
        
        return reactionNames[icon] || 'Unknown';
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
        return new Reaction(data);
    }
}

// TReaction Model
class TReaction {
    constructor(data) {
        this.actionId = data.actionId;
        this.msgId = data.msgId;
        this.cliMsgId = data.cliMsgId;
        this.msgType = data.msgType;
        this.uidFrom = data.uidFrom;
        this.idTo = data.idTo;
        this.dName = data.dName;
        this.content = data.content;
        this.ts = data.ts;
        this.ttl = data.ttl;
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

    // Get content
    getContent() {
        return this.content;
    }

    // Get timestamp
    getTs() {
        return this.ts;
    }

    // Get TTL
    getTtl() {
        return this.ttl;
    }

    // Get reaction icon
    getReactionIcon() {
        return this.content ? this.content.rIcon : null;
    }

    // Get reaction type
    getReactionType() {
        return this.content ? this.content.rType : null;
    }

    // Get source
    getSource() {
        return this.content ? this.content.source : null;
    }

    // Get reaction messages
    getReactionMessages() {
        return this.content ? this.content.rMsg : [];
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
            content: this.content,
            ts: this.ts,
            ttl: this.ttl
        };
    }
}

// Reactions enum
const Reactions = {
    HEART: "/-heart",
    LIKE: "/-strong",
    HAHA: ":>",
    WOW: ":o",
    CRY: ":-(",
    ANGRY: ":-h",
    KISS: ":-*",
    TEARS_OF_JOY: ":')",
    SHIT: "/-shit",
    ROSE: "/-rose",
    BROKEN_HEART: "/-break",
    DISLIKE: "/-weak",
    LOVE: ";xx",
    CONFUSED: ";-/",
    WINK: ";-)",
    FADE: "/-fade",
    SUN: "/-li",
    BIRTHDAY: "/-bd",
    BOMB: "/-bome",
    OK: "/-ok",
    PEACE: "/-v",
    THANKS: "/-thanks",
    PUNCH: "/-punch",
    SHARE: "/-share",
    PRAY: "_()_",
    NO: "/-no",
    BAD: "/-bad",
    LOVE_YOU: "/-loveu",
    SAD: "--b",
    VERY_SAD: ":((",
    COOL: "x-)",
    NERD: "8-)",
    BIG_SMILE: ";-d",
    SUNGLASSES: "b-)",
    NEUTRAL: ":--|",
    SAD_FACE: "p-(",
    BYE: ":-bye",
    SLEEPY: "|-)",
    WIPE: ":wipe",
    DIG: ":-dig",
    ANGUISH: "&-(",
    HANDCLAP: ":handclap",
    ANGRY_FACE: ">-|",
    F_CHAIR: ":-f",
    L_CHAIR: ":-l",
    R_CHAIR: ":-r",
    SILENT: ";-x",
    SURPRISE: ":-o",
    EMBARRASSED: ";-s",
    AFRAID: ";-a",
    SAD2: ":-<",
    BIG_LAUGH: ":))",
    RICH: "$-)",
    BEER: "/-beer",
    NONE: ""
};

module.exports = {
    Reaction,
    TReaction,
    Reactions
};
