// Group Controller - Xử lý quản lý nhóm
const authController = require('./authController');

// Danh sách nhóm
const getAllGroups = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const result = await zaloAPI.getAllGroups();
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy danh sách nhóm: ' + error.message
        });
    }
};

// Thông tin nhóm
const getGroupInfo = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        
        if (!groupId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId'
            });
        }

        const result = await zaloAPI.getGroupInfo(groupId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy thông tin nhóm: ' + error.message
        });
    }
};

// Tạo nhóm
const createGroup = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { name, members } = req.body;
        
        if (!name || !members || !Array.isArray(members)) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu name hoặc members (phải là array)'
            });
        }

        const result = await zaloAPI.createGroup(name, members);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi tạo nhóm: ' + error.message
        });
    }
};

// Giải tán nhóm
const disperseGroup = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        
        if (!groupId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId'
            });
        }

        const result = await zaloAPI.disperseGroup(groupId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi giải tán nhóm: ' + error.message
        });
    }
};

// Thêm thành viên vào nhóm
const addUserToGroup = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        
        if (!groupId || !userIds || !Array.isArray(userIds)) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc userIds (phải là array)'
            });
        }

        const result = await zaloAPI.addUserToGroup(groupId, userIds);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi thêm thành viên vào nhóm: ' + error.message
        });
    }
};

// Xóa thành viên khỏi nhóm
const removeUserFromGroup = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId, userId } = req.params;
        
        if (!groupId || !userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc userId'
            });
        }

        const result = await zaloAPI.removeUserFromGroup(groupId, userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xóa thành viên khỏi nhóm: ' + error.message
        });
    }
};

// Thêm phó nhóm
const addGroupDeputy = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        
        if (!groupId || !userIds || !Array.isArray(userIds)) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc userIds (phải là array)'
            });
        }

        const result = await zaloAPI.addGroupDeputy(groupId, userIds);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi thêm phó nhóm: ' + error.message
        });
    }
};

// Xóa phó nhóm
const removeGroupDeputy = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId, userId } = req.params;
        
        if (!groupId || !userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc userId'
            });
        }

        const result = await zaloAPI.removeGroupDeputy(groupId, userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xóa phó nhóm: ' + error.message
        });
    }
};

// Đổi tên nhóm
const changeGroupName = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const { name } = req.body;
        
        if (!groupId || !name) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc name'
            });
        }

        const result = await zaloAPI.changeGroupName(groupId, name);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đổi tên nhóm: ' + error.message
        });
    }
};

// Đổi avatar nhóm
const changeGroupAvatar = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const { avatarPath } = req.body;
        
        if (!groupId || !avatarPath) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc avatarPath'
            });
        }

        const result = await zaloAPI.changeGroupAvatar(groupId, avatarPath);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đổi avatar nhóm: ' + error.message
        });
    }
};

// Đổi chủ nhóm
const changeGroupOwner = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const { userId } = req.body;
        
        if (!groupId || !userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu groupId hoặc userId'
            });
        }

        const result = await zaloAPI.changeGroupOwner(groupId, userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đổi chủ nhóm: ' + error.message
        });
    }
};

module.exports = {
    getAllGroups,
    getGroupInfo,
    createGroup,
    disperseGroup,
    addUserToGroup,
    removeUserFromGroup,
    addGroupDeputy,
    removeGroupDeputy,
    changeGroupName,
    changeGroupAvatar,
    changeGroupOwner
};
