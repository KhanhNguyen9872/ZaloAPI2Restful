// Xử lý webhook từ Zalo
const handleWebhook = async (req, res) => {
  try {
    const { event, data } = req.body;
    
    console.log('Webhook received:', { event, data });

    // Xử lý các loại event khác nhau
    switch (event) {
      case 'user_send_text':
        console.log('User sent text:', data);
        break;
      case 'user_send_image':
        console.log('User sent image:', data);
        break;
      case 'user_send_sticker':
        console.log('User sent sticker:', data);
        break;
      case 'user_received_message':
        console.log('User received message:', data);
        break;
      default:
        console.log('Unknown event:', event);
    }

    res.json({
      success: true,
      message: 'Webhook processed successfully'
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message
    });
  }
};

// Xác thực webhook
const verifyWebhook = (req, res) => {
  try {
    const { verify_token } = req.query;
    const expectedToken = process.env.WEBHOOK_VERIFY_TOKEN;
    
    if (verify_token === expectedToken) {
      res.status(200).send('OK');
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(500).json({
      error: 'Failed to verify webhook',
      message: error.message
    });
  }
};

module.exports = {
  handleWebhook,
  verifyWebhook
};
