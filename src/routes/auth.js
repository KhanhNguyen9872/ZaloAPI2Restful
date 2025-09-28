// Auth Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/authMiddleware');

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// Đăng nhập
router.post('/login/qr', 
    authController.validateLoginQR,
    authController.loginQR
);

router.post('/login/cookie', 
    authController.validateLoginCookie,
    authController.loginCookie
);

router.post('/login/proxy', 
    authController.validateLoginProxy,
    authController.loginWithProxy
);

// Quản lý tài khoản
router.get('/status', authController.getStatus);
router.get('/context', authController.getContext);
router.get('/cookie', authController.getCookie);
router.get('/qr', authController.getQR);
router.get('/own-id', authController.getOwnId);

// Đăng xuất
router.post('/logout', authController.logout);

module.exports = router;
