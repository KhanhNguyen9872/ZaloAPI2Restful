// Poll Model - Entity layer
class Poll {
    constructor(data = {}) {
        this.id = data.id || null;
        this.question = data.question || '';
        this.options = data.options || [];
        this.authorId = data.authorId || null;
        this.threadId = data.threadId || null;
        this.threadType = data.threadType || 1;
        this.isActive = data.isActive || true;
        this.isLocked = data.isLocked || false;
        this.votes = data.votes || {};
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    // Validation methods
    isValid() {
        return this.id && this.question && this.options.length > 0 && this.authorId;
    }

    // Business logic methods
    isAuthor(userId) {
        return this.authorId === userId;
    }

    canVote(userId) {
        return this.isActive && !this.isLocked && !this.hasVoted(userId);
    }

    canEdit(userId) {
        return this.isAuthor(userId) && !this.isLocked;
    }

    canLock(userId) {
        return this.isAuthor(userId) && this.isActive;
    }

    hasVoted(userId) {
        return this.votes.hasOwnProperty(userId);
    }

    vote(userId, optionIndex) {
        if (this.canVote(userId) && optionIndex >= 0 && optionIndex < this.options.length) {
            this.votes[userId] = optionIndex;
            this.updatedAt = new Date();
            return true;
        }
        return false;
    }

    lock() {
        this.isLocked = true;
        this.isActive = false;
        this.updatedAt = new Date();
    }

    getResults() {
        const results = {};
        this.options.forEach((option, index) => {
            results[index] = {
                option: option,
                votes: Object.values(this.votes).filter(vote => vote === index).length
            };
        });
        return results;
    }

    getTotalVotes() {
        return Object.keys(this.votes).length;
    }

    getWinner() {
        const results = this.getResults();
        let maxVotes = 0;
        let winner = null;
        
        Object.values(results).forEach(result => {
            if (result.votes > maxVotes) {
                maxVotes = result.votes;
                winner = result.option;
            }
        });
        
        return winner;
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            question: this.question,
            options: this.options,
            authorId: this.authorId,
            threadId: this.threadId,
            threadType: this.threadType,
            isActive: this.isActive,
            isLocked: this.isLocked,
            votes: this.votes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Factory methods
    static fromZaloData(zaloData) {
        return new Poll({
            id: zaloData.id,
            question: zaloData.question,
            options: zaloData.options || [],
            authorId: zaloData.authorId,
            threadId: zaloData.threadId,
            threadType: zaloData.threadType,
            isActive: zaloData.isActive !== false,
            isLocked: zaloData.isLocked || false,
            votes: zaloData.votes || {}
        });
    }

    static create(question, options, authorId, threadId, threadType = 1) {
        return new Poll({
            question,
            options,
            authorId,
            threadId,
            threadType
        });
    }
}

module.exports = Poll;
