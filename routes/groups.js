const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Quản lý nhóm
router.get('/', groupController.getAllGroups);                     // Danh sách nhóm
router.get('/:groupId', groupController.getGroupInfo);             // Thông tin nhóm
router.post('/', groupController.createGroup);                     // Tạo nhóm
router.delete('/:groupId', groupController.disperseGroup);         // Giải tán nhóm

// Thành viên nhóm
router.post('/:groupId/members', groupController.addUserToGroup);  // Thêm thành viên
router.delete('/:groupId/members/:userId', groupController.removeUserFromGroup); // Xóa thành viên
router.post('/:groupId/deputies', groupController.addGroupDeputy); // Thêm phó nhóm
router.delete('/:groupId/deputies/:userId', groupController.removeGroupDeputy); // Xóa phó nhóm

// Cài đặt nhóm
router.put('/:groupId/name', groupController.changeGroupName);     // Đổi tên nhóm
router.put('/:groupId/avatar', groupController.changeGroupAvatar); // Đổi avatar nhóm
router.put('/:groupId/owner', groupController.changeGroupOwner);   // Đổi chủ nhóm

module.exports = router;
