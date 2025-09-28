// QuickMessageService - Business logic for quick message operations
const ZaloRepository = require('../repositories/ZaloRepository');

class QuickMessageService {
    constructor() {
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Helper method để đảm bảo sử dụng global instance
    ensureZaloAPI() {
        if (global.zaloAPI && !this.zaloRepository.zaloAPI) {
            this.zaloRepository.zaloAPI = global.zaloAPI;
            this.zaloRepository.isInitialized = true;
        }
    }

    // Get quick message list
    async getQuickMessageList() {
        try {
            this.ensureZaloAPI();
            const result = await this.zaloRepository.getQuickMessageList();
            
            return {
                success: true,
                data: result,
                message: 'Quick message list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get quick message list: ${error.message}`);
        }
    }

    // Remove quick message
    async removeQuickMessage(itemIds) {
        try {
            this.ensureZaloAPI();
            if (!itemIds) {
                throw new Error('Item IDs are required');
            }

            this.ensureZaloAPI();
            const result = await this.zaloRepository.removeQuickMessage(itemIds);
            
            return {
                success: true,
                data: result,
                message: 'Quick message removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove quick message: ${error.message}`);
        }
    }

    // Update quick message
    async updateQuickMessage(updatePayload, itemId) {
        try {
            this.ensureZaloAPI();
            if (!updatePayload || !updatePayload.keyword || !updatePayload.title) {
                throw new Error('Update payload with keyword and title is required');
            }
            if (!itemId) {
                throw new Error('Item ID is required');
            }

            const result = await this.zaloRepository.updateQuickMessage(updatePayload, itemId);
            
            return {
                success: true,
                data: result,
                message: 'Quick message updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update quick message: ${error.message}`);
        }
    }
}

module.exports = QuickMessageService;