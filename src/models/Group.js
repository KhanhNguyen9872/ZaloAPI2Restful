// Group Model - Nhóm
class Group {
    constructor(data) {
        this.groupId = data.groupId;
        this.name = data.name;
        this.desc = data.desc;
        this.type = data.type;
        this.creatorId = data.creatorId;
        this.version = data.version;
        this.avt = data.avt;
        this.fullAvt = data.fullAvt;
        this.memberIds = data.memberIds;
        this.adminIds = data.adminIds;
        this.currentMems = data.currentMems;
        this.updateMems = data.updateMems;
        this.admins = data.admins;
        this.hasMoreMember = data.hasMoreMember;
        this.subType = data.subType;
        this.totalMember = data.totalMember;
        this.maxMember = data.maxMember;
        this.setting = data.setting;
        this.createdTime = data.createdTime;
        this.visibility = data.visibility;
        this.globalId = data.globalId;
        this.e2ee = data.e2ee;
        this.extraInfo = data.extraInfo;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get group name
    getName() {
        return this.name;
    }

    // Get description
    getDesc() {
        return this.desc;
    }

    // Get group type
    getType() {
        return this.type;
    }

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get avatar
    getAvt() {
        return this.avt;
    }

    // Get full avatar
    getFullAvt() {
        return this.fullAvt;
    }

    // Get member IDs
    getMemberIds() {
        return this.memberIds;
    }

    // Get admin IDs
    getAdminIds() {
        return this.adminIds;
    }

    // Get current members
    getCurrentMems() {
        return this.currentMems;
    }

    // Get total member count
    getTotalMember() {
        return this.totalMember;
    }

    // Get max member count
    getMaxMember() {
        return this.maxMember;
    }

    // Get group setting
    getSetting() {
        return this.setting;
    }

    // Get created time
    getCreatedTime() {
        return this.createdTime;
    }

    // Get visibility
    getVisibility() {
        return this.visibility;
    }

    // Get global ID
    getGlobalId() {
        return this.globalId;
    }

    // Get E2EE status
    getE2ee() {
        return this.e2ee;
    }

    // Get extra info
    getExtraInfo() {
        return this.extraInfo;
    }

    // Check if group
    isGroup() {
        return this.type === GroupType.Group;
    }

    // Check if community
    isCommunity() {
        return this.type === GroupType.Community;
    }

    // Check if has more members
    hasMoreMember() {
        return this.hasMoreMember === 1;
    }

    // Check if E2EE enabled
    isE2eeEnabled() {
        return this.e2ee === 1;
    }

    // Convert to JSON
    toJSON() {
        return {
            groupId: this.groupId,
            name: this.name,
            desc: this.desc,
            type: this.type,
            creatorId: this.creatorId,
            version: this.version,
            avt: this.avt,
            fullAvt: this.fullAvt,
            memberIds: this.memberIds,
            adminIds: this.adminIds,
            currentMems: this.currentMems,
            updateMems: this.updateMems,
            admins: this.admins,
            hasMoreMember: this.hasMoreMember,
            subType: this.subType,
            totalMember: this.totalMember,
            maxMember: this.maxMember,
            setting: this.setting,
            createdTime: this.createdTime,
            visibility: this.visibility,
            globalId: this.globalId,
            e2ee: this.e2ee,
            extraInfo: this.extraInfo
        };
    }

    // Create from data
    static fromData(data) {
        return new Group(data);
    }
}

// GroupSetting Model
class GroupSetting {
    constructor(data) {
        this.blockName = data.blockName;
        this.signAdminMsg = data.signAdminMsg;
        this.addMemberOnly = data.addMemberOnly;
        this.setTopicOnly = data.setTopicOnly;
        this.enableMsgHistory = data.enableMsgHistory;
        this.joinAppr = data.joinAppr;
        this.lockCreatePost = data.lockCreatePost;
        this.lockCreatePoll = data.lockCreatePoll;
        this.lockSendMsg = data.lockSendMsg;
        this.lockViewMember = data.lockViewMember;
        this.bannFeature = data.bannFeature;
        this.dirtyMedia = data.dirtyMedia;
        this.banDuration = data.banDuration;
    }

    // Get block name setting
    getBlockName() {
        return this.blockName;
    }

    // Get sign admin message setting
    getSignAdminMsg() {
        return this.signAdminMsg;
    }

    // Get add member only setting
    getAddMemberOnly() {
        return this.addMemberOnly;
    }

    // Get set topic only setting
    getSetTopicOnly() {
        return this.setTopicOnly;
    }

    // Get enable message history setting
    getEnableMsgHistory() {
        return this.enableMsgHistory;
    }

    // Get join approval setting
    getJoinAppr() {
        return this.joinAppr;
    }

    // Get lock create post setting
    getLockCreatePost() {
        return this.lockCreatePost;
    }

    // Get lock create poll setting
    getLockCreatePoll() {
        return this.lockCreatePoll;
    }

    // Get lock send message setting
    getLockSendMsg() {
        return this.lockSendMsg;
    }

    // Get lock view member setting
    getLockViewMember() {
        return this.lockViewMember;
    }

    // Get ban feature setting
    getBannFeature() {
        return this.bannFeature;
    }

    // Get dirty media setting
    getDirtyMedia() {
        return this.dirtyMedia;
    }

    // Get ban duration
    getBanDuration() {
        return this.banDuration;
    }

    // Convert to JSON
    toJSON() {
        return {
            blockName: this.blockName,
            signAdminMsg: this.signAdminMsg,
            addMemberOnly: this.addMemberOnly,
            setTopicOnly: this.setTopicOnly,
            enableMsgHistory: this.enableMsgHistory,
            joinAppr: this.joinAppr,
            lockCreatePost: this.lockCreatePost,
            lockCreatePoll: this.lockCreatePoll,
            lockSendMsg: this.lockSendMsg,
            lockViewMember: this.lockViewMember,
            bannFeature: this.bannFeature,
            dirtyMedia: this.dirtyMedia,
            banDuration: this.banDuration
        };
    }
}

// GroupCurrentMem Model
class GroupCurrentMem {
    constructor(data) {
        this.id = data.id;
        this.dName = data.dName;
        this.zaloName = data.zaloName;
        this.avatar = data.avatar;
        this.avatar_25 = data.avatar_25;
        this.accountStatus = data.accountStatus;
        this.type = data.type;
    }

    // Get member ID
    getId() {
        return this.id;
    }

    // Get display name
    getDName() {
        return this.dName;
    }

    // Get Zalo name
    getZaloName() {
        return this.zaloName;
    }

    // Get avatar
    getAvatar() {
        return this.avatar;
    }

    // Get avatar 25
    getAvatar25() {
        return this.avatar_25;
    }

    // Get account status
    getAccountStatus() {
        return this.accountStatus;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            dName: this.dName,
            zaloName: this.zaloName,
            avatar: this.avatar,
            avatar_25: this.avatar_25,
            accountStatus: this.accountStatus,
            type: this.type
        };
    }
}

// GroupTopic Model
class GroupTopic {
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

    // Get topic type
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

    // Check if note
    isNote() {
        return this.type === GroupTopicType.Note;
    }

    // Check if message
    isMessage() {
        return this.type === GroupTopicType.Message;
    }

    // Check if poll
    isPoll() {
        return this.type === GroupTopicType.Poll;
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

// GroupTopicType enum
const GroupTopicType = {
    Note: 0,
    Message: 2,
    Poll: 3
};

// GroupType enum
const GroupType = {
    Group: 1,
    Community: 2
};

module.exports = {
    Group,
    GroupSetting,
    GroupCurrentMem,
    GroupTopic,
    GroupTopicType,
    GroupType
};