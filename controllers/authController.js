const axios = require('axios');

// Lấy access token từ Zalo
const getAccessToken = async (req, res) => {
  try {
    const { app_id, app_secret, code } = req.query;
    
    if (!app_id || !app_secret || !code) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'app_id, app_secret, and code are required'
      });
    }

    const response = await axios.get('https://oauth.zalo.me/v4/oa/access_token', {
      params: {
        app_id,
        app_secret,
        code
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get access token',
      message: error.response?.data?.message || error.message
    });
  }
};

// Làm mới access token
const refreshToken = async (req, res) => {
  try {
    const { app_id, app_secret, refresh_token } = req.body;
    
    if (!app_id || !app_secret || !refresh_token) {
      return res.status(400).json({
        error: 'Missing required parameters',
        message: 'app_id, app_secret, and refresh_token are required'
      });
    }

    const response = await axios.get('https://oauth.zalo.me/v4/oa/refresh_token', {
      params: {
        app_id,
        app_secret,
        refresh_token
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to refresh token',
      message: error.response?.data?.message || error.message
    });
  }
};

// Lấy thông tin user
const getUserInfo = async (req, res) => {
  try {
    const { access_token } = req.headers;
    
    if (!access_token) {
      return res.status(401).json({
        error: 'Access token required',
        message: 'Authorization header with access token is required'
      });
    }

    const response = await axios.get('https://graph.zalo.me/v2.0/me', {
      params: {
        access_token,
        fields: 'id,name,picture'
      }
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get user info',
      message: error.response?.data?.message || error.message
    });
  }
};

module.exports = {
  getAccessToken,
  refreshToken,
  getUserInfo
};
