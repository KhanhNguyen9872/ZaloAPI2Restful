// SystemService - Business logic for system operations
const ZaloRepository = require('../repositories/ZaloRepository');

class SystemService {
    constructor() {
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Keep alive
    async keepAlive() {
        try {
            const result = await this.zaloRepository.keepAlive();
            
            return {
                success: true,
                data: result,
                message: 'Keep alive successful'
            };
        } catch (error) {
            throw new Error(`Failed to keep alive: ${error.message}`);
        }
    }

    // Parse link
    async parseLink(link) {
        try {
            if (!link) {
                throw new Error('Link is required');
            }

            const result = await this.zaloRepository.parseLink(link);
            
            return {
                success: true,
                data: result,
                message: 'Link parsed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to parse link: ${error.message}`);
        }
    }
}

module.exports = SystemService;
