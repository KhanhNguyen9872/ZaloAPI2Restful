// GroupService - Business logic for group operations
const Group = require('../models/Group');
const GroupDTO = require('../dtos/GroupDTO');
const ZaloRepository = require('../repositories/ZaloRepository');
const IGroupService = require('../interfaces/IGroupService');

class GroupService extends IGroupService {
    constructor() {
        super();
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Helper method để đảm bảo sử dụng global instance
    ensureZaloAPI() {
        if (global.zaloAPI && !this.zaloRepository.zaloAPI) {
            this.zaloRepository.zaloAPI = global.zaloAPI;
            this.zaloRepository.isInitialized = true;
        }
    }

    // Get all groups
    async getAllGroups() {
        try {
            this.ensureZaloAPI();
            const groupsData = await this.zaloRepository.getAllGroups();
            const groups = groupsData.map(groupData => {
                const group = Group.fromZaloData(groupData);
                return GroupDTO.fromModel(group);
            });
            
            return {
                success: true,
                data: groups.map(group => group.toJSON())
            };
        } catch (error) {
            throw new Error(`Failed to get groups: ${error.message}`);
        }
    }

    // Get group information
    async getGroupInfo(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const groupData = await this.zaloRepository.getGroupInfo(groupId);
            const group = Group.fromZaloData(groupData);
            const groupDTO = GroupDTO.fromModel(group);
            
            return groupDTO.toResponse();
        } catch (error) {
            throw new Error(`Failed to get group info: ${error.message}`);
        }
    }

    // Create group
    async createGroup(options) {
        try {
            this.ensureZaloAPI();
            if (!options) {
                throw new Error('Group options are required');
            }
            if (!options.members || !Array.isArray(options.members)) {
                throw new Error('Members array is required');
            }

            const result = await this.zaloRepository.createGroup(options);
            const group = Group.create(options.name || 'New Group', null, options.members);
            const groupDTO = GroupDTO.fromModel(group);
            
            return {
                success: true,
                data: {
                    ...groupDTO.toJSON(),
                    apiResult: result
                },
                message: 'Group created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create group: ${error.message}`);
        }
    }

    // Disperse group
    async disperseGroup(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.disperseGroup(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group dispersed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to disperse group: ${error.message}`);
        }
    }

    // Add user to group
    async addUserToGroup(groupId, userIds) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!userIds || !Array.isArray(userIds)) {
                throw new Error('User IDs must be an array');
            }

            const result = await this.zaloRepository.addUserToGroup(groupId, userIds);
            
            return {
                success: true,
                data: result,
                message: 'Users added to group successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add users to group: ${error.message}`);
        }
    }

    // Remove user from group
    async removeUserFromGroup(groupId, userId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.removeUserFromGroup(groupId, userId);
            
            return {
                success: true,
                data: result,
                message: 'User removed from group successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove user from group: ${error.message}`);
        }
    }

    // Add group deputy
    async addGroupDeputy(groupId, userIds) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!userIds || !Array.isArray(userIds)) {
                throw new Error('User IDs must be an array');
            }

            const result = await this.zaloRepository.addGroupDeputy(groupId, userIds);
            
            return {
                success: true,
                data: result,
                message: 'Group deputies added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add group deputies: ${error.message}`);
        }
    }

    // Remove group deputy
    async removeGroupDeputy(groupId, userId) {
        try {
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.removeGroupDeputy(groupId, userId);
            
            return {
                success: true,
                data: result,
                message: 'Group deputy removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove group deputy: ${error.message}`);
        }
    }

    // Change group name
    async changeGroupName(name, groupId) {
        try {
            this.ensureZaloAPI();
            if (!name) {
                throw new Error('Group name is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.changeGroupName(name, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group name changed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to change group name: ${error.message}`);
        }
    }

    // Change group avatar
    async changeGroupAvatar(avatarPath, groupId) {
        try {
            this.ensureZaloAPI();
            if (!avatarPath) {
                throw new Error('Avatar path is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.changeGroupAvatar(avatarPath, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group avatar changed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to change group avatar: ${error.message}`);
        }
    }

    // Change group owner
    async changeGroupOwner(memberId, groupId) {
        try {
            this.ensureZaloAPI();
            if (!memberId) {
                throw new Error('Member ID is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.changeGroupOwner(memberId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group owner changed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to change group owner: ${error.message}`);
        }
    }

    // Add group blocked member
    async addGroupBlockedMember(groupId, memberId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!memberId) {
                throw new Error('Member ID is required');
            }

            const result = await this.zaloRepository.addGroupBlockedMember(memberId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Member added to group blocked list successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add group blocked member: ${error.message}`);
        }
    }

    // Remove group blocked member
    async removeGroupBlockedMember(groupId, memberId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }
            if (!memberId) {
                throw new Error('Member ID is required');
            }

            const result = await this.zaloRepository.removeGroupBlockedMember(memberId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Member removed from group blocked list successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove group blocked member: ${error.message}`);
        }
    }

    // Delete group invite box
    async deleteGroupInviteBox(groupId, blockFutureInvite = false) {
        try {
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.deleteGroupInviteBox(groupId, blockFutureInvite);
            
            return {
                success: true,
                data: result,
                message: 'Group invite box deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete group invite box: ${error.message}`);
        }
    }

    // Disable group link
    async disableGroupLink(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.disableGroupLink(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group link disabled successfully'
            };
        } catch (error) {
            throw new Error(`Failed to disable group link: ${error.message}`);
        }
    }

    // Enable group link
    async enableGroupLink(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.enableGroupLink(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group link enabled successfully'
            };
        } catch (error) {
            throw new Error(`Failed to enable group link: ${error.message}`);
        }
    }

    // Get all groups
    async getAllGroups() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getAllGroups();
            
            return {
                success: true,
                data: result,
                message: 'All groups retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get all groups: ${error.message}`);
        }
    }

    // Get group blocked member
    async getGroupBlockedMember(payload, groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.getGroupBlockedMember(payload, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group blocked members retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group blocked members: ${error.message}`);
        }
    }

    // Get group info
    async getGroupInfo(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.getGroupInfo(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group info retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group info: ${error.message}`);
        }
    }

    // Get group invite box info
    async getGroupInviteBoxInfo(payload) {
        try {
            if (!payload) {
                throw new Error('Payload is required');
            }

            const { groupId } = payload;

            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.getGroupInviteBoxInfo(payload);
            
            return {
                success: true,
                data: result,
                message: 'Group invite box info retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group invite box info: ${error.message}`);
        }
    }

    // Get group invite box list
    async getGroupInviteBoxList(payload) {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getGroupInviteBoxList(payload);
            
            return {
                success: true,
                data: result,
                message: 'Group invite box list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group invite box list: ${error.message}`);
        }
    }

    // Get group link detail
    async getGroupLinkDetail(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.getGroupLinkDetail(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group link detail retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group link detail: ${error.message}`);
        }
    }

    // Get group link info
    async getGroupLinkInfo(payload) {
        try {
            this.ensureZaloAPI();
            if (!payload) {
                throw new Error('Payload is required');
            }

            const { link } = payload;

            if (!link) {
                throw new Error('Link is required');
            }

            const result = await this.zaloRepository.getGroupLinkInfo(payload);
            
            return {
                success: true,
                data: result,
                message: 'Group link info retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group link info: ${error.message}`);
        }
    }

    // Get group members info
    async getGroupMembersInfo(memberId) {
        try {
            this.ensureZaloAPI();
            if (!memberId) {
                throw new Error('Member ID is required');
            }

            const result = await this.zaloRepository.getGroupMembersInfo(memberId);
            
            return {
                success: true,
                data: result,
                message: 'Group members info retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get group members info: ${error.message}`);
        }
    }

    // Get list board
    async getListBoard(options, groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.getListBoard(options, groupId);
            
            return {
                success: true,
                data: result,
                message: 'List board retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get list board: ${error.message}`);
        }
    }

    // Get pending group members
    async getPendingGroupMembers(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.getPendingGroupMembers(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Pending group members retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get pending group members: ${error.message}`);
        }
    }

    // Invite user to groups
    async inviteUserToGroups(userId, groupId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.inviteUserToGroups(userId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'User invited to groups successfully'
            };
        } catch (error) {
            throw new Error(`Failed to invite user to groups: ${error.message}`);
        }
    }

    // Join group invite box
    async joinGroupInviteBox(groupId) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.joinGroupInviteBox(groupId);
            
            return {
                success: true,
                data: result,
                message: 'Joined group invite box successfully'
            };
        } catch (error) {
            throw new Error(`Failed to join group invite box: ${error.message}`);
        }
    }

    // Join group link
    async joinGroupLink(link) {
        try {
            this.ensureZaloAPI();
            if (!link) {
                throw new Error('Link is required');
            }

            const result = await this.zaloRepository.joinGroupLink(link);
            
            return {
                success: true,
                data: result,
                message: 'Joined group via link successfully'
            };
        } catch (error) {
            throw new Error(`Failed to join group via link: ${error.message}`);
        }
    }

    // Leave group
    async leaveGroup(groupId, silent = false) {
        try {
            this.ensureZaloAPI();
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.leaveGroup(groupId, silent);
            
            return {
                success: true,
                data: result,
                message: 'Left group successfully'
            };
        } catch (error) {
            throw new Error(`Failed to leave group: ${error.message}`);
        }
    }

    // Remove group blocked member
    async removeGroupBlockedMember(memberId, groupId) {
        try {
            this.ensureZaloAPI();
            if (!memberId) {
                throw new Error('Member ID is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.removeGroupBlockedMember(memberId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group blocked member removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove group blocked member: ${error.message}`);
        }
    }

    // Remove user from group
    async removeUserFromGroup(memberId, groupId) {
        try {
            this.ensureZaloAPI();
            if (!memberId) {
                throw new Error('Member ID is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.removeUserFromGroup(memberId, groupId);
            
            return {
                success: true,
                data: result,
                message: 'User removed from group successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove user from group: ${error.message}`);
        }
    }

    // Review pending member request
    async reviewPendingMemberRequest(payload, groupId) {
        try {
            this.ensureZaloAPI();
            if (!payload || !payload.members || payload.isApprove === undefined) {
                throw new Error('Payload with members and isApprove is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.reviewPendingMemberRequest(payload, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Pending member request reviewed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to review pending member request: ${error.message}`);
        }
    }

    // Update group settings
    async updateGroupSettings(options, groupId) {
        try {
            this.ensureZaloAPI();
            if (!options) {
                throw new Error('Options is required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const result = await this.zaloRepository.updateGroupSettings(options, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Group settings updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update group settings: ${error.message}`);
        }
    }
}

module.exports = GroupService;
