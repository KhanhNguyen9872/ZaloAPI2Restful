// Message Controller - Xử lý tin nhắn và sticker
const authController = require('./authController');

// Gửi tin nhắn text
const sendMessage = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { message, threadId, threadType = 1 } = req.body;
        
        if (!message || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu message hoặc threadId'
            });
        }

        const result = await zaloAPI.sendMessage(message, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi gửi tin nhắn: ' + error.message
        });
    }
};

// Gửi tin nhắn voice
const sendVoice = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { voicePath, threadId, threadType = 1 } = req.body;
        
        if (!voicePath || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu voicePath hoặc threadId'
            });
        }

        const result = await zaloAPI.sendVoice(voicePath, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi gửi voice: ' + error.message
        });
    }
};

// Gửi sticker
const sendSticker = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { stickerId, threadId, threadType = 1 } = req.body;
        
        if (!stickerId || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu stickerId hoặc threadId'
            });
        }

        const result = await zaloAPI.sendSticker(stickerId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi gửi sticker: ' + error.message
        });
    }
};

// Gửi card
const sendCard = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { cardData, threadId, threadType = 1 } = req.body;
        
        if (!cardData || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu cardData hoặc threadId'
            });
        }

        const result = await zaloAPI.sendCard(cardData, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi gửi card: ' + error.message
        });
    }
};

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
        const { pollData, threadId, threadType = 1 } = req.body;
        
        if (!pollData || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu pollData hoặc threadId'
            });
        }

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

// Xóa tin nhắn
const deleteMessage = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId } = req.params;
        
        if (!messageId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu messageId'
            });
        }

        const result = await zaloAPI.deleteMessage(messageId);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xóa tin nhắn: ' + error.message
        });
    }
};

// Hoàn tác tin nhắn
const undo = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId } = req.params;
        const { threadId, threadType = 1 } = req.body;
        
        if (!messageId || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu messageId hoặc threadId'
            });
        }

        const result = await zaloAPI.undo(messageId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi hoàn tác tin nhắn: ' + error.message
        });
    }
};

// Thêm reaction
const addReaction = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId } = req.params;
        const { reaction, threadId, threadType = 1 } = req.body;
        
        if (!messageId || !reaction || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu messageId, reaction hoặc threadId'
            });
        }

        const result = await zaloAPI.addReaction(reaction, messageId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi thêm reaction: ' + error.message
        });
    }
};

// Xóa reaction
const removeReaction = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId } = req.params;
        const { threadId, threadType = 1 } = req.body;
        
        if (!messageId || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu messageId hoặc threadId'
            });
        }

        const result = await zaloAPI.removeReaction(messageId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xóa reaction: ' + error.message
        });
    }
};

// Tìm sticker
const getStickers = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { keyword } = req.params;
        
        if (!keyword) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu keyword'
            });
        }

        const result = await zaloAPI.getStickers(keyword);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi tìm sticker: ' + error.message
        });
    }
};

// Chi tiết sticker
const getStickersDetail = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { ids } = req.params;
        
        if (!ids) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu ids'
            });
        }

        const stickerIds = ids.split(',');
        const result = await zaloAPI.getStickersDetail(stickerIds);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy chi tiết sticker: ' + error.message
        });
    }
};

// Pin cuộc trò chuyện
const pinConversations = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { threadIds } = req.body;
        
        if (!threadIds || !Array.isArray(threadIds)) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu threadIds (phải là array)'
            });
        }

        const result = await zaloAPI.pinConversations(threadIds);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi pin cuộc trò chuyện: ' + error.message
        });
    }
};

// Bỏ pin cuộc trò chuyện
const unpinConversations = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { threadIds } = req.body;
        
        if (!threadIds || !Array.isArray(threadIds)) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu threadIds (phải là array)'
            });
        }

        const result = await zaloAPI.unpinConversations(threadIds);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi bỏ pin cuộc trò chuyện: ' + error.message
        });
    }
};

module.exports = {
    sendMessage,
    sendVoice,
    sendSticker,
    sendCard,
    createPoll,
    deleteMessage,
    undo,
    addReaction,
    removeReaction,
    getStickers,
    getStickersDetail,
    pinConversations,
    unpinConversations
};
