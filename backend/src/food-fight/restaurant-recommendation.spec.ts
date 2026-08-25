import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import {
  FoodFightStatus,
  RestaurantRecommendationStatus,
} from '../database/generated/prisma/enums';
import type { PrismaService } from '../database/prisma.service';
import type { RecommendationAiService } from '../recommendation-ai/recommendation-ai.service';
import { FoodFightService } from './food-fight.service';

jest.mock('../database/prisma.service', () => ({
  PrismaService: class MockPrismaService {},
}));

jest.mock('../database/generated/prisma/client', () => ({
  FoodFightStatus: {
    COLLECTING_PREFERENCES: 'COLLECTING_PREFERENCES',
    GENERATING_RECOMMENDATIONS: 'GENERATING_RECOMMENDATIONS',
    VOTING: 'VOTING',
    FINAL_VOTE: 'FINAL_VOTE',
    FINALIZED: 'FINALIZED',
    RESTAURANT_RECOMMENDATION: 'RESTAURANT_RECOMMENDATION',
    RESTAURANT_SELECTION: 'RESTAURANT_SELECTION',
    COMPLETED: 'COMPLETED',
  },
  FinalSelectionMethod: {
    OK_MAJORITY: 'OK_MAJORITY',
    FINAL_VOTE: 'FINAL_VOTE',
    HOST_TIE_BREAK: 'HOST_TIE_BREAK',
  },
  FinalVoteType: {
    TIE_BREAK: 'TIE_BREAK',
    FOUR_MENU_FINAL: 'FOUR_MENU_FINAL',
  },
  MealBudgetRange: {
    UNDER_200: 'UNDER_200',
    BETWEEN_200_400: 'BETWEEN_200_400',
    BETWEEN_400_600: 'BETWEEN_400_600',
    ABOVE_600: 'ABOVE_600',
    ANY: 'ANY',
  },
  RecommendationRoundStatus: {
    GENERATING: 'GENERATING',
    VOTING: 'VOTING',
    COMPLETED: 'COMPLETED',
  },
  RestaurantRecommendationStatus: {
    ACTIVE: 'ACTIVE',
    SELECTED: 'SELECTED',
    REJECTED: 'REJECTED',
  },
  SessionMemberRole: { HOST: 'HOST', MEMBER: 'MEMBER' },
  VoteAction: { OK: 'OK', PASS: 'PASS' },
}));

type RestaurantRecord = {
  id: string;
  externalPlaceId: string | null;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  distanceMeters: number | null;
  phone: string | null;
  openingHours: Record<string, unknown>;
  imageUrl: string | null;
  finalMenuMatch: boolean;
  varietyScore: number | null;
  groupCompatibilityScore: number | null;
  rankingScore: number | null;
  reason: string | null;
  status: RestaurantRecommendationStatus;
  displayOrder: number | null;
};

type RestaurantTestState = {
  status: FoodFightStatus;
  restaurantRecords: RestaurantRecord[];
  deleteCalls: number;
  createCalls: number;
};

type FakePrisma = {
  $transaction: jest.Mock;
  foodFightSession: {
    findUnique: jest.Mock;
    update: jest.Mock;
    updateMany: jest.Mock;
  };
  mealPreference: {
    count: jest.Mock;
    findMany: jest.Mock;
  };
  recommendationRound: {
    findFirst: jest.Mock;
  };
  vote: {
    findMany: jest.Mock;
  };
  restaurantRecommendation: {
    deleteMany: jest.Mock;
    create: jest.Mock;
  };
};

const ROOM_ID = 'room-restaurant-1';
const HOST_ID = 'host-1';
const MEMBER_ID = 'member-2';

function createRestaurantContext(options?: {
  coordinates?: { latitude: number | null; longitude: number | null };
  finalSelection?: boolean;
  aiResponse?: Record<string, unknown>;
  aiError?: Error;
}) {
  const state: RestaurantTestState = {
    status: FoodFightStatus.FINALIZED,
    restaurantRecords: [],
    deleteCalls: 0,
    createCalls: 0,
  };
  const coordinates = options?.coordinates ?? {
    latitude: 13.7563,
    longitude: 100.5018,
  };
  const members = [
    {
      userId: HOST_ID,
      user: {
        displayName: 'Host',
        foodProfile: {
          allergies: ['SHELLFISH'],
          otherAllergies: null,
          restrictions: [],
          otherRestrictions: null,
          additionalNotes: 'ไม่กินของดิบ',
        },
      },
    },
    {
      userId: MEMBER_ID,
      user: {
        displayName: 'Member',
        foodProfile: {
          allergies: [],
          otherAllergies: null,
          restrictions: ['NO_PORK'],
          otherRestrictions: null,
          additionalNotes: null,
        },
      },
    },
  ];
  const finalSelection =
    options?.finalSelection === false
      ? null
      : {
          recommendationItemId: 'recommendation-item-1',
          recommendationItem: {
            menuName: 'Pad Thai',
            metadata: {
              conceptId: 'PAD_THAI',
              name: 'Pad Thai',
              nameTh: 'ผัดไทย',
              cuisine: 'THAI',
            },
          },
        };
  const preferences = members.map((member) => ({
    userId: member.userId,
    cookingTypes: ['FRY'],
    otherCookingType: null,
    cuisines: ['THAI'],
    otherCuisine: null,
    ingredients: ['CHICKEN'],
    otherIngredient: null,
    budgetRange: 'BETWEEN_200_400',
    restaurantStyles: ['CASUAL'],
    otherRestaurantStyle: null,
    otherNote: 'เผ็ดน้อย',
  }));

  const restaurantView = () => ({
    id: 'restaurant-record-1',
    externalPlaceId: 'longdo-1',
    name: 'ร้านผัดไทย',
    address: 'Bangkok',
    latitude: 13.757,
    longitude: 100.502,
    distanceMeters: 180,
    phone: '02-000-0000',
    openingHours: {
      provider: 'fastapi',
      openingHours: '10:00-20:00',
      openNow: true,
      reasons: ['ตรงกับเมนู'],
      memberMenuOptions: [{ memberId: HOST_ID, options: ['Pad Thai'] }],
    },
    imageUrl: null,
    finalMenuMatch: true,
    varietyScore: null,
    groupCompatibilityScore: 1,
    rankingScore: 12.9,
    reason: 'ตรงกับเมนู',
    status: RestaurantRecommendationStatus.ACTIVE,
    displayOrder: 1,
  });

  const sessionView = () => ({
    id: 'session-restaurant-1',
    status: state.status,
    room: {
      hostId: HOST_ID,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      searchRadiusKm: 5,
    },
    members,
    finalSelection,
    restaurantRecommendations: state.restaurantRecords.length
      ? [restaurantView()]
      : [],
  });

  const prisma = {} as FakePrisma;
  prisma.foodFightSession = {
    findUnique: jest.fn(() => sessionView()),
    update: jest.fn((args: { data: { status?: FoodFightStatus } }) => {
      if (args.data.status) {
        state.status = args.data.status;
      }
      return sessionView();
    }),
    updateMany: jest.fn(
      (args: {
        where: { status?: FoodFightStatus };
        data: { status: FoodFightStatus };
      }) => {
        if (args.where.status && args.where.status !== state.status) {
          return { count: 0 };
        }
        state.status = args.data.status;
        return { count: 1 };
      },
    ),
  };
  prisma.mealPreference = {
    count: jest.fn(() => preferences.length),
    findMany: jest.fn(() => preferences),
  };
  prisma.recommendationRound = {
    findFirst: jest.fn(() => null),
  };
  prisma.vote = {
    findMany: jest.fn(() => []),
  };
  prisma.restaurantRecommendation = {
    deleteMany: jest.fn(() => {
      state.deleteCalls += 1;
      state.restaurantRecords = [];
      return { count: 1 };
    }),
    create: jest.fn((args: { data: Record<string, unknown> }) => {
      state.createCalls += 1;
      const data = args.data;
      const record: RestaurantRecord = {
        id: `restaurant-record-${state.createCalls}`,
        externalPlaceId: (data.externalPlaceId as string | null) ?? null,
        name: String(data.name),
        address: (data.address as string | null) ?? null,
        latitude: (data.latitude as number | null) ?? null,
        longitude: (data.longitude as number | null) ?? null,
        distanceMeters: (data.distanceMeters as number | null) ?? null,
        phone: (data.phone as string | null) ?? null,
        openingHours: data.openingHours as Record<string, unknown>,
        imageUrl: (data.imageUrl as string | null) ?? null,
        finalMenuMatch: Boolean(data.finalMenuMatch),
        varietyScore: (data.varietyScore as number | null) ?? null,
        groupCompatibilityScore:
          (data.groupCompatibilityScore as number | null) ?? null,
        rankingScore: (data.rankingScore as number | null) ?? null,
        reason: (data.reason as string | null) ?? null,
        status: data.status as RestaurantRecommendationStatus,
        displayOrder: (data.displayOrder as number | null) ?? null,
      };
      state.restaurantRecords.push(record);
      return record;
    }),
  };
  prisma.$transaction = jest.fn(
    (callback: (transaction: FakePrisma) => Promise<unknown>) =>
      callback(prisma),
  );

  const ai = {
    restaurants: jest.fn(),
  };
  if (options?.aiError) {
    ai.restaurants.mockRejectedValue(options.aiError);
  } else {
    ai.restaurants.mockResolvedValue(
      options?.aiResponse ?? {
        success: true,
        conceptId: 'PAD_THAI',
        restaurants: [
          {
            restaurantId: 'longdo-1',
            name: 'ร้านผัดไทย',
            rank: 1,
            score: 12.9,
            matchType: 'VERIFIED_MENU',
            groupCoverage: 1,
            budget: 'MID',
            styles: ['CASUAL'],
            latitude: 13.757,
            longitude: 100.502,
            address: 'Bangkok',
            phone: '02-000-0000',
            openingHours: '10:00-20:00',
            openNow: true,
            distanceKm: 0.18,
            memberMenuOptions: [{ memberId: HOST_ID, options: ['Pad Thai'] }],
            reasons: ['ตรงกับเมนู'],
          },
        ],
      },
    );
  }

  const service = new FoodFightService(
    prisma as unknown as PrismaService,
    ai as unknown as RecommendationAiService,
  );
  return { service, prisma, ai, state };
}

describe('FoodFightService restaurant recommendations', () => {
  it('builds the FastAPI payload, persists ranked results, and exposes ready state', async () => {
    const context = createRestaurantContext();

    const result = await context.service.startRestaurantRecommendations(
      ROOM_ID,
      HOST_ID,
    );

    expect(context.ai.restaurants).toHaveBeenCalledTimes(1);
    const calls = context.ai.restaurants.mock.calls as unknown[][];
    const payload = calls[0]?.[0] as
      | {
          normalizedMembers: Array<Record<string, unknown>>;
          [key: string]: unknown;
        }
      | undefined;
    expect(payload).toMatchObject({
      finalConcept: {
        conceptId: 'PAD_THAI',
        name: 'Pad Thai',
        nameTh: 'ผัดไทย',
        cuisine: 'THAI',
      },
      groupLocation: { latitude: 13.7563, longitude: 100.5018 },
      radiusKm: 5,
      topK: 5,
    });
    expect(payload?.normalizedMembers[0]).toMatchObject({
      allergens: ['SHELLFISH'],
      dietary_restrictions: [],
      preferred_cooking_methods: ['FRIED'],
      preferred_cuisines: ['THAI'],
      preferred_proteins: ['CHICKEN'],
      budget: 'MID',
      restaurant_styles: ['CASUAL'],
    });
    expect(result).toMatchObject({
      state: 'RESTAURANTS_READY',
      restaurantState: 'RESTAURANTS_READY',
      finalSelection: {
        conceptId: 'PAD_THAI',
        nameTh: 'ผัดไทย',
      },
    });
    expect(result.restaurants).toMatchObject([
      {
        restaurantId: 'longdo-1',
        rank: 1,
        score: 12.9,
        distanceKm: 0.18,
        groupCoverage: 1,
        openNow: true,
      },
    ]);
    expect(context.state.status).toBe(FoodFightStatus.RESTAURANT_SELECTION);
  });

  it('is idempotent after results are ready and does not call FastAPI again', async () => {
    const context = createRestaurantContext();

    await context.service.startRestaurantRecommendations(ROOM_ID, HOST_ID);
    await context.service.startRestaurantRecommendations(ROOM_ID, HOST_ID);

    expect(context.ai.restaurants).toHaveBeenCalledTimes(1);
    expect(context.state.deleteCalls).toBe(1);
    expect(context.state.createCalls).toBe(1);
    expect(context.state.restaurantRecords).toHaveLength(1);
  });

  it('requires a host, final selection, and room coordinates', async () => {
    await expect(
      createRestaurantContext().service.startRestaurantRecommendations(
        ROOM_ID,
        MEMBER_ID,
      ),
    ).rejects.toThrow(ForbiddenException);

    await expect(
      createRestaurantContext({
        finalSelection: false,
      }).service.startRestaurantRecommendations(ROOM_ID, HOST_ID),
    ).rejects.toThrow(ConflictException);

    await expect(
      createRestaurantContext({
        coordinates: { latitude: null, longitude: 100.5 },
      }).service.startRestaurantRecommendations(ROOM_ID, HOST_ID),
    ).rejects.toThrow(BadRequestException);
  });

  it('restores FINALIZED and leaves existing records untouched when FastAPI fails', async () => {
    const context = createRestaurantContext({
      aiError: new Error('FastAPI unavailable'),
    });

    await expect(
      context.service.startRestaurantRecommendations(ROOM_ID, HOST_ID),
    ).rejects.toThrow('FastAPI unavailable');

    expect(context.state.status).toBe(FoodFightStatus.FINALIZED);
    expect(context.state.deleteCalls).toBe(0);
    expect(context.state.createCalls).toBe(0);
  });
});
