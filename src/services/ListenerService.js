// ListenerService - Business logic for listener operations
const ZaloRepository = require('../repositories/ZaloRepository');

class ListenerService {
    constructor() {
        this.zaloRepository = new ZaloRepository(global.zaloAPI);
        this.listeners = new Map();
    }

    // Start listener
    async startListener() {
        try {
            const result = await this.zaloRepository.startListener();
            
            return {
                success: true,
                data: result,
                message: 'Listener started successfully'
            };
        } catch (error) {
            throw new Error(`Failed to start listener: ${error.message}`);
        }
    }

    // Stop listener
    async stopListener() {
        try {
            const result = await this.zaloRepository.stopListener();
            
            return {
                success: true,
                data: result,
                message: 'Listener stopped successfully'
            };
        } catch (error) {
            throw new Error(`Failed to stop listener: ${error.message}`);
        }
    }

    // Add message listener
    addMessageListener(callback) {
        try {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }

            this.zaloRepository.addMessageListener(callback);
            
            return {
                success: true,
                message: 'Message listener added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add message listener: ${error.message}`);
        }
    }

    // Add reaction listener
    addReactionListener(callback) {
        try {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }

            this.zaloRepository.addReactionListener(callback);
            
            return {
                success: true,
                message: 'Reaction listener added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add reaction listener: ${error.message}`);
        }
    }

    // Add undo listener
    addUndoListener(callback) {
        try {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }

            this.zaloRepository.addUndoListener(callback);
            
            return {
                success: true,
                message: 'Undo listener added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add undo listener: ${error.message}`);
        }
    }

    // Add group event listener
    addGroupEventListener(callback) {
        try {
            if (typeof callback !== 'function') {
                throw new Error('Callback must be a function');
            }

            this.zaloRepository.addGroupEventListener(callback);
            
            return {
                success: true,
                message: 'Group event listener added successfully'
            };
        } catch (error) {
            throw new Error(`Failed to add group event listener: ${error.message}`);
        }
    }

    // Remove listener
    removeListener(eventType, callback) {
        try {
            if (!eventType) {
                throw new Error('Event type is required');
            }

            this.zaloRepository.removeListener(eventType, callback);
            
            return {
                success: true,
                message: 'Listener removed successfully'
            };
        } catch (error) {
            throw new Error(`Failed to remove listener: ${error.message}`);
        }
    }

    // Get listener status
    getListenerStatus() {
        try {
            const result = this.zaloRepository.getListenerStatus();
            
            return {
                success: true,
                data: result,
                message: 'Listener status retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get listener status: ${error.message}`);
        }
    }
}

module.exports = ListenerService;
