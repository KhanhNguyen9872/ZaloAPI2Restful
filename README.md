# Zalo API RESTful Service

Dự án Express.js RESTful API để tích hợp với Zalo API.

## Cài đặt

```bash
npm install
```

## Cấu hình

1. Copy file `config.env` thành `.env`
2. Cập nhật các thông tin cấu hình trong file `.env`:
   - `ZALO_APP_ID`: App ID từ Zalo Developer
   - `ZALO_APP_SECRET`: App Secret từ Zalo Developer
   - `WEBHOOK_VERIFY_TOKEN`: Token xác thực webhook

## Chạy dự án

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `GET /api/auth/access-token` - Lấy access token
- `POST /api/auth/refresh-token` - Làm mới access token
- `GET /api/auth/user-info` - Lấy thông tin user

### Messages
- `POST /api/messages/send` - Gửi tin nhắn
- `GET /api/messages/conversation/:userId` - Lấy cuộc trò chuyện
- `POST /api/messages/upload` - Upload file

### Webhook
- `POST /api/webhook` - Nhận webhook từ Zalo
- `GET /api/webhook/verify` - Xác thực webhook

## Cấu trúc dự án

```
├── controllers/     # Xử lý logic business
├── routes/         # Định nghĩa routes
├── middleware/     # Custom middleware
├── config/         # File cấu hình
├── server.js       # File chính
└── package.json    # Dependencies
```

## Sử dụng

Server sẽ chạy trên port 3000 (mặc định). Truy cập `http://localhost:3000` để kiểm tra.
