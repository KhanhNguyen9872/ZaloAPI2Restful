// BusinessService - Business logic for Zalo Business features
const ZaloRepository = require('../repositories/ZaloRepository');

class BusinessService {
    constructor() {
        this.zaloRepository = new ZaloRepository();
    }

    // Create auto reply
    async createAutoReply(payload) {
        try {
            if (!payload) {
                throw new Error('Auto reply payload is required');
            }

            const { content, isEnable, startTime, endTime, scope, uids } = payload;

            if (!content) {
                throw new Error('Content is required');
            }
            if (typeof isEnable !== 'boolean') {
                throw new Error('isEnable must be a boolean');
            }
            if (!startTime || !endTime) {
                throw new Error('Start time and end time are required');
            }
            if (!scope) {
                throw new Error('Scope is required');
            }

            const result = await this.zaloRepository.createAutoReply(payload);
            
            return {
                success: true,
                data: result,
                message: 'Auto reply created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create auto reply: ${error.message}`);
        }
    }

    // Create catalog
    async createCatalog(catalogName) {
        try {
            if (!catalogName) {
                throw new Error('Catalog name is required');
            }

            const result = await this.zaloRepository.createCatalog(catalogName);
            
            return {
                success: true,
                data: result,
                message: 'Catalog created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create catalog: ${error.message}`);
        }
    }

    // Create product catalog
    async createProductCatalog(payload) {
        try {
            if (!payload) {
                throw new Error('Product catalog payload is required');
            }

            const { catalogId, productName, price, description } = payload;

            if (!catalogId) {
                throw new Error('Catalog ID is required');
            }
            if (!productName) {
                throw new Error('Product name is required');
            }
            if (!price) {
                throw new Error('Price is required');
            }
            if (!description) {
                throw new Error('Description is required');
            }

            const result = await this.zaloRepository.createProductCatalog(payload);
            
            return {
                success: true,
                data: result,
                message: 'Product catalog created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create product catalog: ${error.message}`);
        }
    }

    // Delete auto reply
    async deleteAutoReply(id) {
        try {
            if (!id) {
                throw new Error('Auto reply ID is required');
            }

            const result = await this.zaloRepository.deleteAutoReply(id);
            
            return {
                success: true,
                data: result,
                message: 'Auto reply deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete auto reply: ${error.message}`);
        }
    }

    // Delete catalog
    async deleteCatalog(catalogId) {
        try {
            if (!catalogId) {
                throw new Error('Catalog ID is required');
            }

            const result = await this.zaloRepository.deleteCatalog(catalogId);
            
            return {
                success: true,
                data: result,
                message: 'Catalog deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete catalog: ${error.message}`);
        }
    }

    // Delete product catalog
    async deleteProductCatalog(payload) {
        try {
            if (!payload) {
                throw new Error('Delete product catalog payload is required');
            }

            const { productIds, catalogId } = payload;

            if (!productIds) {
                throw new Error('Product IDs are required');
            }
            if (!catalogId) {
                throw new Error('Catalog ID is required');
            }

            const result = await this.zaloRepository.deleteProductCatalog(payload);
            
            return {
                success: true,
                data: result,
                message: 'Product catalog deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete product catalog: ${error.message}`);
        }
    }

    // Get auto reply list
    async getAutoReplyList() {
        try {
            const result = await this.zaloRepository.getAutoReplyList();
            
            return {
                success: true,
                data: result,
                message: 'Auto reply list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get auto reply list: ${error.message}`);
        }
    }

    // Get biz account
    async getBizAccount() {
        try {
            const result = await this.zaloRepository.getBizAccount();
            
            return {
                success: true,
                data: result,
                message: 'Biz account retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get biz account: ${error.message}`);
        }
    }

    // Get catalog list
    async getCatalogList(payload) {
        try {
            const result = await this.zaloRepository.getCatalogList(payload);
            
            return {
                success: true,
                data: result,
                message: 'Catalog list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get catalog list: ${error.message}`);
        }
    }

    // Get product catalog list
    async getProductCatalogList(payload) {
        try {
            if (!payload) {
                throw new Error('Payload is required');
            }

            const { catalogId } = payload;

            if (!catalogId) {
                throw new Error('Catalog ID is required');
            }

            const result = await this.zaloRepository.getProductCatalogList(payload);
            
            return {
                success: true,
                data: result,
                message: 'Product catalog list retrieved successfully'
            };
        } catch (error) {
            throw new Error(`Failed to get product catalog list: ${error.message}`);
        }
    }

    // Update auto reply
    async updateAutoReply(payload) {
        try {
            if (!payload || !payload.id || !payload.content || payload.isEnable === undefined) {
                throw new Error('Payload with id, content, and isEnable is required');
            }

            const result = await this.zaloRepository.updateAutoReply(payload);
            
            return {
                success: true,
                data: result,
                message: 'Auto reply updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update auto reply: ${error.message}`);
        }
    }

    // Update catalog
    async updateCatalog(payload) {
        try {
            if (!payload || !payload.catalogId || !payload.catalogName) {
                throw new Error('Payload with catalogId and catalogName is required');
            }

            const result = await this.zaloRepository.updateCatalog(payload);
            
            return {
                success: true,
                data: result,
                message: 'Catalog updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update catalog: ${error.message}`);
        }
    }

    // Update product catalog
    async updateProductCatalog(payload) {
        try {
            if (!payload || !payload.catalogId || !payload.productId || !payload.productName || !payload.price || !payload.description) {
                throw new Error('Payload with catalogId, productId, productName, price, and description is required');
            }

            const result = await this.zaloRepository.updateProductCatalog(payload);
            
            return {
                success: true,
                data: result,
                message: 'Product catalog updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update product catalog: ${error.message}`);
        }
    }

    // Upload product photo
    async uploadProductPhoto(payload) {
        try {
            if (!payload || !payload.file) {
                throw new Error('Payload with file is required');
            }

            const result = await this.zaloRepository.uploadProductPhoto(payload);
            
            return {
                success: true,
                data: result,
                message: 'Product photo uploaded successfully'
            };
        } catch (error) {
            throw new Error(`Failed to upload product photo: ${error.message}`);
        }
    }
}

module.exports = BusinessService;
