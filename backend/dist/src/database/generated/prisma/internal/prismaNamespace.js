"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.UserPaymentScalarFieldEnum = exports.ItemShareScalarFieldEnum = exports.ReceiptItemScalarFieldEnum = exports.ReceiptScalarFieldEnum = exports.BillScalarFieldEnum = exports.RestaurantSelectionScalarFieldEnum = exports.RestaurantRecommendationScalarFieldEnum = exports.FinalSelectionScalarFieldEnum = exports.FinalVoteScalarFieldEnum = exports.VoteScalarFieldEnum = exports.RecommendationItemScalarFieldEnum = exports.RecommendationRoundScalarFieldEnum = exports.MealPreferenceScalarFieldEnum = exports.SessionMemberScalarFieldEnum = exports.FoodFightSessionScalarFieldEnum = exports.RoomMemberScalarFieldEnum = exports.RoomScalarFieldEnum = exports.PaymentAccountScalarFieldEnum = exports.FoodProfileScalarFieldEnum = exports.PasswordResetScalarFieldEnum = exports.EmailVerificationScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.AccountScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.9.1",
    engine: "e922089b7d7502aff4249d5da3420f6fa55fc6ad"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Account: 'Account',
    RefreshToken: 'RefreshToken',
    EmailVerification: 'EmailVerification',
    PasswordReset: 'PasswordReset',
    FoodProfile: 'FoodProfile',
    PaymentAccount: 'PaymentAccount',
    Room: 'Room',
    RoomMember: 'RoomMember',
    FoodFightSession: 'FoodFightSession',
    SessionMember: 'SessionMember',
    MealPreference: 'MealPreference',
    RecommendationRound: 'RecommendationRound',
    RecommendationItem: 'RecommendationItem',
    Vote: 'Vote',
    FinalVote: 'FinalVote',
    FinalSelection: 'FinalSelection',
    RestaurantRecommendation: 'RestaurantRecommendation',
    RestaurantSelection: 'RestaurantSelection',
    Bill: 'Bill',
    Receipt: 'Receipt',
    ReceiptItem: 'ReceiptItem',
    ItemShare: 'ItemShare',
    UserPayment: 'UserPayment'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    displayName: 'displayName',
    email: 'email',
    passwordHash: 'passwordHash',
    avatarUrl: 'avatarUrl',
    emailVerified: 'emailVerified',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
};
exports.EmailVerificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    otpHash: 'otpHash',
    expiresAt: 'expiresAt',
    resendAvailableAt: 'resendAvailableAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PasswordResetScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    resendAvailableAt: 'resendAvailableAt',
    used: 'used',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FoodProfileScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    allergies: 'allergies',
    otherAllergies: 'otherAllergies',
    restrictions: 'restrictions',
    otherRestrictions: 'otherRestrictions',
    additionalNotes: 'additionalNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PaymentAccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    paymentType: 'paymentType',
    accountName: 'accountName',
    promptPayNumber: 'promptPayNumber',
    qrCodeUrl: 'qrCodeUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoomScalarFieldEnum = {
    id: 'id',
    hostId: 'hostId',
    name: 'name',
    roomCode: 'roomCode',
    inviteToken: 'inviteToken',
    maxMembers: 'maxMembers',
    locationName: 'locationName',
    latitude: 'latitude',
    longitude: 'longitude',
    searchRadiusKm: 'searchRadiusKm',
    scheduledAt: 'scheduledAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RoomMemberScalarFieldEnum = {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    isReady: 'isReady',
    joinedAt: 'joinedAt',
    leftAt: 'leftAt'
};
exports.FoodFightSessionScalarFieldEnum = {
    id: 'id',
    roomId: 'roomId',
    status: 'status',
    startedAt: 'startedAt',
    finalizedAt: 'finalizedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SessionMemberScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
};
exports.MealPreferenceScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    cookingTypes: 'cookingTypes',
    otherCookingType: 'otherCookingType',
    cuisines: 'cuisines',
    otherCuisine: 'otherCuisine',
    ingredients: 'ingredients',
    otherIngredient: 'otherIngredient',
    budgetRange: 'budgetRange',
    restaurantStyles: 'restaurantStyles',
    otherRestaurantStyle: 'otherRestaurantStyle',
    otherNote: 'otherNote',
    submittedAt: 'submittedAt',
    updatedAt: 'updatedAt'
};
exports.RecommendationRoundScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    roundNumber: 'roundNumber',
    status: 'status',
    generatedAt: 'generatedAt',
    completedAt: 'completedAt'
};
exports.RecommendationItemScalarFieldEnum = {
    id: 'id',
    recommendationRoundId: 'recommendationRoundId',
    menuName: 'menuName',
    description: 'description',
    reason: 'reason',
    imageUrl: 'imageUrl',
    recommendationScore: 'recommendationScore',
    metadata: 'metadata',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VoteScalarFieldEnum = {
    id: 'id',
    recommendationItemId: 'recommendationItemId',
    userId: 'userId',
    action: 'action',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FinalVoteScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    recommendationItemId: 'recommendationItemId',
    voteType: 'voteType',
    createdAt: 'createdAt'
};
exports.FinalSelectionScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    recommendationItemId: 'recommendationItemId',
    selectedById: 'selectedById',
    method: 'method',
    selectedAt: 'selectedAt'
};
exports.RestaurantRecommendationScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    externalPlaceId: 'externalPlaceId',
    name: 'name',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    distanceMeters: 'distanceMeters',
    phone: 'phone',
    openingHours: 'openingHours',
    imageUrl: 'imageUrl',
    finalMenuMatch: 'finalMenuMatch',
    varietyScore: 'varietyScore',
    groupCompatibilityScore: 'groupCompatibilityScore',
    rankingScore: 'rankingScore',
    reason: 'reason',
    status: 'status',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RestaurantSelectionScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    selectedById: 'selectedById',
    externalPlaceId: 'externalPlaceId',
    name: 'name',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    distanceMeters: 'distanceMeters',
    phone: 'phone',
    openingHours: 'openingHours',
    imageUrl: 'imageUrl',
    selectedAt: 'selectedAt'
};
exports.BillScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    createdById: 'createdById',
    status: 'status',
    subtotal: 'subtotal',
    serviceCharge: 'serviceCharge',
    tax: 'tax',
    discount: 'discount',
    totalAmount: 'totalAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReceiptScalarFieldEnum = {
    id: 'id',
    billId: 'billId',
    imageUrl: 'imageUrl',
    ocrStatus: 'ocrStatus',
    rawOcrText: 'rawOcrText',
    parsedData: 'parsedData',
    uploadedAt: 'uploadedAt',
    updatedAt: 'updatedAt'
};
exports.ReceiptItemScalarFieldEnum = {
    id: 'id',
    billId: 'billId',
    name: 'name',
    imageUrl: 'imageUrl',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ItemShareScalarFieldEnum = {
    id: 'id',
    receiptItemId: 'receiptItemId',
    userId: 'userId',
    amount: 'amount',
    createdAt: 'createdAt'
};
exports.UserPaymentScalarFieldEnum = {
    id: 'id',
    billId: 'billId',
    userId: 'userId',
    amount: 'amount',
    status: 'status',
    slipImageUrl: 'slipImageUrl',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map