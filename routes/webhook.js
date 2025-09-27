const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// POST /api/webhook - Nhận webhook từ Zalo
router.post('/', webhookController.handleWebhook);

// GET /api/webhook/verify - Xác thực webhook
router.get('/verify', webhookController.verifyWebhook);

module.exports = router;
