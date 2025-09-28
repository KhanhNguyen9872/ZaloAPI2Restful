const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import Secret Key Middleware
const SecretKeyMiddleware = require('./src/middleware/secretKeyMiddleware');

const app = express();

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

// Import routes - Clean Architecture
const authRoutes = require('./src/routes/auth');
const messageRoutes = require('./src/routes/messages');
const userRoutes = require('./src/routes/users');
const businessRoutes = require('./src/routes/business');
const reminderRoutes = require('./src/routes/reminders');
const groupRoutes = require('./src/routes/groups');
const noteRoutes = require('./src/routes/notes');
const contextRoutes = require('./src/routes/context');
// const pollRoutes = require('./src/routes/polls');
const quickMessageRoutes = require('./src/routes/quick-messages');
const listenerRoutes = require('./src/routes/listeners');
const systemRoutes = require('./src/routes/system');
// const webhookRoutes = require('./src/routes/webhook');

// Apply Secret Key Middleware to all API routes
app.use('/api/auth', secretKeyMiddleware.requireSecretKey(), authRoutes);
app.use('/api/messages', secretKeyMiddleware.requireSecretKey(), messageRoutes);
app.use('/api/users', secretKeyMiddleware.requireSecretKey(), userRoutes);
app.use('/api/business', secretKeyMiddleware.requireSecretKey(), businessRoutes);
app.use('/api/reminders', secretKeyMiddleware.requireSecretKey(), reminderRoutes);
app.use('/api/groups', secretKeyMiddleware.requireSecretKey(), groupRoutes);
app.use('/api/notes', secretKeyMiddleware.requireSecretKey(), noteRoutes);
app.use('/api/context', secretKeyMiddleware.requireSecretKey(), contextRoutes);
// app.use('/api/polls', secretKeyMiddleware.requireSecretKey(), pollRoutes);
app.use('/api/quick-messages', secretKeyMiddleware.requireSecretKey(), quickMessageRoutes);
app.use('/api/listeners', secretKeyMiddleware.requireSecretKey(), listenerRoutes);
app.use('/api/system', secretKeyMiddleware.requireSecretKey(), systemRoutes);
// app.use('/api/webhook', webhookRoutes); // Webhook không cần secret key

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Zalo API RESTful Server',
        version: '1.0.0',
        status: global.zaloAPI ? 'connected' : 'disconnected',
        endpoints: {
            auth: '/api/auth',
            messages: '/api/messages',
            users: '/api/users',
            business: '/api/business',
            reminders: '/api/reminders',
            groups: '/api/groups',
            notes: '/api/notes',
            context: '/api/context',
            // polls: '/api/polls',
            quickMessages: '/api/quick-messages',
            listeners: '/api/listeners',
            system: '/api/system',
            // webhook: '/api/webhook'
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

module.exports = app;
