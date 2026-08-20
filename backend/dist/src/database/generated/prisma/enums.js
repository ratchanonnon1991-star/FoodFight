"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrStatus = exports.PaymentStatus = exports.BillStatus = exports.RestaurantRecommendationStatus = exports.FinalSelectionMethod = exports.FinalVoteType = exports.VoteAction = exports.RecommendationRoundStatus = exports.MealBudgetRange = exports.SessionMemberRole = exports.FoodFightStatus = exports.RoomStatus = exports.Role = exports.AuthProvider = void 0;
exports.AuthProvider = {
    GOOGLE: 'GOOGLE',
    LINE: 'LINE'
};
exports.Role = {
    USER: 'USER',
    ADMIN: 'ADMIN'
};
exports.RoomStatus = {
    LOBBY: 'LOBBY',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
exports.FoodFightStatus = {
    COLLECTING_PREFERENCES: 'COLLECTING_PREFERENCES',
    GENERATING_RECOMMENDATIONS: 'GENERATING_RECOMMENDATIONS',
    VOTING: 'VOTING',
    FINAL_VOTE: 'FINAL_VOTE',
    FINALIZED: 'FINALIZED',
    RESTAURANT_RECOMMENDATION: 'RESTAURANT_RECOMMENDATION',
    RESTAURANT_SELECTION: 'RESTAURANT_SELECTION',
    BILLING: 'BILLING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
exports.SessionMemberRole = {
    HOST: 'HOST',
    MEMBER: 'MEMBER'
};
exports.MealBudgetRange = {
    UNDER_200: 'UNDER_200',
    BETWEEN_200_400: 'BETWEEN_200_400',
    BETWEEN_400_600: 'BETWEEN_400_600',
    ABOVE_600: 'ABOVE_600',
    ANY: 'ANY'
};
exports.RecommendationRoundStatus = {
    GENERATING: 'GENERATING',
    VOTING: 'VOTING',
    COMPLETED: 'COMPLETED'
};
exports.VoteAction = {
    OK: 'OK',
    PASS: 'PASS'
};
exports.FinalVoteType = {
    TIE_BREAK: 'TIE_BREAK',
    FOUR_MENU_FINAL: 'FOUR_MENU_FINAL'
};
exports.FinalSelectionMethod = {
    OK_MAJORITY: 'OK_MAJORITY',
    FINAL_VOTE: 'FINAL_VOTE',
    HOST_TIE_BREAK: 'HOST_TIE_BREAK'
};
exports.RestaurantRecommendationStatus = {
    ACTIVE: 'ACTIVE',
    SELECTED: 'SELECTED',
    REJECTED: 'REJECTED'
};
exports.BillStatus = {
    DRAFT: 'DRAFT',
    SPLITTING: 'SPLITTING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
exports.PaymentStatus = {
    UNPAID: 'UNPAID',
    PAID: 'PAID'
};
exports.OcrStatus = {
    NOT_USED: 'NOT_USED',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
//# sourceMappingURL=enums.js.map