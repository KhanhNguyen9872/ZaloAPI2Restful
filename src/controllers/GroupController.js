// GroupController - Clean Architecture controller for group operations
const GroupService = require('../services/GroupService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class GroupController {
    constructor() {
        this.groupService = new GroupService();
        this.validation = new ValidationMiddleware();
    }

    // Get all groups
    getAllGroups = async (req, res) => {
        try {
            const result = await this.groupService.getAllGroups();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group info
    getGroupInfo = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.getGroupInfo(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Create group
    createGroup = async (req, res) => {
        try {
            const { name, members, avatarSource } = req.body;
            const result = await this.groupService.createGroup({
                name,
                members,
                avatarSource
            });
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Disperse group
    disperseGroup = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.disperseGroup(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add user to group
    addUserToGroup = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { userIds } = req.body;
            const result = await this.groupService.addUserToGroup(groupId, userIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove user from group
    removeUserFromGroup = async (req, res) => {
        try {
            const { groupId, userId } = req.params;
            const result = await this.groupService.removeUserFromGroup(groupId, userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add group deputy
    addGroupDeputy = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { userIds } = req.body;
            const result = await this.groupService.addGroupDeputy(groupId, userIds);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove group deputy
    removeGroupDeputy = async (req, res) => {
        try {
            const { groupId, userId } = req.params;
            const result = await this.groupService.removeGroupDeputy(groupId, userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Change group name
    changeGroupName = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { name } = req.body;
            const result = await this.groupService.changeGroupName(name, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Change group avatar
    changeGroupAvatar = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { avatarPath } = req.body;
            const result = await this.groupService.changeGroupAvatar(avatarPath, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Change group owner
    changeGroupOwner = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { memberId } = req.body;
            const result = await this.groupService.changeGroupOwner(memberId, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Add group blocked member
    addGroupBlockedMember = async (req, res) => {
        try {
            const { groupId, memberId } = req.params;
            const result = await this.groupService.addGroupBlockedMember(groupId, memberId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove group blocked member
    removeGroupBlockedMember = async (req, res) => {
        try {
            const { groupId, memberId } = req.params;
            const result = await this.groupService.removeGroupBlockedMember(groupId, memberId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete group invite box
    deleteGroupInviteBox = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { blockFutureInvite = false } = req.body;
            const result = await this.groupService.deleteGroupInviteBox(groupId, blockFutureInvite);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Disable group link
    disableGroupLink = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.disableGroupLink(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Enable group link
    enableGroupLink = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.enableGroupLink(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get all groups
    getAllGroups = async (req, res) => {
        try {
            const result = await this.groupService.getAllGroups();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group blocked member
    getGroupBlockedMember = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { page = 1, count = 50 } = req.query;
            const payload = {
                page: parseInt(page),
                count: parseInt(count)
            };
            const result = await this.groupService.getGroupBlockedMember(payload, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group info
    getGroupInfo = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.getGroupInfo(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group invite box info
    getGroupInviteBoxInfo = async (req, res) => {
        try {
            const { groupId, mpage, mcount } = req.body;
            const payload = {
                groupId,
                mpage,
                mcount
            };
            const result = await this.groupService.getGroupInviteBoxInfo(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group invite box list
    getGroupInviteBoxList = async (req, res) => {
        try {
            const { mpage, page, invPerPage, mcount } = req.query;
            const payload = {
                mpage: mpage ? parseInt(mpage) : undefined,
                page: page ? parseInt(page) : undefined,
                invPerPage: invPerPage ? parseInt(invPerPage) : undefined,
                mcount: mcount ? parseInt(mcount) : undefined
            };
            const result = await this.groupService.getGroupInviteBoxList(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group link detail
    getGroupLinkDetail = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.getGroupLinkDetail(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group link info
    getGroupLinkInfo = async (req, res) => {
        try {
            const { link, memberPage } = req.body;
            const payload = {
                link,
                memberPage
            };
            const result = await this.groupService.getGroupLinkInfo(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get group members info
    getGroupMembersInfo = async (req, res) => {
        try {
            const { memberId } = req.params;
            const result = await this.groupService.getGroupMembersInfo(memberId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get list board
    getListBoard = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { page = 1, count = 20 } = req.query;
            const options = {
                page: parseInt(page),
                count: parseInt(count)
            };
            const result = await this.groupService.getListBoard(options, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get pending group members
    getPendingGroupMembers = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.getPendingGroupMembers(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Invite user to groups
    inviteUserToGroups = async (req, res) => {
        try {
            const { userId } = req.params;
            const { groupId } = req.body;
            const result = await this.groupService.inviteUserToGroups(userId, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Join group invite box
    joinGroupInviteBox = async (req, res) => {
        try {
            const { groupId } = req.params;
            const result = await this.groupService.joinGroupInviteBox(groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Join group link
    joinGroupLink = async (req, res) => {
        try {
            const { link } = req.body;
            const result = await this.groupService.joinGroupLink(link);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Leave group
    leaveGroup = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { silent = false } = req.query;
            const result = await this.groupService.leaveGroup(groupId, silent === 'true');
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove group blocked member
    removeGroupBlockedMember = async (req, res) => {
        try {
            const { memberId, groupId } = req.params;
            const result = await this.groupService.removeGroupBlockedMember(memberId, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove user from group
    removeUserFromGroup = async (req, res) => {
        try {
            const { memberId, groupId } = req.params;
            const result = await this.groupService.removeUserFromGroup(memberId, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Review pending member request
    reviewPendingMemberRequest = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { members, isApprove } = req.body;
            const payload = { members, isApprove };
            const result = await this.groupService.reviewPendingMemberRequest(payload, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update group settings
    updateGroupSettings = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { blockName, signAdminMsg, setTopicOnly, enableMsgHistory, joinAppr, lockCreatePost, lockCreatePoll, lockSendMsg, lockViewMember } = req.body;
            const options = { blockName, signAdminMsg, setTopicOnly, enableMsgHistory, joinAppr, lockCreatePost, lockCreatePoll, lockSendMsg, lockViewMember };
            const result = await this.groupService.updateGroupSettings(options, groupId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateCreateGroup = [
        this.validation.validateRequired(['members']),
        this.validation.validateArray('members'),
        (req, res, next) => next()
    ];

    validateAddUserToGroup = [
        this.validation.validateRequired(['userIds']),
        this.validation.validateArray('userIds'),
        (req, res, next) => next()
    ];

    validateAddGroupDeputy = [
        this.validation.validateRequired(['userIds']),
        this.validation.validateArray('userIds'),
        (req, res, next) => next()
    ];

    validateChangeGroupName = [
        this.validation.validateRequired(['name']),
        (req, res, next) => next()
    ];

    validateChangeGroupAvatar = [
        this.validation.validateRequired(['avatarPath']),
        (req, res, next) => next()
    ];

    validateChangeGroupOwner = [
        this.validation.validateRequired(['memberId']),
        (req, res, next) => next()
    ];
}

module.exports = GroupController;
