// ProductCatalog Model - Sản phẩm trong danh mục
class ProductCatalog {
    constructor(data) {
        this.price = data.price;
        this.description = data.description;
        this.path = data.path;
        this.product_id = data.product_id;
        this.product_name = data.product_name;
        this.currency_unit = data.currency_unit;
        this.product_photos = data.product_photos;
        this.create_time = data.create_time;
        this.catalog_id = data.catalog_id;
        this.owner_id = data.owner_id;
    }

    // Get price
    getPrice() {
        return this.price;
    }

    // Get description
    getDescription() {
        return this.description;
    }

    // Get path
    getPath() {
        return this.path;
    }

    // Get product ID
    getProductId() {
        return this.product_id;
    }

    // Get product name
    getProductName() {
        return this.product_name;
    }

    // Get currency unit
    getCurrencyUnit() {
        return this.currency_unit;
    }

    // Get product photos
    getProductPhotos() {
        return this.product_photos;
    }

    // Get create time
    getCreateTime() {
        return this.create_time;
    }

    // Get catalog ID
    getCatalogId() {
        return this.catalog_id;
    }

    // Get owner ID
    getOwnerId() {
        return this.owner_id;
    }

    // Get product URL
    getProductUrl() {
        return `https://catalog.zalo.me/${this.path}`;
    }

    // Check if has photos
    hasPhotos() {
        return this.product_photos && this.product_photos.length > 0;
    }

    // Get photo count
    getPhotoCount() {
        return this.product_photos ? this.product_photos.length : 0;
    }

    // Get first photo
    getFirstPhoto() {
        return this.product_photos && this.product_photos.length > 0 ? this.product_photos[0] : null;
    }

    // Get last photo
    getLastPhoto() {
        return this.product_photos && this.product_photos.length > 0 ? this.product_photos[this.product_photos.length - 1] : null;
    }

    // Add photo
    addPhoto(photoUrl) {
        if (!this.product_photos) {
            this.product_photos = [];
        }
        this.product_photos.push(photoUrl);
    }

    // Remove photo
    removePhoto(photoUrl) {
        if (this.product_photos) {
            this.product_photos = this.product_photos.filter(photo => photo !== photoUrl);
        }
    }

    // Check if has photo
    hasPhoto(photoUrl) {
        return this.product_photos && this.product_photos.includes(photoUrl);
    }

    // Get formatted price
    getFormattedPrice() {
        return `${this.price} ${this.currency_unit}`;
    }

    // Check if has description
    hasDescription() {
        return this.description && this.description.length > 0;
    }

    // Get description preview
    getDescriptionPreview(maxLength = 100) {
        if (!this.description) return '';
        return this.description.length > maxLength ? 
            this.description.substring(0, maxLength) + '...' : 
            this.description;
    }

    // Convert to JSON
    toJSON() {
        return {
            price: this.price,
            description: this.description,
            path: this.path,
            product_id: this.product_id,
            product_name: this.product_name,
            currency_unit: this.currency_unit,
            product_photos: this.product_photos,
            create_time: this.create_time,
            catalog_id: this.catalog_id,
            owner_id: this.owner_id
        };
    }

    // Create from data
    static fromData(data) {
        return new ProductCatalog(data);
    }
}

module.exports = ProductCatalog;
