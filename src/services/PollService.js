// PollService - Business logic for poll operations
const ZaloRepository = require('../repositories/ZaloRepository');

class PollService {
    constructor() {
        this.zaloRepository = new ZaloRepository();
    }

    // Get poll detail
    async getPollDetail(pollId) {
        try {
            if (!pollId) {
                throw new Error('Poll ID is required');
            }

            const result = await this.zaloRepository.getPollDetail(pollId);
            
            return {
                success: true,
                data: result,
                message: 'Poll detail retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get poll detail: ${error.message}`);
        }
    }

    // Lock poll
    async lockPoll(pollId) {
        try {
            if (!pollId) {
                throw new Error('Poll ID is required');
            }

            const result = await this.zaloRepository.lockPoll(pollId);
            
            return {
                success: true,
                data: result,
                message: 'Poll locked successfully'
            };
        } catch (error) {
            throw new Error(`Failed to lock poll: ${error.message}`);
        }
    }
}

module.exports = PollService;
