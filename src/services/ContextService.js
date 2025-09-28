// ContextService - Business logic for context operations
const ZaloRepository = require('../repositories/ZaloRepository');

class ContextService {
    constructor() {
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Get context
    async getContext() {
        try {
            const result = await this.zaloRepository.getContext();
            
            return {
                success: true,
                data: result,
                message: 'Context retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get context: ${error.message}`);
        }
    }

    // Get cookie
    async getCookie() {
        try {
            const result = await this.zaloRepository.getCookie();
            
            return {
                success: true,
                data: result,
                message: 'Cookie retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get cookie: ${error.message}`);
        }
    }
}

module.exports = ContextService;
