// Group Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');
const AuthMiddleware = require('../middleware/authMiddleware');

const groupController = new GroupController();
const authMiddleware = new AuthMiddleware();

// Quản lý nhóm
router.get('/', 
    authMiddleware.requireAuth(),
    groupController.getAllGroups
);

router.get('/:groupId', 
    authMiddleware.requireAuth(),
    groupController.getGroupInfo
);

router.post('/', 
    authMiddleware.requireAuth(),
    groupController.validateCreateGroup,
    groupController.createGroup
);

router.delete('/:groupId', 
    authMiddleware.requireAuth(),
    groupController.disperseGroup
);

// Thành viên nhóm
router.post('/:groupId/members', 
    authMiddleware.requireAuth(),
    groupController.validateAddUserToGroup,
    groupController.addUserToGroup
);

router.delete('/:groupId/members/:userId', 
    authMiddleware.requireAuth(),
    groupController.removeUserFromGroup
);

router.post('/:groupId/deputies', 
    authMiddleware.requireAuth(),
    groupController.validateAddGroupDeputy,
    groupController.addGroupDeputy
);

router.delete('/:groupId/deputies/:userId', 
    authMiddleware.requireAuth(),
    groupController.removeGroupDeputy
);

// Cài đặt nhóm
router.put('/:groupId/name', 
    authMiddleware.requireAuth(),
    groupController.validateChangeGroupName,
    groupController.changeGroupName
);

router.put('/:groupId/avatar', 
    authMiddleware.requireAuth(),
    groupController.validateChangeGroupAvatar,
    groupController.changeGroupAvatar
);

router.put('/:groupId/owner', 
    authMiddleware.requireAuth(),
    groupController.validateChangeGroupOwner,
    groupController.changeGroupOwner
);

// Blocked members
router.post('/:groupId/blocked/:memberId', 
    authMiddleware.requireAuth(),
    groupController.addGroupBlockedMember
);

router.delete('/:groupId/blocked/:memberId', 
    authMiddleware.requireAuth(),
    groupController.removeGroupBlockedMember
);

// Delete group invite box
router.delete('/:groupId/invite-box', 
    authMiddleware.requireAuth(),
    groupController.deleteGroupInviteBox
);

// Group link management
router.post('/:groupId/link/disable', 
    authMiddleware.requireAuth(),
    groupController.disableGroupLink
);

router.post('/:groupId/link/enable', 
    authMiddleware.requireAuth(),
    groupController.enableGroupLink
);

// Get group blocked members
router.get('/:groupId/blocked', 
    authMiddleware.requireAuth(),
    groupController.getGroupBlockedMember
);

// Get group info
router.get('/:groupId/info', 
    authMiddleware.requireAuth(),
    groupController.getGroupInfo
);

// Get group invite box info
router.post('/invite-box/info', 
    authMiddleware.requireAuth(),
    groupController.getGroupInviteBoxInfo
);

// Get group invite box list
router.get('/invite-box/list', 
    authMiddleware.requireAuth(),
    groupController.getGroupInviteBoxList
);

// Get group link detail
router.get('/:groupId/link', 
    authMiddleware.requireAuth(),
    groupController.getGroupLinkDetail
);

// Get group link info
router.post('/link/info', 
    authMiddleware.requireAuth(),
    groupController.getGroupLinkInfo
);

// Get group members info
router.get('/members/:memberId', 
    authMiddleware.requireAuth(),
    groupController.getGroupMembersInfo
);

// Get list board
router.get('/:groupId/board', 
    authMiddleware.requireAuth(),
    groupController.getListBoard
);

// Get pending group members
router.get('/:groupId/pending', 
    authMiddleware.requireAuth(),
    groupController.getPendingGroupMembers
);

// Invite user to groups
router.post('/:userId/invite', 
    authMiddleware.requireAuth(),
    groupController.inviteUserToGroups
);

// Join group invite box
router.post('/:groupId/join-invite', 
    authMiddleware.requireAuth(),
    groupController.joinGroupInviteBox
);

// Join group link
router.post('/join-link', 
    authMiddleware.requireAuth(),
    groupController.joinGroupLink
);

// Leave group
router.delete('/:groupId/leave', 
    authMiddleware.requireAuth(),
    groupController.leaveGroup
);

// Remove group blocked member
router.delete('/:groupId/blocked/:memberId', 
    authMiddleware.requireAuth(),
    groupController.removeGroupBlockedMember
);

// Remove user from group
router.delete('/:groupId/members/:memberId', 
    authMiddleware.requireAuth(),
    groupController.removeUserFromGroup
);

// Review pending member request
router.post('/:groupId/review-pending', 
    authMiddleware.requireAuth(),
    groupController.reviewPendingMemberRequest
);

// Update group settings
router.put('/:groupId/settings', 
    authMiddleware.requireAuth(),
    groupController.updateGroupSettings
);

module.exports = router;
