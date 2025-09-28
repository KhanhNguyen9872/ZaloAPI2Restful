const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng nhập
router.post('/login/qr', authController.loginQR);                    // Đăng nhập bằng QR
router.post('/login/cookie', authController.loginCookie);            // Đăng nhập bằng Cookie
router.post('/login/proxy', authController.loginWithProxy);          // Đăng nhập với Proxy

// Quản lý tài khoản
router.get('/status', authController.getStatus);                    // Trạng thái đăng nhập
router.get('/context', authController.getContext);                  // Lấy context
router.get('/cookie', authController.getCookie);                    // Lấy cookie
router.get('/qr', authController.getQR);                            // Lấy QR code
router.get('/own-id', authController.getOwnId);                     // Lấy ID của mình

// Đăng xuất
router.post('/logout', authController.logout);                      // Đăng xuất

module.exports = router;
