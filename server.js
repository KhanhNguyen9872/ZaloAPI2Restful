const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { Zalo } = require('zca-js');
const sharp = require('sharp');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Bot command handlers
const commandHandlers = {
    'ping': async (message, threadId, threadType) => {
        return '🏓 Pong! Bot đang hoạt động bình thường.';
    },
    
    'time': async (message, threadId, threadType) => {
        const now = new Date();
        return `🕐 Thời gian hiện tại: ${now.toLocaleString('vi-VN')}`;
    },
    
    'help': async (message, threadId, threadType) => {
        return `🤖 **Danh sách lệnh bot:**
• \`/ping\` - Kiểm tra bot hoạt động
• \`/time\` - Xem thời gian hiện tại  
• \`/help\` - Hiển thị danh sách lệnh
• \`/info\` - Thông tin bot
• \`/weather [tên thành phố]\` - Xem thời tiết
• \`/joke\` - Kể chuyện cười
• \`/quote\` - Câu nói hay`;
    },
    
    'info': async (message, threadId, threadType) => {
        return `🤖 **Thông tin Bot:**
• Tên: Zalo RESTful Bot
• Phiên bản: 1.0.0
• Trạng thái: Đang hoạt động
• Server: ${process.env.NODE_ENV || 'development'}`;
    },
    
    'weather': async (message, threadId, threadType) => {
        const city = message.replace('/weather', '').trim();
        if (!city) {
            return '🌤️ Vui lòng nhập tên thành phố. Ví dụ: /weather Hà Nội';
        }
        return `🌤️ Thời tiết tại ${city}: Nắng đẹp, nhiệt độ 25°C (Đây là dữ liệu mẫu)`;
    },
    
    'joke': async (message, threadId, threadType) => {
        const jokes = [
            'Tại sao con gà băng qua đường? Vì nó muốn đến bên kia! 😄',
            'Có 2 con vịt đi trên đường, con nào đi trước? Cả 2 đều đi trước! 🦆',
            'Tại sao lập trình viên thích tối? Vì ánh sáng tạo ra bug! 💻'
        ];
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return `😄 **Chuyện cười:**\n${randomJoke}`;
    },
    
    'quote': async (message, threadId, threadType) => {
        const quotes = [
            '💡 "Học, học nữa, học mãi" - Lênin',
            '🌟 "Thành công là kết quả của sự chuẩn bị, cơ hội và hành động"',
            '🚀 "Đừng sợ thất bại, hãy sợ không dám thử"',
            '💪 "Mỗi ngày là một cơ hội mới để trở nên tốt hơn"'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return `📝 **Câu nói hay:**\n${randomQuote}`;
    },
    
    'api': async (message, threadId, threadType) => {
        try {
            // Ví dụ gọi API bên ngoài
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
            return `📡 **API Response:**\nTitle: ${response.data.title}\nBody: ${response.data.body}`;
        } catch (error) {
            return `❌ Lỗi gọi API: ${error.message}`;
        }
    },
    
    'weather': async (message, threadId, threadType) => {
        const city = message.replace('/weather', '').trim();
        if (!city) {
            return '🌤️ Vui lòng nhập tên thành phố. Ví dụ: /weather Hà Nội';
        }
        
        try {
            // Ví dụ gọi API thời tiết (thay bằng API thật)
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric&lang=vi`);
            const data = response.data;
            return `🌤️ **Thời tiết tại ${city}:**
🌡️ Nhiệt độ: ${data.main.temp}°C
💧 Độ ẩm: ${data.main.humidity}%
🌬️ Tốc độ gió: ${data.wind.speed} m/s
☁️ Mô tả: ${data.weather[0].description}`;
        } catch (error) {
            // Fallback nếu API không hoạt động
            return `🌤️ Thời tiết tại ${city}: Nắng đẹp, nhiệt độ 25°C (Dữ liệu mẫu)`;
        }
    },
    
    'news': async (message, threadId, threadType) => {
        try {
            // Ví dụ gọi API tin tức
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3');
            const news = response.data.map(post => `📰 ${post.title}`).join('\n');
            return `📰 **Tin tức mới nhất:**\n${news}`;
        } catch (error) {
            return `❌ Không thể lấy tin tức: ${error.message}`;
        }
    },
    
    'translate': async (message, threadId, threadType) => {
        const text = message.replace('/translate', '').trim();
        if (!text) {
            return '🌐 Vui lòng nhập văn bản cần dịch. Ví dụ: /translate Hello world';
        }
        
        try {
            // Ví dụ gọi API dịch thuật
            const response = await axios.post('https://api.mymemory.translated.net/get', {
                q: text,
                langpair: 'en|vi'
            });
            
            if (response.data.responseStatus === 200) {
                return `🌐 **Dịch thuật:**\nEN: ${text}\nVI: ${response.data.responseData.translatedText}`;
            } else {
                return `❌ Không thể dịch: ${text}`;
            }
        } catch (error) {
            return `❌ Lỗi dịch thuật: ${error.message}`;
        }
    }
};

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

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Zalo API RESTful Server',
        version: '1.0.0',
        status: zaloAPI ? 'connected' : 'disconnected',
        endpoints: {
            auth: '/api/auth',
            messages: '/api/messages',
            groups: '/api/groups',
            users: '/api/users'
        }
    });
});

// Auth routes
app.post('/api/auth/qr', async (req, res) => {
    try {
        const zalo = new Zalo({
            imageMetadataGetter
        });

        const qrPath = process.env.QR_CODE_PATH || './qr.png';
        
        zaloAPI = await zalo.loginQR({
            qrPath: qrPath,
            userAgent: process.env.ZALO_USER_AGENT,
            language: process.env.ZALO_LANGUAGE || 'vi'
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
});

app.get('/api/auth/status', (req, res) => {
    res.json({
        connected: !!zaloAPI,
        message: zaloAPI ? 'Đã kết nối' : 'Chưa kết nối'
    });
});

// Message routes
app.post('/api/messages/send', async (req, res) => {
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
});

// Bot command processing
app.post('/api/bot/command', async (req, res) => {
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

        // Kiểm tra xem có phải lệnh bot không (bắt đầu bằng /)
        if (!message.startsWith('/')) {
            return res.status(400).json({
                success: false,
                error: 'Không phải lệnh bot. Lệnh phải bắt đầu bằng /'
            });
        }

        // Lấy tên lệnh (bỏ dấu /)
        const command = message.split(' ')[0].substring(1).toLowerCase();
        
        // Kiểm tra lệnh có tồn tại không
        if (!commandHandlers[command]) {
            return res.status(400).json({
                success: false,
                error: `Lệnh '/${command}' không tồn tại. Gõ /help để xem danh sách lệnh.`
            });
        }

        // Xử lý lệnh
        const response = await commandHandlers[command](message, threadId, threadType);
        
        // Gửi phản hồi về cho user
        await zaloAPI.sendMessage(response, threadId, threadType);
        
        res.json({
            success: true,
            data: {
                command: command,
                response: response,
                sent: true
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý lệnh bot: ' + error.message
        });
    }
});

// Bot auto-reply (tự động phản hồi khi nhận tin nhắn)
app.post('/api/bot/auto-reply', async (req, res) => {
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

        let response = '';
        
        // Kiểm tra lệnh bot
        if (message.startsWith('/')) {
            const command = message.split(' ')[0].substring(1).toLowerCase();
            if (commandHandlers[command]) {
                response = await commandHandlers[command](message, threadId, threadType);
            } else {
                response = `❌ Lệnh '/${command}' không tồn tại. Gõ /help để xem danh sách lệnh.`;
            }
        } else {
            // Phản hồi thông thường
            response = `🤖 Bot đã nhận tin nhắn: "${message}"\n\nGõ /help để xem danh sách lệnh bot.`;
        }

        // Gửi phản hồi
        await zaloAPI.sendMessage(response, threadId, threadType);
        
        res.json({
            success: true,
            data: {
                originalMessage: message,
                response: response,
                sent: true
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi auto-reply: ' + error.message
        });
    }
});

// Webhook để nhận tin nhắn từ Zalo (cần cấu hình listener)
app.post('/api/webhook/message', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { message, threadId, threadType = 1, senderId } = req.body;
        
        if (!message || !threadId) {
            return res.status(400).json({
                success: false,
                error: 'Thiếu message hoặc threadId'
            });
        }

        let response = '';
        
        // Kiểm tra lệnh bot
        if (message.startsWith('/')) {
            const command = message.split(' ')[0].substring(1).toLowerCase();
            if (commandHandlers[command]) {
                response = await commandHandlers[command](message, threadId, threadType);
            } else {
                response = `❌ Lệnh '/${command}' không tồn tại. Gõ /help để xem danh sách lệnh.`;
            }
        } else {
            // Phản hồi thông thường
            response = `🤖 Bot đã nhận tin nhắn từ ${senderId || 'user'}: "${message}"\n\nGõ /help để xem danh sách lệnh bot.`;
        }

        // Gửi phản hồi
        await zaloAPI.sendMessage(response, threadId, threadType);
        
        res.json({
            success: true,
            data: {
                originalMessage: message,
                response: response,
                senderId: senderId,
                sent: true
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi xử lý webhook: ' + error.message
        });
    }
});

// Route để cấu hình webhook listener
app.post('/api/webhook/start-listener', async (req, res) => {
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
            
            const messageText = message.data.content;
            const threadId = message.threadId;
            const threadType = message.type;
            const senderId = message.data.senderId;
            
            // Tự động xử lý tin nhắn
            let response = '';
            
            if (messageText.startsWith('/')) {
                const command = messageText.split(' ')[0].substring(1).toLowerCase();
                if (commandHandlers[command]) {
                    response = await commandHandlers[command](messageText, threadId, threadType);
                } else {
                    response = `❌ Lệnh '/${command}' không tồn tại. Gõ /help để xem danh sách lệnh.`;
                }
            } else {
                response = `🤖 Bot đã nhận tin nhắn: "${messageText}"\n\nGõ /help để xem danh sách lệnh bot.`;
            }
            
            // Gửi phản hồi tự động
            await zaloAPI.sendMessage(response, threadId, threadType);
        });
        
        // Bắt đầu listener
        zaloAPI.listener.start();
        
        res.json({
            success: true,
            message: 'Webhook listener đã được khởi động. Bot sẽ tự động phản hồi tin nhắn.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi khởi động listener: ' + error.message
        });
    }
});

// Route để dừng webhook listener
app.post('/api/webhook/stop-listener', async (req, res) => {
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
            message: 'Webhook listener đã được dừng.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi dừng listener: ' + error.message
        });
    }
});

app.get('/api/messages/stickers/:keyword', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { keyword } = req.params;
        const stickerIds = await zaloAPI.getStickers(keyword);
        const stickers = await zaloAPI.getStickersDetail(stickerIds.slice(0, 10)); // Lấy 10 sticker đầu
        
        res.json({
            success: true,
            data: stickers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy sticker: ' + error.message
        });
    }
});

// User routes
app.get('/api/users/me', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const profile = await zaloAPI.fetchAccountInfo();
        
        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy thông tin tài khoản: ' + error.message
        });
    }
});

app.get('/api/users/friends', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const friends = await zaloAPI.getAllFriends();
        
        res.json({
            success: true,
            data: friends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy danh sách bạn bè: ' + error.message
        });
    }
});

// Group routes
app.get('/api/groups', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const groups = await zaloAPI.getAllGroups();
        
        res.json({
            success: true,
            data: groups
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy danh sách nhóm: ' + error.message
        });
    }
});

app.get('/api/groups/:groupId', async (req, res) => {
    if (!zaloAPI) {
        return res.status(401).json({
            success: false,
            error: 'Chưa đăng nhập Zalo'
        });
    }

    try {
        const { groupId } = req.params;
        const groupInfo = await zaloAPI.getGroupInfo(groupId);
        
        res.json({
            success: true,
            data: groupInfo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi lấy thông tin nhóm: ' + error.message
        });
    }
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
    
    app.listen(PORT, () => {
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
        console.log(`Trạng thái Zalo API: ${zaloAPI ? 'Đã kết nối' : 'Chưa kết nối'}`);
    });
}

startServer();