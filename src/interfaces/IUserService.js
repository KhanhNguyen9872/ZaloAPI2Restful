// IUserService - Interface for User business logic
class IUserService {
    // User information
    async getAccountInfo() {
        throw new Error('Method not implemented');
    }

    async getOwnId() {
        throw new Error('Method not implemented');
    }

    async getUserInfo(userId) {
        throw new Error('Method not implemented');
    }

    // Friends management
    async getAllFriends() {
        throw new Error('Method not implemented');
    }

    async sendFriendRequest(userId, message) {
        throw new Error('Method not implemented');
    }

    async acceptFriendRequest(userId) {
        throw new Error('Method not implemented');
    }

    async changeFriendAlias(userId, alias) {
        throw new Error('Method not implemented');
    }

    async blockUser(userId) {
        throw new Error('Method not implemented');
    }

    async unblockUser(userId) {
        throw new Error('Method not implemented');
    }

    // Search
    async findUser(query) {
        throw new Error('Method not implemented');
    }

    // Report
    async sendReport(userId, reason, description) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserService;
