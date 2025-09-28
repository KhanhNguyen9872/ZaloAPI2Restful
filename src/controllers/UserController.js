// UserController - Clean Architecture controller for user operations
const UserService = require('../services/UserService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class UserController {
    constructor() {
        this.userService = new UserService();
        this.validation = new ValidationMiddleware();
    }

    // Get account information
    getAccountInfo = async (req, res) => {
        try {
            const result = await this.userService.getAccountInfo();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get own ID
    getOwnId = async (req, res) => {
        try {
            const result = await this.userService.getOwnId();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get user information
    getUserInfo = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.getUserInfo(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get all friends
    getAllFriends = async (req, res) => {
        try {
            const result = await this.userService.getAllFriends();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send friend request
    sendFriendRequest = async (req, res) => {
        try {
            const { userId, message } = req.body;
            const result = await this.userService.sendFriendRequest(userId, message);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Accept friend request
    acceptFriendRequest = async (req, res) => {
        try {
            const { userId } = req.body;
            const result = await this.userService.acceptFriendRequest(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Change friend alias
    changeFriendAlias = async (req, res) => {
        try {
            const { userId } = req.params;
            const { alias } = req.body;
            const result = await this.userService.changeFriendAlias(userId, alias);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Block user
    blockUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.blockUser(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Unblock user
    unblockUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.unblockUser(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Find user
    findUser = async (req, res) => {
        try {
            const { query } = req.query;
            const result = await this.userService.findUser(query);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send report
    sendReport = async (req, res) => {
        try {
            const { userId, reason, description } = req.body;
            const result = await this.userService.sendReport(userId, reason, description);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Block view feed
    blockViewFeed = async (req, res) => {
        try {
            const { userId } = req.params;
            const { isBlockFeed = true } = req.body;
            const result = await this.userService.blockViewFeed(userId, isBlockFeed);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Change account avatar
    changeAccountAvatar = async (req, res) => {
        try {
            const { avatarSource } = req.body;
            const result = await this.userService.changeAccountAvatar(avatarSource);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete avatar
    deleteAvatar = async (req, res) => {
        try {
            const { photoId } = req.params;
            const result = await this.userService.deleteAvatar(photoId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Find user by phone number
    findUser = async (req, res) => {
        try {
            const { phoneNumber } = req.params;
            const result = await this.userService.findUser(phoneNumber);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get all friends
    getAllFriends = async (req, res) => {
        try {
            const { count = 20000, page = 1 } = req.query;
            const result = await this.userService.getAllFriends(parseInt(count), parseInt(page));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get alias list
    getAliasList = async (req, res) => {
        try {
            const { count = 100, page = 1 } = req.query;
            const result = await this.userService.getAliasList(parseInt(count), parseInt(page));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get avatar list
    getAvatarList = async (req, res) => {
        try {
            const result = await this.userService.getAvatarList();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get friend board list
    getFriendBoardList = async (req, res) => {
        try {
            const { conversationId } = req.params;
            const result = await this.userService.getFriendBoardList(conversationId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get friend recommendations
    getFriendRecommendations = async (req, res) => {
        try {
            const result = await this.userService.getFriendRecommendations();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get friend request status
    getFriendRequestStatus = async (req, res) => {
        try {
            const { friendId } = req.params;
            const result = await this.userService.getFriendRequestStatus(friendId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get labels
    getLabels = async (req, res) => {
        try {
            const result = await this.userService.getLabels();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get mute
    getMute = async (req, res) => {
        try {
            const result = await this.userService.getMute();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get own ID
    getOwnId = async (req, res) => {
        try {
            const result = await this.userService.getOwnId();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get QR
    getQR = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.getQR(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get related friend group
    getRelatedFriendGroup = async (req, res) => {
        try {
            const { friendId } = req.params;
            const result = await this.userService.getRelatedFriendGroup(friendId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get sent friend request
    getSentFriendRequest = async (req, res) => {
        try {
            const result = await this.userService.getSentFriendRequest();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get user info
    getUserInfo = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.getUserInfo(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get last online
    getLastOnline = async (req, res) => {
        try {
            const { uid } = req.params;
            const result = await this.userService.getLastOnline(uid);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove friend
    removeFriend = async (req, res) => {
        try {
            const { friendId } = req.params;
            const result = await this.userService.removeFriend(friendId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Remove friend alias
    removeFriendAlias = async (req, res) => {
        try {
            const { friendId } = req.params;
            const result = await this.userService.removeFriendAlias(friendId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Reuse avatar
    reuseAvatar = async (req, res) => {
        try {
            const { photoId } = req.params;
            const result = await this.userService.reuseAvatar(photoId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send friend request
    sendFriendRequest = async (req, res) => {
        try {
            const { userId } = req.params;
            const { msg } = req.body;
            const result = await this.userService.sendFriendRequest(msg, userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Send report
    sendReport = async (req, res) => {
        try {
            const { threadId, type = 1 } = req.params;
            const { reason, content } = req.body;
            const options = { reason, content };
            const result = await this.userService.sendReport(options, threadId, parseInt(type));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Unblock user
    unblockUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.userService.unblockUser(userId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Undo friend request
    undoFriendRequest = async (req, res) => {
        try {
            const { friendId } = req.params;
            const result = await this.userService.undoFriendRequest(friendId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update labels
    updateLabels = async (req, res) => {
        try {
            const { labelData, version } = req.body;
            const payload = { labelData, version };
            const result = await this.userService.updateLabels(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update language
    updateLang = async (req, res) => {
        try {
            const { language } = req.body;
            const result = await this.userService.updateLang(language);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update profile
    updateProfile = async (req, res) => {
        try {
            const { profile, biz } = req.body;
            const payload = { profile, biz };
            const result = await this.userService.updateProfile(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update settings
    updateSettings = async (req, res) => {
        try {
            const { type, value } = req.body;
            const result = await this.userService.updateSettings(type, value);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateSendFriendRequest = [
        this.validation.validateRequired(['userId']),
        (req, res, next) => next()
    ];

    validateAcceptFriendRequest = [
        this.validation.validateRequired(['userId']),
        (req, res, next) => next()
    ];

    validateChangeFriendAlias = [
        this.validation.validateRequired(['alias']),
        (req, res, next) => next()
    ];

    validateSendReport = [
        this.validation.validateRequired(['userId', 'reason']),
        (req, res, next) => next()
    ];
}

module.exports = UserController;
