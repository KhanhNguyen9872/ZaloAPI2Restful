// User Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/authMiddleware');

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

// Thông tin tài khoản
router.get('/me', 
    authMiddleware.requireAuth(),
    userController.getAccountInfo
);

router.get('/own-id', 
    authMiddleware.requireAuth(),
    userController.getOwnId
);

router.get('/info/:userId', 
    authMiddleware.requireAuth(),
    userController.getUserInfo
);

// Quản lý bạn bè
router.get('/friends', 
    authMiddleware.requireAuth(),
    userController.getAllFriends
);

router.post('/friends/request', 
    authMiddleware.requireAuth(),
    userController.validateSendFriendRequest,
    userController.sendFriendRequest
);

router.post('/friends/accept', 
    authMiddleware.requireAuth(),
    userController.validateAcceptFriendRequest,
    userController.acceptFriendRequest
);

router.put('/friends/:userId/alias', 
    authMiddleware.requireAuth(),
    userController.validateChangeFriendAlias,
    userController.changeFriendAlias
);

router.post('/friends/:userId/block', 
    authMiddleware.requireAuth(),
    userController.blockUser
);

router.delete('/friends/:userId/block', 
    authMiddleware.requireAuth(),
    userController.unblockUser
);

// Tìm kiếm
router.get('/search', 
    authMiddleware.requireAuth(),
    userController.findUser
);

// Báo cáo
router.post('/report', 
    authMiddleware.requireAuth(),
    userController.validateSendReport,
    userController.sendReport
);

// Block view feed
router.post('/:userId/block-feed', 
    authMiddleware.requireAuth(),
    userController.blockViewFeed
);

// Change account avatar
router.put('/avatar', 
    authMiddleware.requireAuth(),
    userController.changeAccountAvatar
);

// Delete avatar
router.delete('/avatar/:photoId', 
    authMiddleware.requireAuth(),
    userController.deleteAvatar
);

// Find user by phone number
router.get('/find/:phoneNumber', 
    authMiddleware.requireAuth(),
    userController.findUser
);

// Get all friends
router.get('/friends', 
    authMiddleware.requireAuth(),
    userController.getAllFriends
);

// Get alias list
router.get('/aliases', 
    authMiddleware.requireAuth(),
    userController.getAliasList
);

// Get avatar list
router.get('/avatars', 
    authMiddleware.requireAuth(),
    userController.getAvatarList
);

// Get friend board list
router.get('/friend-board/:conversationId', 
    authMiddleware.requireAuth(),
    userController.getFriendBoardList
);

// Get friend recommendations
router.get('/recommendations', 
    authMiddleware.requireAuth(),
    userController.getFriendRecommendations
);

// Get friend request status
router.get('/friend-request/:friendId', 
    authMiddleware.requireAuth(),
    userController.getFriendRequestStatus
);

// Get labels
router.get('/labels', 
    authMiddleware.requireAuth(),
    userController.getLabels
);

// Get mute
router.get('/mute', 
    authMiddleware.requireAuth(),
    userController.getMute
);

// Get own ID
router.get('/own-id', 
    authMiddleware.requireAuth(),
    userController.getOwnId
);

// Get QR
router.get('/:userId/qr', 
    authMiddleware.requireAuth(),
    userController.getQR
);

// Get related friend group
router.get('/:friendId/related-groups', 
    authMiddleware.requireAuth(),
    userController.getRelatedFriendGroup
);

// Get sent friend request
router.get('/sent-requests', 
    authMiddleware.requireAuth(),
    userController.getSentFriendRequest
);

// Get user info
router.get('/:userId/info', 
    authMiddleware.requireAuth(),
    userController.getUserInfo
);

// Get last online
router.get('/:uid/last-online', 
    authMiddleware.requireAuth(),
    userController.getLastOnline
);

// Remove friend
router.delete('/:friendId/friend', 
    authMiddleware.requireAuth(),
    userController.removeFriend
);

// Remove friend alias
router.delete('/:friendId/alias', 
    authMiddleware.requireAuth(),
    userController.removeFriendAlias
);

// Reuse avatar
router.post('/:photoId/reuse-avatar', 
    authMiddleware.requireAuth(),
    userController.reuseAvatar
);

// Send friend request
router.post('/:userId/friend-request', 
    authMiddleware.requireAuth(),
    userController.sendFriendRequest
);

// Send report
router.post('/:threadId/report/:type?', 
    authMiddleware.requireAuth(),
    userController.sendReport
);

// Unblock user
router.post('/:userId/unblock', 
    authMiddleware.requireAuth(),
    userController.unblockUser
);

// Undo friend request
router.delete('/:friendId/friend-request', 
    authMiddleware.requireAuth(),
    userController.undoFriendRequest
);

// Update labels
router.put('/labels', 
    authMiddleware.requireAuth(),
    userController.updateLabels
);

// Update language
router.put('/language', 
    authMiddleware.requireAuth(),
    userController.updateLang
);

// Update profile
router.put('/profile', 
    authMiddleware.requireAuth(),
    userController.updateProfile
);

// Update settings
router.put('/settings', 
    authMiddleware.requireAuth(),
    userController.updateSettings
);

module.exports = router;
