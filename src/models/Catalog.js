// Catalog Model - Danh mục sản phẩm
class Catalog {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.version = data.version;
        this.ownerId = data.ownerId;
        this.isDefault = data.isDefault;
        this.path = data.path;
        this.catalogPhoto = data.catalogPhoto;
        this.totalProduct = data.totalProduct;
        this.created_time = data.created_time;
    }

    // Get catalog ID
    getId() {
        return this.id;
    }

    // Get catalog name
    getName() {
        return this.name;
    }

    // Get version
    getVersion() {
        return this.version;
    }

    // Get owner ID
    getOwnerId() {
        return this.ownerId;
    }

    // Check if default
    isDefault() {
        return this.isDefault;
    }

    // Get path
    getPath() {
        return this.path;
    }

    // Get catalog photo
    getCatalogPhoto() {
        return this.catalogPhoto;
    }

    // Get total product count
    getTotalProduct() {
        return this.totalProduct;
    }

    // Get created time
    getCreatedTime() {
        return this.created_time;
    }

    // Get catalog URL
    getCatalogUrl() {
        return `https://catalog.zalo.me/${this.path}`;
    }

    // Check if has photo
    hasPhoto() {
        return this.catalogPhoto !== null;
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            version: this.version,
            ownerId: this.ownerId,
            isDefault: this.isDefault,
            path: this.path,
            catalogPhoto: this.catalogPhoto,
            totalProduct: this.totalProduct,
            created_time: this.created_time
        };
    }

    // Create from data
    static fromData(data) {
        return new Catalog(data);
    }
}

module.exports = Catalog;
