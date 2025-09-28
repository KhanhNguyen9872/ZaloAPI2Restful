// GroupEvent Model - Các sự kiện nhóm
class GroupEvent {
    constructor(data) {
        this.type = data.type;
        this.data = data.data;
        this.act = data.act;
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

    // Get action
    getAct() {
        return this.act;
    }

    // Get thread ID
    getThreadId() {
        return this.threadId;
    }

    // Check if self
    isSelf() {
        return this.isSelf;
    }

    // Check if join request event
    isJoinRequestEvent() {
        return this.type === GroupEventType.JOIN_REQUEST;
    }

    // Check if join event
    isJoinEvent() {
        return this.type === GroupEventType.JOIN;
    }

    // Check if leave event
    isLeaveEvent() {
        return this.type === GroupEventType.LEAVE;
    }

    // Check if remove member event
    isRemoveMemberEvent() {
        return this.type === GroupEventType.REMOVE_MEMBER;
    }

    // Check if block member event
    isBlockMemberEvent() {
        return this.type === GroupEventType.BLOCK_MEMBER;
    }

    // Check if update setting event
    isUpdateSettingEvent() {
        return this.type === GroupEventType.UPDATE_SETTING;
    }

    // Check if update event
    isUpdateEvent() {
        return this.type === GroupEventType.UPDATE;
    }

    // Check if new link event
    isNewLinkEvent() {
        return this.type === GroupEventType.NEW_LINK;
    }

    // Check if add admin event
    isAddAdminEvent() {
        return this.type === GroupEventType.ADD_ADMIN;
    }

    // Check if remove admin event
    isRemoveAdminEvent() {
        return this.type === GroupEventType.REMOVE_ADMIN;
    }

    // Check if pin topic event
    isPinTopicEvent() {
        return this.type === GroupEventType.NEW_PIN_TOPIC || 
               this.type === GroupEventType.UPDATE_PIN_TOPIC ||
               this.type === GroupEventType.UNPIN_TOPIC;
    }

    // Check if board event
    isBoardEvent() {
        return this.type === GroupEventType.UPDATE_BOARD || 
               this.type === GroupEventType.REMOVE_BOARD;
    }

    // Check if remind event
    isRemindEvent() {
        return this.type === GroupEventType.ACCEPT_REMIND || 
               this.type === GroupEventType.REJECT_REMIND ||
               this.type === GroupEventType.REMIND_TOPIC;
    }

    // Check if update avatar event
    isUpdateAvatarEvent() {
        return this.type === GroupEventType.UPDATE_AVATAR;
    }

    // Convert to JSON
    toJSON() {
        return {
            type: this.type,
            data: this.data,
            act: this.act,
            threadId: this.threadId,
            isSelf: this.isSelf
        };
    }

    // Create from data
    static fromData(data) {
        return new GroupEvent(data);
    }
}

// TGroupEventBase Model
class TGroupEventBase {
    constructor(data) {
        this.subType = data.subType;
        this.groupId = data.groupId;
        this.creatorId = data.creatorId;
        this.groupName = data.groupName;
        this.sourceId = data.sourceId;
        this.updateMembers = data.updateMembers;
        this.groupSetting = data.groupSetting;
        this.groupTopic = data.groupTopic;
        this.info = data.info;
        this.extraData = data.extraData;
        this.time = data.time;
        this.avt = data.avt;
        this.fullAvt = data.fullAvt;
        this.isAdd = data.isAdd;
        this.hideGroupInfo = data.hideGroupInfo;
        this.version = data.version;
        this.groupType = data.groupType;
        this.clientId = data.clientId;
        this.errorMap = data.errorMap;
        this.e2ee = data.e2ee;
    }

    // Get sub type
    getSubType() {
        return this.subType;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get group name
    getGroupName() {
        return this.groupName;
    }

    // Get source ID
    getSourceId() {
        return this.sourceId;
    }

    // Get update members
    getUpdateMembers() {
        return this.updateMembers;
    }

    // Get group setting
    getGroupSetting() {
        return this.groupSetting;
    }

    // Get group topic
    getGroupTopic() {
        return this.groupTopic;
    }

    // Get info
    getInfo() {
        return this.info;
    }

    // Get extra data
    getExtraData() {
        return this.extraData;
    }

    // Get time
    getTime() {
        return this.time;
    }

    // Get avatar
    getAvt() {
        return this.avt;
    }

    // Get full avatar
    getFullAvt() {
        return this.fullAvt;
    }

    // Get is add
    getIsAdd() {
        return this.isAdd;
    }

    // Get hide group info
    getHideGroupInfo() {
        return this.hideGroupInfo;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get group type
    getGroupType() {
        return this.groupType;
    }

    // Get client ID
    getClientId() {
        return this.clientId;
    }

    // Get error map
    getErrorMap() {
        return this.errorMap;
    }

    // Get E2EE
    getE2ee() {
        return this.e2ee;
    }

    // Convert to JSON
    toJSON() {
        return {
            subType: this.subType,
            groupId: this.groupId,
            creatorId: this.creatorId,
            groupName: this.groupName,
            sourceId: this.sourceId,
            updateMembers: this.updateMembers,
            groupSetting: this.groupSetting,
            groupTopic: this.groupTopic,
            info: this.info,
            extraData: this.extraData,
            time: this.time,
            avt: this.avt,
            fullAvt: this.fullAvt,
            isAdd: this.isAdd,
            hideGroupInfo: this.hideGroupInfo,
            version: this.version,
            groupType: this.groupType,
            clientId: this.clientId,
            errorMap: this.errorMap,
            e2ee: this.e2ee
        };
    }
}

// TGroupEventJoinRequest Model
class TGroupEventJoinRequest {
    constructor(data) {
        this.uids = data.uids;
        this.totalPending = data.totalPending;
        this.groupId = data.groupId;
        this.time = data.time;
    }

    // Get UIDs
    getUids() {
        return this.uids;
    }

    // Get total pending
    getTotalPending() {
        return this.totalPending;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get time
    getTime() {
        return this.time;
    }

    // Convert to JSON
    toJSON() {
        return {
            uids: this.uids,
            totalPending: this.totalPending,
            groupId: this.groupId,
            time: this.time
        };
    }
}

// TGroupEventPinTopic Model
class TGroupEventPinTopic {
    constructor(data) {
        this.oldBoardVersion = data.oldBoardVersion;
        this.boardVersion = data.boardVersion;
        this.topic = data.topic;
        this.actorId = data.actorId;
        this.groupId = data.groupId;
    }

    // Get old board version
    getOldBoardVersion() {
        return this.oldBoardVersion;
    }

    // Get board version
    getBoardVersion() {
        return this.boardVersion;
    }

    // Get topic
    getTopic() {
        return this.topic;
    }

    // Get actor ID
    getActorId() {
        return this.actorId;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Convert to JSON
    toJSON() {
        return {
            oldBoardVersion: this.oldBoardVersion,
            boardVersion: this.boardVersion,
            topic: this.topic,
            actorId: this.actorId,
            groupId: this.groupId
        };
    }
}

// TGroupEventReorderPinTopic Model
class TGroupEventReorderPinTopic {
    constructor(data) {
        this.oldBoardVersion = data.oldBoardVersion;
        this.actorId = data.actorId;
        this.topics = data.topics;
        this.groupId = data.groupId;
        this.boardVersion = data.boardVersion;
        this.topic = data.topic;
    }

    // Get old board version
    getOldBoardVersion() {
        return this.oldBoardVersion;
    }

    // Get actor ID
    getActorId() {
        return this.actorId;
    }

    // Get topics
    getTopics() {
        return this.topics;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get board version
    getBoardVersion() {
        return this.boardVersion;
    }

    // Get topic
    getTopic() {
        return this.topic;
    }

    // Convert to JSON
    toJSON() {
        return {
            oldBoardVersion: this.oldBoardVersion,
            actorId: this.actorId,
            topics: this.topics,
            groupId: this.groupId,
            boardVersion: this.boardVersion,
            topic: this.topic
        };
    }
}

// TGroupEventBoard Model
class TGroupEventBoard {
    constructor(data) {
        this.sourceId = data.sourceId;
        this.groupName = data.groupName;
        this.groupTopic = data.groupTopic;
        this.groupId = data.groupId;
        this.creatorId = data.creatorId;
        this.subType = data.subType;
        this.updateMembers = data.updateMembers;
        this.groupSetting = data.groupSetting;
        this.info = data.info;
        this.extraData = data.extraData;
        this.time = data.time;
        this.avt = data.avt;
        this.fullAvt = data.fullAvt;
        this.isAdd = data.isAdd;
        this.hideGroupInfo = data.hideGroupInfo;
        this.version = data.version;
        this.groupType = data.groupType;
    }

    // Get source ID
    getSourceId() {
        return this.sourceId;
    }

    // Get group name
    getGroupName() {
        return this.groupName;
    }

    // Get group topic
    getGroupTopic() {
        return this.groupTopic;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get sub type
    getSubType() {
        return this.subType;
    }

    // Get update members
    getUpdateMembers() {
        return this.updateMembers;
    }

    // Get group setting
    getGroupSetting() {
        return this.groupSetting;
    }

    // Get info
    getInfo() {
        return this.info;
    }

    // Get extra data
    getExtraData() {
        return this.extraData;
    }

    // Get time
    getTime() {
        return this.time;
    }

    // Get avatar
    getAvt() {
        return this.avt;
    }

    // Get full avatar
    getFullAvt() {
        return this.fullAvt;
    }

    // Get is add
    getIsAdd() {
        return this.isAdd;
    }

    // Get hide group info
    getHideGroupInfo() {
        return this.hideGroupInfo;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get group type
    getGroupType() {
        return this.groupType;
    }

    // Convert to JSON
    toJSON() {
        return {
            sourceId: this.sourceId,
            groupName: this.groupName,
            groupTopic: this.groupTopic,
            groupId: this.groupId,
            creatorId: this.creatorId,
            subType: this.subType,
            updateMembers: this.updateMembers,
            groupSetting: this.groupSetting,
            info: this.info,
            extraData: this.extraData,
            time: this.time,
            avt: this.avt,
            fullAvt: this.fullAvt,
            isAdd: this.isAdd,
            hideGroupInfo: this.hideGroupInfo,
            version: this.version,
            groupType: this.groupType
        };
    }
}

// TGroupEventRemindRespond Model
class TGroupEventRemindRespond {
    constructor(data) {
        this.topicId = data.topicId;
        this.updateMembers = data.updateMembers;
        this.groupId = data.groupId;
        this.time = data.time;
    }

    // Get topic ID
    getTopicId() {
        return this.topicId;
    }

    // Get update members
    getUpdateMembers() {
        return this.updateMembers;
    }

    // Get group ID
    getGroupId() {
        return this.groupId;
    }

    // Get time
    getTime() {
        return this.time;
    }

    // Convert to JSON
    toJSON() {
        return {
            topicId: this.topicId,
            updateMembers: this.updateMembers,
            groupId: this.groupId,
            time: this.time
        };
    }
}

// TGroupEventRemindTopic Model
class TGroupEventRemindTopic {
    constructor(data) {
        this.msg = data.msg;
        this.editorId = data.editorId;
        this.color = data.color;
        this.emoji = data.emoji;
        this.creatorId = data.creatorId;
        this.editTime = data.editTime;
        this.type = data.type;
        this.duration = data.duration;
        this.group_id = data.group_id;
        this.createTime = data.createTime;
        this.repeat = data.repeat;
        this.startTime = data.startTime;
        this.time = data.time;
        this.remindType = data.remindType;
    }

    // Get message
    getMsg() {
        return this.msg;
    }

    // Get editor ID
    getEditorId() {
        return this.editorId;
    }

    // Get color
    getColor() {
        return this.color;
    }

    // Get emoji
    getEmoji() {
        return this.emoji;
    }

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get edit time
    getEditTime() {
        return this.editTime;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get duration
    getDuration() {
        return this.duration;
    }

    // Get group ID
    getGroupId() {
        return this.group_id;
    }

    // Get create time
    getCreateTime() {
        return this.createTime;
    }

    // Get repeat
    getRepeat() {
        return this.repeat;
    }

    // Get start time
    getStartTime() {
        return this.startTime;
    }

    // Get time
    getTime() {
        return this.time;
    }

    // Get remind type
    getRemindType() {
        return this.remindType;
    }

    // Convert to JSON
    toJSON() {
        return {
            msg: this.msg,
            editorId: this.editorId,
            color: this.color,
            emoji: this.emoji,
            creatorId: this.creatorId,
            editTime: this.editTime,
            type: this.type,
            duration: this.duration,
            group_id: this.group_id,
            createTime: this.createTime,
            repeat: this.repeat,
            startTime: this.startTime,
            time: this.time,
            remindType: this.remindType
        };
    }
}

// GroupEventUpdateMember Model
class GroupEventUpdateMember {
    constructor(data) {
        this.id = data.id;
        this.dName = data.dName;
        this.avatar = data.avatar;
        this.type = data.type;
        this.avatar_25 = data.avatar_25;
    }

    // Get member ID
    getId() {
        return this.id;
    }

    // Get display name
    getDName() {
        return this.dName;
    }

    // Get avatar
    getAvatar() {
        return this.avatar;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get avatar 25
    getAvatar25() {
        return this.avatar_25;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            dName: this.dName,
            avatar: this.avatar,
            type: this.type,
            avatar_25: this.avatar_25
        };
    }
}

// GroupEventGroupInfo Model
class GroupEventGroupInfo {
    constructor(data) {
        this.group_link = data.group_link;
        this.link_expired_time = data.link_expired_time;
        this.extra = data.extra;
    }

    // Get group link
    getGroupLink() {
        return this.group_link;
    }

    // Get link expired time
    getLinkExpiredTime() {
        return this.link_expired_time;
    }

    // Get extra info
    getExtra() {
        return this.extra;
    }

    // Convert to JSON
    toJSON() {
        return {
            group_link: this.group_link,
            link_expired_time: this.link_expired_time,
            extra: this.extra
        };
    }
}

// GroupEventExtraData Model
class GroupEventExtraData {
    constructor(data) {
        this.featureId = data.featureId;
        this.field = data.field;
        this.extra = data.extra;
    }

    // Get feature ID
    getFeatureId() {
        return this.featureId;
    }

    // Get field
    getField() {
        return this.field;
    }

    // Get extra data
    getExtra() {
        return this.extra;
    }

    // Convert to JSON
    toJSON() {
        return {
            featureId: this.featureId,
            field: this.field,
            extra: this.extra
        };
    }
}

// GroupEventType enum
const GroupEventType = {
    JOIN_REQUEST: "join_request",
    JOIN: "join",
    LEAVE: "leave",
    REMOVE_MEMBER: "remove_member",
    BLOCK_MEMBER: "block_member",
    UPDATE_SETTING: "update_setting",
    UPDATE: "update",
    NEW_LINK: "new_link",
    ADD_ADMIN: "add_admin",
    REMOVE_ADMIN: "remove_admin",
    NEW_PIN_TOPIC: "new_pin_topic",
    UPDATE_PIN_TOPIC: "update_pin_topic",
    REORDER_PIN_TOPIC: "reorder_pin_topic",
    UPDATE_BOARD: "update_board",
    REMOVE_BOARD: "remove_board",
    UPDATE_TOPIC: "update_topic",
    UNPIN_TOPIC: "unpin_topic",
    REMOVE_TOPIC: "remove_topic",
    ACCEPT_REMIND: "accept_remind",
    REJECT_REMIND: "reject_remind",
    REMIND_TOPIC: "remind_topic",
    UPDATE_AVATAR: "update_avatar",
    UNKNOWN: "unknown"
};

module.exports = {
    GroupEvent,
    TGroupEventBase,
    TGroupEventJoinRequest,
    TGroupEventPinTopic,
    TGroupEventReorderPinTopic,
    TGroupEventBoard,
    TGroupEventRemindRespond,
    TGroupEventRemindTopic,
    GroupEventUpdateMember,
    GroupEventGroupInfo,
    GroupEventExtraData,
    GroupEventType
};
