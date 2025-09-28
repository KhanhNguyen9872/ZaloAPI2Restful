const { Zalo } = require('zca-js');
const sharp = require('sharp');
const fs = require('fs');
require('dotenv').config();

// Import app from app.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Zalo API instance
let zaloAPI = null;

// Export zaloAPI for use in other modules
global.zaloAPI = zaloAPI;

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

// Khởi tạo Zalo API
async function initZaloAPI() {
    try {
        const zalo = new Zalo({
            imageMetadataGetter
        });

        // Kiểm tra xem có thông tin đăng nhập không
        const cookies = process.env.ZALO_COOKIES;
        const imei = process.env.ZALO_IMEI;
        const userAgent = process.env.ZALO_USER_AGENT;

        if (cookies && imei && userAgent) {
            // Đăng nhập bằng cookie
            const credentials = {
                cookie: JSON.parse(Buffer.from(cookies, 'base64').toString()),
                imei: imei,
                userAgent: userAgent,
                language: process.env.ZALO_LANGUAGE || 'vi'
            };

            console.log('Đang đăng nhập bằng cookie...');
            zaloAPI = await zalo.login(credentials);
            global.zaloAPI = zaloAPI; // Update global reference
            console.log('Đăng nhập thành công!');
        } else {
            console.log('Chưa có thông tin đăng nhập, cần QR code...');
            return null;
        }

        return zaloAPI;
    } catch (error) {
        console.error('Lỗi khi khởi tạo Zalo API:', error);
        return null;
    }
}

// Khởi động server
async function startServer() {
    // Thử khởi tạo Zalo API nếu có thông tin đăng nhập
    await initZaloAPI();
    
    // Tạo session nếu đã đăng nhập thành công
    if (zaloAPI) {
        try {
            const AuthService = require('./src/services/AuthService');
            const authService = AuthService.getInstance();
            
            // Tạo session từ context hiện tại
            const context = await zaloAPI.getContext();
            const AuthSession = require('./src/models/AuthSession');
            authService.currentSession = AuthSession.fromZaloContext(context);
            
            console.log('Session được tạo từ server startup');
        } catch (error) {
            console.error('Lỗi tạo session:', error.message);
        }
    }
    
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
        console.log(`Trạng thái Zalo API: ${zaloAPI ? 'Đã kết nối' : 'Chưa kết nối'}`);
    });
}

startServer();