// QuickMessageService - Business logic for quick message operations
const ZaloRepository = require('../repositories/ZaloRepository');

class QuickMessageService {
    constructor() {
        this.zaloRepository = new ZaloRepository();
    }

    // Get quick message list
    async getQuickMessageList() {
        try {
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
            if (!itemIds) {
                throw new Error('Item IDs are required');
            }

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