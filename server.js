const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import Secret Key Middleware
const SecretKeyMiddleware = require('./src/middleware/secretKeyMiddleware');

const { Zalo } = require('zca-js');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Secret Key Middleware
const secretKeyMiddleware = new SecretKeyMiddleware();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static('public'));

// Rate limiting (disabled for local use)
const rateLimitWindow = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 0;
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 0;

if (rateLimitWindow > 0 && rateLimitMax > 0) {
    const limiter = rateLimit({
        windowMs: rateLimitWindow,
        max: rateLimitMax,
        message: {
            error: 'Quá nhiều request từ IP này, vui lòng thử lại sau.'
        }
    });
    app.use('/api/', limiter);
    console.log('Rate limiting enabled');
} else {
    console.log('Rate limiting disabled for local use');
}

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

// Import routes - Clean Architecture
const authRoutes = require('./src/routes/auth');
const messageRoutes = require('./src/routes/messages');
const userRoutes = require('./src/routes/users');
const businessRoutes = require('./src/routes/business');
const reminderRoutes = require('./src/routes/reminders');
const groupRoutes = require('./src/routes/groups');
const noteRoutes = require('./src/routes/notes');
const contextRoutes = require('./src/routes/context');
const pollRoutes = require('./routes/polls');
const quickMessageRoutes = require('./src/routes/quick-messages');
const listenerRoutes = require('./src/routes/listeners');
const systemRoutes = require('./src/routes/system');
const webhookRoutes = require('./routes/webhook');

// Apply Secret Key Middleware to all API routes
app.use('/api/auth', secretKeyMiddleware.requireSecretKey(), authRoutes);
app.use('/api/messages', secretKeyMiddleware.requireSecretKey(), messageRoutes);
app.use('/api/users', secretKeyMiddleware.requireSecretKey(), userRoutes);
app.use('/api/business', secretKeyMiddleware.requireSecretKey(), businessRoutes);
app.use('/api/reminders', secretKeyMiddleware.requireSecretKey(), reminderRoutes);
app.use('/api/groups', secretKeyMiddleware.requireSecretKey(), groupRoutes);
app.use('/api/notes', secretKeyMiddleware.requireSecretKey(), noteRoutes);
app.use('/api/context', secretKeyMiddleware.requireSecretKey(), contextRoutes);
app.use('/api/polls', secretKeyMiddleware.requireSecretKey(), pollRoutes);
app.use('/api/quick-messages', secretKeyMiddleware.requireSecretKey(), quickMessageRoutes);
app.use('/api/listeners', secretKeyMiddleware.requireSecretKey(), listenerRoutes);
app.use('/api/system', secretKeyMiddleware.requireSecretKey(), systemRoutes);
app.use('/api/webhook', webhookRoutes); // Webhook không cần secret key

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Zalo API RESTful Server',
        version: '1.0.0',
        status: zaloAPI ? 'connected' : 'disconnected',
        endpoints: {
            auth: '/api/auth',
            messages: '/api/messages',
            users: '/api/users',
            business: '/api/business',
            reminders: '/api/reminders',
            groups: '/api/groups',
            notes: '/api/notes',
            context: '/api/context',
            polls: '/api/polls',
            quickMessages: '/api/quick-messages',
            listeners: '/api/listeners',
            system: '/api/system',
            webhook: '/api/webhook'
        }
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Đã xảy ra lỗi server'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint không tồn tại'
    });
});

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