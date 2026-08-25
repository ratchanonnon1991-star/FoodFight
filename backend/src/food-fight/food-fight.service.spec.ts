import { ConflictException, ForbiddenException } from '@nestjs/common';
import {
  FinalSelectionMethod,
  FinalVoteType,
  FoodFightStatus,
  RecommendationRoundStatus,
  VoteAction,
} from '../database/generated/prisma/enums';
import type { PrismaService } from '../database/prisma.service';
import type { RecommendationAiService } from '../recommendation-ai/recommendation-ai.service';
import type { RecommendationRequestDto } from '../recommendation-ai/dto/ai-request.dto';
import { SubmitFinalVoteDto } from './dto/submit-final-vote.dto';
import { SubmitVotesDto } from './dto/submit-votes.dto';
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
  SessionMemberRole: {
    HOST: 'HOST',
    MEMBER: 'MEMBER',
  },
  VoteAction: {
    OK: 'OK',
    PASS: 'PASS',
  },
}));

type FakeArgs = {
  where?: Record<string, unknown>;
  data?: Record<string, unknown>;
  create?: Record<string, unknown>;
  update?: Record<string, unknown>;
};

type TestItem = {
  id: string;
  recommendationRoundId: string;
  menuName: string;
  description: string | null;
  reason: string | null;
  imageUrl: string | null;
  recommendationScore: number | null;
  metadata: { conceptId: string; nameTh: string };
  displayOrder: number;
};

type TestRound = {
  id: string;
  sessionId: string;
  roundNumber: number;
  status: RecommendationRoundStatus;
  items: TestItem[];
};

type TestMember = {
  userId: string;
  user: {
    displayName: string;
    foodProfile: {
      allergies: string[];
      otherAllergies: string | null;
      restrictions: string[];
      otherRestrictions: string | null;
      additionalNotes: string | null;
    };
  };
};

type TestState = {
  session: {
    id: string;
    roomId: string;
    status: FoodFightStatus;
    hostId: string;
    members: TestMember[];
  };
  preferences: Array<Record<string, unknown>>;
  rounds: TestRound[];
  votes: Map<
    string,
    { recommendationItemId: string; userId: string; action: VoteAction }
  >;
  finalVotes: Map<
    string,
    {
      sessionId: string;
      userId: string;
      recommendationItemId: string;
      voteType: FinalVoteType;
    }
  >;
  finalSelection: {
    sessionId: string;
    recommendationItemId: string;
    selectedById: string | null;
    method: FinalSelectionMethod;
  } | null;
  finalSelectionUpsertCalls: number;
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
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
  };
  vote: {
    findMany: jest.Mock;
    upsert: jest.Mock;
  };
  finalVote: {
    findMany: jest.Mock;
    upsert: jest.Mock;
  };
  finalSelection: {
    upsert: jest.Mock;
  };
};

type TestContext = {
  service: FoodFightService;
  prisma: FakePrisma;
  ai: { recommend: jest.Mock };
  state: TestState;
};

const ROOM_ID = 'room-1';
const HOST_ID = 'member-1';
const DEFAULT_MEMBER_IDS = ['member-1', 'member-2', 'member-3'];

function makeItem(
  roundId: string,
  displayOrder: number,
  conceptId: string,
): TestItem {
  return {
    id: `${roundId}-item-${displayOrder}`,
    recommendationRoundId: roundId,
    menuName: conceptId,
    description: null,
    reason: null,
    imageUrl: null,
    recommendationScore: null,
    metadata: { conceptId, nameTh: conceptId },
    displayOrder,
  };
}

function makeRound(
  sessionId: string,
  roundNumber: number,
  concepts: string[],
  status: RecommendationRoundStatus = RecommendationRoundStatus.VOTING,
): TestRound {
  const id = `round-${roundNumber}`;
  return {
    id,
    sessionId,
    roundNumber,
    status,
    items: concepts.map((concept, index) => makeItem(id, index + 1, concept)),
  };
}

function makeAiResponse(concepts: string[]) {
  return {
    success: true,
    recommendations: concepts.map((conceptId) => ({
      conceptId,
      name: conceptId,
      nameTh: conceptId,
    })),
  };
}

function createContext(
  memberIds = DEFAULT_MEMBER_IDS,
  rounds = [makeRound('session-1', 1, ['A', 'B'])],
): TestContext {
  const members: TestMember[] = memberIds.map((userId) => ({
    userId,
    user: {
      displayName: userId,
      foodProfile: {
        allergies: [],
        otherAllergies: null,
        restrictions: [],
        otherRestrictions: null,
        additionalNotes: null,
      },
    },
  }));
  const state: TestState = {
    session: {
      id: 'session-1',
      roomId: ROOM_ID,
      status: FoodFightStatus.VOTING,
      hostId: HOST_ID,
      members,
    },
    preferences: memberIds.map((userId) => ({
      userId,
      cookingTypes: ['GRILL'],
      otherCookingType: null,
      cuisines: ['THAI'],
      otherCuisine: null,
      ingredients: ['CHICKEN'],
      otherIngredient: null,
      budgetRange: 'BETWEEN_200_400',
      restaurantStyles: ['CASUAL'],
      otherRestaurantStyle: null,
      otherNote: null,
    })),
    rounds,
    votes: new Map(),
    finalVotes: new Map(),
    finalSelection: null,
    finalSelectionUpsertCalls: 0,
  };

  const cloneRound = (round: TestRound) => ({
    id: round.id,
    roundNumber: round.roundNumber,
    status: round.status,
    items: round.items.map((item) => ({ ...item })),
  });

  const sessionView = () => ({
    id: state.session.id,
    status: state.session.status,
    room: { hostId: state.session.hostId },
    members: state.session.members,
  });

  const prisma = {} as FakePrisma;
  prisma.foodFightSession = {
    findUnique: jest.fn((args: FakeArgs) => {
      const where = args.where ?? {};
      if (where.roomId && where.roomId !== state.session.roomId) {
        return null;
      }
      if (where.id && where.id !== state.session.id) {
        return null;
      }
      return sessionView();
    }),
    update: jest.fn((args: FakeArgs) => {
      const data = args.data ?? {};
      if (typeof data.status === 'string') {
        state.session.status = data.status as FoodFightStatus;
      }
      return sessionView();
    }),
    updateMany: jest.fn((args: FakeArgs) => {
      const where = args.where ?? {};
      const matchesId = where.id === state.session.id;
      const matchesStatus =
        !where.status || where.status === state.session.status;
      if (matchesId && matchesStatus) {
        const data = args.data ?? {};
        if (typeof data.status === 'string') {
          state.session.status = data.status as FoodFightStatus;
        }
        return { count: 1 };
      }
      return { count: 0 };
    }),
  };

  prisma.mealPreference = {
    count: jest.fn(() => state.preferences.length),
    findMany: jest.fn(() => state.preferences),
  };

  prisma.recommendationRound = {
    findFirst: jest.fn(() => {
      const latest = [...state.rounds].sort(
        (left, right) => right.roundNumber - left.roundNumber,
      )[0];
      return latest ? cloneRound(latest) : null;
    }),
    findMany: jest.fn(() =>
      [...state.rounds]
        .sort((left, right) => left.roundNumber - right.roundNumber)
        .map(cloneRound),
    ),
    create: jest.fn((args: FakeArgs) => {
      const data = args.data ?? {};
      const roundNumber = Number(data.roundNumber);
      const roundId = `round-${roundNumber}`;
      const nestedItems = data.items as {
        create: Array<Record<string, unknown>>;
      };
      const createdRound: TestRound = {
        id: roundId,
        sessionId: String(data.sessionId),
        roundNumber,
        status: data.status as RecommendationRoundStatus,
        items: nestedItems.create.map((item, index) => ({
          id: `${roundId}-item-${index + 1}`,
          recommendationRoundId: roundId,
          menuName: String(item.menuName),
          description: (item.description as string | null) ?? null,
          reason: (item.reason as string | null) ?? null,
          imageUrl: (item.imageUrl as string | null) ?? null,
          recommendationScore:
            (item.recommendationScore as number | null) ?? null,
          metadata: item.metadata as { conceptId: string; nameTh: string },
          displayOrder: Number(item.displayOrder),
        })),
      };
      state.rounds.push(createdRound);
      return cloneRound(createdRound);
    }),
    update: jest.fn((args: FakeArgs) => {
      const where = args.where ?? {};
      const round = state.rounds.find((item) => item.id === where.id);
      if (round) {
        const data = args.data ?? {};
        if (typeof data.status === 'string') {
          round.status = data.status as RecommendationRoundStatus;
        }
      }
      return round ? cloneRound(round) : null;
    }),
  };

  prisma.vote = {
    findMany: jest.fn((args: FakeArgs) => {
      const where = args.where ?? {};
      const itemFilter = where.recommendationItemId;
      const itemIds =
        typeof itemFilter === 'object' && itemFilter !== null
          ? ((itemFilter as { in?: string[] }).in ?? [])
          : typeof itemFilter === 'string'
            ? [itemFilter]
            : null;
      return [...state.votes.values()].filter((vote) =>
        itemIds ? itemIds.includes(vote.recommendationItemId) : true,
      );
    }),
    upsert: jest.fn((args: FakeArgs) => {
      const where = args.where?.recommendationItemId_userId as {
        recommendationItemId: string;
        userId: string;
      };
      const key = `${where.recommendationItemId}:${where.userId}`;
      const existing = state.votes.get(key);
      const data = existing ? (args.update ?? {}) : (args.create ?? {});
      const vote = {
        recommendationItemId: where.recommendationItemId,
        userId: where.userId,
        action: data.action as VoteAction,
      };
      state.votes.set(key, vote);
      return vote;
    }),
  };

  prisma.finalVote = {
    findMany: jest.fn((args: FakeArgs) => {
      const where = args.where ?? {};
      return [...state.finalVotes.values()].filter(
        (vote) =>
          vote.sessionId === where.sessionId &&
          vote.voteType === where.voteType,
      );
    }),
    upsert: jest.fn((args: FakeArgs) => {
      const where = args.where?.sessionId_userId_voteType as {
        sessionId: string;
        userId: string;
        voteType: FinalVoteType;
      };
      const data = args.update ?? args.create ?? {};
      const key = `${where.sessionId}:${where.userId}:${where.voteType}`;
      const vote = {
        sessionId: where.sessionId,
        userId: where.userId,
        recommendationItemId: String(data.recommendationItemId),
        voteType: where.voteType,
      };
      state.finalVotes.set(key, vote);
      return vote;
    }),
  };

  prisma.finalSelection = {
    upsert: jest.fn((args: FakeArgs) => {
      state.finalSelectionUpsertCalls += 1;
      const data = args.create ?? args.update ?? {};
      if (!state.finalSelection) {
        state.finalSelection = {
          sessionId: String(data.sessionId),
          recommendationItemId: String(data.recommendationItemId),
          selectedById: (data.selectedById as string | null) ?? null,
          method: data.method as FinalSelectionMethod,
        };
      }
      return state.finalSelection;
    }),
  };

  prisma.$transaction = jest.fn(
    (callback: (transaction: FakePrisma) => Promise<unknown>) =>
      callback(prisma),
  );

  const ai = {
    recommend: jest.fn().mockResolvedValue(makeAiResponse(['C', 'D'])),
  };
  const service = new FoodFightService(
    prisma as unknown as PrismaService,
    ai as unknown as RecommendationAiService,
  );

  return { service, prisma, ai, state };
}

function voteDto(
  round: TestRound,
  first: VoteAction,
  second: VoteAction,
): SubmitVotesDto {
  return {
    votes: [
      { recommendationItemId: round.items[0].id, vote: first },
      { recommendationItemId: round.items[1].id, vote: second },
    ],
  };
}

function finalVoteDto(itemId: string): SubmitFinalVoteDto {
  return { recommendationItemId: itemId };
}

async function submitVotesForAll(
  context: TestContext,
  choices: Record<string, [VoteAction, VoteAction]>,
) {
  const round = context.state.rounds.at(-1);
  if (!round) {
    throw new Error('Test round is missing');
  }
  for (const [userId, [first, second]] of Object.entries(choices)) {
    await context.service.submitVotes(
      ROOM_ID,
      userId,
      voteDto(round, first, second),
    );
  }
}

async function enterInitialFinalVote(context: TestContext) {
  await submitVotesForAll(context, {
    'member-1': [VoteAction.OK, VoteAction.OK],
    'member-2': [VoteAction.OK, VoteAction.OK],
    'member-3': [VoteAction.OK, VoteAction.OK],
  });
}

describe('FoodFightService voting state machine', () => {
  it('Scenario 1: finalizes the only menu with strict majority', async () => {
    const context = createContext();
    const round = context.state.rounds[0];

    await submitVotesForAll(context, {
      'member-1': [VoteAction.OK, VoteAction.PASS],
      'member-2': [VoteAction.OK, VoteAction.PASS],
      'member-3': [VoteAction.PASS, VoteAction.OK],
    });

    expect(context.state.session.status).toBe(FoodFightStatus.FINALIZED);
    expect(context.state.finalSelection).toMatchObject({
      recommendationItemId: round.items[0].id,
      method: FinalSelectionMethod.OK_MAJORITY,
    });
    expect(context.state.finalSelectionUpsertCalls).toBe(1);
    expect(context.state.rounds[0].status).toBe(
      RecommendationRoundStatus.COMPLETED,
    );
  });

  it('Scenario 2: chooses the menu with more OK votes when both qualify', async () => {
    const context = createContext();
    const round = context.state.rounds[0];

    await submitVotesForAll(context, {
      'member-1': [VoteAction.OK, VoteAction.OK],
      'member-2': [VoteAction.OK, VoteAction.OK],
      'member-3': [VoteAction.OK, VoteAction.PASS],
    });

    expect(context.state.session.status).toBe(FoodFightStatus.FINALIZED);
    expect(context.state.finalSelection?.recommendationItemId).toBe(
      round.items[0].id,
    );
  });

  it('Scenario 3: enters final vote when both menus qualify equally', async () => {
    const context = createContext();
    await enterInitialFinalVote(context);

    const state = await context.service.getFlowState(ROOM_ID, HOST_ID);
    expect(context.state.session.status).toBe(FoodFightStatus.FINAL_VOTE);
    expect(state.state).toBe('FINAL_VOTE_REQUIRED');
    expect(state.finalVoteType).toBe(FinalVoteType.TIE_BREAK);
    expect(state.finalVoteCandidates).toHaveLength(2);
    expect(context.state.finalSelection).toBeNull();
  });

  it('Scenario 4: finalizes the winner of Final Vote', async () => {
    const context = createContext();
    await enterInitialFinalVote(context);
    const [itemA, itemB] = context.state.rounds[0].items;

    await context.service.submitFinalVote(
      ROOM_ID,
      'member-1',
      finalVoteDto(itemA.id),
    );
    await context.service.submitFinalVote(
      ROOM_ID,
      'member-1',
      finalVoteDto(itemA.id),
    );
    await context.service.submitFinalVote(
      ROOM_ID,
      'member-2',
      finalVoteDto(itemA.id),
    );
    await context.service.submitFinalVote(
      ROOM_ID,
      'member-3',
      finalVoteDto(itemB.id),
    );

    expect(context.state.session.status).toBe(FoodFightStatus.FINALIZED);
    expect(context.state.finalSelection).toMatchObject({
      recommendationItemId: itemA.id,
      method: FinalSelectionMethod.FINAL_VOTE,
    });
    expect(context.state.finalVotes.size).toBe(3);
    expect(context.state.finalSelectionUpsertCalls).toBe(1);
  });

  it('Scenario 5: waits for host tie-break when Final Vote ties', async () => {
    const memberIds = ['member-1', 'member-2', 'member-3', 'member-4'];
    const context = createContext(memberIds);
    const round = context.state.rounds[0];
    await submitVotesForAll(context, {
      'member-1': [VoteAction.OK, VoteAction.OK],
      'member-2': [VoteAction.OK, VoteAction.OK],
      'member-3': [VoteAction.OK, VoteAction.OK],
      'member-4': [VoteAction.OK, VoteAction.OK],
    });

    await context.service.submitFinalVote(
      ROOM_ID,
      'member-1',
      finalVoteDto(round.items[0].id),
    );
    await context.service.submitFinalVote(
      ROOM_ID,
      'member-2',
      finalVoteDto(round.items[0].id),
    );
    await context.service.submitFinalVote(
      ROOM_ID,
      'member-3',
      finalVoteDto(round.items[1].id),
    );
    const stateBeforeHostDecision = await context.service.submitFinalVote(
      ROOM_ID,
      'member-4',
      finalVoteDto(round.items[1].id),
    );

    expect(stateBeforeHostDecision.state).toBe('FINAL_VOTE_REQUIRED');
    expect(stateBeforeHostDecision.finalVoteProgress.hostTieBreakRequired).toBe(
      true,
    );
    await expect(
      context.service.submitHostTieBreak(
        ROOM_ID,
        HOST_ID,
        finalVoteDto(round.items[1].id),
      ),
    ).resolves.toMatchObject({ state: 'FINALIZED' });
    expect(context.state.finalSelection).toMatchObject({
      recommendationItemId: round.items[1].id,
      method: FinalSelectionMethod.HOST_TIE_BREAK,
    });
  });

  it('Scenario 6: requires one reroll and excludes both first-round concepts', async () => {
    const context = createContext();
    await submitVotesForAll(context, {
      'member-1': [VoteAction.OK, VoteAction.PASS],
      'member-2': [VoteAction.PASS, VoteAction.OK],
      'member-3': [VoteAction.PASS, VoteAction.PASS],
    });

    const waitingState = await context.service.getFlowState(ROOM_ID, HOST_ID);
    expect(waitingState.state).toBe('REROLL_REQUIRED');
    expect(context.state.session.status).toBe(FoodFightStatus.VOTING);

    const rerollResult = await context.service.rerollRecommendation(
      ROOM_ID,
      HOST_ID,
    );
    expect(context.ai.recommend).toHaveBeenCalledTimes(1);
    const calls = context.ai.recommend.mock.calls as unknown[][];
    const payload = calls[0]?.[0] as RecommendationRequestDto;
    expect(payload.rerollExclusions).toEqual(['A', 'B']);
    expect(rerollResult.roundNumber).toBe(2);
    expect(rerollResult.recommendations.map((item) => item.conceptId)).toEqual([
      'C',
      'D',
    ]);
    expect(
      context.state.rounds[0].items.map((item) => item.metadata.conceptId),
    ).toEqual(['A', 'B']);
    expect(
      context.state.rounds[1].items.map((item) => item.metadata.conceptId),
    ).toEqual(['C', 'D']);
    expect(context.state.session.status).toBe(FoodFightStatus.VOTING);
  });

  it('Scenario 7: round two falls back to FOUR_MENU_FINAL with all four items', async () => {
    const rounds = [
      makeRound(
        'session-1',
        1,
        ['A', 'B'],
        RecommendationRoundStatus.COMPLETED,
      ),
      makeRound('session-1', 2, ['C', 'D']),
    ];
    const context = createContext(DEFAULT_MEMBER_IDS, rounds);
    await submitVotesForAll(context, {
      'member-1': [VoteAction.PASS, VoteAction.PASS],
      'member-2': [VoteAction.PASS, VoteAction.PASS],
      'member-3': [VoteAction.PASS, VoteAction.PASS],
    });

    const state = await context.service.getFlowState(ROOM_ID, HOST_ID);
    expect(state.state).toBe('FINAL_VOTE_REQUIRED');
    expect(state.finalVoteType).toBe(FinalVoteType.FOUR_MENU_FINAL);
    expect(
      state.finalVoteCandidates.map(
        (item) => (item.metadata as { conceptId: string } | null)?.conceptId,
      ),
    ).toEqual(['A', 'B', 'C', 'D']);
    expect(context.state.rounds[1].status).toBe(
      RecommendationRoundStatus.COMPLETED,
    );
  });

  it('Scenario 8: one submitted vote remains WAITING_FOR_VOTES', async () => {
    const context = createContext();
    const item = context.state.rounds[0].items[0];
    context.state.votes.set(`${item.id}:member-1`, {
      recommendationItemId: item.id,
      userId: 'member-1',
      action: VoteAction.OK,
    });

    const state = await context.service.getFlowState(ROOM_ID, HOST_ID);
    expect(state.state).toBe('WAITING_FOR_VOTES');
    expect(state.voteProgress.submittedMemberCount).toBe(0);
    expect(state.currentUser.votes).toHaveLength(1);
    expect(context.state.session.status).toBe(FoodFightStatus.VOTING);
    expect(context.state.finalSelection).toBeNull();
  });

  it('Scenario 9: non-session members cannot vote', async () => {
    const context = createContext();
    await expect(
      context.service.submitVotes(
        ROOM_ID,
        'outsider',
        voteDto(context.state.rounds[0], VoteAction.OK, VoteAction.PASS),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('Scenario 10: non-hosts cannot reroll or resolve a host tie-break', async () => {
    const rerollContext = createContext();
    await submitVotesForAll(rerollContext, {
      'member-1': [VoteAction.OK, VoteAction.PASS],
      'member-2': [VoteAction.PASS, VoteAction.OK],
      'member-3': [VoteAction.PASS, VoteAction.PASS],
    });
    await expect(
      rerollContext.service.rerollRecommendation(ROOM_ID, 'member-2'),
    ).rejects.toThrow(ForbiddenException);

    const tieContext = createContext([
      'member-1',
      'member-2',
      'member-3',
      'member-4',
    ]);
    const round = tieContext.state.rounds[0];
    await submitVotesForAll(tieContext, {
      'member-1': [VoteAction.OK, VoteAction.OK],
      'member-2': [VoteAction.OK, VoteAction.OK],
      'member-3': [VoteAction.OK, VoteAction.OK],
      'member-4': [VoteAction.OK, VoteAction.OK],
    });
    await tieContext.service.submitFinalVote(
      ROOM_ID,
      'member-1',
      finalVoteDto(round.items[0].id),
    );
    await tieContext.service.submitFinalVote(
      ROOM_ID,
      'member-2',
      finalVoteDto(round.items[0].id),
    );
    await tieContext.service.submitFinalVote(
      ROOM_ID,
      'member-3',
      finalVoteDto(round.items[1].id),
    );
    await tieContext.service.submitFinalVote(
      ROOM_ID,
      'member-4',
      finalVoteDto(round.items[1].id),
    );
    await expect(
      tieContext.service.submitHostTieBreak(
        ROOM_ID,
        'member-2',
        finalVoteDto(round.items[0].id),
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('Scenario 11: vote updates are idempotent before evaluation completes', async () => {
    const context = createContext();
    const round = context.state.rounds[0];
    await context.service.submitVotes(
      ROOM_ID,
      'member-1',
      voteDto(round, VoteAction.OK, VoteAction.PASS),
    );
    await context.service.submitVotes(
      ROOM_ID,
      'member-1',
      voteDto(round, VoteAction.PASS, VoteAction.OK),
    );

    expect(context.state.votes.size).toBe(2);
    expect([...context.state.votes.values()]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recommendationItemId: round.items[0].id,
          userId: 'member-1',
          action: VoteAction.PASS,
        }),
        expect.objectContaining({
          recommendationItemId: round.items[1].id,
          userId: 'member-1',
          action: VoteAction.OK,
        }),
      ]),
    );
    expect(context.state.session.status).toBe(FoodFightStatus.VOTING);
  });

  it('Scenario 12: a third recommendation round is rejected', async () => {
    const rounds = [
      makeRound(
        'session-1',
        1,
        ['A', 'B'],
        RecommendationRoundStatus.COMPLETED,
      ),
      makeRound('session-1', 2, ['C', 'D']),
    ];
    const context = createContext(DEFAULT_MEMBER_IDS, rounds);

    await expect(
      context.service.rerollRecommendation(ROOM_ID, HOST_ID),
    ).rejects.toThrow(ConflictException);
    expect(context.state.rounds).toHaveLength(2);
    expect(context.ai.recommend).not.toHaveBeenCalled();
  });
});
