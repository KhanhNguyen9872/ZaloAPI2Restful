const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

// Quản lý poll
router.post('/', pollController.createPoll);                        // Tạo poll
router.put('/:pollId/lock', pollController.lockPoll);              // Khóa poll
// router.get('/:pollId', pollController.getPollDetail);               // Lấy chi tiết poll - function chưa được implement

module.exports = router;
