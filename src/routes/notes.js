// Notes routes - Clean Architecture
const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');
const AuthMiddleware = require('../middleware/authMiddleware');

const noteController = new NoteController();
const authMiddleware = new AuthMiddleware();

// Create note
router.post('/:threadId', 
    authMiddleware.requireAuth(),
    noteController.validateCreateNote,
    noteController.createNote
);

// Edit note
router.put('/:groupId', 
    authMiddleware.requireAuth(),
    noteController.validateEditNote,
    noteController.editNote
);

// Delete note
router.delete('/:noteId', 
    authMiddleware.requireAuth(),
    noteController.validateDeleteNote,
    noteController.deleteNote
);

module.exports = router;
