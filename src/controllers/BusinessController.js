// BusinessController - Clean Architecture controller for business operations
const BusinessService = require('../services/BusinessService');
const ErrorMiddleware = require('../middleware/errorMiddleware');
const ValidationMiddleware = require('../middleware/validationMiddleware');

class BusinessController {
    constructor() {
        this.businessService = new BusinessService();
        this.validation = new ValidationMiddleware();
    }

    // Create auto reply
    createAutoReply = async (req, res) => {
        try {
            const { content, isEnable, startTime, endTime, scope, uids } = req.body;
            const result = await this.businessService.createAutoReply({
                content,
                isEnable,
                startTime,
                endTime,
                scope,
                uids
            });
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Create catalog
    createCatalog = async (req, res) => {
        try {
            const { catalogName } = req.body;
            const result = await this.businessService.createCatalog(catalogName);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Create product catalog
    createProductCatalog = async (req, res) => {
        try {
            const { catalogId, productName, price, description, files, product_photos } = req.body;
            const result = await this.businessService.createProductCatalog({
                catalogId,
                productName,
                price,
                description,
                files,
                product_photos
            });
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete auto reply
    deleteAutoReply = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.businessService.deleteAutoReply(parseInt(id));
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete catalog
    deleteCatalog = async (req, res) => {
        try {
            const { catalogId } = req.params;
            const result = await this.businessService.deleteCatalog(catalogId);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Delete product catalog
    deleteProductCatalog = async (req, res) => {
        try {
            const { productIds, catalogId } = req.body;
            const result = await this.businessService.deleteProductCatalog({
                productIds,
                catalogId
            });
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get auto reply list
    getAutoReplyList = async (req, res) => {
        try {
            const result = await this.businessService.getAutoReplyList();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get biz account
    getBizAccount = async (req, res) => {
        try {
            const result = await this.businessService.getBizAccount();
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get catalog list
    getCatalogList = async (req, res) => {
        try {
            const { limit = 20, page = 0, lastProductId } = req.query;
            const payload = {
                limit: parseInt(limit),
                page: parseInt(page),
                lastProductId
            };
            const result = await this.businessService.getCatalogList(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Get product catalog list
    getProductCatalogList = async (req, res) => {
        try {
            const { catalogId, limit = 100, versionCatalog, lastProductId, page = 0 } = req.body;
            const payload = {
                catalogId,
                limit: parseInt(limit),
                versionCatalog,
                lastProductId,
                page: parseInt(page)
            };
            const result = await this.businessService.getProductCatalogList(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update auto reply
    updateAutoReply = async (req, res) => {
        try {
            const { id, content, isEnable, startTime, endTime, scope, uids } = req.body;
            const payload = { id, content, isEnable, startTime, endTime, scope, uids };
            const result = await this.businessService.updateAutoReply(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update catalog
    updateCatalog = async (req, res) => {
        try {
            const { catalogId, catalogName } = req.body;
            const payload = { catalogId, catalogName };
            const result = await this.businessService.updateCatalog(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Update product catalog
    updateProductCatalog = async (req, res) => {
        try {
            const { catalogId, productId, productName, price, description, createTime, files, product_photos } = req.body;
            const payload = { catalogId, productId, productName, price, description, createTime, files, product_photos };
            const result = await this.businessService.updateProductCatalog(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Upload product photo
    uploadProductPhoto = async (req, res) => {
        try {
            const { file } = req.body;
            const payload = { file };
            const result = await this.businessService.uploadProductPhoto(payload);
            res.json(result);
        } catch (error) {
            ErrorMiddleware.globalErrorHandler(error, req, res);
        }
    };

    // Middleware for validation
    validateCreateAutoReply = [
        this.validation.validateRequired(['content', 'isEnable', 'startTime', 'endTime', 'scope']),
        (req, res, next) => next()
    ];

    validateCreateCatalog = [
        this.validation.validateRequired(['catalogName']),
        (req, res, next) => next()
    ];

    validateCreateProductCatalog = [
        this.validation.validateRequired(['catalogId', 'productName', 'price', 'description']),
        (req, res, next) => next()
    ];

    validateDeleteProductCatalog = [
        this.validation.validateRequired(['productIds', 'catalogId']),
        (req, res, next) => next()
    ];
}

module.exports = BusinessController;
