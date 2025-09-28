// NoteController - Clean Architecture controller for note operations
const NoteService = require('../services/NoteService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class NoteController {
    constructor() {
        this.noteService = new NoteService();
        this.validation = new ValidationMiddleware();
    }

    // Create note
    createNote = async (req, res) => {
        try {
            const { title, pinAct } = req.body;
            const { threadId } = req.params;
            const { threadType = 1 } = req.query;
            
            const result = await this.noteService.createNote({
                title,
                pinAct
            }, threadId, parseInt(threadType));
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Edit note
    editNote = async (req, res) => {
        try {
            const { groupId } = req.params;
            const { title, topicId, pinAct } = req.body;
            
            const result = await this.noteService.editNote({
                title,
                topicId,
                pinAct
            }, groupId);
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete note
    deleteNote = async (req, res) => {
        try {
            const { noteId } = req.params;
            const { threadId } = req.body;
            const { threadType = 1 } = req.query;
            
            const result = await this.noteService.deleteNote(noteId, threadId, parseInt(threadType));
            
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateCreateNote = [
        ValidationMiddleware.validateRequired(['title']),
        (req, res, next) => next()
    ];

    validateEditNote = [
        ValidationMiddleware.validateRequired(['title', 'topicId']),
        (req, res, next) => next()
    ];

    validateDeleteNote = [
        ValidationMiddleware.validateRequired(['threadId']),
        (req, res, next) => next()
    ];
}

module.exports = NoteController;
