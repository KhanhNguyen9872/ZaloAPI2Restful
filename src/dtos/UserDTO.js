// UserDTO - Data Transfer Object
class UserDTO {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.avatar = data.avatar;
        this.phone = data.phone;
        this.email = data.email;
        this.isOnline = data.isOnline;
        this.lastSeen = data.lastSeen;
        this.alias = data.alias;
        this.isBlocked = data.isBlocked;
        this.isFriend = data.isFriend;
    }

    // Validation
    static validate(data) {
        const errors = [];
        
        if (!data.id) errors.push('ID is required');
        if (!data.name) errors.push('Name is required');
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Factory methods
    static fromModel(user) {
        return new UserDTO({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            phone: user.phone,
            email: user.email,
            isOnline: user.isOnline,
            lastSeen: user.lastSeen,
            alias: user.alias,
            isBlocked: user.isBlocked,
            isFriend: user.isFriend
        });
    }

    static fromZaloData(zaloData) {
        return new UserDTO({
            id: zaloData.id,
            name: zaloData.name,
            avatar: zaloData.avatar,
            phone: zaloData.phone,
            email: zaloData.email,
            isOnline: zaloData.isOnline,
            lastSeen: zaloData.lastSeen,
            alias: zaloData.alias,
            isBlocked: zaloData.isBlocked || false,
            isFriend: zaloData.isFriend || false
        });
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            phone: this.phone,
            email: this.email,
            isOnline: this.isOnline,
            lastSeen: this.lastSeen,
            alias: this.alias,
            isBlocked: this.isBlocked,
            isFriend: this.isFriend
        };
    }

    // Response format
    toResponse() {
        return {
            success: true,
            data: this.toJSON()
        };
    }
}

module.exports = UserDTO;
