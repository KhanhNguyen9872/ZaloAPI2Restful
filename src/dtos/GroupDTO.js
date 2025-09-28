// GroupDTO - Data Transfer Object
class GroupDTO {
    constructor(data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.avatar = data.avatar;
        this.description = data.description;
        this.ownerId = data.ownerId;
        this.members = data.members;
        this.deputies = data.deputies;
        this.isActive = data.isActive;
        this.memberCount = data.memberCount;
    }

    // Validation
    static validate(data) {
        const errors = [];
        
        if (!data.id) errors.push('ID is required');
        if (!data.name) errors.push('Name is required');
        if (!data.ownerId) errors.push('Owner ID is required');
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Factory methods
    static fromModel(group) {
        return new GroupDTO({
            id: group.id,
            name: group.name,
            avatar: group.avatar,
            description: group.description,
            ownerId: group.ownerId,
            members: group.members,
            deputies: group.deputies,
            isActive: group.isActive,
            memberCount: group.members ? group.members.length : 0
        });
    }

    static fromZaloData(zaloData) {
        return new GroupDTO({
            id: zaloData.id,
            name: zaloData.name,
            avatar: zaloData.avatar,
            description: zaloData.description,
            ownerId: zaloData.ownerId,
            members: zaloData.members || [],
            deputies: zaloData.deputies || [],
            isActive: zaloData.isActive !== false,
            memberCount: zaloData.members ? zaloData.members.length : 0
        });
    }

    // Serialization
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            description: this.description,
            ownerId: this.ownerId,
            members: this.members,
            deputies: this.deputies,
            isActive: this.isActive,
            memberCount: this.memberCount
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

module.exports = GroupDTO;
