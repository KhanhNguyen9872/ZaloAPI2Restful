// Models index - Export all models
const Attachment = require('./Attachment');
const { AutoReply, AutoReplyScope } = require('./AutoReply');
const { 
    Board, 
    PollDetail, 
    PollOptions, 
    NoteDetail, 
    PinnedMessageDetail, 
    BoardType 
} = require('./Board');
const Catalog = require('./Catalog');
const { 
    DeliveredMessage, 
    TDeliveredMessage, 
    TGroupDeliveredMessage, 
    UserDeliveredMessage, 
    GroupDeliveredMessage 
} = require('./DeliveredMessage');
const { ThreadType, DestType, Gender, BinBankCard } = require('./Enums');
const {
    FriendEvent,
    TFriendEventBase,
    TFriendEventRejectUndo,
    TFriendEventRequest,
    TFriendEventSeenRequest,
    TFriendEventPinCreateTopicParams,
    TFriendEventPinTopic,
    TFriendEventPinCreateTopic,
    TFriendEventPinCreate,
    TFriendEventPinUnpin,
    FriendEventType
} = require('./FriendEvent');
const {
    Group,
    GroupSetting,
    GroupCurrentMem,
    GroupTopic,
    GroupTopicType,
    GroupType
} = require('./Group');
const {
    GroupEvent,
    TGroupEventBase,
    TGroupEventJoinRequest,
    TGroupEventPinTopic,
    TGroupEventReorderPinTopic,
    TGroupEventBoard,
    TGroupEventRemindRespond,
    TGroupEventRemindTopic,
    GroupEventUpdateMember,
    GroupEventGroupInfo,
    GroupEventExtraData,
    GroupEventType
} = require('./GroupEvent');
const Label = require('./Label');
const {
    Message,
    TMessage,
    TGroupMessage,
    TQuote,
    TMention,
    TAttachmentContent,
    TOtherContent,
    UserMessage,
    GroupMessage,
    ThreadType
} = require('./Message');
const ProductCatalog = require('./ProductCatalog');
const {
    QuickMessage,
    QuickMessageMediaItem
} = require('./QuickMessage');
const {
    Reaction,
    TReaction,
    Reactions
} = require('./Reaction');
const {
    Reminder,
    ReminderUser,
    ReminderGroup,
    ReminderRepeatMode
} = require('./Reminder');
const {
    SeenMessage,
    TUserSeenMessage,
    TGroupSeenMessage,
    UserSeenMessage,
    GroupSeenMessage
} = require('./SeenMessage');
const {
    Typing,
    TTyping,
    TGroupTyping,
    UserTyping,
    GroupTyping
} = require('./Typing');
const {
    Undo,
    TUndo,
    TUndoContent
} = require('./Undo');
const {
    User,
    Gender
} = require('./User');
const {
    ZBusiness,
    ZBusinessPackage,
    BusinessCategory,
    BusinessCategoryName,
    BusinessCategoryHelper
} = require('./ZBusiness');

// Export all models
module.exports = {
    // Core models
    Attachment,
    AutoReply,
    AutoReplyScope,
    Board,
    PollDetail,
    PollOptions,
    NoteDetail,
    PinnedMessageDetail,
    BoardType,
    Catalog,
    DeliveredMessage,
    TDeliveredMessage,
    TGroupDeliveredMessage,
    UserDeliveredMessage,
    GroupDeliveredMessage,
    
    // Friend Event models
    FriendEvent,
    TFriendEventBase,
    TFriendEventRejectUndo,
    TFriendEventRequest,
    TFriendEventSeenRequest,
    TFriendEventPinCreateTopicParams,
    TFriendEventPinTopic,
    TFriendEventPinCreateTopic,
    TFriendEventPinCreate,
    TFriendEventPinUnpin,
    FriendEventType,
    
    // Group models
    Group,
    GroupSetting,
    GroupCurrentMem,
    GroupTopic,
    GroupTopicType,
    GroupType,
    
    // Group Event models
    GroupEvent,
    TGroupEventBase,
    TGroupEventJoinRequest,
    TGroupEventPinTopic,
    TGroupEventReorderPinTopic,
    TGroupEventBoard,
    TGroupEventRemindRespond,
    TGroupEventRemindTopic,
    GroupEventUpdateMember,
    GroupEventGroupInfo,
    GroupEventExtraData,
    GroupEventType,
    
    // Label model
    Label,
    
    // Message models
    Message,
    TMessage,
    TGroupMessage,
    TQuote,
    TMention,
    TAttachmentContent,
    TOtherContent,
    UserMessage,
    GroupMessage,
    
    // Product Catalog model
    ProductCatalog,
    
    // Quick Message models
    QuickMessage,
    QuickMessageMediaItem,
    
    // Reaction models
    Reaction,
    TReaction,
    Reactions,
    
    // Reminder models
    Reminder,
    ReminderUser,
    ReminderGroup,
    ReminderRepeatMode,
    
    // Seen Message models
    SeenMessage,
    TUserSeenMessage,
    TGroupSeenMessage,
    UserSeenMessage,
    GroupSeenMessage,
    
    // Typing models
    Typing,
    TTyping,
    TGroupTyping,
    UserTyping,
    GroupTyping,
    
    // Undo models
    Undo,
    TUndo,
    TUndoContent,
    
    // User model
    User,
    
    // ZBusiness models
    ZBusiness,
    ZBusinessPackage,
    BusinessCategory,
    BusinessCategoryName,
    BusinessCategoryHelper,
    
    // Enums
    ThreadType,
    DestType,
    Gender,
    BinBankCard
};
