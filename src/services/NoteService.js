// NoteService - Business logic for note operations
const ZaloRepository = require('../repositories/ZaloRepository');

class NoteService {
    constructor() {
        this.zaloRepository = new ZaloRepository();
    }

    // Create note
    async createNote(noteData, threadId, threadType) {
        try {
            if (!noteData) {
                throw new Error('Note data is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const { title, pinAct } = noteData;

            if (!title) {
                throw new Error('Title is required');
            }

            const result = await this.zaloRepository.createNote(noteData, threadId, threadType);
            
            return {
                success: true,
                data: result,
                message: 'Note created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create note: ${error.message}`);
        }
    }

    // Edit note
    async editNote(options, groupId) {
        try {
            if (!options) {
                throw new Error('Note options are required');
            }
            if (!groupId) {
                throw new Error('Group ID is required');
            }

            const { title, topicId, pinAct } = options;

            if (!title) {
                throw new Error('Title is required');
            }
            if (!topicId) {
                throw new Error('Topic ID is required');
            }

            const result = await this.zaloRepository.editNote(options, groupId);
            
            return {
                success: true,
                data: result,
                message: 'Note edited successfully'
            };
        } catch (error) {
            throw new Error(`Failed to edit note: ${error.message}`);
        }
    }

    // Delete note
    async deleteNote(noteId, threadId, threadType) {
        try {
            if (!noteId) {
                throw new Error('Note ID is required');
            }
            if (!threadId) {
                throw new Error('Thread ID is required');
            }

            const result = await this.zaloRepository.deleteNote(noteId, threadId, threadType);
            
            return {
                success: true,
                data: result,
                message: 'Note deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete note: ${error.message}`);
        }
    }
}

module.exports = NoteService;
