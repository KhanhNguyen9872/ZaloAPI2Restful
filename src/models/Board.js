// Board Model - Bảng tin nhóm
class Board {
    constructor(data) {
        this.type = data.type;
        this.detail = data.detail;
    }

    // Get board type
    getType() {
        return this.type;
    }

    // Get board detail
    getDetail() {
        return this.detail;
    }

    // Check if board is note
    isNote() {
        return this.type === BoardType.Note;
    }

    // Check if board is pinned message
    isPinnedMessage() {
        return this.type === BoardType.PinnedMessage;
    }

    // Check if board is poll
    isPoll() {
        return this.type === BoardType.Poll;
    }

    // Convert to JSON
    toJSON() {
        return {
            type: this.type,
            detail: this.detail
        };
    }

    // Create from data
    static fromData(data) {
        return new Board(data);
    }
}

// PollDetail Model
class PollDetail {
    constructor(data) {
        this.creator = data.creator;
        this.question = data.question;
        this.options = data.options;
        this.joined = data.joined;
        this.closed = data.closed;
        this.poll_id = data.poll_id;
        this.allow_multi_choices = data.allow_multi_choices;
        this.allow_add_new_option = data.allow_add_new_option;
        this.is_anonymous = data.is_anonymous;
        this.poll_type = data.poll_type;
        this.created_time = data.created_time;
        this.updated_time = data.updated_time;
        this.expired_time = data.expired_time;
        this.is_hide_vote_preview = data.is_hide_vote_preview;
        this.num_vote = data.num_vote;
    }

    // Get poll ID
    getPollId() {
        return this.poll_id;
    }

    // Get question
    getQuestion() {
        return this.question;
    }

    // Get options
    getOptions() {
        return this.options;
    }

    // Check if joined
    isJoined() {
        return this.joined;
    }

    // Check if closed
    isClosed() {
        return this.closed;
    }

    // Check if allows multi choices
    allowsMultiChoices() {
        return this.allow_multi_choices;
    }

    // Check if allows adding new option
    allowsAddNewOption() {
        return this.allow_add_new_option;
    }

    // Check if anonymous
    isAnonymous() {
        return this.is_anonymous;
    }

    // Get poll type
    getPollType() {
        return this.poll_type;
    }

    // Get created time
    getCreatedTime() {
        return this.created_time;
    }

    // Get updated time
    getUpdatedTime() {
        return this.updated_time;
    }

    // Get expired time
    getExpiredTime() {
        return this.expired_time;
    }

    // Check if hide vote preview
    isHideVotePreview() {
        return this.is_hide_vote_preview;
    }

    // Get number of votes
    getNumVote() {
        return this.num_vote;
    }

    // Convert to JSON
    toJSON() {
        return {
            creator: this.creator,
            question: this.question,
            options: this.options,
            joined: this.joined,
            closed: this.closed,
            poll_id: this.poll_id,
            allow_multi_choices: this.allow_multi_choices,
            allow_add_new_option: this.allow_add_new_option,
            is_anonymous: this.is_anonymous,
            poll_type: this.poll_type,
            created_time: this.created_time,
            updated_time: this.updated_time,
            expired_time: this.expired_time,
            is_hide_vote_preview: this.is_hide_vote_preview,
            num_vote: this.num_vote
        };
    }
}

// PollOptions Model
class PollOptions {
    constructor(data) {
        this.content = data.content;
        this.votes = data.votes;
        this.voted = data.voted;
        this.voters = data.voters;
        this.option_id = data.option_id;
    }

    // Get content
    getContent() {
        return this.content;
    }

    // Get votes count
    getVotes() {
        return this.votes;
    }

    // Check if voted
    isVoted() {
        return this.voted;
    }

    // Get voters
    getVoters() {
        return this.voters;
    }

    // Get option ID
    getOptionId() {
        return this.option_id;
    }

    // Convert to JSON
    toJSON() {
        return {
            content: this.content,
            votes: this.votes,
            voted: this.voted,
            voters: this.voters,
            option_id: this.option_id
        };
    }
}

// NoteDetail Model
class NoteDetail {
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

    // Get note ID
    getId() {
        return this.id;
    }

    // Get note type
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

// PinnedMessageDetail Model
class PinnedMessageDetail {
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

    // Get pinned message ID
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

// BoardType enum
const BoardType = {
    Note: 1,
    PinnedMessage: 2,
    Poll: 3
};

module.exports = {
    Board,
    PollDetail,
    PollOptions,
    NoteDetail,
    PinnedMessageDetail,
    BoardType
};
