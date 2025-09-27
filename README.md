# Zalo API RESTful Server

RESTful API server sử dụng thư viện `zca-js` để tích hợp với Zalo Web.

## 🚀 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd ZaloAPI2Restful
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Sao chép file cấu hình:
```bash
cp env.example .env
```

4. Cấu hình file `.env` với thông tin của bạn.

## 🏃‍♂️ Chạy server

```bash
# Development mode
npm run dev

# Production mode  
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## 📋 API Documentation

### 🔐 Authentication

#### Đăng nhập bằng QR Code
```http
POST /api/auth/qr
```

**Response:**
```json
{
    "success": true,
    "message": "Đăng nhập thành công",
    "credentials": {
        "imei": "device_imei",
        "userAgent": "Mozilla/5.0...",
        "cookies": "base64_encoded_cookies"
    }
}
```

#### Kiểm tra trạng thái đăng nhập
```http
GET /api/auth/status
```

**Response:**
```json
{
    "connected": true,
    "message": "Đã kết nối"
}
```

### 💬 Messages

#### Gửi tin nhắn
```http
POST /api/messages/send
```

**Request Body:**
```json
{
    "message": "Nội dung tin nhắn",
    "threadId": "user_id_or_group_id",
    "threadType": 1
}
```

**Thread Types:**
- `1` = Tin nhắn cá nhân (User)
- `2` = Tin nhắn nhóm (Group)

**Response:**
```json
{
    "success": true,
    "data": "Message sent successfully"
}
```

#### Tìm sticker
```http
GET /api/messages/stickers/:keyword
```

**Parameters:**
- `keyword` (string): Từ khóa tìm kiếm sticker

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": "sticker_id",
            "name": "Sticker name",
            "url": "sticker_url"
        }
    ]
}
```

### 👤 Users

#### Thông tin tài khoản
```http
GET /api/users/me
```

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "user_id",
        "name": "User Name",
        "avatar": "avatar_url"
    }
}
```

#### Danh sách bạn bè
```http
GET /api/users/friends
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": "friend_id",
            "name": "Friend Name",
            "avatar": "avatar_url"
        }
    ]
}
```

### 🤖 Bot Commands

#### Xử lý lệnh bot
```http
POST /api/bot/command
```

**Request Body:**
```json
{
    "message": "/ping",
    "threadId": "user_id_or_group_id",
    "threadType": 1
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "command": "ping",
        "response": "🏓 Pong! Bot đang hoạt động bình thường.",
        "sent": true
    }
}
```

#### Auto-reply bot
```http
POST /api/bot/auto-reply
```

**Request Body:**
```json
{
    "message": "Xin chào bot",
    "threadId": "user_id_or_group_id", 
    "threadType": 1
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "originalMessage": "Xin chào bot",
        "response": "🤖 Bot đã nhận tin nhắn: \"Xin chào bot\"\n\nGõ /help để xem danh sách lệnh bot.",
        "sent": true
    }
}
```

**Danh sách lệnh bot có sẵn:**
- `/ping` - Kiểm tra bot hoạt động
- `/time` - Xem thời gian hiện tại
- `/help` - Hiển thị danh sách lệnh
- `/info` - Thông tin bot
- `/weather [tên thành phố]` - Xem thời tiết (gọi API bên ngoài)
- `/joke` - Kể chuyện cười
- `/quote` - Câu nói hay
- `/api` - Gọi API bên ngoài (demo)
- `/news` - Tin tức mới nhất (gọi API bên ngoài)
- `/translate [văn bản]` - Dịch thuật (gọi API bên ngoài)

### 🔗 Webhook Integration

#### Khởi động webhook listener
```http
POST /api/webhook/start-listener
```

**Response:**
```json
{
    "success": true,
    "message": "Webhook listener đã được khởi động. Bot sẽ tự động phản hồi tin nhắn."
}
```

#### Dừng webhook listener
```http
POST /api/webhook/stop-listener
```

**Response:**
```json
{
    "success": true,
    "message": "Webhook listener đã được dừng."
}
```

#### Webhook nhận tin nhắn
```http
POST /api/webhook/message
```

**Request Body:**
```json
{
    "message": "/weather Hà Nội",
    "threadId": "user_id_or_group_id",
    "threadType": 1,
    "senderId": "sender_user_id"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "originalMessage": "/weather Hà Nội",
        "response": "🌤️ Thời tiết tại Hà Nội: Nắng đẹp, nhiệt độ 25°C",
        "senderId": "sender_user_id",
        "sent": true
    }
}
```

### 👥 Groups

#### Danh sách nhóm
```http
GET /api/groups
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": "group_id",
            "name": "Group Name",
            "avatar": "group_avatar_url",
            "memberCount": 10
        }
    ]
}
```

#### Thông tin nhóm
```http
GET /api/groups/:groupId
```

**Parameters:**
- `groupId` (string): ID của nhóm

**Response:**
```json
{
    "success": true,
    "data": {
        "id": "group_id",
        "name": "Group Name",
        "avatar": "group_avatar_url",
        "memberCount": 10,
        "members": [
            {
                "id": "member_id",
                "name": "Member Name",
                "role": "admin"
            }
        ]
    }
}
```

## 🔧 Cấu hình Environment

File `.env`:

```env
# Zalo API Configuration
ZALO_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0
ZALO_IMEI=
ZALO_LANGUAGE=vi

# Server Configuration
PORT=3000
NODE_ENV=development

# API Rate Limiting (Disabled for local use)
RATE_LIMIT_WINDOW_MS=0
RATE_LIMIT_MAX_REQUESTS=0

# Cookie Information (Base64 encoded JSON)
ZALO_COOKIES=

# Optional: QR Code Path for authentication
QR_CODE_PATH=./qr.png

# Optional: Self listen (true/false)
SELF_LISTEN=false
```

## 📝 Ví dụ sử dụng

### Gửi tin nhắn cá nhân
```bash
curl -X POST http://localhost:3000/api/messages/send \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Xin chào từ bot!",
    "threadId": "user_id_here",
    "threadType": 1
  }'
```

### Gửi tin nhắn nhóm
```bash
curl -X POST http://localhost:3000/api/messages/send \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Thông báo nhóm",
    "threadId": "group_id_here",
    "threadType": 2
  }'
```

### Lấy danh sách bạn bè
```bash
curl -X GET http://localhost:3000/api/users/friends
```

### Gửi lệnh bot
```bash
# Gửi lệnh ping
curl -X POST http://localhost:3000/api/bot/command \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/ping",
    "threadId": "user_id_here",
    "threadType": 1
  }'

# Gửi lệnh thời tiết
curl -X POST http://localhost:3000/api/bot/command \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/weather Hà Nội",
    "threadId": "user_id_here",
    "threadType": 1
  }'
```

### Auto-reply bot
```bash
# Bot tự động phản hồi
curl -X POST http://localhost:3000/api/bot/auto-reply \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Xin chào bot",
    "threadId": "user_id_here",
    "threadType": 1
  }'
```

### Webhook Integration
```bash
# Khởi động webhook listener (bot tự động phản hồi)
curl -X POST http://localhost:3000/api/webhook/start-listener

# Dừng webhook listener
curl -X POST http://localhost:3000/api/webhook/stop-listener

# Gửi tin nhắn qua webhook
curl -X POST http://localhost:3000/api/webhook/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/weather Hà Nội",
    "threadId": "user_id_here",
    "threadType": 1,
    "senderId": "sender_id"
  }'
```

### Lệnh bot với API bên ngoài
```bash
# Gọi API bên ngoài
curl -X POST http://localhost:3000/api/bot/command \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/api",
    "threadId": "user_id_here",
    "threadType": 1
  }'

# Dịch thuật
curl -X POST http://localhost:3000/api/bot/command \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/translate Hello world",
    "threadId": "user_id_here",
    "threadType": 1
  }'

# Tin tức
curl -X POST http://localhost:3000/api/bot/command \
  -H "Content-Type: application/json" \
  -d '{
    "message": "/news",
    "threadId": "user_id_here",
    "threadType": 1
  }'
```

## ⚠️ Lưu ý

- **Rate limiting đã được tắt** cho môi trường local
- Cần đăng nhập QR trước khi sử dụng các API khác
- API này chỉ dành cho mục đích cá nhân, không nên sử dụng cho production
- Sử dụng có thể dẫn đến khóa tài khoản Zalo

## 🛠️ Dependencies

- `zca-js` - Zalo API library
- `express` - Web framework
- `sharp` - Image processing
- `axios` - HTTP client for external APIs
- `cors` - CORS middleware
- `helmet` - Security headers
- `morgan` - Logging
- `express-rate-limit` - Rate limiting
- `dotenv` - Environment variables

## 📄 License

MIT License