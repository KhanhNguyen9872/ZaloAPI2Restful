// ReminderService - Business logic for reminder operations
const ZaloRepository = require('../repositories/ZaloRepository');

class ReminderService {
    constructor() {
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
    }

    // Create reminder
    async createReminder(options, threadId, type = 1) {
        try {
            if (!options) {
                throw new Error('Reminder options are required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const { title, emoji, startTime, repeat } = options;

            if (!title) {
                throw new Error('Title is required');
            }

            const result = await this.zaloRepository.createReminder(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Reminder created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create reminder: ${error.message}`);
        }
    }

    // Edit reminder
    async editReminder(options, groupId, type = 1) {
        try {
            if (!options) {
                throw new Error('Reminder options are required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const { title, topicId, emoji, startTime, repeat } = options;

            if (!title) {
                throw new Error('Title is required');
            }
            if (!topicId) {
                throw new Error('Topic ID is required');
            }

            const result = await this.zaloRepository.editReminder(options, groupId, type);
            
            return {
                success: true,
                data: result,
                message: 'Reminder edited successfully'
            };
        } catch (error) {
            throw new Error(`Failed to edit reminder: ${error.message}`);
        }
    }

    // Get list reminder
    async getListReminder(options, threadId, type = 1) {
        try {
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.getListReminder(options, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'List reminder retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get list reminder: ${error.message}`);
        }
    }

    // Get reminder
    async getReminder(reminderId) {
        try {
            if (!reminderId) {
                throw new Error('Reminder ID is required');
            }

            const result = await this.zaloRepository.getReminder(reminderId);
            
            return {
                success: true,
                data: result,
                message: 'Reminder retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get reminder: ${error.message}`);
        }
    }

    // Get reminder responses
    async getReminderResponses(reminderId) {
        try {
            if (!reminderId) {
                throw new Error('Reminder ID is required');
            }

            const result = await this.zaloRepository.getReminderResponses(reminderId);
            
            return {
                success: true,
                data: result,
                message: 'Reminder responses retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get reminder responses: ${error.message}`);
        }
    }

    // Remove reminder
    async removeReminder(reminderId, threadId, type = 1) {
        try {
            if (!reminderId) {
                throw new Error('Reminder ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.removeReminder(reminderId, threadId, type);
            
            return {
                success: true,
                data: result,
                message: 'Reminder removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove reminder: ${error.message}`);
        }
    }
}

module.exports = ReminderService;
