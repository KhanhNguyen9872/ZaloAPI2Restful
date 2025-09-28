// Note Controller - Xử lý quản lý ghi chú
const authController = require('./authController');

// Tạo ghi chú
const createNote = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { title, content, threadId, threadType = 1 } = req.body;
        
        if (!title || !content || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu title, content hoặc threadId'
            });
        }

        const noteData = { title, content };
        const result = await zaloAPI.createNote(noteData, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi tạo ghi chú: ' + error.message
        });
    }
};

// Sửa ghi chú
const editNote = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { noteId } = req.params;
        const { title, content, threadId, threadType = 1 } = req.body;
        
        if (!noteId || !title || !content || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu noteId, title, content hoặc threadId'
            });
        }

        const noteData = { title, content };
        const result = await zaloAPI.editNote(noteId, noteData, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi sửa ghi chú: ' + error.message
        });
    }
};

// Xóa ghi chú
const deleteNote = async (req, res) => {
    const zaloAPI = authController.getZaloAPI();
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { noteId } = req.params;
        const { threadId, threadType = 1 } = req.body;
        
        if (!noteId || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu noteId hoặc threadId'
            });
        }

        const result = await zaloAPI.deleteNote(noteId, threadId, threadType);
        
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xóa ghi chú: ' + error.message
        });
    }
};

module.exports = {
    createNote,
    editNote,
    deleteNote
};
