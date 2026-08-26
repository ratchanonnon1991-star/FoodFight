import type { AiJsonObject } from '../types/ai-json.types';
export declare class RecommendationRequestDto {
    roomId: string;
    members: AiJsonObject[];
    history?: string[];
    rerollExclusions?: string[];
}
export declare class RecommendationSummaryDto {
    conceptId: string;
    nameTh: string;
}
export declare class VoteItemDto {
    memberId: string;
    conceptId: string;
    vote: string;
}
export declare class InitialVoteRequestDto {
    recommendations: RecommendationSummaryDto[];
    memberIds: string[];
    votes: VoteItemDto[];
    rerollCount: number;
}
export declare class FinalVoteItemDto {
    memberId: string;
    conceptId: string;
}
export declare class FinalVoteRequestDto {
    candidates: AiJsonObject[];
    memberIds: string[];
    votes: FinalVoteItemDto[];
}
export declare class RestaurantRequestDto {
    finalConcept: AiJsonObject;
    groupLocation: Record<string, number>;
    normalizedMembers: AiJsonObject[];
    radiusKm: number;
    topK: number;
}
