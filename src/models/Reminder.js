// Reminder Model - Nhắc hẹn
class Reminder {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.color = data.color;
        this.emoji = data.emoji;
        this.startTime = data.startTime;
        this.duration = data.duration;
        this.params = data.params;
        this.creatorId = data.creatorId;
        this.editorId = data.editorId;
        this.createTime = data.createTime;
        this.editTime = data.editTime;
        this.repeat = data.repeat;
    }

    // Get ID
    getId() {
        return this.id;
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

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get editor ID
    getEditorId() {
        return this.editorId;
    }

    // Get create time
    getCreateTime() {
        return this.createTime;
    }

    // Get edit time
    getEditTime() {
        return this.editTime;
    }

    // Get repeat
    getRepeat() {
        return this.repeat;
    }

    // Get title
    getTitle() {
        return this.params ? this.params.title : null;
    }

    // Check if has title
    hasTitle() {
        return this.params && this.params.title;
    }

    // Check if set title
    isSetTitle() {
        return this.params && this.params.setTitle;
    }

    // Get end time
    getEndTime() {
        return this.startTime + this.duration;
    }

    // Check if is active
    isActive() {
        const now = Date.now();
        return now >= this.startTime && now <= this.getEndTime();
    }

    // Check if is expired
    isExpired() {
        const now = Date.now();
        return now > this.getEndTime();
    }

    // Check if is upcoming
    isUpcoming() {
        const now = Date.now();
        return now < this.startTime;
    }

    // Check if has repeat
    hasRepeat() {
        return this.repeat !== ReminderRepeatMode.None;
    }

    // Check if is daily repeat
    isDailyRepeat() {
        return this.repeat === ReminderRepeatMode.Daily;
    }

    // Check if is weekly repeat
    isWeeklyRepeat() {
        return this.repeat === ReminderRepeatMode.Weekly;
    }

    // Check if is monthly repeat
    isMonthlyRepeat() {
        return this.repeat === ReminderRepeatMode.Monthly;
    }

    // Get repeat name
    getRepeatName() {
        const repeatNames = {
            [ReminderRepeatMode.None]: 'None',
            [ReminderRepeatMode.Daily]: 'Daily',
            [ReminderRepeatMode.Weekly]: 'Weekly',
            [ReminderRepeatMode.Monthly]: 'Monthly'
        };
        return repeatNames[this.repeat] || 'Unknown';
    }

    // Get time remaining
    getTimeRemaining() {
        const now = Date.now();
        if (this.isExpired()) return 0;
        if (this.isUpcoming()) return this.startTime - now;
        return this.getEndTime() - now;
    }

    // Get time elapsed
    getTimeElapsed() {
        const now = Date.now();
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return this.duration;
        return now - this.startTime;
    }

    // Get progress percentage
    getProgressPercentage() {
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return 100;
        return (this.getTimeElapsed() / this.duration) * 100;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            color: this.color,
            emoji: this.emoji,
            startTime: this.startTime,
            duration: this.duration,
            params: this.params,
            creatorId: this.creatorId,
            editorId: this.editorId,
            createTime: this.createTime,
            editTime: this.editTime,
            repeat: this.repeat
        };
    }

    // Create from data
    static fromData(data) {
        return new Reminder(data);
    }
}

// ReminderUser Model
class ReminderUser {
    constructor(data) {
        this.creatorUid = data.creatorUid;
        this.toUid = data.toUid;
        this.emoji = data.emoji;
        this.color = data.color;
        this.reminderId = data.reminderId;
        this.createTime = data.createTime;
        this.repeat = data.repeat;
        this.startTime = data.startTime;
        this.editTime = data.editTime;
        this.endTime = data.endTime;
        this.params = data.params;
        this.type = data.type;
    }

    // Get creator UID
    getCreatorUid() {
        return this.creatorUid;
    }

    // Get to UID
    getToUid() {
        return this.toUid;
    }

    // Get emoji
    getEmoji() {
        return this.emoji;
    }

    // Get color
    getColor() {
        return this.color;
    }

    // Get reminder ID
    getReminderId() {
        return this.reminderId;
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

    // Get edit time
    getEditTime() {
        return this.editTime;
    }

    // Get end time
    getEndTime() {
        return this.endTime;
    }

    // Get params
    getParams() {
        return this.params;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get title
    getTitle() {
        return this.params ? this.params.title : null;
    }

    // Check if has title
    hasTitle() {
        return this.params && this.params.title;
    }

    // Check if set title
    isSetTitle() {
        return this.params && this.params.setTitle;
    }

    // Get duration
    getDuration() {
        return this.endTime - this.startTime;
    }

    // Check if is active
    isActive() {
        const now = Date.now();
        return now >= this.startTime && now <= this.endTime;
    }

    // Check if is expired
    isExpired() {
        const now = Date.now();
        return now > this.endTime;
    }

    // Check if is upcoming
    isUpcoming() {
        const now = Date.now();
        return now < this.startTime;
    }

    // Check if has repeat
    hasRepeat() {
        return this.repeat !== ReminderRepeatMode.None;
    }

    // Check if is daily repeat
    isDailyRepeat() {
        return this.repeat === ReminderRepeatMode.Daily;
    }

    // Check if is weekly repeat
    isWeeklyRepeat() {
        return this.repeat === ReminderRepeatMode.Weekly;
    }

    // Check if is monthly repeat
    isMonthlyRepeat() {
        return this.repeat === ReminderRepeatMode.Monthly;
    }

    // Get repeat name
    getRepeatName() {
        const repeatNames = {
            [ReminderRepeatMode.None]: 'None',
            [ReminderRepeatMode.Daily]: 'Daily',
            [ReminderRepeatMode.Weekly]: 'Weekly',
            [ReminderRepeatMode.Monthly]: 'Monthly'
        };
        return repeatNames[this.repeat] || 'Unknown';
    }

    // Get time remaining
    getTimeRemaining() {
        const now = Date.now();
        if (this.isExpired()) return 0;
        if (this.isUpcoming()) return this.startTime - now;
        return this.endTime - now;
    }

    // Get time elapsed
    getTimeElapsed() {
        const now = Date.now();
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return this.getDuration();
        return now - this.startTime;
    }

    // Get progress percentage
    getProgressPercentage() {
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return 100;
        return (this.getTimeElapsed() / this.getDuration()) * 100;
    }

    // Convert to JSON
    toJSON() {
        return {
            creatorUid: this.creatorUid,
            toUid: this.toUid,
            emoji: this.emoji,
            color: this.color,
            reminderId: this.reminderId,
            createTime: this.createTime,
            repeat: this.repeat,
            startTime: this.startTime,
            editTime: this.editTime,
            endTime: this.endTime,
            params: this.params,
            type: this.type
        };
    }
}

// ReminderGroup Model
class ReminderGroup {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.color = data.color;
        this.emoji = data.emoji;
        this.startTime = data.startTime;
        this.duration = data.duration;
        this.params = data.params;
        this.creatorId = data.creatorId;
        this.editorId = data.editorId;
        this.createTime = data.createTime;
        this.editTime = data.editTime;
        this.repeat = data.repeat;
    }

    // Get ID
    getId() {
        return this.id;
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

    // Get creator ID
    getCreatorId() {
        return this.creatorId;
    }

    // Get editor ID
    getEditorId() {
        return this.editorId;
    }

    // Get create time
    getCreateTime() {
        return this.createTime;
    }

    // Get edit time
    getEditTime() {
        return this.editTime;
    }

    // Get repeat
    getRepeat() {
        return this.repeat;
    }

    // Get title
    getTitle() {
        return this.params ? this.params.title : null;
    }

    // Check if has title
    hasTitle() {
        return this.params && this.params.title;
    }

    // Check if set title
    isSetTitle() {
        return this.params && this.params.setTitle;
    }

    // Get end time
    getEndTime() {
        return this.startTime + this.duration;
    }

    // Check if is active
    isActive() {
        const now = Date.now();
        return now >= this.startTime && now <= this.getEndTime();
    }

    // Check if is expired
    isExpired() {
        const now = Date.now();
        return now > this.getEndTime();
    }

    // Check if is upcoming
    isUpcoming() {
        const now = Date.now();
        return now < this.startTime;
    }

    // Check if has repeat
    hasRepeat() {
        return this.repeat !== ReminderRepeatMode.None;
    }

    // Check if is daily repeat
    isDailyRepeat() {
        return this.repeat === ReminderRepeatMode.Daily;
    }

    // Check if is weekly repeat
    isWeeklyRepeat() {
        return this.repeat === ReminderRepeatMode.Weekly;
    }

    // Check if is monthly repeat
    isMonthlyRepeat() {
        return this.repeat === ReminderRepeatMode.Monthly;
    }

    // Get repeat name
    getRepeatName() {
        const repeatNames = {
            [ReminderRepeatMode.None]: 'None',
            [ReminderRepeatMode.Daily]: 'Daily',
            [ReminderRepeatMode.Weekly]: 'Weekly',
            [ReminderRepeatMode.Monthly]: 'Monthly'
        };
        return repeatNames[this.repeat] || 'Unknown';
    }

    // Get time remaining
    getTimeRemaining() {
        const now = Date.now();
        if (this.isExpired()) return 0;
        if (this.isUpcoming()) return this.startTime - now;
        return this.getEndTime() - now;
    }

    // Get time elapsed
    getTimeElapsed() {
        const now = Date.now();
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return this.duration;
        return now - this.startTime;
    }

    // Get progress percentage
    getProgressPercentage() {
        if (this.isUpcoming()) return 0;
        if (this.isExpired()) return 100;
        return (this.getTimeElapsed() / this.duration) * 100;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            color: this.color,
            emoji: this.emoji,
            startTime: this.startTime,
            duration: this.duration,
            params: this.params,
            creatorId: this.creatorId,
            editorId: this.editorId,
            createTime: this.createTime,
            editTime: this.editTime,
            repeat: this.repeat
        };
    }
}

// ReminderRepeatMode enum
const ReminderRepeatMode = {
    None: 0,
    Daily: 1,
    Weekly: 2,
    Monthly: 3
};

module.exports = {
    Reminder,
    ReminderUser,
    ReminderGroup,
    ReminderRepeatMode
};
