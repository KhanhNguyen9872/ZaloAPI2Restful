const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Thông tin tài khoản
router.get('/me', userController.fetchAccountInfo);                 // Thông tin tài khoản
router.get('/own-id', userController.getOwnId);                    // ID của mình
router.get('/info/:userId', userController.getUserInfo);           // Thông tin user

// Quản lý bạn bè
router.get('/friends', userController.getAllFriends);              // Danh sách bạn bè
router.post('/friends/request', userController.sendFriendRequest); // Gửi lời mời kết bạn
router.post('/friends/accept', userController.acceptFriendRequest); // Chấp nhận lời mời kết bạn
router.put('/friends/:userId/alias', userController.changeFriendAlias); // Đổi tên hiển thị bạn bè
router.post('/friends/:userId/block', userController.blockUser);   // Chặn user
router.delete('/friends/:userId/block', userController.unblockUser); // Bỏ chặn user

// Tìm kiếm
router.get('/search', userController.findUser);                    // Tìm user

// Báo cáo
router.post('/report', userController.sendReport);                  // Báo cáo user

module.exports = router;
