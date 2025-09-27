const axios = require('axios');

// Gửi tin nhắn
const sendMessage = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { recipient, message, message_type = 'text' } = req.body;
    
    if (!access_token) {
      return res.status(401).json({
        error: 'Access token required',
        message: 'Authorization header with access token is required'
      });
    }

    if (!recipient || !message) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'recipient and message are required'
      });
    }

    const payload = {
      recipient: { user_id: recipient },
      message: {
        text: message
      }
    };

    const response = await axios.post('https://graph.zalo.me/v2.0/me/message', payload, {
      headers: {
        'Content-Type': 'application/json',
        'access_token': access_token
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to send message',
      message: error.response?.data?.message || error.message
    });
  }
};

// Lấy cuộc trò chuyện
const getConversation = async (req, res) => {
  try {
    const { access_token } = req.headers;
    const { userId } = req.params;
    const { offset = 0, count = 20 } = req.query;
    
    if (!access_token) {
      return res.status(401).json({
        error: 'Access token required',
        message: 'Authorization header with access token is required'
      });
    }

    const response = await axios.get(`https://graph.zalo.me/v2.0/me/conversation`, {
      params: {
        access_token,
        user_id: userId,
        offset,
        count
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get conversation',
      message: error.response?.data?.message || error.message
    });
  }
};

// Upload file
const uploadFile = async (req, res) => {
  try {
    const { access_token } = req.headers;
    
    if (!access_token) {
      return res.status(401).json({
        error: 'Access token required',
        message: 'Authorization header with access token is required'
      });
    }

    // Xử lý upload file ở đây
    res.json({
      success: true,
      message: 'File upload functionality to be implemented'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to upload file',
      message: error.response?.data?.message || error.message
    });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  uploadFile
};
