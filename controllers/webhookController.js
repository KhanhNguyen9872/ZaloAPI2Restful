// Webhook Controller - Xử lý các sự kiện từ Zalo
const authController = require('./authController');

// Xử lý tin nhắn
const handleMessage = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { message, threadId, threadType = 1, senderId } = req.body;
        
        console.log('Received message:', { message, threadId, threadType, senderId });
        
        // Xử lý tin nhắn ở đây
        // Có thể thêm logic xử lý tự động phản hồi
        
        res.json({
            success: true,
            message: 'Tin nhắn đã được xử lý'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý tin nhắn: ' + error.message
        });
    }
};

// Xử lý reaction
const handleReaction = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId, reaction, threadId, threadType = 1, senderId } = req.body;
        
        console.log('Received reaction:', { messageId, reaction, threadId, threadType, senderId });
        
        res.json({
            success: true,
            message: 'Reaction đã được xử lý'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý reaction: ' + error.message
        });
    }
};

// Xử lý undo
const handleUndo = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { messageId, threadId, threadType = 1, senderId } = req.body;
        
        console.log('Received undo:', { messageId, threadId, threadType, senderId });
        
        res.json({
            success: true,
            message: 'Undo đã được xử lý'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý undo: ' + error.message
        });
    }
};

// Xử lý sự kiện nhóm
const handleGroupEvent = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId, eventType, data, senderId } = req.body;
        
        console.log('Received group event:', { groupId, eventType, data, senderId });
        
        res.json({
            success: true,
            message: 'Sự kiện nhóm đã được xử lý'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý sự kiện nhóm: ' + error.message
        });
    }
};

// Bắt đầu listener
const startListener = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        // Bắt đầu listener để nhận tin nhắn tự động
        zaloAPI.listener.on('message', async (message) => {
            console.log('Received message:', message);
        });
        
        zaloAPI.listener.on('reaction', async (reaction) => {
            console.log('Received reaction:', reaction);
        });
        
        zaloAPI.listener.on('undo', async (undo) => {
            console.log('Received undo:', undo);
        });
        
        zaloAPI.listener.on('group_event', async (groupEvent) => {
            console.log('Received group event:', groupEvent);
        });
        
        // Bắt đầu listener
        zaloAPI.listener.start();
        
        res.json({
            success: true,
            message: 'Webhook listener đã được khởi động'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi khởi động listener: ' + error.message
        });
    }
};

// Dừng listener
const stopListener = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        zaloAPI.listener.stop();
        
        res.json({
            success: true,
            message: 'Webhook listener đã được dừng'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi dừng listener: ' + error.message
        });
    }
};

// Trạng thái listener
const getListenerStatus = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const isRunning = zaloAPI.listener && zaloAPI.listener.isRunning();
        
        res.json({
            success: true,
            data: {
                isRunning: isRunning || false,
                message: isRunning ? 'Listener đang chạy' : 'Listener đã dừng'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy trạng thái listener: ' + error.message
        });
    }
};

module.exports = {
    handleMessage,
    handleReaction,
    handleUndo,
    handleGroupEvent,
    startListener,
    stopListener,
    getListenerStatus
};
