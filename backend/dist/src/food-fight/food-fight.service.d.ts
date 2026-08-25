import { FoodFightStatus, FinalVoteType, MealBudgetRange, Prisma, RecommendationRoundStatus, VoteAction } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { RecommendationAiService } from '../recommendation-ai/recommendation-ai.service';
import { type AiJsonValue } from '../recommendation-ai/types/ai-json.types';
import { UpsertMealPreferenceDto } from './dto/upsert-meal-preference.dto';
import { SubmitFinalVoteDto } from './dto/submit-final-vote.dto';
import { SubmitVotesDto } from './dto/submit-votes.dto';
export type FoodFightFlowState = 'WAITING_FOR_PREFERENCES' | 'READY_TO_RECOMMEND' | 'RECOMMENDING' | 'VOTING' | 'WAITING_FOR_VOTES' | 'FINAL_VOTE_REQUIRED' | 'REROLL_REQUIRED' | 'RECOMMENDING_RESTAURANTS' | 'RESTAURANTS_READY' | 'FINALIZED';
export type RestaurantFlowState = 'FINALIZED_MENU' | 'RECOMMENDING_RESTAURANTS' | 'RESTAURANTS_READY';
type RecommendationItemSource = {
    id: string;
    menuName: string;
    description: string | null;
    reason: string | null;
    imageUrl: string | null;
    recommendationScore: number | null;
    metadata: Prisma.JsonValue | null;
    displayOrder: number;
};
export declare class FoodFightService {
    private readonly prisma;
    private readonly recommendationAiService;
    constructor(prisma: PrismaService, recommendationAiService: RecommendationAiService);
    createSessionForStartedRoom(tx: Prisma.TransactionClient, roomId: string, hostId: string, activeMemberUserIds: string[]): Promise<{
        id: string;
        status: FoodFightStatus;
        roomId: string;
    }>;
    upsertMealPreference(roomId: string, userId: string, dto: UpsertMealPreferenceDto): Promise<{
        message: string;
        preference: {
            id: string;
            updatedAt: Date;
            userId: string;
            sessionId: string;
            cookingTypes: string[];
            otherCookingType: string | null;
            cuisines: string[];
            otherCuisine: string | null;
            ingredients: string[];
            otherIngredient: string | null;
            budgetRange: MealBudgetRange | null;
            restaurantStyles: string[];
            otherRestaurantStyle: string | null;
            otherNote: string | null;
            submittedAt: Date;
        };
    }>;
    getFlowState(roomId: string, userId: string): Promise<{
        state: FoodFightFlowState;
        restaurantState: RestaurantFlowState | null;
        sessionId: string;
        submittedMemberCount: number;
        totalMemberCount: number;
        preferenceSubmittedMemberCount: number;
        voteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
        };
        finalVoteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
            hasSubmitted: boolean;
            counts: Record<string, number>;
            hostTieBreakRequired: boolean;
        };
        currentUser: {
            isHost: boolean;
            hasSubmittedVotes: boolean;
            votes: {
                recommendationItemId: string;
                vote: VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: RecommendationRoundStatus;
            roundNumber: number;
            items: {
                id: string;
                menuName: string;
                description: string | null;
                reason: string | null;
                imageUrl: string | null;
                recommendationScore: number | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                displayOrder: number;
            }[];
        } | null;
        finalVoteType: FinalVoteType | null;
        finalVoteCandidates: RecommendationItemSource[];
        finalSelection: {
            recommendationItemId: string;
            conceptId: string | null;
            name: string;
            nameTh: string | null;
            cuisine: string | null;
        } | null;
        restaurants: {
            id: string;
            restaurantId: string | null;
            rank: number | null;
            name: string;
            score: number | null;
            distanceKm: number | null;
            latitude: number | null;
            longitude: number | null;
            address: string | null;
            phone: string | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue;
            openNow: boolean | null;
            groupCoverage: number | null;
            reasons: string[];
            memberMenuOptions: AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    startRecommendation(roomId: string, userId: string): Promise<{
        state: "VOTING";
        sessionId: string;
        roundId: string;
        roundNumber: number;
        recommendations: {
            conceptId: string;
            name: string;
            nameTh: string;
            score: number | null;
            preferenceScore: number | null;
            fairnessBonus: number | null;
            safetyBonus: number | null;
            historyPenalty: number | null;
            diversityBonus: number | null;
            cuisine: string | null;
            cuisineTh: string | null;
            category: string | null;
            cookingMethods: string[];
            cookingMethodsTh: string[];
            proteins: string[];
            proteinsTh: string[];
            tastes: string[];
            tastesTh: string[];
            satisfiedMembers: number | null;
            memberCount: number | null;
            satisfactionRatio: number | null;
            safeCoverage: number | null;
            reasons: string[];
            id: string;
            displayOrder: number;
        }[];
    }>;
    startRestaurantRecommendations(roomId: string, userId: string): Promise<{
        state: FoodFightFlowState;
        restaurantState: RestaurantFlowState | null;
        sessionId: string;
        submittedMemberCount: number;
        totalMemberCount: number;
        preferenceSubmittedMemberCount: number;
        voteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
        };
        finalVoteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
            hasSubmitted: boolean;
            counts: Record<string, number>;
            hostTieBreakRequired: boolean;
        };
        currentUser: {
            isHost: boolean;
            hasSubmittedVotes: boolean;
            votes: {
                recommendationItemId: string;
                vote: VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: RecommendationRoundStatus;
            roundNumber: number;
            items: {
                id: string;
                menuName: string;
                description: string | null;
                reason: string | null;
                imageUrl: string | null;
                recommendationScore: number | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                displayOrder: number;
            }[];
        } | null;
        finalVoteType: FinalVoteType | null;
        finalVoteCandidates: RecommendationItemSource[];
        finalSelection: {
            recommendationItemId: string;
            conceptId: string | null;
            name: string;
            nameTh: string | null;
            cuisine: string | null;
        } | null;
        restaurants: {
            id: string;
            restaurantId: string | null;
            rank: number | null;
            name: string;
            score: number | null;
            distanceKm: number | null;
            latitude: number | null;
            longitude: number | null;
            address: string | null;
            phone: string | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue;
            openNow: boolean | null;
            groupCoverage: number | null;
            reasons: string[];
            memberMenuOptions: AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    rerollRecommendation(roomId: string, userId: string): Promise<{
        state: "VOTING";
        sessionId: string;
        roundId: string;
        roundNumber: number;
        recommendations: {
            conceptId: string;
            name: string;
            nameTh: string;
            score: number | null;
            preferenceScore: number | null;
            fairnessBonus: number | null;
            safetyBonus: number | null;
            historyPenalty: number | null;
            diversityBonus: number | null;
            cuisine: string | null;
            cuisineTh: string | null;
            category: string | null;
            cookingMethods: string[];
            cookingMethodsTh: string[];
            proteins: string[];
            proteinsTh: string[];
            tastes: string[];
            tastesTh: string[];
            satisfiedMembers: number | null;
            memberCount: number | null;
            satisfactionRatio: number | null;
            safeCoverage: number | null;
            reasons: string[];
            id: string;
            displayOrder: number;
        }[];
    }>;
    submitVotes(roomId: string, userId: string, dto: SubmitVotesDto): Promise<{
        state: FoodFightFlowState;
        restaurantState: RestaurantFlowState | null;
        sessionId: string;
        submittedMemberCount: number;
        totalMemberCount: number;
        preferenceSubmittedMemberCount: number;
        voteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
        };
        finalVoteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
            hasSubmitted: boolean;
            counts: Record<string, number>;
            hostTieBreakRequired: boolean;
        };
        currentUser: {
            isHost: boolean;
            hasSubmittedVotes: boolean;
            votes: {
                recommendationItemId: string;
                vote: VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: RecommendationRoundStatus;
            roundNumber: number;
            items: {
                id: string;
                menuName: string;
                description: string | null;
                reason: string | null;
                imageUrl: string | null;
                recommendationScore: number | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                displayOrder: number;
            }[];
        } | null;
        finalVoteType: FinalVoteType | null;
        finalVoteCandidates: RecommendationItemSource[];
        finalSelection: {
            recommendationItemId: string;
            conceptId: string | null;
            name: string;
            nameTh: string | null;
            cuisine: string | null;
        } | null;
        restaurants: {
            id: string;
            restaurantId: string | null;
            rank: number | null;
            name: string;
            score: number | null;
            distanceKm: number | null;
            latitude: number | null;
            longitude: number | null;
            address: string | null;
            phone: string | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue;
            openNow: boolean | null;
            groupCoverage: number | null;
            reasons: string[];
            memberMenuOptions: AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    submitFinalVote(roomId: string, userId: string, dto: SubmitFinalVoteDto): Promise<{
        state: FoodFightFlowState;
        restaurantState: RestaurantFlowState | null;
        sessionId: string;
        submittedMemberCount: number;
        totalMemberCount: number;
        preferenceSubmittedMemberCount: number;
        voteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
        };
        finalVoteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
            hasSubmitted: boolean;
            counts: Record<string, number>;
            hostTieBreakRequired: boolean;
        };
        currentUser: {
            isHost: boolean;
            hasSubmittedVotes: boolean;
            votes: {
                recommendationItemId: string;
                vote: VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: RecommendationRoundStatus;
            roundNumber: number;
            items: {
                id: string;
                menuName: string;
                description: string | null;
                reason: string | null;
                imageUrl: string | null;
                recommendationScore: number | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                displayOrder: number;
            }[];
        } | null;
        finalVoteType: FinalVoteType | null;
        finalVoteCandidates: RecommendationItemSource[];
        finalSelection: {
            recommendationItemId: string;
            conceptId: string | null;
            name: string;
            nameTh: string | null;
            cuisine: string | null;
        } | null;
        restaurants: {
            id: string;
            restaurantId: string | null;
            rank: number | null;
            name: string;
            score: number | null;
            distanceKm: number | null;
            latitude: number | null;
            longitude: number | null;
            address: string | null;
            phone: string | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue;
            openNow: boolean | null;
            groupCoverage: number | null;
            reasons: string[];
            memberMenuOptions: AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    submitHostTieBreak(roomId: string, userId: string, dto: SubmitFinalVoteDto): Promise<{
        state: FoodFightFlowState;
        restaurantState: RestaurantFlowState | null;
        sessionId: string;
        submittedMemberCount: number;
        totalMemberCount: number;
        preferenceSubmittedMemberCount: number;
        voteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
        };
        finalVoteProgress: {
            submittedMemberCount: number;
            totalMemberCount: number;
            hasSubmitted: boolean;
            counts: Record<string, number>;
            hostTieBreakRequired: boolean;
        };
        currentUser: {
            isHost: boolean;
            hasSubmittedVotes: boolean;
            votes: {
                recommendationItemId: string;
                vote: VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: RecommendationRoundStatus;
            roundNumber: number;
            items: {
                id: string;
                menuName: string;
                description: string | null;
                reason: string | null;
                imageUrl: string | null;
                recommendationScore: number | null;
                metadata: import("@prisma/client/runtime/client").JsonValue;
                displayOrder: number;
            }[];
        } | null;
        finalVoteType: FinalVoteType | null;
        finalVoteCandidates: RecommendationItemSource[];
        finalSelection: {
            recommendationItemId: string;
            conceptId: string | null;
            name: string;
            nameTh: string | null;
            cuisine: string | null;
        } | null;
        restaurants: {
            id: string;
            restaurantId: string | null;
            rank: number | null;
            name: string;
            score: number | null;
            distanceKm: number | null;
            latitude: number | null;
            longitude: number | null;
            address: string | null;
            phone: string | null;
            openingHours: import("@prisma/client/runtime/client").JsonValue;
            openNow: boolean | null;
            groupCoverage: number | null;
            reasons: string[];
            memberMenuOptions: AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    private loadRecommendationContext;
    private buildRecommendationPayload;
    private buildNormalizedRestaurantMembers;
    private evaluateAndPersistInitialVotes;
    private evaluateAndPersistFinalVotes;
    private normalizePreference;
    private assertPreferenceGroup;
}
export {};
