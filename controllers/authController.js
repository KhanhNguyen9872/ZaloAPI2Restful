// Auth Controller - Xử lý đăng nhập và quản lý tài khoản Zalo
const { Zalo } = require('zca-js');
const sharp = require('sharp');
const fs = require('fs');

// Lưu trữ instance Zalo API
let zaloAPI = null;

// Image metadata getter cho zca-js v2
async function imageMetadataGetter(filePath) {
    try {
        const data = await fs.promises.readFile(filePath);
        const metadata = await sharp(data).metadata();
        return {
            height: metadata.height,
            width: metadata.width,
            size: metadata.size || data.length,
        };
    } catch (error) {
        console.error('Error getting image metadata:', error);
        return null;
    }
}

// Đăng nhập bằng QR
const loginQR = async (req, res) => {
    try {
        const zalo = new Zalo({ imageMetadataGetter });
        const { qrPath = './qr.png', userAgent, language = 'vi' } = req.body;
        
        zaloAPI = await zalo.loginQR({
            qrPath: qrPath,
            userAgent: userAgent || process.env.ZALO_USER_AGENT,
            language: language
        }, (event) => {
            console.log('QR Login Event:', event);
        });

        const context = zaloAPI.getContext();
        
        res.json({
            success: true,
            message: 'Đăng nhập thành công',
            credentials: {
                imei: context.imei,
                userAgent: context.userAgent,
                cookies: Buffer.from(JSON.stringify(context.cookie.toJSON()?.cookies || [])).toString('base64')
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đăng nhập QR: ' + error.message
        });
    }
};

// Đăng nhập bằng Cookie
const loginCookie = async (req, res) => {
    try {
        const zalo = new Zalo({ imageMetadataGetter });
        const { cookie, imei, userAgent, language = 'vi' } = req.body;
        
        if (!cookie || !imei || !userAgent) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu thông tin đăng nhập (cookie, imei, userAgent)'
            });
        }

        const credentials = {
            cookie: typeof cookie === 'string' ? JSON.parse(Buffer.from(cookie, 'base64').toString()) : cookie,
            imei: imei,
            userAgent: userAgent,
            language: language
        };

        zaloAPI = await zalo.login(credentials);
        
        res.json({
            success: true,
            message: 'Đăng nhập thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đăng nhập Cookie: ' + error.message
        });
    }
};

// Đăng nhập với Proxy
const loginWithProxy = async (req, res) => {
    try {
        const zalo = new Zalo({ imageMetadataGetter });
        const { proxy, credentials } = req.body;
        
        if (!proxy || !credentials) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu thông tin proxy hoặc credentials'
            });
        }

        zaloAPI = await zalo.login(credentials, { proxy });
        
        res.json({
            success: true,
            message: 'Đăng nhập với Proxy thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đăng nhập với Proxy: ' + error.message
        });
    }
};

// Trạng thái đăng nhập
const getStatus = (req, res) => {
    res.json({
        success: true,
        connected: !!zaloAPI,
        message: zaloAPI ? 'Đã kết nối' : 'Chưa kết nối'
    });
};

// Lấy context
const getContext = (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const context = zaloAPI.getContext();
        res.json({
            success: true,
            data: context
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy context: ' + error.message
        });
    }
};

// Lấy cookie
const getCookie = (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const cookie = zaloAPI.getCookie();
        res.json({
            success: true,
            data: cookie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy cookie: ' + error.message
        });
    }
};

// Lấy QR code
const getQR = (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const qr = zaloAPI.getQR();
        res.json({
            success: true,
            data: qr
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy QR: ' + error.message
        });
    }
};

// Lấy ID của mình
const getOwnId = (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const ownId = zaloAPI.getOwnId();
        res.json({
            success: true,
            data: { ownId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy Own ID: ' + error.message
        });
    }
};

// Đăng xuất
const logout = (req, res) => {
    try {
        if (zaloAPI) {
            zaloAPI = null;
        }
        
        res.json({
            success: true,
            message: 'Đăng xuất thành công'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi đăng xuất: ' + error.message
        });
    }
};

// Export zaloAPI instance để các controller khác sử dụng
const getZaloAPI = () => zaloAPI;

module.exports = {
    loginQR,
    loginCookie,
    loginWithProxy,
    getStatus,
    getContext,
    getCookie,
    getQR,
    getOwnId,
    logout,
    getZaloAPI
};
