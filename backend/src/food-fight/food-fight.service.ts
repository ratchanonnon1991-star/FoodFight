import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FoodFightStatus,
  FinalSelectionMethod,
  FinalVoteType,
  MealBudgetRange,
  Prisma,
  RecommendationRoundStatus,
  RestaurantRecommendationStatus,
  SessionMemberRole,
  VoteAction,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { RecommendationAiService } from '../recommendation-ai/recommendation-ai.service';
import { RecommendationRequestDto } from '../recommendation-ai/dto/ai-request.dto';
import {
  isAiJsonObject,
  type AiJsonObject,
  type AiJsonValue,
} from '../recommendation-ai/types/ai-json.types';
import { UpsertMealPreferenceDto } from './dto/upsert-meal-preference.dto';
import type { FrontendMealPreferenceBudget } from './dto/upsert-meal-preference.dto';
import { SubmitFinalVoteDto } from './dto/submit-final-vote.dto';
import { SubmitVotesDto } from './dto/submit-votes.dto';

export type FoodFightFlowState =
  | 'WAITING_FOR_PREFERENCES'
  | 'READY_TO_RECOMMEND'
  | 'RECOMMENDING'
  | 'VOTING'
  | 'WAITING_FOR_VOTES'
  | 'FINAL_VOTE_REQUIRED'
  | 'REROLL_REQUIRED'
  | 'RECOMMENDING_RESTAURANTS'
  | 'RESTAURANTS_READY'
  | 'FINALIZED';

export type RestaurantFlowState =
  'FINALIZED_MENU' | 'RECOMMENDING_RESTAURANTS' | 'RESTAURANTS_READY';

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

type RecommendationRoundSource = {
  id: string;
  roundNumber: number;
  items: RecommendationItemSource[];
};

type VoteSource = {
  recommendationItemId: string;
  userId: string;
  action: VoteAction;
};

type InitialVoteEvaluation =
  | {
      status: 'WAITING_FOR_VOTES';
      submittedMemberCount: number;
      totalMemberCount: number;
    }
  | {
      status: 'REROLL_REQUIRED';
      roundNumber: number;
      voteResults: VoteResult[];
      rerollExclusions: string[];
    }
  | {
      status: 'FINAL_VOTE_REQUIRED';
      finalVoteType: FinalVoteType;
      voteResults: VoteResult[];
    }
  | {
      status: 'FINALIZED';
      winnerItemId: string;
      voteResults: VoteResult[];
    };

type VoteResult = {
  itemId: string;
  conceptId: string;
  ok: number;
  pass: number;
  totalVotes: number;
  passedMajority: boolean;
};

type SessionMemberSource = {
  userId: string;
  user: {
    displayName: string;
    foodProfile: {
      allergies: string[];
      otherAllergies: string | null;
      restrictions: string[];
      otherRestrictions: string | null;
      additionalNotes: string | null;
    } | null;
  };
};

type StoredMealPreferenceSource = {
  userId: string;
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
};

type FinalSelectionSource = {
  recommendationItemId: string;
  recommendationItem: {
    menuName: string;
    metadata: Prisma.JsonValue | null;
  };
};

type RestaurantRecommendationSource = {
  id: string;
  externalPlaceId: string | null;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  distanceMeters: number | null;
  phone: string | null;
  openingHours: Prisma.JsonValue | null;
  imageUrl: string | null;
  finalMenuMatch: boolean;
  varietyScore: number | null;
  groupCompatibilityScore: number | null;
  rankingScore: number | null;
  reason: string | null;
  status: RestaurantRecommendationStatus;
  displayOrder: number | null;
};

type MappedMealPreference = {
  cookingMethods: string[];
  cookingMethodsOther: string[];
  cuisines: string[];
  cuisinesOther: string[];
  proteins: string[];
  proteinsOther: string[];
  budget: string | null;
  restaurantStyles: string[];
  restaurantStylesOther: string[];
  notes: string;
};

type RestaurantRecommendationResult = {
  restaurantId: string;
  name: string;
  rank: number;
  score: number | null;
  matchType: string | null;
  groupCoverage: number | null;
  budget: string | null;
  styles: string[];
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  phone: string | null;
  openingHours: AiJsonValue | null;
  openNow: boolean | null;
  distanceKm: number | null;
  memberMenuOptions: AiJsonValue[];
  reasons: string[];
};

const RESTAURANT_RECOMMENDATION_SELECT = {
  id: true,
  externalPlaceId: true,
  name: true,
  address: true,
  latitude: true,
  longitude: true,
  distanceMeters: true,
  phone: true,
  openingHours: true,
  imageUrl: true,
  finalMenuMatch: true,
  varietyScore: true,
  groupCompatibilityScore: true,
  rankingScore: true,
  reason: true,
  status: true,
  displayOrder: true,
} as const;

interface RecommendationItemResult {
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
}

const FRONTEND_BUDGET_TO_PRISMA: Record<
  FrontendMealPreferenceBudget,
  MealBudgetRange
> = {
  LOW: MealBudgetRange.UNDER_200,
  MID: MealBudgetRange.BETWEEN_200_400,
  HIGH: MealBudgetRange.BETWEEN_400_600,
  ANY: MealBudgetRange.ANY,
};

const PRISMA_BUDGET_TO_AI: Record<MealBudgetRange, string | null> = {
  [MealBudgetRange.UNDER_200]: 'LOW',
  [MealBudgetRange.BETWEEN_200_400]: 'MID',
  [MealBudgetRange.BETWEEN_400_600]: 'HIGH',
  [MealBudgetRange.ABOVE_600]: 'HIGH',
  [MealBudgetRange.ANY]: null,
};

const PRISMA_COOKING_TYPE_TO_AI: Record<string, string> = {
  GRILL: 'GRILLED',
  FRY: 'FRIED',
  BOIL: 'BOILED',
  STEAM: 'STEAMED',
  BAKE: 'BAKED',
};

@Injectable()
export class FoodFightService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recommendationAiService: RecommendationAiService,
  ) {}

  async createSessionForStartedRoom(
    tx: Prisma.TransactionClient,
    roomId: string,
    hostId: string,
    activeMemberUserIds: string[],
  ) {
    const session = await tx.foodFightSession.upsert({
      where: { roomId },
      create: { roomId },
      update: {},
      select: { id: true, roomId: true, status: true },
    });

    const rolesByUserId = new Map<string, SessionMemberRole>();
    rolesByUserId.set(hostId, SessionMemberRole.HOST);

    for (const userId of activeMemberUserIds) {
      if (!rolesByUserId.has(userId)) {
        rolesByUserId.set(userId, SessionMemberRole.MEMBER);
      }
    }

    for (const [userId, role] of rolesByUserId) {
      await tx.sessionMember.upsert({
        where: {
          sessionId_userId: {
            sessionId: session.id,
            userId,
          },
        },
        create: {
          sessionId: session.id,
          userId,
          role,
        },
        update: { role },
      });
    }

    return session;
  }

  async upsertMealPreference(
    roomId: string,
    userId: string,
    dto: UpsertMealPreferenceDto,
  ) {
    const normalized = this.normalizePreference(dto);

    const session = await this.prisma.foodFightSession.findUnique({
      where: { roomId },
      select: { id: true, status: true },
    });

    if (!session) {
      throw new NotFoundException(
        'FoodFight session not found. Start the room first.',
      );
    }

    if (session.status !== FoodFightStatus.COLLECTING_PREFERENCES) {
      throw new ConflictException(
        'Meal preferences can no longer be changed for this session',
      );
    }

    const sessionMember = await this.prisma.sessionMember.findUnique({
      where: {
        sessionId_userId: {
          sessionId: session.id,
          userId,
        },
      },
      select: { userId: true },
    });

    if (!sessionMember) {
      throw new ForbiddenException('You are not a member of this FoodFight');
    }

    const preference = await this.prisma.mealPreference.upsert({
      where: {
        sessionId_userId: {
          sessionId: session.id,
          userId,
        },
      },
      create: {
        sessionId: session.id,
        userId,
        ...normalized,
      },
      update: normalized,
    });

    return {
      message: 'Meal preference saved successfully',
      preference,
    };
  }

  async getFlowState(roomId: string, userId: string) {
    const session = await this.prisma.foodFightSession.findUnique({
      where: { roomId },
      select: {
        id: true,
        status: true,
        room: { select: { hostId: true } },
        members: { select: { userId: true } },
        finalSelection: {
          select: {
            recommendationItemId: true,
            recommendationItem: {
              select: { menuName: true, metadata: true },
            },
          },
        },
        restaurantRecommendations: {
          orderBy: { displayOrder: 'asc' },
          select: RESTAURANT_RECOMMENDATION_SELECT,
        },
      },
    });

    if (!session) {
      throw new NotFoundException(
        'FoodFight session not found. Start the room first.',
      );
    }

    if (!session.members.some((member) => member.userId === userId)) {
      throw new ForbiddenException('You are not a member of this FoodFight');
    }

    const submittedMemberCount = await this.prisma.mealPreference.count({
      where: { sessionId: session.id },
    });

    const latestRound = await this.prisma.recommendationRound.findFirst({
      where: { sessionId: session.id },
      orderBy: { roundNumber: 'desc' },
      select: {
        id: true,
        roundNumber: true,
        status: true,
        items: {
          orderBy: { displayOrder: 'asc' },
          select: {
            id: true,
            menuName: true,
            description: true,
            reason: true,
            imageUrl: true,
            recommendationScore: true,
            metadata: true,
            displayOrder: true,
          },
        },
      },
    });

    const memberIds = session.members.map((member) => member.userId);
    const currentRoundItems = latestRound?.items ?? [];
    const currentRoundItemIds = currentRoundItems.map((item) => item.id);
    const currentRoundVotes = currentRoundItemIds.length
      ? await this.prisma.vote.findMany({
          where: { recommendationItemId: { in: currentRoundItemIds } },
          select: { recommendationItemId: true, userId: true, action: true },
        })
      : [];
    const currentVoteProgress = getVoteProgress(
      memberIds,
      currentRoundItemIds,
      currentRoundVotes,
    );

    let state = resolveFlowState(
      session.status,
      submittedMemberCount,
      session.members.length,
    );

    let finalVoteCandidates: RecommendationItemSource[] = [];
    let finalVoteType: FinalVoteType | null = null;
    let finalVoteProgress = {
      submittedMemberCount: 0,
      totalMemberCount: session.members.length,
      hasSubmitted: false,
      counts: {} as Record<string, number>,
      hostTieBreakRequired: false,
    };

    if (session.status === FoodFightStatus.VOTING && latestRound) {
      const evaluation = evaluateInitialVotes(
        latestRound,
        memberIds,
        currentRoundVotes,
      );

      if (evaluation.status === 'REROLL_REQUIRED') {
        state = 'REROLL_REQUIRED';
      } else if (evaluation.status === 'FINAL_VOTE_REQUIRED') {
        state = 'FINAL_VOTE_REQUIRED';
      } else if (evaluation.status === 'FINALIZED') {
        state = 'FINALIZED';
      } else if (evaluation.status === 'WAITING_FOR_VOTES') {
        state = 'WAITING_FOR_VOTES';
      }
    }

    if (session.status === FoodFightStatus.FINAL_VOTE) {
      const rounds = await this.prisma.recommendationRound.findMany({
        where: { sessionId: session.id },
        orderBy: { roundNumber: 'asc' },
        select: {
          roundNumber: true,
          items: {
            orderBy: { displayOrder: 'asc' },
            select: {
              id: true,
              menuName: true,
              description: true,
              reason: true,
              imageUrl: true,
              recommendationScore: true,
              metadata: true,
              displayOrder: true,
            },
          },
        },
      });

      finalVoteType = getFinalVoteType(rounds);
      finalVoteCandidates = getFinalVoteCandidates(rounds, finalVoteType);

      const finalVotes = await this.prisma.finalVote.findMany({
        where: { sessionId: session.id, voteType: finalVoteType },
        select: { userId: true, recommendationItemId: true },
      });
      finalVoteProgress = getFinalVoteProgress(
        memberIds,
        finalVoteCandidates.map((item) => item.id),
        finalVotes,
        userId,
      );
      state = 'FINAL_VOTE_REQUIRED';
    }

    if (session.status === FoodFightStatus.FINALIZED) {
      state = 'FINALIZED';
    }

    const restaurantState = resolveRestaurantFlowState(
      session.status,
      Boolean(session.finalSelection),
    );

    if (session.status === FoodFightStatus.RESTAURANT_RECOMMENDATION) {
      state = 'RECOMMENDING_RESTAURANTS';
    } else if (session.status === FoodFightStatus.RESTAURANT_SELECTION) {
      state = 'RESTAURANTS_READY';
    }

    return {
      state,
      restaurantState,
      sessionId: session.id,
      submittedMemberCount:
        session.status === FoodFightStatus.VOTING
          ? currentVoteProgress.submittedMemberCount
          : session.status === FoodFightStatus.FINAL_VOTE
            ? finalVoteProgress.submittedMemberCount
            : submittedMemberCount,
      totalMemberCount: session.members.length,
      preferenceSubmittedMemberCount: submittedMemberCount,
      voteProgress: {
        submittedMemberCount: currentVoteProgress.submittedMemberCount,
        totalMemberCount: session.members.length,
      },
      finalVoteProgress,
      currentUser: {
        isHost: session.room.hostId === userId,
        hasSubmittedVotes: currentVoteProgress.submittedUserIds.has(userId),
        votes: currentRoundVotes
          .filter((vote) => vote.userId === userId)
          .map((vote) => ({
            recommendationItemId: vote.recommendationItemId,
            vote: vote.action,
          })),
        hasSubmittedFinalVote: finalVoteProgress.hasSubmitted,
      },
      currentRound: latestRound,
      finalVoteType,
      finalVoteCandidates,
      finalSelection: session.finalSelection
        ? toFinalSelectionView(session.finalSelection)
        : null,
      restaurants: (session.restaurantRecommendations ?? []).map(
        toRestaurantRecommendationView,
      ),
    };
  }

  async startRecommendation(roomId: string, userId: string) {
    const context = await this.loadRecommendationContext(roomId, userId);
    const submittedMemberCount = context.members.filter((member) =>
      context.preferences.has(member.userId),
    ).length;
    const totalMemberCount = context.members.length;

    if (submittedMemberCount < totalMemberCount) {
      throw new ConflictException({
        code: 'PREFERENCES_INCOMPLETE',
        state: 'WAITING_FOR_PREFERENCES',
        submittedMemberCount,
        totalMemberCount,
      });
    }

    const previousRounds = await this.prisma.recommendationRound.findMany({
      where: { sessionId: context.sessionId },
      orderBy: { roundNumber: 'asc' },
      select: {
        roundNumber: true,
        items: { select: { metadata: true } },
      },
    });
    const latestRound = previousRounds.at(-1);
    const roundNumber = (latestRound?.roundNumber ?? 0) + 1;

    if (roundNumber > 2) {
      throw new ConflictException(
        'The FoodFight recommendation round limit has been reached',
      );
    }

    const history = previousRounds.flatMap((round) =>
      round.items
        .map((item) => getConceptIdFromMetadata(item.metadata))
        .filter(isNonNullable),
    );
    const rerollExclusions = latestRound
      ? latestRound.items
          .map((item) => getConceptIdFromMetadata(item.metadata))
          .filter(isNonNullable)
      : [];

    const payload = this.buildRecommendationPayload(
      roomId,
      context.members,
      context.preferences,
      history,
      rerollExclusions,
    );

    const claimed = await this.prisma.foodFightSession.updateMany({
      where: {
        id: context.sessionId,
        status: FoodFightStatus.COLLECTING_PREFERENCES,
      },
      data: { status: FoodFightStatus.GENERATING_RECOMMENDATIONS },
    });

    if (claimed.count !== 1) {
      throw new ConflictException(
        'Recommendations are already being generated or voted on',
      );
    }

    try {
      const aiResponse = await this.recommendationAiService.recommend(payload);
      const recommendations = parseRecommendationResponse(aiResponse);

      const persistedRound = await this.prisma.$transaction(async (tx) => {
        const round = await tx.recommendationRound.create({
          data: {
            sessionId: context.sessionId,
            roundNumber,
            status: RecommendationRoundStatus.VOTING,
            items: {
              create: recommendations.map((item, index) => ({
                menuName: item.name,
                description: null,
                reason:
                  item.reasons.length > 0 ? item.reasons.join(' • ') : null,
                imageUrl: null,
                recommendationScore: item.score,
                metadata: buildRecommendationMetadata(item),
                displayOrder: index + 1,
              })),
            },
          },
          select: {
            id: true,
            roundNumber: true,
            status: true,
            items: {
              orderBy: { displayOrder: 'asc' },
              select: { id: true, displayOrder: true },
            },
          },
        });

        await tx.foodFightSession.update({
          where: { id: context.sessionId },
          data: { status: FoodFightStatus.VOTING },
        });

        return round;
      });

      return {
        state: 'VOTING' as const,
        sessionId: context.sessionId,
        roundId: persistedRound.id,
        roundNumber: persistedRound.roundNumber,
        recommendations: recommendations.map((item, index) => ({
          id: persistedRound.items[index]?.id,
          displayOrder: index + 1,
          ...item,
        })),
      };
    } catch (error) {
      await this.prisma.foodFightSession.updateMany({
        where: {
          id: context.sessionId,
          status: FoodFightStatus.GENERATING_RECOMMENDATIONS,
        },
        data: { status: FoodFightStatus.COLLECTING_PREFERENCES },
      });
      throw error;
    }
  }

  async startRestaurantRecommendations(roomId: string, userId: string) {
    const session = await this.prisma.foodFightSession.findUnique({
      where: { roomId },
      select: {
        id: true,
        status: true,
        room: {
          select: {
            hostId: true,
            latitude: true,
            longitude: true,
            searchRadiusKm: true,
          },
        },
        members: {
          orderBy: { joinedAt: 'asc' },
          select: {
            userId: true,
            user: {
              select: {
                displayName: true,
                foodProfile: {
                  select: {
                    allergies: true,
                    otherAllergies: true,
                    restrictions: true,
                    otherRestrictions: true,
                    additionalNotes: true,
                  },
                },
              },
            },
          },
        },
        finalSelection: {
          select: {
            recommendationItemId: true,
            recommendationItem: {
              select: { menuName: true, metadata: true },
            },
          },
        },
        restaurantRecommendations: {
          orderBy: { displayOrder: 'asc' },
          select: RESTAURANT_RECOMMENDATION_SELECT,
        },
      },
    });

    if (!session) {
      throw new NotFoundException(
        'FoodFight session not found. Start the room first.',
      );
    }

    if (session.room.hostId !== userId) {
      throw new ForbiddenException(
        'Only the host can start restaurant recommendations',
      );
    }

    if (!session.members.some((member) => member.userId === userId)) {
      throw new ForbiddenException('You are not a member of this FoodFight');
    }

    if (
      session.status === FoodFightStatus.RESTAURANT_SELECTION &&
      session.restaurantRecommendations.length > 0
    ) {
      return this.getFlowState(roomId, userId);
    }

    if (
      session.status === FoodFightStatus.RESTAURANT_SELECTION &&
      session.restaurantRecommendations.length === 0
    ) {
      await this.prisma.foodFightSession.update({
        where: { id: session.id },
        data: { status: FoodFightStatus.FINALIZED },
      });
    }

    if (session.status === FoodFightStatus.RESTAURANT_RECOMMENDATION) {
      throw new ConflictException(
        'Restaurant recommendations are already being generated',
      );
    }

    const canRetryEmptyRestaurantSearch =
      session.status === FoodFightStatus.RESTAURANT_SELECTION &&
      session.restaurantRecommendations.length === 0;

    if (
      session.status !== FoodFightStatus.FINALIZED &&
      !canRetryEmptyRestaurantSearch
    ) {
      throw new ConflictException({
        code: 'FINAL_MENU_REQUIRED',
        state: resolveFlowState(session.status, 0, session.members.length),
      });
    }

    if (!session.finalSelection) {
      throw new ConflictException(
        'A final food selection is required before searching restaurants',
      );
    }

    if (session.room.latitude === null || session.room.longitude === null) {
      throw new BadRequestException(
        'Room coordinates are required before restaurant recommendations can be generated',
      );
    }

    const finalConcept = buildFinalConcept(session.finalSelection);
    const preferences = await this.prisma.mealPreference.findMany({
      where: { sessionId: session.id },
      select: {
        userId: true,
        cookingTypes: true,
        otherCookingType: true,
        cuisines: true,
        otherCuisine: true,
        ingredients: true,
        otherIngredient: true,
        budgetRange: true,
        restaurantStyles: true,
        otherRestaurantStyle: true,
        otherNote: true,
      },
    });
    const preferenceMap = new Map(
      preferences.map((preference) => [preference.userId, preference]),
    );
    const normalizedMembers = this.buildNormalizedRestaurantMembers(
      session.members,
      preferenceMap,
    );
    const payload = {
      finalConcept,
      groupLocation: {
        latitude: session.room.latitude,
        longitude: session.room.longitude,
      },
      normalizedMembers,
      radiusKm: session.room.searchRadiusKm,
      topK: 5,
    };

    const claimed = await this.prisma.foodFightSession.updateMany({
      where: {
        id: session.id,
        status: FoodFightStatus.FINALIZED,
      },
      data: { status: FoodFightStatus.RESTAURANT_RECOMMENDATION },
    });

    if (claimed.count !== 1) {
      throw new ConflictException(
        'Restaurant recommendations are already being generated',
      );
    }

    try {
      const aiResponse =
        await this.recommendationAiService.restaurants(payload);
      const restaurants = parseRestaurantResponse(aiResponse);

      if (restaurants.length === 0) {
        throw new BadGatewayException(
          'AI service returned no restaurant recommendations',
        );
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.restaurantRecommendation.deleteMany({
          where: { sessionId: session.id },
        });

        for (const restaurant of restaurants) {
          await tx.restaurantRecommendation.create({
            data: {
              sessionId: session.id,
              externalPlaceId: restaurant.restaurantId,
              name: restaurant.name,
              address: restaurant.address,
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
              distanceMeters:
                restaurant.distanceKm === null
                  ? null
                  : Math.round(restaurant.distanceKm * 1000),
              phone: restaurant.phone,
              openingHours: buildRestaurantMetadata(restaurant),
              imageUrl: null,
              finalMenuMatch: true,
              varietyScore: null,
              groupCompatibilityScore: restaurant.groupCoverage,
              rankingScore: restaurant.score,
              reason:
                restaurant.reasons.length > 0
                  ? restaurant.reasons.join(' • ')
                  : null,
              status: RestaurantRecommendationStatus.ACTIVE,
              displayOrder: restaurant.rank,
            },
          });
        }

        await tx.foodFightSession.update({
          where: { id: session.id },
          data: { status: FoodFightStatus.RESTAURANT_SELECTION },
        });
      });
    } catch (error) {
      await this.prisma.foodFightSession.updateMany({
        where: {
          id: session.id,
          status: FoodFightStatus.RESTAURANT_RECOMMENDATION,
        },
        data: { status: FoodFightStatus.FINALIZED },
      });
      throw error;
    }

    return this.getFlowState(roomId, userId);
  }

  async rerollRecommendation(roomId: string, userId: string) {
    const context = await this.loadRecommendationContext(
      roomId,
      userId,
      FoodFightStatus.VOTING,
    );
    const rounds = await this.prisma.recommendationRound.findMany({
      where: { sessionId: context.sessionId },
      orderBy: { roundNumber: 'asc' },
      select: {
        id: true,
        roundNumber: true,
        items: {
          orderBy: { displayOrder: 'asc' },
          select: { id: true, metadata: true },
        },
      },
    });
    const latestRound = rounds.at(-1);

    if (!latestRound || latestRound.roundNumber !== 1 || rounds.length !== 1) {
      throw new ConflictException(
        'Reroll is available only once after the first voting round',
      );
    }

    const itemIds = latestRound.items.map((item) => item.id);
    const votes = await this.prisma.vote.findMany({
      where: { recommendationItemId: { in: itemIds } },
      select: { recommendationItemId: true, userId: true, action: true },
    });
    const roundForEvaluation: RecommendationRoundSource = {
      id: latestRound.id,
      roundNumber: latestRound.roundNumber,
      items: latestRound.items.map((item, index) => ({
        id: item.id,
        menuName: '',
        description: null,
        reason: null,
        imageUrl: null,
        recommendationScore: null,
        metadata: item.metadata,
        displayOrder: index + 1,
      })),
    };
    const evaluation = evaluateInitialVotes(
      roundForEvaluation,
      context.members.map((member) => member.userId),
      votes,
    );

    if (evaluation.status !== 'REROLL_REQUIRED') {
      throw new ConflictException({
        code: 'REROLL_NOT_REQUIRED',
        state: evaluation.status,
      });
    }

    const history = rounds.flatMap((round) =>
      round.items
        .map((item) => getConceptIdFromMetadata(item.metadata))
        .filter(isNonNullable),
    );
    const rerollExclusions = latestRound.items
      .map((item) => getConceptIdFromMetadata(item.metadata))
      .filter(isNonNullable);
    const payload = this.buildRecommendationPayload(
      roomId,
      context.members,
      context.preferences,
      history,
      rerollExclusions,
    );

    const claimed = await this.prisma.foodFightSession.updateMany({
      where: {
        id: context.sessionId,
        status: FoodFightStatus.VOTING,
      },
      data: { status: FoodFightStatus.GENERATING_RECOMMENDATIONS },
    });

    if (claimed.count !== 1) {
      throw new ConflictException(
        'Recommendations are already being generated or voted on',
      );
    }

    try {
      const aiResponse = await this.recommendationAiService.recommend(payload);
      const recommendations = parseRecommendationResponse(aiResponse);
      const persistedRound = await this.prisma.$transaction(async (tx) => {
        const round = await tx.recommendationRound.create({
          data: {
            sessionId: context.sessionId,
            roundNumber: 2,
            status: RecommendationRoundStatus.VOTING,
            items: {
              create: recommendations.map((item, index) => ({
                menuName: item.name,
                description: null,
                reason:
                  item.reasons.length > 0 ? item.reasons.join(' • ') : null,
                imageUrl: null,
                recommendationScore: item.score,
                metadata: buildRecommendationMetadata(item),
                displayOrder: index + 1,
              })),
            },
          },
          select: {
            id: true,
            roundNumber: true,
            status: true,
            items: {
              orderBy: { displayOrder: 'asc' },
              select: { id: true, displayOrder: true },
            },
          },
        });

        await tx.foodFightSession.update({
          where: { id: context.sessionId },
          data: { status: FoodFightStatus.VOTING },
        });
        return round;
      });

      return {
        state: 'VOTING' as const,
        sessionId: context.sessionId,
        roundId: persistedRound.id,
        roundNumber: persistedRound.roundNumber,
        recommendations: recommendations.map((item, index) => ({
          id: persistedRound.items[index]?.id,
          displayOrder: index + 1,
          ...item,
        })),
      };
    } catch (error) {
      await this.prisma.foodFightSession.updateMany({
        where: {
          id: context.sessionId,
          status: FoodFightStatus.GENERATING_RECOMMENDATIONS,
        },
        data: { status: FoodFightStatus.VOTING },
      });
      throw error;
    }
  }

  async submitVotes(roomId: string, userId: string, dto: SubmitVotesDto) {
    const itemIds = dto.votes.map((vote) => vote.recommendationItemId);
    if (new Set(itemIds).size !== 2) {
      throw new BadRequestException(
        'Exactly two different recommendation items are required',
      );
    }

    const session = await this.prisma.foodFightSession.findUnique({
      where: { roomId },
      select: {
        id: true,
        status: true,
        members: { select: { userId: true } },
      },
    });

    if (!session) {
      throw new NotFoundException(
        'FoodFight session not found. Start the room first.',
      );
    }
    if (!session.members.some((member) => member.userId === userId)) {
      throw new ForbiddenException('You are not a member of this FoodFight');
    }
    if (session.status !== FoodFightStatus.VOTING) {
      throw new ConflictException({
        code: 'INVALID_VOTING_STATE',
        state: resolveFlowState(session.status, 0, session.members.length),
      });
    }

    await this.prisma.$transaction(async (tx) => {
      const currentRound = await tx.recommendationRound.findFirst({
        where: { sessionId: session.id },
        orderBy: { roundNumber: 'desc' },
        select: {
          id: true,
          roundNumber: true,
          items: {
            orderBy: { displayOrder: 'asc' },
            select: {
              id: true,
              menuName: true,
              description: true,
              reason: true,
              imageUrl: true,
              recommendationScore: true,
              metadata: true,
              displayOrder: true,
            },
          },
        },
      });

      if (!currentRound || currentRound.items.length !== 2) {
        throw new ConflictException(
          'The current recommendation round must contain exactly two items',
        );
      }
      const currentItemIds = new Set(currentRound.items.map((item) => item.id));
      if (itemIds.some((itemId) => !currentItemIds.has(itemId))) {
        throw new BadRequestException(
          'Votes must target both items in the current recommendation round',
        );
      }

      for (const vote of dto.votes) {
        await tx.vote.upsert({
          where: {
            recommendationItemId_userId: {
              recommendationItemId: vote.recommendationItemId,
              userId,
            },
          },
          create: {
            recommendationItemId: vote.recommendationItemId,
            userId,
            action: vote.vote,
          },
          update: { action: vote.vote },
        });
      }

      await this.evaluateAndPersistInitialVotes(
        tx,
        session.id,
        currentRound,
        session.members.map((member) => member.userId),
      );
    });

    return this.getFlowState(roomId, userId);
  }

  async submitFinalVote(
    roomId: string,
    userId: string,
    dto: SubmitFinalVoteDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const session = await tx.foodFightSession.findUnique({
        where: { roomId },
        select: {
          id: true,
          status: true,
          members: { select: { userId: true } },
        },
      });
      if (!session) {
        throw new NotFoundException(
          'FoodFight session not found. Start the room first.',
        );
      }
      if (!session.members.some((member) => member.userId === userId)) {
        throw new ForbiddenException('You are not a member of this FoodFight');
      }
      if (session.status !== FoodFightStatus.FINAL_VOTE) {
        throw new ConflictException({
          code: 'INVALID_FINAL_VOTE_STATE',
          state: resolveFlowState(session.status, 0, session.members.length),
        });
      }

      const rounds = await tx.recommendationRound.findMany({
        where: { sessionId: session.id },
        orderBy: { roundNumber: 'asc' },
        select: {
          roundNumber: true,
          items: {
            orderBy: { displayOrder: 'asc' },
            select: {
              id: true,
              menuName: true,
              description: true,
              reason: true,
              imageUrl: true,
              recommendationScore: true,
              metadata: true,
              displayOrder: true,
            },
          },
        },
      });
      const voteType = getFinalVoteType(rounds);
      const candidates = getFinalVoteCandidates(rounds, voteType);
      if (
        !candidates.some(
          (candidate) => candidate.id === dto.recommendationItemId,
        )
      ) {
        throw new BadRequestException(
          'Final vote must target one of the current final-vote candidates',
        );
      }

      await tx.finalVote.upsert({
        where: {
          sessionId_userId_voteType: {
            sessionId: session.id,
            userId,
            voteType,
          },
        },
        create: {
          sessionId: session.id,
          userId,
          recommendationItemId: dto.recommendationItemId,
          voteType,
        },
        update: { recommendationItemId: dto.recommendationItemId },
      });

      await this.evaluateAndPersistFinalVotes(
        tx,
        session.id,
        session.members.map((member) => member.userId),
        candidates,
        voteType,
      );
    });

    return this.getFlowState(roomId, userId);
  }

  async submitHostTieBreak(
    roomId: string,
    userId: string,
    dto: SubmitFinalVoteDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const session = await tx.foodFightSession.findUnique({
        where: { roomId },
        select: {
          id: true,
          status: true,
          room: { select: { hostId: true } },
          members: { select: { userId: true } },
        },
      });
      if (!session) {
        throw new NotFoundException(
          'FoodFight session not found. Start the room first.',
        );
      }
      if (session.room.hostId !== userId) {
        throw new ForbiddenException(
          'Only the host can resolve a final vote tie',
        );
      }
      if (session.status !== FoodFightStatus.FINAL_VOTE) {
        throw new ConflictException(
          'The session is not waiting for a final vote',
        );
      }

      const rounds = await tx.recommendationRound.findMany({
        where: { sessionId: session.id },
        orderBy: { roundNumber: 'asc' },
        select: {
          roundNumber: true,
          items: {
            orderBy: { displayOrder: 'asc' },
            select: {
              id: true,
              menuName: true,
              description: true,
              reason: true,
              imageUrl: true,
              recommendationScore: true,
              metadata: true,
              displayOrder: true,
            },
          },
        },
      });
      const voteType = getFinalVoteType(rounds);
      const candidates = getFinalVoteCandidates(rounds, voteType);
      const finalVotes = await tx.finalVote.findMany({
        where: { sessionId: session.id, voteType },
        select: { userId: true, recommendationItemId: true },
      });
      const progress = getFinalVoteProgress(
        session.members.map((member) => member.userId),
        candidates.map((candidate) => candidate.id),
        finalVotes,
        userId,
      );
      if (
        progress.submittedMemberCount !== session.members.length ||
        !progress.hostTieBreakRequired
      ) {
        throw new ConflictException(
          'A host tie-break is available only after all final votes are tied',
        );
      }

      const highestCount = Math.max(...Object.values(progress.counts));
      const tiedCandidateIds = Object.entries(progress.counts)
        .filter(([, count]) => count === highestCount)
        .map(([itemId]) => itemId);
      if (!tiedCandidateIds.includes(dto.recommendationItemId)) {
        throw new BadRequestException(
          'Host must choose one of the tied final-vote candidates',
        );
      }

      await tx.finalSelection.upsert({
        where: { sessionId: session.id },
        create: {
          sessionId: session.id,
          recommendationItemId: dto.recommendationItemId,
          selectedById: userId,
          method: FinalSelectionMethod.HOST_TIE_BREAK,
        },
        update: {
          recommendationItemId: dto.recommendationItemId,
          selectedById: userId,
          method: FinalSelectionMethod.HOST_TIE_BREAK,
        },
      });
      await tx.foodFightSession.update({
        where: { id: session.id },
        data: { status: FoodFightStatus.FINALIZED, finalizedAt: new Date() },
      });
    });

    return this.getFlowState(roomId, userId);
  }

  private async loadRecommendationContext(
    roomId: string,
    userId: string,
    expectedStatus: FoodFightStatus = FoodFightStatus.COLLECTING_PREFERENCES,
  ) {
    const session = await this.prisma.foodFightSession.findUnique({
      where: { roomId },
      select: {
        id: true,
        status: true,
        room: { select: { hostId: true } },
        members: {
          orderBy: { joinedAt: 'asc' },
          select: {
            userId: true,
            user: {
              select: {
                displayName: true,
                foodProfile: {
                  select: {
                    allergies: true,
                    otherAllergies: true,
                    restrictions: true,
                    otherRestrictions: true,
                    additionalNotes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException(
        'FoodFight session not found. Start the room first.',
      );
    }

    if (session.room.hostId !== userId) {
      throw new ForbiddenException('Only the host can start recommendations');
    }

    if (!session.members.some((member) => member.userId === userId)) {
      throw new ForbiddenException('You are not a member of this FoodFight');
    }

    if (session.status !== expectedStatus) {
      throw new ConflictException({
        code: 'INVALID_RECOMMENDATION_STATE',
        state: resolveFlowState(session.status, 0, session.members.length),
      });
    }

    const preferences = await this.prisma.mealPreference.findMany({
      where: { sessionId: session.id },
      select: {
        userId: true,
        cookingTypes: true,
        otherCookingType: true,
        cuisines: true,
        otherCuisine: true,
        ingredients: true,
        otherIngredient: true,
        budgetRange: true,
        restaurantStyles: true,
        otherRestaurantStyle: true,
        otherNote: true,
      },
    });

    return {
      sessionId: session.id,
      status: session.status,
      members: session.members,
      preferences: new Map(
        preferences.map((preference) => [preference.userId, preference]),
      ),
    };
  }

  private buildRecommendationPayload(
    roomId: string,
    members: SessionMemberSource[],
    preferences: Map<string, StoredMealPreferenceSource>,
    history: string[],
    rerollExclusions: string[],
  ): RecommendationRequestDto {
    return {
      roomId,
      members: members.map((member) => {
        const profile = member.user.foodProfile;
        const preference = preferences.get(member.userId);

        if (!preference) {
          throw new BadRequestException(
            `Missing meal preference for user ${member.userId}`,
          );
        }

        const mapped = mapStoredMealPreference(preference);

        return {
          name: member.user.displayName,
          profile: {
            allergies: {
              selected: profile?.allergies ?? [],
              other: toStringArray(profile?.otherAllergies),
            },
            restrictions: {
              selected: profile?.restrictions ?? [],
              other: toStringArray(profile?.otherRestrictions),
            },
            additional_nuances: profile?.additionalNotes ?? '',
          },
          meal_preference: {
            cooking_methods: {
              selected: mapped.cookingMethods,
              other: mapped.cookingMethodsOther,
            },
            cuisines: {
              selected: mapped.cuisines,
              other: mapped.cuisinesOther,
            },
            proteins: {
              selected: mapped.proteins,
              other: mapped.proteinsOther,
            },
            budget: {
              selected: mapped.budget,
              other: [],
            },
            restaurant_styles: {
              selected: mapped.restaurantStyles,
              other: mapped.restaurantStylesOther,
            },
            additional_nuances: mapped.notes,
          },
        };
      }),
      history,
      rerollExclusions,
    };
  }

  private buildNormalizedRestaurantMembers(
    members: SessionMemberSource[],
    preferences: Map<string, StoredMealPreferenceSource>,
  ): AiJsonObject[] {
    return members.map((member) => {
      const preference = preferences.get(member.userId);
      if (!preference) {
        throw new BadRequestException(
          `Missing meal preference for user ${member.userId}`,
        );
      }

      const profile = member.user.foodProfile;
      const mapped = mapStoredMealPreference(preference);

      return {
        name: member.user.displayName,
        allergens: normalizeStringArray([
          ...(profile?.allergies ?? []),
          ...toStringArray(profile?.otherAllergies),
        ]),
        dietary_restrictions: normalizeStringArray([
          ...(profile?.restrictions ?? []),
          ...toStringArray(profile?.otherRestrictions),
        ]),
        avoid_cuisines: [],
        avoid_proteins: [],
        avoid_cooking_methods: [],
        avoid_tastes: [],
        preferred_cuisines: normalizeStringArray([
          ...mapped.cuisines,
          ...mapped.cuisinesOther,
        ]),
        preferred_cooking_methods: normalizeStringArray([
          ...mapped.cookingMethods,
          ...mapped.cookingMethodsOther,
        ]),
        preferred_proteins: normalizeStringArray([
          ...mapped.proteins,
          ...mapped.proteinsOther,
        ]),
        preferred_tastes: [],
        budget: mapped.budget,
        restaurant_styles: normalizeStringArray([
          ...mapped.restaurantStyles,
          ...mapped.restaurantStylesOther,
        ]),
        additional_nuances: normalizeStringArray([
          profile?.additionalNotes ?? '',
          mapped.notes,
        ]).join(' '),
      };
    });
  }

  private async evaluateAndPersistInitialVotes(
    tx: Prisma.TransactionClient,
    sessionId: string,
    round: RecommendationRoundSource,
    memberIds: string[],
  ) {
    const votes = await tx.vote.findMany({
      where: {
        recommendationItemId: { in: round.items.map((item) => item.id) },
      },
      select: { recommendationItemId: true, userId: true, action: true },
    });
    const evaluation = evaluateInitialVotes(round, memberIds, votes);

    if (evaluation.status === 'WAITING_FOR_VOTES') {
      return evaluation;
    }

    await tx.recommendationRound.update({
      where: { id: round.id },
      data: {
        status: RecommendationRoundStatus.COMPLETED,
        completedAt: new Date(),
      },
    });

    if (evaluation.status === 'FINALIZED') {
      await tx.finalSelection.upsert({
        where: { sessionId },
        create: {
          sessionId,
          recommendationItemId: evaluation.winnerItemId,
          selectedById: null,
          method: FinalSelectionMethod.OK_MAJORITY,
        },
        update: {},
      });
      await tx.foodFightSession.update({
        where: { id: sessionId },
        data: { status: FoodFightStatus.FINALIZED, finalizedAt: new Date() },
      });
    } else if (evaluation.status === 'FINAL_VOTE_REQUIRED') {
      await tx.foodFightSession.update({
        where: { id: sessionId },
        data: { status: FoodFightStatus.FINAL_VOTE },
      });
    }

    return evaluation;
  }

  private async evaluateAndPersistFinalVotes(
    tx: Prisma.TransactionClient,
    sessionId: string,
    memberIds: string[],
    candidates: RecommendationItemSource[],
    voteType: FinalVoteType,
  ) {
    const finalVotes = await tx.finalVote.findMany({
      where: { sessionId, voteType },
      select: { userId: true, recommendationItemId: true },
    });
    const progress = getFinalVoteProgress(
      memberIds,
      candidates.map((candidate) => candidate.id),
      finalVotes,
      memberIds[0] ?? '',
    );

    if (progress.submittedMemberCount !== memberIds.length) {
      return progress;
    }

    const highestCount = Math.max(...Object.values(progress.counts));
    const winners = Object.entries(progress.counts).filter(
      ([, count]) => count === highestCount,
    );
    if (winners.length !== 1) {
      return progress;
    }

    await tx.finalSelection.upsert({
      where: { sessionId },
      create: {
        sessionId,
        recommendationItemId: winners[0][0],
        selectedById: null,
        method: FinalSelectionMethod.FINAL_VOTE,
      },
      update: {},
    });
    await tx.foodFightSession.update({
      where: { id: sessionId },
      data: { status: FoodFightStatus.FINALIZED, finalizedAt: new Date() },
    });
    return progress;
  }

  private normalizePreference(dto: UpsertMealPreferenceDto) {
    const cookingGroup = normalizePreferenceGroup(
      dto.cookingMethods,
      dto.cookingMethodsOther,
    );
    const cuisineGroup = normalizePreferenceGroup(dto.cuisines, dto.cuisinesOther);
    const proteinGroup = normalizePreferenceGroup(dto.proteins, dto.proteinsOther);
    const restaurantStyleGroup = normalizePreferenceGroup(
      dto.restaurantStyles,
      dto.restaurantStylesOther,
    );

    this.assertPreferenceGroup(
      'cooking methods',
      cookingGroup.selected,
      cookingGroup.other,
    );
    this.assertPreferenceGroup('cuisines', cuisineGroup.selected, cuisineGroup.other);
    this.assertPreferenceGroup('proteins', proteinGroup.selected, proteinGroup.other);
    this.assertPreferenceGroup(
      'restaurant styles',
      restaurantStyleGroup.selected,
      restaurantStyleGroup.other,
    );

    const budgetRange = FRONTEND_BUDGET_TO_PRISMA[dto.budget];
    if (!budgetRange) {
      throw new BadRequestException('A valid budget is required');
    }

    return {
      cookingTypes: cookingGroup.selected,
      otherCookingType: cookingGroup.other,
      cuisines: cuisineGroup.selected,
      otherCuisine: cuisineGroup.other,
      ingredients: proteinGroup.selected,
      otherIngredient: proteinGroup.other,
      budgetRange,
      restaurantStyles: restaurantStyleGroup.selected,
      otherRestaurantStyle: restaurantStyleGroup.other,
      otherNote: normalizeOptionalText(dto.additionalNuances),
    };
  }

  private assertPreferenceGroup(
    name: string,
    selected: string[],
    other: string | null | undefined,
  ) {
    if (selected.length === 0 && !other?.trim()) {
      throw new BadRequestException(`At least one ${name} option is required`);
    }
  }
}

function normalizePreferenceGroup(
  selected: string[],
  other: string | null | undefined,
): { selected: string[]; other: string | null } {
  if (selected.includes('ANY')) {
    return { selected: [], other: null };
  }

  return {
    selected: normalizeStringArray(selected),
    other: normalizeOptionalText(other),
  };
}

function mapStoredMealPreference(
  preference: StoredMealPreferenceSource,
): MappedMealPreference {
  return {
    cookingMethods: preference.cookingTypes.map(mapCookingTypeToAi),
    cookingMethodsOther: toStringArray(preference.otherCookingType),
    cuisines: preference.cuisines,
    cuisinesOther: toStringArray(preference.otherCuisine),
    proteins: preference.ingredients,
    proteinsOther: toStringArray(preference.otherIngredient),
    budget: preference.budgetRange
      ? PRISMA_BUDGET_TO_AI[preference.budgetRange]
      : null,
    restaurantStyles: preference.restaurantStyles,
    restaurantStylesOther: toStringArray(preference.otherRestaurantStyle),
    notes: preference.otherNote ?? '',
  };
}

function resolveRestaurantFlowState(
  status: FoodFightStatus,
  hasFinalSelection: boolean,
): RestaurantFlowState | null {
  if (status === FoodFightStatus.FINALIZED && hasFinalSelection) {
    return 'FINALIZED_MENU';
  }
  if (status === FoodFightStatus.RESTAURANT_RECOMMENDATION) {
    return 'RECOMMENDING_RESTAURANTS';
  }
  if (status === FoodFightStatus.RESTAURANT_SELECTION) {
    return 'RESTAURANTS_READY';
  }
  return null;
}

function buildFinalConcept(selection: FinalSelectionSource): AiJsonObject {
  const metadata = selection.recommendationItem.metadata;
  if (!isAiJsonObject(metadata)) {
    throw new BadRequestException(
      'The final recommendation is missing concept metadata required for restaurant search',
    );
  }

  const conceptId = requiredStoredString(metadata, 'conceptId');
  const nameTh = requiredStoredString(metadata, 'nameTh');
  const cuisine = requiredStoredString(metadata, 'cuisine');
  const metadataName = optionalStoredString(metadata, 'name');
  const persistedMenuName = selection.recommendationItem.menuName.trim();

  if (!metadataName && !persistedMenuName) {
    throw new BadRequestException(
      'The final recommendation is missing the required concept name',
    );
  }

  return {
    conceptId,
    name: metadataName ?? persistedMenuName,
    nameTh,
    cuisine,
  };
}

function toFinalSelectionView(selection: FinalSelectionSource) {
  const metadata = isAiJsonObject(selection.recommendationItem.metadata)
    ? selection.recommendationItem.metadata
    : null;
  return {
    recommendationItemId: selection.recommendationItemId,
    conceptId: optionalStoredString(metadata, 'conceptId'),
    name:
      optionalStoredString(metadata, 'name') ??
      selection.recommendationItem.menuName,
    nameTh: optionalStoredString(metadata, 'nameTh'),
    cuisine: optionalStoredString(metadata, 'cuisine'),
  };
}

function parseRestaurantResponse(
  response: AiJsonValue,
): RestaurantRecommendationResult[] {
  if (!isAiJsonObject(response) || response.success !== true) {
    throw new BadGatewayException(
      'AI service did not return successful restaurant recommendations',
    );
  }

  const rawRestaurants = response.restaurants;
  if (!Array.isArray(rawRestaurants)) {
    throw new BadGatewayException(
      'AI service returned an invalid restaurant recommendations list',
    );
  }

  const restaurantIds = new Set<string>();
  return rawRestaurants.map((rawRestaurant) => {
    if (!isAiJsonObject(rawRestaurant)) {
      throw new BadGatewayException('AI restaurant recommendation is invalid');
    }

    const restaurantId = requiredRestaurantString(
      rawRestaurant,
      'restaurantId',
    );
    if (restaurantIds.has(restaurantId)) {
      throw new BadGatewayException(
        `AI returned duplicate restaurantId ${restaurantId}`,
      );
    }
    restaurantIds.add(restaurantId);

    const rank = requiredRestaurantInteger(rawRestaurant, 'rank');
    return {
      restaurantId,
      name: requiredRestaurantString(rawRestaurant, 'name'),
      rank,
      score: optionalRestaurantNumber(rawRestaurant, 'score'),
      matchType: optionalRestaurantString(rawRestaurant, 'matchType'),
      groupCoverage: optionalRestaurantNumber(rawRestaurant, 'groupCoverage'),
      budget: optionalRestaurantString(rawRestaurant, 'budget'),
      styles: strictStringArray(rawRestaurant, 'styles'),
      latitude: optionalRestaurantNumber(rawRestaurant, 'latitude'),
      longitude: optionalRestaurantNumber(rawRestaurant, 'longitude'),
      address: optionalRestaurantString(rawRestaurant, 'address'),
      phone: optionalRestaurantString(rawRestaurant, 'phone'),
      openingHours: optionalAiJsonValue(rawRestaurant, 'openingHours'),
      openNow: optionalRestaurantBoolean(rawRestaurant, 'openNow'),
      distanceKm: optionalRestaurantNumber(rawRestaurant, 'distanceKm'),
      memberMenuOptions: jsonArray(rawRestaurant, 'memberMenuOptions'),
      reasons: strictStringArray(rawRestaurant, 'reasons'),
    };
  });
}

function buildRestaurantMetadata(
  restaurant: RestaurantRecommendationResult,
): Prisma.InputJsonObject {
  return {
    provider: 'fastapi',
    matchType: restaurant.matchType,
    budget: restaurant.budget,
    styles: restaurant.styles,
    openingHours: restaurant.openingHours,
    openNow: restaurant.openNow,
    reasons: restaurant.reasons,
    memberMenuOptions: restaurant.memberMenuOptions,
  };
}

function toRestaurantRecommendationView(
  recommendation: RestaurantRecommendationSource,
) {
  const metadata = isAiJsonObject(recommendation.openingHours)
    ? recommendation.openingHours
    : null;
  const openingHours = metadata?.openingHours ?? recommendation.openingHours;
  const openNow =
    typeof metadata?.openNow === 'boolean' ? metadata.openNow : null;
  const reasons = strictStringArrayFromValue(metadata?.reasons);
  const memberMenuOptions = arrayFromValue(metadata?.memberMenuOptions);

  return {
    id: recommendation.id,
    restaurantId: recommendation.externalPlaceId,
    rank: recommendation.displayOrder,
    name: recommendation.name,
    score: recommendation.rankingScore,
    distanceKm:
      recommendation.distanceMeters === null
        ? null
        : recommendation.distanceMeters / 1000,
    latitude: recommendation.latitude,
    longitude: recommendation.longitude,
    address: recommendation.address,
    phone: recommendation.phone,
    openingHours,
    openNow,
    groupCoverage: recommendation.groupCompatibilityScore,
    reasons: reasons.length
      ? reasons
      : recommendation.reason
        ? [recommendation.reason]
        : [],
    memberMenuOptions,
    finalMenuMatch: recommendation.finalMenuMatch,
    imageUrl: recommendation.imageUrl,
  };
}

function requiredStoredString(object: AiJsonObject, key: string): string {
  const value = object[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new BadRequestException(
      `The final recommendation metadata field ${key} is required`,
    );
  }
  return value.trim();
}

function optionalStoredString(
  object: AiJsonObject | null,
  key: string,
): string | null {
  const value = object?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function requiredRestaurantString(object: AiJsonObject, key: string): string {
  const value = object[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value.trim();
}

function requiredRestaurantInteger(object: AiJsonObject, key: string): number {
  const value = object[key];
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value;
}

function optionalRestaurantString(
  object: AiJsonObject,
  key: string,
): string | null {
  const value = object[key];
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'string') {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value;
}

function optionalRestaurantNumber(
  object: AiJsonObject,
  key: string,
): number | null {
  const value = object[key];
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value;
}

function optionalRestaurantBoolean(
  object: AiJsonObject,
  key: string,
): boolean | null {
  const value = object[key];
  if (value === undefined || value === null) {
    return null;
  }
  if (typeof value !== 'boolean') {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value;
}

function optionalAiJsonValue(
  object: AiJsonObject,
  key: string,
): AiJsonValue | null {
  return object[key] === undefined ? null : object[key];
}

function jsonArray(object: AiJsonObject, key: string): AiJsonValue[] {
  const value = object[key];
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value)) {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value;
}

function strictStringArray(object: AiJsonObject, key: string): string[] {
  const value = object[key];
  if (value === undefined || value === null) {
    return [];
  }
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new BadGatewayException(`AI restaurant field ${key} is invalid`);
  }
  return value as string[];
}

function strictStringArrayFromValue(value: AiJsonValue | undefined): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const strings: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string') {
      return [];
    }
    strings.push(item);
  }
  return strings;
}

function arrayFromValue(value: AiJsonValue | undefined): AiJsonValue[] {
  return Array.isArray(value) ? value : [];
}

function resolveFlowState(
  status: FoodFightStatus,
  submittedMemberCount: number,
  totalMemberCount: number,
): FoodFightFlowState {
  if (status === FoodFightStatus.COLLECTING_PREFERENCES) {
    return submittedMemberCount < totalMemberCount
      ? 'WAITING_FOR_PREFERENCES'
      : 'READY_TO_RECOMMEND';
  }

  if (status === FoodFightStatus.GENERATING_RECOMMENDATIONS) {
    return 'RECOMMENDING';
  }

  if (status === FoodFightStatus.FINAL_VOTE) {
    return 'FINAL_VOTE_REQUIRED';
  }

  if (
    status === FoodFightStatus.FINALIZED ||
    status === FoodFightStatus.COMPLETED
  ) {
    return 'FINALIZED';
  }

  return 'VOTING';
}

function evaluateInitialVotes(
  round: RecommendationRoundSource,
  memberIds: string[],
  votes: VoteSource[],
): InitialVoteEvaluation {
  if (round.items.length !== 2) {
    return {
      status: 'WAITING_FOR_VOTES',
      submittedMemberCount: 0,
      totalMemberCount: memberIds.length,
    };
  }

  const itemIds = round.items.map((item) => item.id);
  const progress = getVoteProgress(memberIds, itemIds, votes);
  if (progress.submittedMemberCount !== memberIds.length) {
    return {
      status: 'WAITING_FOR_VOTES',
      submittedMemberCount: progress.submittedMemberCount,
      totalMemberCount: memberIds.length,
    };
  }

  const required = majorityRequired(memberIds.length);
  const voteResults = round.items.map((item): VoteResult => {
    const itemVotes = votes.filter(
      (vote) => vote.recommendationItemId === item.id,
    );
    const ok = itemVotes.filter((vote) => vote.action === VoteAction.OK).length;
    const pass = itemVotes.filter(
      (vote) => vote.action === VoteAction.PASS,
    ).length;
    return {
      itemId: item.id,
      conceptId: getConceptIdFromMetadata(item.metadata) ?? item.id,
      ok,
      pass,
      totalVotes: ok + pass,
      passedMajority: ok >= required,
    };
  });
  const passed = voteResults.filter((result) => result.passedMajority);

  if (passed.length === 0) {
    if (round.roundNumber === 1) {
      return {
        status: 'REROLL_REQUIRED',
        roundNumber: round.roundNumber,
        voteResults,
        rerollExclusions: voteResults.map((result) => result.conceptId),
      };
    }

    return {
      status: 'FINAL_VOTE_REQUIRED',
      finalVoteType: FinalVoteType.FOUR_MENU_FINAL,
      voteResults,
    };
  }

  if (passed.length === 1 || passed[0].ok !== passed[1]?.ok) {
    const winner =
      passed.length === 1
        ? passed[0]
        : passed[0].ok > passed[1].ok
          ? passed[0]
          : passed[1];
    return {
      status: 'FINALIZED',
      winnerItemId: winner.itemId,
      voteResults,
    };
  }

  return {
    status: 'FINAL_VOTE_REQUIRED',
    finalVoteType: FinalVoteType.TIE_BREAK,
    voteResults,
  };
}

function majorityRequired(memberCount: number): number {
  return memberCount > 0 ? Math.floor(memberCount / 2) + 1 : 0;
}

function getVoteProgress(
  memberIds: string[],
  itemIds: string[],
  votes: VoteSource[],
) {
  if (itemIds.length === 0) {
    return {
      submittedMemberCount: 0,
      submittedUserIds: new Set<string>(),
    };
  }

  const votesByMember = new Map<string, Set<string>>();
  for (const memberId of memberIds) {
    votesByMember.set(memberId, new Set<string>());
  }
  for (const vote of votes) {
    const memberVotes = votesByMember.get(vote.userId);
    if (memberVotes && itemIds.includes(vote.recommendationItemId)) {
      memberVotes.add(vote.recommendationItemId);
    }
  }

  const submittedUserIds = new Set(
    memberIds.filter(
      (memberId) => votesByMember.get(memberId)?.size === itemIds.length,
    ),
  );
  return {
    submittedMemberCount: submittedUserIds.size,
    submittedUserIds,
  };
}

function getFinalVoteType(
  rounds: Array<{ roundNumber: number; items: RecommendationItemSource[] }>,
): FinalVoteType {
  const latestRoundNumber = rounds.at(-1)?.roundNumber;
  return latestRoundNumber === 1
    ? FinalVoteType.TIE_BREAK
    : FinalVoteType.FOUR_MENU_FINAL;
}

function getFinalVoteCandidates(
  rounds: Array<{ roundNumber: number; items: RecommendationItemSource[] }>,
  voteType: FinalVoteType,
): RecommendationItemSource[] {
  if (voteType === FinalVoteType.TIE_BREAK) {
    return rounds.at(-1)?.items ?? [];
  }
  return rounds.flatMap((round) => round.items);
}

function getFinalVoteProgress(
  memberIds: string[],
  candidateIds: string[],
  finalVotes: Array<{
    userId: string;
    recommendationItemId: string;
  }>,
  userId: string,
) {
  const counts = Object.fromEntries(
    candidateIds.map((candidateId) => [candidateId, 0]),
  ) as Record<string, number>;
  const submittedUserIds = new Set<string>();

  for (const vote of finalVotes) {
    if (!candidateIds.includes(vote.recommendationItemId)) {
      continue;
    }
    counts[vote.recommendationItemId] += 1;
    if (memberIds.includes(vote.userId)) {
      submittedUserIds.add(vote.userId);
    }
  }

  const highestCount = Math.max(0, ...Object.values(counts));
  const highestCountCandidates = Object.values(counts).filter(
    (count) => count === highestCount,
  ).length;

  return {
    submittedMemberCount: submittedUserIds.size,
    totalMemberCount: memberIds.length,
    hasSubmitted: submittedUserIds.has(userId),
    counts,
    hostTieBreakRequired:
      submittedUserIds.size === memberIds.length && highestCountCandidates > 1,
  };
}

function mapCookingTypeToAi(value: string): string {
  return PRISMA_COOKING_TYPE_TO_AI[value] ?? value;
}

function toStringArray(value: string | null | undefined): string[] {
  return value ? [value] : [];
}

function normalizeStringArray(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function normalizeOptionalText(
  value: string | null | undefined,
): string | null {
  const normalized = value?.trim() ?? '';
  return normalized || null;
}

function parseRecommendationResponse(
  response: AiJsonValue,
): RecommendationItemResult[] {
  if (!isAiJsonObject(response) || response.success !== true) {
    throw new BadGatewayException(
      'AI service did not return a successful recommendation',
    );
  }

  const rawRecommendations = response.recommendations;
  if (!Array.isArray(rawRecommendations) || rawRecommendations.length !== 2) {
    throw new BadGatewayException(
      'AI service must return exactly two recommendations',
    );
  }

  return rawRecommendations.map((rawRecommendation) => {
    if (!isAiJsonObject(rawRecommendation)) {
      throw new BadGatewayException('AI recommendation item is invalid');
    }

    const conceptId = requiredString(rawRecommendation, 'conceptId');
    const name = optionalString(rawRecommendation, 'name');
    const nameTh = optionalString(rawRecommendation, 'nameTh');

    if (!name && !nameTh) {
      throw new BadGatewayException(
        `AI recommendation ${conceptId} has no display name`,
      );
    }

    return {
      conceptId,
      name: name ?? nameTh ?? conceptId,
      nameTh: nameTh ?? name ?? conceptId,
      score: optionalNumber(rawRecommendation, 'score'),
      preferenceScore: optionalNumber(rawRecommendation, 'preferenceScore'),
      fairnessBonus: optionalNumber(rawRecommendation, 'fairnessBonus'),
      safetyBonus: optionalNumber(rawRecommendation, 'safetyBonus'),
      historyPenalty: optionalNumber(rawRecommendation, 'historyPenalty'),
      diversityBonus: optionalNumber(rawRecommendation, 'diversityBonus'),
      cuisine: optionalString(rawRecommendation, 'cuisine'),
      cuisineTh: optionalString(rawRecommendation, 'cuisineTh'),
      category: optionalString(rawRecommendation, 'category'),
      cookingMethods: stringArray(rawRecommendation, 'cookingMethods'),
      cookingMethodsTh: stringArray(rawRecommendation, 'cookingMethodsTh'),
      proteins: stringArray(rawRecommendation, 'proteins'),
      proteinsTh: stringArray(rawRecommendation, 'proteinsTh'),
      tastes: stringArray(rawRecommendation, 'tastes'),
      tastesTh: stringArray(rawRecommendation, 'tastesTh'),
      satisfiedMembers: optionalNumber(rawRecommendation, 'satisfiedMembers'),
      memberCount: optionalNumber(rawRecommendation, 'memberCount'),
      satisfactionRatio: optionalNumber(rawRecommendation, 'satisfactionRatio'),
      safeCoverage: optionalNumber(rawRecommendation, 'safeCoverage'),
      reasons: stringArray(rawRecommendation, 'reasons'),
    };
  });
}

function buildRecommendationMetadata(
  item: RecommendationItemResult,
): Prisma.InputJsonObject {
  return {
    conceptId: item.conceptId,
    name: item.name,
    nameTh: item.nameTh,
    score: item.score,
    preferenceScore: item.preferenceScore,
    fairnessBonus: item.fairnessBonus,
    safetyBonus: item.safetyBonus,
    historyPenalty: item.historyPenalty,
    diversityBonus: item.diversityBonus,
    cuisine: item.cuisine,
    cuisineTh: item.cuisineTh,
    category: item.category,
    cookingMethods: item.cookingMethods,
    cookingMethodsTh: item.cookingMethodsTh,
    proteins: item.proteins,
    proteinsTh: item.proteinsTh,
    tastes: item.tastes,
    tastesTh: item.tastesTh,
    satisfiedMembers: item.satisfiedMembers,
    memberCount: item.memberCount,
    satisfactionRatio: item.satisfactionRatio,
    safeCoverage: item.safeCoverage,
    reasons: item.reasons,
  };
}

function requiredString(object: AiJsonObject, key: string): string {
  const value = object[key];
  if (typeof value !== 'string' || !value.trim()) {
    throw new BadGatewayException(`AI recommendation field ${key} is invalid`);
  }

  return value;
}

function optionalString(object: AiJsonObject, key: string): string | null {
  const value = object[key];
  return typeof value === 'string' ? value : null;
}

function optionalNumber(object: AiJsonObject, key: string): number | null {
  const value = object[key];
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new BadGatewayException(`AI recommendation field ${key} is invalid`);
  }

  return value;
}

function stringArray(object: AiJsonObject, key: string): string[] {
  const value = object[key];
  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new BadGatewayException(`AI recommendation field ${key} is invalid`);
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function getConceptIdFromMetadata(metadata: unknown): string | null {
  if (!isAiJsonObject(metadata)) {
    return null;
  }

  return typeof metadata.conceptId === 'string' ? metadata.conceptId : null;
}

function isNonNullable<T>(value: T | null): value is T {
  return value !== null;
}
