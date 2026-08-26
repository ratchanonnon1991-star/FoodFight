import { Observable } from 'rxjs';
import type { MessageEvent } from '@nestjs/common';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { FoodFightService } from '../food-fight/food-fight.service';
import { UpsertMealPreferenceDto } from '../food-fight/dto/upsert-meal-preference.dto';
import { SubmitFinalVoteDto } from '../food-fight/dto/submit-final-vote.dto';
import { SubmitVotesDto } from '../food-fight/dto/submit-votes.dto';
import { CreateRoomService } from './create-room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomService } from './join-room.service';
import { LocationSearchService } from './location-search.service';
import { RoomPreviewService } from './room-preview.service';
import { RoomRealtimeService } from './room-realtime.service';
import { SetReadyDto } from './dto/set-ready.dto';
import { TransferHostDto } from './dto/transfer-host.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly createRoomService;
    private readonly joinRoomService;
    private readonly locationSearchService;
    private readonly roomPreviewService;
    private readonly roomRealtimeService;
    private readonly foodFightService;
    constructor(createRoomService: CreateRoomService, joinRoomService: JoinRoomService, locationSearchService: LocationSearchService, roomPreviewService: RoomPreviewService, roomRealtimeService: RoomRealtimeService, foodFightService: FoodFightService);
    createRoom(currentUser: AccessTokenPayload, dto: CreateRoomDto): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        latitude: number | null;
        longitude: number | null;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
        inviteToken: string;
        inviteLink: string;
    }>;
    findRoomByCode(roomCode: string): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
    }>;
    findRoomByInviteToken(inviteToken: string): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
    }>;
    searchLocations(query?: string, latitude?: string, longitude?: string): Promise<import("./location-search.service").LocationSearchResult[]>;
    reverseLocation(latitude?: string, longitude?: string): Promise<import("./location-search.service").LocationSearchResult>;
    getCurrentRoom(currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    } | null>;
    updateRoom(roomId: string, dto: UpdateRoomDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    closeRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
    }>;
    roomEvents(roomId: string, currentUser: AccessTokenPayload): Observable<MessageEvent>;
    getRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    getFoodFightState(roomId: string, currentUser: AccessTokenPayload): Promise<{
        state: import("../food-fight/food-fight.service").FoodFightFlowState;
        restaurantState: import("../food-fight/food-fight.service").RestaurantFlowState | null;
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
                vote: import("../database/generated/prisma/enums").VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: import("../database/generated/prisma/enums").RecommendationRoundStatus;
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
        finalVoteType: import("../database/generated/prisma/enums").FinalVoteType | null;
        finalVoteCandidates: {
            id: string;
            menuName: string;
            description: string | null;
            reason: string | null;
            imageUrl: string | null;
            recommendationScore: number | null;
            metadata: import("../database/generated/prisma/internal/prismaNamespace").JsonValue | null;
            displayOrder: number;
        }[];
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
            memberMenuOptions: import("../recommendation-ai/types/ai-json.types").AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    joinRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
        member: {
            id: string;
            roomId: string;
            userId: string;
            isReady: boolean;
            joinedAt: Date;
        };
        room: {
            inviteToken?: string | undefined;
            inviteLink?: string | undefined;
            id: string;
            name: string;
            isHost: boolean;
            currentMember: {
                id: string;
                isReady: boolean;
            } | null;
            host: {
                displayName: string;
                avatarUrl: string | null;
            };
            members: {
                id: string;
                userId: string;
                displayName: string;
                avatarUrl: string | null;
                isReady: boolean;
                joinedAt: Date;
            }[];
            memberCount: number;
            maxMembers: number;
            locationName: string;
            searchRadiusKm: number;
            scheduledAt: Date;
            status: import("../database/generated/prisma/enums").RoomStatus;
            roomCode: string;
        };
    }>;
    setReady(roomId: string, dto: SetReadyDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    startRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    upsertMealPreference(roomId: string, dto: UpsertMealPreferenceDto, currentUser: AccessTokenPayload): Promise<{
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
            budgetRange: import("../database/generated/prisma/enums").MealBudgetRange | null;
            restaurantStyles: string[];
            otherRestaurantStyle: string | null;
            otherNote: string | null;
            submittedAt: Date;
        };
    }>;
    startRecommendation(roomId: string, currentUser: AccessTokenPayload): Promise<{
        state: "VOTING";
        sessionId: string;
        roundId: string;
        roundNumber: number;
        recommendations: {
            conceptId: string;
            name: string;
            nameTh: string;
            aliases: string[];
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
            compatibilityPercentage: number | null;
            reasons: string[];
            id: string;
            displayOrder: number;
        }[];
    }>;
    rerollRecommendation(roomId: string, currentUser: AccessTokenPayload): Promise<{
        state: "VOTING";
        sessionId: string;
        roundId: string;
        roundNumber: number;
        recommendations: {
            conceptId: string;
            name: string;
            nameTh: string;
            aliases: string[];
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
            compatibilityPercentage: number | null;
            reasons: string[];
            id: string;
            displayOrder: number;
        }[];
    }>;
    startRestaurantRecommendations(roomId: string, currentUser: AccessTokenPayload): Promise<{
        state: import("../food-fight/food-fight.service").FoodFightFlowState;
        restaurantState: import("../food-fight/food-fight.service").RestaurantFlowState | null;
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
                vote: import("../database/generated/prisma/enums").VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: import("../database/generated/prisma/enums").RecommendationRoundStatus;
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
        finalVoteType: import("../database/generated/prisma/enums").FinalVoteType | null;
        finalVoteCandidates: {
            id: string;
            menuName: string;
            description: string | null;
            reason: string | null;
            imageUrl: string | null;
            recommendationScore: number | null;
            metadata: import("../database/generated/prisma/internal/prismaNamespace").JsonValue | null;
            displayOrder: number;
        }[];
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
            memberMenuOptions: import("../recommendation-ai/types/ai-json.types").AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    submitVotes(roomId: string, dto: SubmitVotesDto, currentUser: AccessTokenPayload): Promise<{
        state: import("../food-fight/food-fight.service").FoodFightFlowState;
        restaurantState: import("../food-fight/food-fight.service").RestaurantFlowState | null;
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
                vote: import("../database/generated/prisma/enums").VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: import("../database/generated/prisma/enums").RecommendationRoundStatus;
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
        finalVoteType: import("../database/generated/prisma/enums").FinalVoteType | null;
        finalVoteCandidates: {
            id: string;
            menuName: string;
            description: string | null;
            reason: string | null;
            imageUrl: string | null;
            recommendationScore: number | null;
            metadata: import("../database/generated/prisma/internal/prismaNamespace").JsonValue | null;
            displayOrder: number;
        }[];
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
            memberMenuOptions: import("../recommendation-ai/types/ai-json.types").AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    submitFinalVote(roomId: string, dto: SubmitFinalVoteDto, currentUser: AccessTokenPayload): Promise<{
        state: import("../food-fight/food-fight.service").FoodFightFlowState;
        restaurantState: import("../food-fight/food-fight.service").RestaurantFlowState | null;
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
                vote: import("../database/generated/prisma/enums").VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: import("../database/generated/prisma/enums").RecommendationRoundStatus;
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
        finalVoteType: import("../database/generated/prisma/enums").FinalVoteType | null;
        finalVoteCandidates: {
            id: string;
            menuName: string;
            description: string | null;
            reason: string | null;
            imageUrl: string | null;
            recommendationScore: number | null;
            metadata: import("../database/generated/prisma/internal/prismaNamespace").JsonValue | null;
            displayOrder: number;
        }[];
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
            memberMenuOptions: import("../recommendation-ai/types/ai-json.types").AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    submitHostTieBreak(roomId: string, dto: SubmitFinalVoteDto, currentUser: AccessTokenPayload): Promise<{
        state: import("../food-fight/food-fight.service").FoodFightFlowState;
        restaurantState: import("../food-fight/food-fight.service").RestaurantFlowState | null;
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
                vote: import("../database/generated/prisma/enums").VoteAction;
            }[];
            hasSubmittedFinalVote: boolean;
        };
        currentRound: {
            id: string;
            status: import("../database/generated/prisma/enums").RecommendationRoundStatus;
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
        finalVoteType: import("../database/generated/prisma/enums").FinalVoteType | null;
        finalVoteCandidates: {
            id: string;
            menuName: string;
            description: string | null;
            reason: string | null;
            imageUrl: string | null;
            recommendationScore: number | null;
            metadata: import("../database/generated/prisma/internal/prismaNamespace").JsonValue | null;
            displayOrder: number;
        }[];
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
            memberMenuOptions: import("../recommendation-ai/types/ai-json.types").AiJsonValue[];
            finalMenuMatch: boolean;
            imageUrl: string | null;
        }[];
    }>;
    leaveRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
    }>;
    transferHost(roomId: string, dto: TransferHostDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    kickMember(roomId: string, memberId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
}
