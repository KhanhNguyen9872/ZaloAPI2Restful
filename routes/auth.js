const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /api/auth/access-token - Lấy access token
router.get('/access-token', authController.getAccessToken);

// POST /api/auth/refresh-token - Làm mới access token
router.post('/refresh-token', authController.refreshToken);

// GET /api/auth/user-info - Lấy thông tin user
router.get('/user-info', authController.getUserInfo);

module.exports = router;
