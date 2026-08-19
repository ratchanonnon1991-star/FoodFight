export declare const AuthProvider: {
    readonly GOOGLE: "GOOGLE";
    readonly LINE: "LINE";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const RoomStatus: {
    readonly LOBBY: "LOBBY";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus];
export declare const FoodFightStatus: {
    readonly COLLECTING_PREFERENCES: "COLLECTING_PREFERENCES";
    readonly GENERATING_RECOMMENDATIONS: "GENERATING_RECOMMENDATIONS";
    readonly VOTING: "VOTING";
    readonly FINAL_VOTE: "FINAL_VOTE";
    readonly FINALIZED: "FINALIZED";
    readonly RESTAURANT_RECOMMENDATION: "RESTAURANT_RECOMMENDATION";
    readonly RESTAURANT_SELECTION: "RESTAURANT_SELECTION";
    readonly BILLING: "BILLING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type FoodFightStatus = (typeof FoodFightStatus)[keyof typeof FoodFightStatus];
export declare const SessionMemberRole: {
    readonly HOST: "HOST";
    readonly MEMBER: "MEMBER";
};
export type SessionMemberRole = (typeof SessionMemberRole)[keyof typeof SessionMemberRole];
export declare const MealBudgetRange: {
    readonly UNDER_200: "UNDER_200";
    readonly BETWEEN_200_400: "BETWEEN_200_400";
    readonly BETWEEN_400_600: "BETWEEN_400_600";
    readonly ABOVE_600: "ABOVE_600";
    readonly ANY: "ANY";
};
export type MealBudgetRange = (typeof MealBudgetRange)[keyof typeof MealBudgetRange];
export declare const RecommendationRoundStatus: {
    readonly GENERATING: "GENERATING";
    readonly VOTING: "VOTING";
    readonly COMPLETED: "COMPLETED";
};
export type RecommendationRoundStatus = (typeof RecommendationRoundStatus)[keyof typeof RecommendationRoundStatus];
export declare const VoteAction: {
    readonly OK: "OK";
    readonly PASS: "PASS";
};
export type VoteAction = (typeof VoteAction)[keyof typeof VoteAction];
export declare const FinalVoteType: {
    readonly TIE_BREAK: "TIE_BREAK";
    readonly FOUR_MENU_FINAL: "FOUR_MENU_FINAL";
};
export type FinalVoteType = (typeof FinalVoteType)[keyof typeof FinalVoteType];
export declare const FinalSelectionMethod: {
    readonly OK_MAJORITY: "OK_MAJORITY";
    readonly FINAL_VOTE: "FINAL_VOTE";
    readonly HOST_TIE_BREAK: "HOST_TIE_BREAK";
};
export type FinalSelectionMethod = (typeof FinalSelectionMethod)[keyof typeof FinalSelectionMethod];
export declare const RestaurantRecommendationStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SELECTED: "SELECTED";
    readonly REJECTED: "REJECTED";
};
export type RestaurantRecommendationStatus = (typeof RestaurantRecommendationStatus)[keyof typeof RestaurantRecommendationStatus];
export declare const BillStatus: {
    readonly DRAFT: "DRAFT";
    readonly SPLITTING: "SPLITTING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type BillStatus = (typeof BillStatus)[keyof typeof BillStatus];
export declare const PaymentStatus: {
    readonly UNPAID: "UNPAID";
    readonly PAID: "PAID";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const OcrStatus: {
    readonly NOT_USED: "NOT_USED";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type OcrStatus = (typeof OcrStatus)[keyof typeof OcrStatus];
export declare const PaymentAccountType: {
    readonly PROMPTPAY: "PROMPTPAY";
};
export type PaymentAccountType = (typeof PaymentAccountType)[keyof typeof PaymentAccountType];
