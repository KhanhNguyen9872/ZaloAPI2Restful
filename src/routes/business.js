// Business Routes - Clean Architecture
const express = require('express');
const router = express.Router();
const BusinessController = require('../controllers/BusinessController');
const AuthMiddleware = require('../middleware/authMiddleware');

const businessController = new BusinessController();
const authMiddleware = new AuthMiddleware();

// Auto reply
router.post('/auto-reply', 
    authMiddleware.requireAuth(),
    businessController.validateCreateAutoReply,
    businessController.createAutoReply
);

// Catalog
router.post('/catalog', 
    authMiddleware.requireAuth(),
    businessController.validateCreateCatalog,
    businessController.createCatalog
);

// Product catalog
router.post('/product-catalog', 
    authMiddleware.requireAuth(),
    businessController.validateCreateProductCatalog,
    businessController.createProductCatalog
);

// Delete auto reply
router.delete('/auto-reply/:id', 
    authMiddleware.requireAuth(),
    businessController.deleteAutoReply
);

// Delete catalog
router.delete('/catalog/:catalogId', 
    authMiddleware.requireAuth(),
    businessController.deleteCatalog
);

// Delete product catalog
router.delete('/product-catalog', 
    authMiddleware.requireAuth(),
    businessController.validateDeleteProductCatalog,
    businessController.deleteProductCatalog
);

// Get auto reply list
router.get('/auto-reply', 
    authMiddleware.requireAuth(),
    businessController.getAutoReplyList
);

// Get biz account
router.get('/account', 
    authMiddleware.requireAuth(),
    businessController.getBizAccount
);

// Get catalog list
router.get('/catalog', 
    authMiddleware.requireAuth(),
    businessController.getCatalogList
);

// Get product catalog list
router.post('/product-catalog', 
    authMiddleware.requireAuth(),
    businessController.getProductCatalogList
);

// Update auto reply
router.put('/auto-reply', 
    authMiddleware.requireAuth(),
    businessController.updateAutoReply
);

// Update catalog
router.put('/catalog', 
    authMiddleware.requireAuth(),
    businessController.updateCatalog
);

// Update product catalog
router.put('/product-catalog', 
    authMiddleware.requireAuth(),
    businessController.updateProductCatalog
);

// Upload product photo
router.post('/upload-product-photo', 
    authMiddleware.requireAuth(),
    businessController.uploadProductPhoto
);

module.exports = router;
