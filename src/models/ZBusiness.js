// ZBusiness Model - Dành cho zBusiness
class ZBusiness {
    constructor(data) {
        this.label = data.label;
        this.pkgId = data.pkgId;
    }

    // Get label
    getLabel() {
        return this.label;
    }

    // Get package ID
    getPkgId() {
        return this.pkgId;
    }

    // Check if has label
    hasLabel() {
        return this.label !== null && this.label !== undefined;
    }

    // Get label value by key
    getLabelValue(key) {
        if (!this.hasLabel()) return null;
        return this.label[key];
    }

    // Set label value
    setLabelValue(key, value) {
        if (!this.label) {
            this.label = {};
        }
        this.label[key] = value;
    }

    // Remove label value
    removeLabelValue(key) {
        if (this.label) {
            delete this.label[key];
        }
    }

    // Get all label keys
    getLabelKeys() {
        if (!this.hasLabel()) return [];
        return Object.keys(this.label);
    }

    // Get all label values
    getLabelValues() {
        if (!this.hasLabel()) return [];
        return Object.values(this.label);
    }

    // Check if has label key
    hasLabelKey(key) {
        return this.label && this.label.hasOwnProperty(key);
    }

    // Get label count
    getLabelCount() {
        if (!this.hasLabel()) return 0;
        return Object.keys(this.label).length;
    }

    // Convert to JSON
    toJSON() {
        return {
            label: this.label,
            pkgId: this.pkgId
        };
    }

    // Create from data
    static fromData(data) {
        return new ZBusiness(data);
    }
}

// ZBusinessPackage Model
class ZBusinessPackage {
    constructor(data) {
        this.label = data.label;
        this.pkgId = data.pkgId;
    }

    // Get label
    getLabel() {
        return this.label;
    }

    // Get package ID
    getPkgId() {
        return this.pkgId;
    }

    // Check if has label
    hasLabel() {
        return this.label !== null && this.label !== undefined;
    }

    // Get label value by key
    getLabelValue(key) {
        if (!this.hasLabel()) return null;
        return this.label[key];
    }

    // Set label value
    setLabelValue(key, value) {
        if (!this.label) {
            this.label = {};
        }
        this.label[key] = value;
    }

    // Remove label value
    removeLabelValue(key) {
        if (this.label) {
            delete this.label[key];
        }
    }

    // Get all label keys
    getLabelKeys() {
        if (!this.hasLabel()) return [];
        return Object.keys(this.label);
    }

    // Get all label values
    getLabelValues() {
        if (!this.hasLabel()) return [];
        return Object.values(this.label);
    }

    // Check if has label key
    hasLabelKey(key) {
        return this.label && this.label.hasOwnProperty(key);
    }

    // Get label count
    getLabelCount() {
        if (!this.hasLabel()) return 0;
        return Object.keys(this.label).length;
    }

    // Convert to JSON
    toJSON() {
        return {
            label: this.label,
            pkgId: this.pkgId
        };
    }
}

// BusinessCategory enum
const BusinessCategory = {
    Other: 0,
    RealEstate: 1,
    TechnologyAndDevices: 2,
    TravelAndHospitality: 3,
    EducationAndTraining: 4,
    ShoppingAndRetail: 5,
    CosmeticsAndBeauty: 6,
    RestaurantAndCafe: 7,
    AutoAndMotorbike: 8,
    FashionAndApparel: 9,
    FoodAndBeverage: 10,
    MediaAndEntertainment: 11,
    InternalCommunications: 12,
    Transportation: 13,
    Telecommunications: 14
};

// BusinessCategoryName mapping
const BusinessCategoryName = {
    [BusinessCategory.Other]: "Dịch vụ khác (Không hiển thị)",
    [BusinessCategory.RealEstate]: "Bất động sản",
    [BusinessCategory.TechnologyAndDevices]: "Công nghệ & Thiết bị",
    [BusinessCategory.TravelAndHospitality]: "Du lịch & Lưu trú",
    [BusinessCategory.EducationAndTraining]: "Giáo dục & Đào tạo",
    [BusinessCategory.ShoppingAndRetail]: "Mua sắm & Bán lẻ",
    [BusinessCategory.CosmeticsAndBeauty]: "Mỹ phẩm & Làm đẹp",
    [BusinessCategory.RestaurantAndCafe]: "Nhà hàng & Quán",
    [BusinessCategory.AutoAndMotorbike]: "Ô tô & Xe máy",
    [BusinessCategory.FashionAndApparel]: "Thời trang & May mặc",
    [BusinessCategory.FoodAndBeverage]: "Thực phẩm & Đồ uống",
    [BusinessCategory.MediaAndEntertainment]: "Truyền thông & Giải trí",
    [BusinessCategory.InternalCommunications]: "Truyền thông nội bộ",
    [BusinessCategory.Transportation]: "Vận tải",
    [BusinessCategory.Telecommunications]: "Viễn thông"
};

// BusinessCategoryHelper class
class BusinessCategoryHelper {
    // Get category name by ID
    static getCategoryName(categoryId) {
        return BusinessCategoryName[categoryId] || 'Unknown';
    }

    // Get category ID by name
    static getCategoryId(categoryName) {
        const entries = Object.entries(BusinessCategoryName);
        const entry = entries.find(([id, name]) => name === categoryName);
        return entry ? parseInt(entry[0]) : null;
    }

    // Get all categories
    static getAllCategories() {
        return Object.entries(BusinessCategoryName).map(([id, name]) => ({
            id: parseInt(id),
            name: name
        }));
    }

    // Check if category exists
    static hasCategory(categoryId) {
        return BusinessCategoryName.hasOwnProperty(categoryId);
    }

    // Get categories by keyword
    static searchCategories(keyword) {
        const allCategories = this.getAllCategories();
        return allCategories.filter(category => 
            category.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    // Get category statistics
    static getCategoryStats() {
        return {
            total: Object.keys(BusinessCategoryName).length,
            categories: this.getAllCategories()
        };
    }
}

module.exports = {
    ZBusiness,
    ZBusinessPackage,
    BusinessCategory,
    BusinessCategoryName,
    BusinessCategoryHelper
};
