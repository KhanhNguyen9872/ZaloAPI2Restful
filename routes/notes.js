const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Quản lý ghi chú
router.post('/', noteController.createNote);                        // Tạo ghi chú
router.put('/:noteId', noteController.editNote);                    // Sửa ghi chú
router.delete('/:noteId', noteController.deleteNote);             // Xóa ghi chú

module.exports = router;
