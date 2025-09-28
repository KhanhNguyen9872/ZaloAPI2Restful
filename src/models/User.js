// User Model - Người dùng
class User {
    constructor(data) {
        this.userId = data.userId;
        this.username = data.username;
        this.displayName = data.displayName;
        this.zaloName = data.zaloName;
        this.avatar = data.avatar;
        this.bgavatar = data.bgavatar;
        this.cover = data.cover;
        this.gender = data.gender;
        this.dob = data.dob;
        this.sdob = data.sdob;
        this.status = data.status;
        this.phoneNumber = data.phoneNumber;
        this.isFr = data.isFr;
        this.isBlocked = data.isBlocked;
        this.lastActionTime = data.lastActionTime;
        this.lastUpdateTime = data.lastUpdateTime;
        this.isActive = data.isActive;
        this.key = data.key;
        this.type = data.type;
        this.isActivePC = data.isActivePC;
        this.isActiveWeb = data.isActiveWeb;
        this.isValid = data.isValid;
        this.userKey = data.userKey;
        this.accountStatus = data.accountStatus;
        this.oaInfo = data.oaInfo;
        this.user_mode = data.user_mode;
        this.globalId = data.globalId;
        this.bizPkg = data.bizPkg;
        this.createdTs = data.createdTs;
        this.oa_status = data.oa_status;
    }

    // Get user ID
    getUserId() {
        return this.userId;
    }

    // Get username
    getUsername() {
        return this.username;
    }

    // Get display name
    getDisplayName() {
        return this.displayName;
    }

    // Get Zalo name
    getZaloName() {
        return this.zaloName;
    }

    // Get avatar
    getAvatar() {
        return this.avatar;
    }

    // Get background avatar
    getBgavatar() {
        return this.bgavatar;
    }

    // Get cover
    getCover() {
        return this.cover;
    }

    // Get gender
    getGender() {
        return this.gender;
    }

    // Get date of birth
    getDob() {
        return this.dob;
    }

    // Get string date of birth
    getSdob() {
        return this.sdob;
    }

    // Get status
    getStatus() {
        return this.status;
    }

    // Get phone number
    getPhoneNumber() {
        return this.phoneNumber;
    }

    // Get is friend
    getIsFr() {
        return this.isFr;
    }

    // Get is blocked
    getIsBlocked() {
        return this.isBlocked;
    }

    // Get last action time
    getLastActionTime() {
        return this.lastActionTime;
    }

    // Get last update time
    getLastUpdateTime() {
        return this.lastUpdateTime;
    }

    // Get is active
    getIsActive() {
        return this.isActive;
    }

    // Get key
    getKey() {
        return this.key;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get is active PC
    getIsActivePC() {
        return this.isActivePC;
    }

    // Get is active web
    getIsActiveWeb() {
        return this.isActiveWeb;
    }

    // Get is valid
    getIsValid() {
        return this.isValid;
    }

    // Get user key
    getUserKey() {
        return this.userKey;
    }

    // Get account status
    getAccountStatus() {
        return this.accountStatus;
    }

    // Get OA info
    getOaInfo() {
        return this.oaInfo;
    }

    // Get user mode
    getUserMode() {
        return this.user_mode;
    }

    // Get global ID
    getGlobalId() {
        return this.globalId;
    }

    // Get business package
    getBizPkg() {
        return this.bizPkg;
    }

    // Get created timestamp
    getCreatedTs() {
        return this.createdTs;
    }

    // Get OA status
    getOaStatus() {
        return this.oa_status;
    }

    // Check if is friend
    isFriend() {
        return this.isFr === 1;
    }

    // Check if is blocked
    isBlocked() {
        return this.isBlocked === 1;
    }

    // Check if is active
    isActive() {
        return this.isActive === 1;
    }

    // Check if is active PC
    isActivePC() {
        return this.isActivePC === 1;
    }

    // Check if is active web
    isActiveWeb() {
        return this.isActiveWeb === 1;
    }

    // Check if is valid
    isValid() {
        return this.isValid === 1;
    }

    // Check if is male
    isMale() {
        return this.gender === Gender.Male;
    }

    // Check if is female
    isFemale() {
        return this.gender === Gender.Female;
    }

    // Get gender name
    getGenderName() {
        return this.isMale() ? 'Male' : this.isFemale() ? 'Female' : 'Unknown';
    }

    // Check if has avatar
    hasAvatar() {
        return this.avatar && this.avatar.length > 0;
    }

    // Check if has background avatar
    hasBgavatar() {
        return this.bgavatar && this.bgavatar.length > 0;
    }

    // Check if has cover
    hasCover() {
        return this.cover && this.cover.length > 0;
    }

    // Check if has phone number
    hasPhoneNumber() {
        return this.phoneNumber && this.phoneNumber.length > 0;
    }

    // Check if has OA info
    hasOaInfo() {
        return this.oaInfo !== null && this.oaInfo !== undefined;
    }

    // Check if has business package
    hasBizPkg() {
        return this.bizPkg !== null && this.bizPkg !== undefined;
    }

    // Get age (if DOB is available)
    getAge() {
        if (!this.dob) return null;
        const now = new Date();
        const birthDate = new Date(this.dob * 1000);
        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Get formatted date of birth
    getFormattedDob() {
        if (!this.dob) return null;
        return new Date(this.dob * 1000).toLocaleDateString();
    }

    // Get last action time formatted
    getFormattedLastActionTime() {
        if (!this.lastActionTime) return null;
        return new Date(this.lastActionTime * 1000).toLocaleString();
    }

    // Get last update time formatted
    getFormattedLastUpdateTime() {
        if (!this.lastUpdateTime) return null;
        return new Date(this.lastUpdateTime * 1000).toLocaleString();
    }

    // Get created time formatted
    getFormattedCreatedTime() {
        if (!this.createdTs) return null;
        return new Date(this.createdTs * 1000).toLocaleString();
    }

    // Get business package label
    getBizPkgLabel() {
        if (!this.hasBizPkg()) return null;
        return this.bizPkg.label;
    }

    // Get business package ID
    getBizPkgId() {
        if (!this.hasBizPkg()) return null;
        return this.bizPkg.pkgId;
    }

    // Get user type name
    getUserTypeName() {
        const typeNames = {
            0: 'Normal User',
            1: 'Business User',
            2: 'Official Account'
        };
        return typeNames[this.type] || 'Unknown';
    }

    // Get account status name
    getAccountStatusName() {
        const statusNames = {
            0: 'Inactive',
            1: 'Active',
            2: 'Suspended',
            3: 'Banned'
        };
        return statusNames[this.accountStatus] || 'Unknown';
    }

    // Convert to JSON
    toJSON() {
        return {
            userId: this.userId,
            username: this.username,
            displayName: this.displayName,
            zaloName: this.zaloName,
            avatar: this.avatar,
            bgavatar: this.bgavatar,
            cover: this.cover,
            gender: this.gender,
            dob: this.dob,
            sdob: this.sdob,
            status: this.status,
            phoneNumber: this.phoneNumber,
            isFr: this.isFr,
            isBlocked: this.isBlocked,
            lastActionTime: this.lastActionTime,
            lastUpdateTime: this.lastUpdateTime,
            isActive: this.isActive,
            key: this.key,
            type: this.type,
            isActivePC: this.isActivePC,
            isActiveWeb: this.isActiveWeb,
            isValid: this.isValid,
            userKey: this.userKey,
            accountStatus: this.accountStatus,
            oaInfo: this.oaInfo,
            user_mode: this.user_mode,
            globalId: this.globalId,
            bizPkg: this.bizPkg,
            createdTs: this.createdTs,
            oa_status: this.oa_status
        };
    }

    // Create from data
    static fromData(data) {
        return new User(data);
    }
}

// Gender enum
const Gender = {
    Male: 0,
    Female: 1
};

module.exports = {
    User,
    Gender
};