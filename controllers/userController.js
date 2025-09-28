// User Controller - Xử lý quản lý user và bạn bè
const authController = require('./authController');

// Thông tin tài khoản
const fetchAccountInfo = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const result = await zaloAPI.fetchAccountInfo();
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy thông tin tài khoản: ' + error.message
        });
    }
};

// Lấy ID của mình
const getOwnId = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const result = await zaloAPI.getOwnId();
        
        res.json({
            success: true,
            data: { ownId: result }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy Own ID: ' + error.message
        });
    }
};

// Thông tin user
const getUserInfo = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId'
            });
        }

        const result = await zaloAPI.getUserInfo(userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy thông tin user: ' + error.message
        });
    }
};

// Danh sách bạn bè
const getAllFriends = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const result = await zaloAPI.getAllFriends();
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy danh sách bạn bè: ' + error.message
        });
    }
};

// Gửi lời mời kết bạn
const sendFriendRequest = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId, message } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId'
            });
        }

        const result = await zaloAPI.sendFriendRequest(userId, message);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi gửi lời mời kết bạn: ' + error.message
        });
    }
};

// Chấp nhận lời mời kết bạn
const acceptFriendRequest = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId'
            });
        }

        const result = await zaloAPI.acceptFriendRequest(userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi chấp nhận lời mời kết bạn: ' + error.message
        });
    }
};

// Đổi tên hiển thị bạn bè
const changeFriendAlias = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId } = req.params;
        const { alias } = req.body;
        
        if (!userId || !alias) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId hoặc alias'
            });
        }

        const result = await zaloAPI.changeFriendAlias(userId, alias);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đổi tên hiển thị bạn bè: ' + error.message
        });
    }
};

// Chặn user
const blockUser = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId'
            });
        }

        const result = await zaloAPI.blockUser(userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi chặn user: ' + error.message
        });
    }
};

// Bỏ chặn user
const unblockUser = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId'
            });
        }

        const result = await zaloAPI.unblockUser(userId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi bỏ chặn user: ' + error.message
        });
    }
};

// Tìm user
const findUser = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu query'
            });
        }

        const result = await zaloAPI.findUser(query);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi tìm user: ' + error.message
        });
    }
};

// Báo cáo user
const sendReport = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { userId, reason, description } = req.body;
        
        if (!userId || !reason) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu userId hoặc reason'
            });
        }

        const result = await zaloAPI.sendReport(userId, reason, description);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi báo cáo user: ' + error.message
        });
    }
};

module.exports = {
    fetchAccountInfo,
    getOwnId,
    getUserInfo,
    getAllFriends,
    sendFriendRequest,
    acceptFriendRequest,
    changeFriendAlias,
    blockUser,
    unblockUser,
    findUser,
    sendReport
};
