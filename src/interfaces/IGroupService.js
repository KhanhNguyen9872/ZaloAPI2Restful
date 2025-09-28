// IGroupService - Interface for Group business logic
class IGroupService {
    // Group information
    async getAllGroups() {
        throw new Error('Method not implemented');
    }

    async getGroupInfo(groupId) {
        throw new Error('Method not implemented');
    }

    // Group management
    async createGroup(name, members) {
        throw new Error('Method not implemented');
    }

    async disperseGroup(groupId) {
        throw new Error('Method not implemented');
    }

    // Member management
    async addUserToGroup(groupId, userIds) {
        throw new Error('Method not implemented');
    }

    async removeUserFromGroup(groupId, userId) {
        throw new Error('Method not implemented');
    }

    // Deputy management
    async addGroupDeputy(groupId, userIds) {
        throw new Error('Method not implemented');
    }

    async removeGroupDeputy(groupId, userId) {
        throw new Error('Method not implemented');
    }

    // Group settings
    async changeGroupName(groupId, name) {
        throw new Error('Method not implemented');
    }

    async changeGroupAvatar(groupId, avatarPath) {
        throw new Error('Method not implemented');
    }

    async changeGroupOwner(groupId, userId) {
        throw new Error('Method not implemented');
    }
}

module.exports = IGroupService;
