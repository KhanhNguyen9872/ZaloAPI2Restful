// Poll Controller - Xử lý quản lý poll
const authController = require('./authController');

// Tạo poll
const createPoll = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { question, options, threadId, threadType = 1 } = req.body;
        
        if (!question || !options || !Array.isArray(options) || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu question, options (phải là array) hoặc threadId'
            });
        }

        const pollData = { question, options };
        const result = await zaloAPI.createPoll(pollData, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi tạo poll: ' + error.message
        });
    }
};

// Khóa poll
const lockPoll = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { pollId } = req.params;
        const { threadId, threadType = 1 } = req.body;
        
        if (!pollId || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu pollId hoặc threadId'
            });
        }

        const result = await zaloAPI.lockPoll(pollId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi khóa poll: ' + error.message
        });
    }
};

module.exports = {
    createPoll,
    lockPoll
};
