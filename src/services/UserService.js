// UserService - Business logic for user operations
const { User } = require('../models/User');
const UserDTO = require('../dtos/UserDTO');
const ZaloRepository = require('../repositories/ZaloRepository');
const IUserService = require('../interfaces/IUserService');

class UserService extends IUserService {
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


    // Get account information
    async getAccountInfo() {
        try {
            this.ensureZaloAPI();
            const accountData = await this.zaloRepository.fetchAccountInfo();
            
            // Lấy dữ liệu profile từ response
            const profileData = accountData.profile || accountData;
            const user = User.fromData(profileData);
            const userDTO = UserDTO.fromModel(user);
            
            return userDTO.toResponse();
        } catch (error) {
            throw new Error(`Failed to get account info: ${error.message}`);
        }
    }

    // Get own ID
    async getOwnId() {
        try {
            this.ensureZaloAPI();
            const ownId = await this.zaloRepository.getOwnId();
            return {
                success: true,
                data: { ownId }
            };
        } catch (error) {
            throw new Error(`Failed to get own ID: ${error.message}`);
        }
    }

    // Get user information
    async getUserInfo(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            this.ensureZaloAPI();
            const userData = await this.zaloRepository.getUserInfo(userId);
            const user = User.fromZaloData(userData);
            const userDTO = UserDTO.fromModel(user);
            
            return userDTO.toResponse();
        } catch (error) {
            throw new Error(`Failed to get user info: ${error.message}`);
        }
    }

    // Get all friends
    async getAllFriends() {
        try {
            this.ensureZaloAPI();
            const friendsData = await this.zaloRepository.getAllFriends();
            const friends = friendsData.map(friendData => {
                const user = User.fromZaloData(friendData);
                return UserDTO.fromModel(user);
            });
            
            return {
                success: true,
                data: friends.map(friend => friend.toJSON())
            };
        } catch (error) {
            throw new Error(`Failed to get friends: ${error.message}`);
        }
    }

    // Send friend request
    async sendFriendRequest(userId, message = '') {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.sendFriendRequest(userId, message);
            
            return {
                success: true,
                data: result,
                message: 'Friend request sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send friend request: ${error.message}`);
        }
    }

    // Accept friend request
    async acceptFriendRequest(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.acceptFriendRequest(userId);
            
            return {
                success: true,
                data: result,
                message: 'Friend request accepted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to accept friend request: ${error.message}`);
        }
    }

    // Change friend alias
    async changeFriendAlias(userId, alias) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }
            if (!alias) {
                throw new Error('Alias is required');
            }

            const result = await this.zaloRepository.changeFriendAlias(userId, alias);
            
            return {
                success: true,
                data: result,
                message: 'Friend alias changed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to change friend alias: ${error.message}`);
        }
    }

    // Block user
    async blockUser(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.blockUser(userId);
            
            return {
                success: true,
                data: result,
                message: 'User blocked successfully'
            };
        } catch (error) {
            throw new Error(`Failed to block user: ${error.message}`);
        }
    }

    // Unblock user
    async unblockUser(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.unblockUser(userId);
            
            return {
                success: true,
                data: result,
                message: 'User unblocked successfully'
            };
        } catch (error) {
            throw new Error(`Failed to unblock user: ${error.message}`);
        }
    }

    // Find user
    async findUser(query) {
        try {
            this.ensureZaloAPI();
            if (!query) {
                throw new Error('Search query is required');
            }

            this.ensureZaloAPI();
            const usersData = await this.zaloRepository.findUser(query);
            const users = usersData.map(userData => {
                const user = User.fromZaloData(userData);
                return UserDTO.fromModel(user);
            });
            
            return {
                success: true,
                data: users.map(user => user.toJSON())
            };
        } catch (error) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }

    // Send report
    async sendReport(userId, reason, description = '') {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }
            if (!reason) {
                throw new Error('Reason is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.sendReport(userId, reason, description);
            
            return {
                success: true,
                data: result,
                message: 'Report sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send report: ${error.message}`);
        }
    }

    // Block view feed
    async blockViewFeed(userId, isBlockFeed = true) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.blockViewFeed(userId, isBlockFeed);
            
            return {
                success: true,
                data: result,
                message: isBlockFeed ? 'User blocked from viewing feed' : 'User unblocked from viewing feed'
            };
        } catch (error) {
            throw new Error(`Failed to block view feed: ${error.message}`);
        }
    }

    // Change account avatar
    async changeAccountAvatar(avatarSource) {
        try {
            this.ensureZaloAPI();
            if (!avatarSource) {
                throw new Error('Avatar source is required');
            }

            const result = await this.zaloRepository.changeAccountAvatar(avatarSource);
            
            return {
                success: true,
                data: result,
                message: 'Account avatar changed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to change account avatar: ${error.message}`);
        }
    }

    // Delete avatar
    async deleteAvatar(photoId) {
        try {
            this.ensureZaloAPI();
            if (!photoId) {
                throw new Error('Photo ID is required');
            }

            const result = await this.zaloRepository.deleteAvatar(photoId);
            
            return {
                success: true,
                data: result,
                message: 'Avatar deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete avatar: ${error.message}`);
        }
    }

    // Find user by phone number
    async findUser(phoneNumber) {
        try {
            this.ensureZaloAPI();
            if (!phoneNumber) {
                throw new Error('Phone number is required');
            }

            const result = await this.zaloRepository.findUser(phoneNumber);
            
            return {
                success: true,
                data: result,
                message: 'User found successfully'
            };
        } catch (error) {
            throw new Error(`Failed to find user: ${error.message}`);
        }
    }

    // Get all friends
    async getAllFriends(count = 20000, page = 1) {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getAllFriends(count, page);
            
            return {
                success: true,
                data: result,
                message: 'Friends retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get all friends: ${error.message}`);
        }
    }

    // Get alias list
    async getAliasList(count = 100, page = 1) {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getAliasList(count, page);
            
            return {
                success: true,
                data: result,
                message: 'Alias list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get alias list: ${error.message}`);
        }
    }

    // Get avatar list
    async getAvatarList() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getAvatarList();
            
            return {
                success: true,
                data: result,
                message: 'Avatar list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get avatar list: ${error.message}`);
        }
    }

    // Get friend board list
    async getFriendBoardList(conversationId) {
        try {
            this.ensureZaloAPI();
            if (!conversationId) {
                throw new Error('Conversation ID is required');
            }

            const result = await this.zaloRepository.getFriendBoardList(conversationId);
            
            return {
                success: true,
                data: result,
                message: 'Friend board list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get friend board list: ${error.message}`);
        }
    }

    // Get friend recommendations
    async getFriendRecommendations() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getFriendRecommendations();
            
            return {
                success: true,
                data: result,
                message: 'Friend recommendations retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get friend recommendations: ${error.message}`);
        }
    }

    // Get friend request status
    async getFriendRequestStatus(friendId) {
        try {
            this.ensureZaloAPI();
            if (!friendId) {
                throw new Error('Friend ID is required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.getFriendRequestStatus(friendId);
            
            return {
                success: true,
                data: result,
                message: 'Friend request status retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get friend request status: ${error.message}`);
        }
    }

    // Get labels
    async getLabels() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getLabels();
            
            return {
                success: true,
                data: result,
                message: 'Labels retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get labels: ${error.message}`);
        }
    }

    // Get mute
    async getMute() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getMute();
            
            return {
                success: true,
                data: result,
                message: 'Mute list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get mute list: ${error.message}`);
        }
    }

    // Get own ID
    async getOwnId() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getOwnId();
            
            return {
                success: true,
                data: result,
                message: 'Own ID retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get own ID: ${error.message}`);
        }
    }

    // Get QR
    async getQR(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.getQR(userId);
            
            return {
                success: true,
                data: result,
                message: 'QR retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get QR: ${error.message}`);
        }
    }

    // Get related friend group
    async getRelatedFriendGroup(friendId) {
        try {
            this.ensureZaloAPI();
            if (!friendId) {
                throw new Error('Friend ID is required');
            }

            const result = await this.zaloRepository.getRelatedFriendGroup(friendId);
            
            return {
                success: true,
                data: result,
                message: 'Related friend group retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get related friend group: ${error.message}`);
        }
    }

    // Get sent friend request
    async getSentFriendRequest() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getSentFriendRequest();
            
            return {
                success: true,
                data: result,
                message: 'Sent friend request retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get sent friend request: ${error.message}`);
        }
    }

    // Get user info
    async getUserInfo(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.getUserInfo(userId);
            
            return {
                success: true,
                data: result,
                message: 'User info retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get user info: ${error.message}`);
        }
    }

    // Get last online
    async getLastOnline(uid) {
        try {
            this.ensureZaloAPI();
            if (!uid) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.lastOnline(uid);
            
            return {
                success: true,
                data: result,
                message: 'Last online status retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get last online status: ${error.message}`);
        }
    }

    // Remove friend
    async removeFriend(friendId) {
        try {
            this.ensureZaloAPI();
            if (!friendId) {
                throw new Error('Friend ID is required');
            }

            const result = await this.zaloRepository.removeFriend(friendId);
            
            return {
                success: true,
                data: result,
                message: 'Friend removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove friend: ${error.message}`);
        }
    }

    // Remove friend alias
    async removeFriendAlias(friendId) {
        try {
            this.ensureZaloAPI();
            if (!friendId) {
                throw new Error('Friend ID is required');
            }

            const result = await this.zaloRepository.removeFriendAlias(friendId);
            
            return {
                success: true,
                data: result,
                message: 'Friend alias removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove friend alias: ${error.message}`);
        }
    }

    // Reuse avatar
    async reuseAvatar(photoId) {
        try {
            this.ensureZaloAPI();
            if (!photoId) {
                throw new Error('Photo ID is required');
            }

            const result = await this.zaloRepository.reuseAvatar(photoId);
            
            return {
                success: true,
                data: result,
                message: 'Avatar reused successfully'
            };
        } catch (error) {
            throw new Error(`Failed to reuse avatar: ${error.message}`);
        }
    }

    // Send friend request
    async sendFriendRequest(msg, userId) {
        try {
            this.ensureZaloAPI();
            if (!msg) {
                throw new Error('Message is required');
            }
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.sendFriendRequest(msg, userId);
            
            return {
                success: true,
                data: result,
                message: 'Friend request sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send friend request: ${error.message}`);
        }
    }

    // Send report
    async sendReport(options, threadId, type = 1) {
        try {
            this.ensureZaloAPI();
            if (!options || !options.reason) {
                throw new Error('Options with reason is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.sendReport(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Report sent successfully'
            };
        } catch (error) {
            throw new Error(`Failed to send report: ${error.message}`);
        }
    }

    // Unblock user
    async unblockUser(userId) {
        try {
            this.ensureZaloAPI();
            if (!userId) {
                throw new Error('User ID is required');
            }

            const result = await this.zaloRepository.unblockUser(userId);
            
            return {
                success: true,
                data: result,
                message: 'User unblocked successfully'
            };
        } catch (error) {
            throw new Error(`Failed to unblock user: ${error.message}`);
        }
    }

    // Undo friend request
    async undoFriendRequest(friendId) {
        try {
            this.ensureZaloAPI();
            if (!friendId) {
                throw new Error('Friend ID is required');
            }

            const result = await this.zaloRepository.undoFriendRequest(friendId);
            
            return {
                success: true,
                data: result,
                message: 'Friend request undone successfully'
            };
        } catch (error) {
            throw new Error(`Failed to undo friend request: ${error.message}`);
        }
    }

    // Update labels
    async updateLabels(payload) {
        try {
            this.ensureZaloAPI();
            if (!payload || !payload.labelData || !payload.version) {
                throw new Error('Payload with labelData and version is required');
            }

            const result = await this.zaloRepository.updateLabels(payload);
            
            return {
                success: true,
                data: result,
                message: 'Labels updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update labels: ${error.message}`);
        }
    }

    // Update language
    async updateLang(language) {
        try {
            this.ensureZaloAPI();
            if (!language) {
                throw new Error('Language is required');
            }

            const result = await this.zaloRepository.updateLang(language);
            
            return {
                success: true,
                data: result,
                message: 'Language updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update language: ${error.message}`);
        }
    }

    // Update profile
    async updateProfile(payload) {
        try {
            this.ensureZaloAPI();
            if (!payload || !payload.profile) {
                throw new Error('Payload with profile is required');
            }

            const { profile, biz } = payload;

            if (!profile.name || !profile.dob || !profile.gender) {
                throw new Error('Profile with name, dob, and gender is required');
            }

            const result = await this.zaloRepository.updateProfile(payload);
            
            return {
                success: true,
                data: result,
                message: 'Profile updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }

    // Update settings
    async updateSettings(type, value) {
        try {
            this.ensureZaloAPI();
            if (!type) {
                throw new Error('Type is required');
            }
            if (value === undefined || value === null) {
                throw new Error('Value is required');
            }

            const result = await this.zaloRepository.updateSettings(type, value);
            
            return {
                success: true,
                data: result,
                message: 'Settings updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update settings: ${error.message}`);
        }
    }
}

module.exports = UserService;
