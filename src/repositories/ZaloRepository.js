// ZaloRepository - Implementation of IZaloRepository
const { ThreadType } = require('zca-js');
const { Zalo } = require('zca-js');
const sharp = require('sharp');
const fs = require('fs');
const IZaloRepository = require('../interfaces/IZaloRepository');

class ZaloRepository extends IZaloRepository {
    constructor(zaloAPI = null) {
        super();
        this.zaloAPI = zaloAPI;
        this.isInitialized = !!zaloAPI;
    }

    // Image metadata getter for zca-js v2
    async imageMetadataGetter(filePath) {
        try {
            const data = await fs.promises.readFile(filePath);
            const metadata = await sharp(data).metadata();
            return {
                height: metadata.height,
                width: metadata.width,
                size: metadata.size || data.length,
            };
        } catch (error) {
            console.error('Error getting image metadata:', error);
            return null;
        }
    }

    // Initialize Zalo API
    async initialize() {
        if (this.isInitialized) return this.zaloAPI;

        // Check if global zaloAPI exists (from server.js)
        if (global.zaloAPI) {
            this.zaloAPI = global.zaloAPI;
            this.isInitialized = true;
            return this.zaloAPI;
        }

        try {
            const zalo = new Zalo({
                imageMetadataGetter: this.imageMetadataGetter
            });

            // Check for existing credentials
            const cookies = process.env.ZALO_COOKIES;
            const imei = process.env.ZALO_IMEI;
            const userAgent = process.env.ZALO_USER_AGENT;

            if (cookies && imei && userAgent) {
                const credentials = {
                    cookie: JSON.parse(Buffer.from(cookies, 'base64').toString()),
                    imei: imei,
                    userAgent: userAgent,
                    language: process.env.ZALO_LANGUAGE || 'vi'
                };

                this.zaloAPI = await zalo.login(credentials);
                this.isInitialized = true;
            }

            return this.zaloAPI;
        } catch (error) {
            console.error('Error initializing Zalo API:', error);
            throw error;
        }
    }

    // Authentication methods
    async loginQR(qrPath, userAgent, language) {
        try {
            const zalo = new Zalo({
                imageMetadataGetter: this.imageMetadataGetter
            });

            this.zaloAPI = await zalo.loginQR({
                qrPath: qrPath,
                userAgent: userAgent,
                language: language
            }, (event) => {
                console.log('QR Login Event:', event);
            });

            this.isInitialized = true;
            return this.zaloAPI;
        } catch (error) {
            console.error('QR Login Error:', error);
            throw error;
        }
    }

    async loginCookie(credentials) {
        try {
            const zalo = new Zalo({
                imageMetadataGetter: this.imageMetadataGetter
            });

            this.zaloAPI = await zalo.login(credentials);
            this.isInitialized = true;
            return this.zaloAPI;
        } catch (error) {
            console.error('Cookie Login Error:', error);
            throw error;
        }
    }

    async loginWithProxy(credentials, proxy) {
        try {
            const zalo = new Zalo({
                imageMetadataGetter: this.imageMetadataGetter
            });

            this.zaloAPI = await zalo.login(credentials, { proxy });
            this.isInitialized = true;
            return this.zaloAPI;
        } catch (error) {
            console.error('Proxy Login Error:', error);
            throw error;
        }
    }

    async getContext() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.getContext();
    }

    async getCookie() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.getCookie();
    }

    async getQR() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.getQR();
    }

    async getOwnId() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.getOwnId();
    }

    // Message methods
    async sendMessage(message, threadId, type = 0) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendMessage(message, threadId, type);
    }

    async sendVoice(voicePath, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendVoice(voicePath, threadId, threadType);
    }

    async sendSticker(stickerId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendSticker(stickerId, threadId, threadType);
    }

    async sendCard(cardData, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendCard(cardData, threadId, threadType);
    }

    async deleteMessage(messageId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteMessage(messageId);
    }

    async undo(messageId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.undo(messageId, threadId, threadType);
    }

    async addReaction(reaction, messageId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addReaction(reaction, messageId, threadId, threadType);
    }

    async removeReaction(messageId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeReaction(messageId, threadId, threadType);
    }

    async getStickers(keyword) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getStickers(keyword);
    }

    async getStickersDetail(stickerIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getStickersDetail(stickerIds);
    }

    async pinConversations(threadIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.pinConversations(threadIds);
    }

    async unpinConversations(threadIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.unpinConversations(threadIds);
    }

    // User methods
    async fetchAccountInfo() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.fetchAccountInfo();
    }

    async getUserInfo(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getUserInfo(userId);
    }

    async getAllFriends() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAllFriends();
    }

    async sendFriendRequest(userId, message) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendFriendRequest(userId, message);
    }

    async acceptFriendRequest(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.acceptFriendRequest(userId);
    }

    async changeFriendAlias(userId, alias) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.changeFriendAlias(userId, alias);
    }

    async blockUser(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.blockUser(userId);
    }

    async unblockUser(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.unblockUser(userId);
    }

    async findUser(query) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.findUser(query);
    }

    async sendReport(userId, reason, description) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendReport(userId, reason, description);
    }

    // Group methods
    async getAllGroups() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAllGroups();
    }

    async getGroupInfo(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupInfo(groupId);
    }

    async createGroup(options) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createGroup(options);
    }

    async disperseGroup(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.disperseGroup(groupId);
    }

    async addUserToGroup(groupId, userIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addUserToGroup(groupId, userIds);
    }

    async removeUserFromGroup(groupId, userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeUserFromGroup(groupId, userId);
    }

    async addGroupDeputy(groupId, userIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addGroupDeputy(groupId, userIds);
    }

    async removeGroupDeputy(groupId, userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeGroupDeputy(groupId, userId);
    }

    async changeGroupName(name, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.changeGroupName(name, groupId);
    }

    async changeGroupAvatar(avatarPath, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.changeGroupAvatar(avatarPath, groupId);
    }

    async changeGroupOwner(memberId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.changeGroupOwner(memberId, groupId);
    }

    // Note methods
    async createNote(noteData, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createNote(noteData, threadId, threadType);
    }

    async editNote(noteId, noteData, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.editNote(noteId, noteData, threadId, threadType);
    }

    async deleteNote(noteId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteNote(noteId, threadId, threadType);
    }

    // Poll methods
    async createPoll(pollData, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createPoll(pollData, threadId, threadType);
    }

    async lockPoll(pollId, threadId, threadType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.lockPoll(pollId, threadId, threadType);
    }

    // Additional group methods
    async addGroupBlockedMember(memberId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addGroupBlockedMember(memberId, groupId);
    }

    async removeGroupBlockedMember(memberId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeGroupBlockedMember(memberId, groupId);
    }

    // Quick message methods
    async addQuickMessage(addPayload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addQuickMessage(addPayload);
    }

    async getQuickMessages() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getQuickMessages();
    }

    async deleteQuickMessage(keyword) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteQuickMessage(keyword);
    }

    // Listener methods
    startListener() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.listener.start();
    }

    stopListener() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.listener.stop();
    }

    isListenerRunning() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.listener && this.zaloAPI.listener.isRunning();
    }

    // Get listener instance for event handling
    getListener() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return this.zaloAPI.listener;
    }

    // Additional features from tutorial
    async addUnreadMark(threadId, type = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.addUnreadMark(threadId, type);
    }

    async blockViewFeed(userId, isBlockFeed = true) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.blockViewFeed(userId, isBlockFeed);
    }

    async changeAccountAvatar(avatarSource) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.changeAccountAvatar(avatarSource);
    }

    // Business features
    async createAutoReply(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createAutoReply(payload);
    }

    async createCatalog(catalogName) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createCatalog(catalogName);
    }

    // Advanced features
    async createProductCatalog(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createProductCatalog(payload);
    }

    async createReminder(options, threadId, type = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.createReminder(options, threadId, type);
    }

    // Delete methods
    async deleteAutoReply(id) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteAutoReply(id);
    }

    async deleteAvatar(photoId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteAvatar(photoId);
    }

    async deleteCatalog(catalogId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteCatalog(catalogId);
    }

    async deleteChat(lastMessage, threadId, type = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteChat(lastMessage, threadId, type);
    }

    async deleteGroupInviteBox(groupId, blockFutureInvite = false) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteGroupInviteBox(groupId, blockFutureInvite);
    }

    async deleteMessage(dest, onlyMe = true) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteMessage(dest, onlyMe);
    }

    async deleteProductCatalog(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.deleteProductCatalog(payload);
    }

    // Additional methods
    async disableGroupLink(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.disableGroupLink(groupId);
    }

    async enableGroupLink(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.enableGroupLink(groupId);
    }

    async editNote(options, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.editNote(options, groupId);
    }

    async editReminder(options, groupId, type = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.editReminder(options, groupId, type);
    }

    // Final methods
    async findUser(phoneNumber) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.findUser(phoneNumber);
    }

    async forwardMessage(payload, threadIds, type = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.forwardMessage(payload, threadIds, type);
    }

    async getAliasList(count = 100, page = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAliasList(count, page);
    }

    async getAllFriends(count = 20000, page = 1) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAllFriends(count, page);
    }

    async getAllGroups() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAllGroups();
    }

    // Get methods
    async getArchivedChatList() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getArchivedChatList();
    }

    async getAutoDeleteChat() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAutoDeleteChat();
    }

    async getAutoReplyList() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAutoReplyList();
    }

    async getAvatarList() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getAvatarList();
    }

    async getBizAccount() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getBizAccount();
    }

    async getCatalogList(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getCatalogList(payload);
    }

    // Context and friend methods
    async getContext() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getContext();
    }

    async getCookie() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getCookie();
    }

    async getFriendBoardList(conversationId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getFriendBoardList(conversationId);
    }

    async getFriendRecommendations() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getFriendRecommendations();
    }

    async getFriendRequestStatus(friendId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getFriendRequestStatus(friendId);
    }

    async getGroupBlockedMember(payload, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupBlockedMember(payload, groupId);
    }

    // Group info methods
    async getGroupInfo(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupInfo(groupId);
    }

    async getGroupInviteBoxInfo(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupInviteBoxInfo(payload);
    }

    async getGroupInviteBoxList(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupInviteBoxList(payload);
    }

    async getGroupLinkDetail(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupLinkDetail(groupId);
    }

    async getGroupLinkInfo(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupLinkInfo(payload);
    }

    async getGroupMembersInfo(memberId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getGroupMembersInfo(memberId);
    }

    async getHiddenConversations() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getHiddenConversations();
    }

    // Additional info methods
    async getLabels() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getLabels();
    }

    async getListBoard(options, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getListBoard(options, groupId);
    }

    async getListReminder(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getListReminder(options, threadId, type);
    }

    async getMute() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getMute();
    }

    async getOwnId() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getOwnId();
    }

    async getPendingGroupMembers(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getPendingGroupMembers(groupId);
    }

    // Final missing methods
    async getPinConversations() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getPinConversations();
    }

    async getPollDetail(pollId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getPollDetail(pollId);
    }

    async getProductCatalogList(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getProductCatalogList(payload);
    }

    async getQR(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getQR(userId);
    }

    async getQuickMessageList() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getQuickMessageList();
    }

    async getRelatedFriendGroup(friendId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getRelatedFriendGroup(friendId);
    }

    async getReminder(reminderId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getReminder(reminderId);
    }

    // Ultimate missing methods
    async getReminderResponses(reminderId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getReminderResponses(reminderId);
    }

    async getSentFriendRequest() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getSentFriendRequest();
    }

    async getStickers(keyword) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getStickers(keyword);
    }

    async getStickersDetail(stickerIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getStickersDetail(stickerIds);
    }

    async getUnreadMark() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getUnreadMark();
    }

    async getUserInfo(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.getUserInfo(userId);
    }

    // Final ultimate methods
    async inviteUserToGroups(userId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.inviteUserToGroups(userId, groupId);
    }

    async joinGroupInviteBox(groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.joinGroupInviteBox(groupId);
    }

    async joinGroupLink(link) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.joinGroupLink(link);
    }

    async keepAlive() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.keepAlive();
    }

    async lastOnline(uid) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.lastOnline(uid);
    }

    async leaveGroup(groupId, silent) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.leaveGroup(groupId, silent);
    }

    async lockPoll(pollId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.lockPoll(pollId);
    }

    // Final ultimate ultimate methods
    async parseLink(link) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.parseLink(link);
    }

    async removeFriend(friendId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeFriend(friendId);
    }

    async removeFriendAlias(friendId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeFriendAlias(friendId);
    }

    async removeGroupBlockedMember(memberId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeGroupBlockedMember(memberId, groupId);
    }

    async removeQuickMessage(itemIds) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeQuickMessage(itemIds);
    }

    // Final ultimate ultimate ultimate methods
    async removeReminder(reminderId, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeReminder(reminderId, threadId, type);
    }

    async removeUnreadMark(threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeUnreadMark(threadId, type);
    }

    async removeUserFromGroup(memberId, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.removeUserFromGroup(memberId, groupId);
    }

    async resetHiddenConversPin() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.resetHiddenConversPin();
    }

    // Final ultimate ultimate ultimate ultimate methods
    async reuseAvatar(photoId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.reuseAvatar(photoId);
    }

    async reviewPendingMemberRequest(payload, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.reviewPendingMemberRequest(payload, groupId);
    }

    async sendBankCard(payload, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendBankCard(payload, threadId, type);
    }

    async sendCard(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendCard(options, threadId, type);
    }

    // Final ultimate ultimate ultimate ultimate ultimate methods
    async sendDeliveredEvent(isSeen, messages, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendDeliveredEvent(isSeen, messages, type);
    }

    async sendFriendRequest(msg, userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendFriendRequest(msg, userId);
    }

    async sendLink(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendLink(options, threadId, type);
    }

    // Final missing features v2
    async sendReport(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendReport(options, threadId, type);
    }

    async sendSeenEvent(messages, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendSeenEvent(messages, threadId, type);
    }

    async sendSticker(sticker, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendSticker(sticker, threadId, type);
    }

    async sendTypingEvent(threadId, type, destType) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendTypingEvent(threadId, type, destType);
    }

    // Final missing features v3
    async sendVideo(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendVideo(options, threadId, type);
    }

    async sendVoice(options, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.sendVoice(options, threadId, type);
    }

    async setHiddenConversations(hidden, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.setHiddenConversations(hidden, threadId, type);
    }

    async setMute(params, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.setMute(params, threadId, type);
    }

    async setPinnedConversations(pinned, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.setPinnedConversations(pinned, threadId, type);
    }

    // Final missing features v4
    async unblockUser(userId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.unblockUser(userId);
    }

    async undo(message) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.undo(message);
    }

    async undoFriendRequest(friendId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.undoFriendRequest(friendId);
    }

    async updateAutoDeleteChat(ttl, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateAutoDeleteChat(ttl, threadId, type);
    }

    async updateAutoReply(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateAutoReply(payload);
    }

    async updateCatalog(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateCatalog(payload);
    }

    async updateGroupSettings(options, groupId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateGroupSettings(options, groupId);
    }

    // Final missing features v5
    async updateHiddenConversPin(pin) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateHiddenConversPin(pin);
    }

    async updateLabels(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateLabels(payload);
    }

    async updateLang(language) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateLang(language);
    }

    async updateProductCatalog(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateProductCatalog(payload);
    }

    // Final missing features v6
    async updateProfile(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateProfile(payload);
    }

    async updateQuickMessage(updatePayload, itemId) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateQuickMessage(updatePayload, itemId);
    }

    async updateSettings(type, value) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.updateSettings(type, value);
    }

    // Final missing features v7
    async uploadAttachment(source, threadId, type) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.uploadAttachment(source, threadId, type);
    }

    async uploadProductPhoto(payload) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.uploadProductPhoto(payload);
    }

    // Listener methods
    async startListener() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.listener.start();
    }

    async stopListener() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return await this.zaloAPI.listener.stop();
    }

    addMessageListener(callback) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        this.zaloAPI.listener.on("message", callback);
    }

    addReactionListener(callback) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        this.zaloAPI.listener.on("reaction", callback);
    }

    addUndoListener(callback) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        this.zaloAPI.listener.on("undo", callback);
    }

    addGroupEventListener(callback) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        this.zaloAPI.listener.on("group_event", callback);
    }

    removeListener(eventType, callback) {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        this.zaloAPI.listener.off(eventType, callback);
    }

    getListenerStatus() {
        if (!this.zaloAPI) throw new Error('Zalo API not initialized');
        return {
            isRunning: this.zaloAPI.listener.isRunning || false,
            listeners: this.zaloAPI.listener.listeners || {}
        };
    }
}

module.exports = ZaloRepository;
