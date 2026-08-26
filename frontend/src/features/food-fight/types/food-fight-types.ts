export type MealPreferenceBudget = "LOW" | "MID" | "HIGH" | "ANY";

export interface MealPreferenceDraft {
  cookingMethods: string[];
  cookingMethodsOther: string;
  cuisines: string[];
  cuisinesOther: string;
  proteins: string[];
  proteinsOther: string;
  budget: MealPreferenceBudget | null;
  budgetOther: string;
  restaurantStyles: string[];
  restaurantStylesOther: string;
  additionalNuances: string;
}

export type FoodFightFlowState =
  | "WAITING_FOR_PREFERENCES"
  | "READY_TO_RECOMMEND"
  | "RECOMMENDING"
  | "VOTING"
  | "WAITING_FOR_VOTES"
  | "FINAL_VOTE_REQUIRED"
  | "REROLL_REQUIRED"
  | "RECOMMENDING_RESTAURANTS"
  | "RESTAURANTS_READY"
  | "FINALIZED";

export type RestaurantFlowState =
  | "FINALIZED_MENU"
  | "RESTAURANTS_EMPTY"
  | "RECOMMENDING_RESTAURANTS"
  | "RESTAURANTS_READY";

export interface RecommendationMetadata {
  conceptId?: string;
  name?: string;
  nameTh?: string;
  cuisine?: string | null;
  cuisineTh?: string | null;
  cookingMethods?: string[];
  cookingMethodsTh?: string[];
  proteins?: string[];
  proteinsTh?: string[];
  tastes?: string[];
  tastesTh?: string[];
  satisfiedMembers?: number | null;
  memberCount?: number | null;
  satisfactionRatio?: number | null;
  safeCoverage?: number | null;
  compatibilityPercentage?: number | null;
  reasons?: string[];
}

export interface RecommendationItem {
  id: string;
  menuName: string;
  description: string | null;
  reason: string | null;
  imageUrl: string | null;
  recommendationScore: number | null;
  metadata: RecommendationMetadata | null;
  displayOrder: number;
}

export type VoteAction = "OK" | "PASS";
export interface VoteSubmission {
  recommendationItemId: string;
  vote: VoteAction;
}

export type FinalVoteType = "TIE_BREAK" | "FOUR_MENU_FINAL";

export interface FinalVoteProgress {
  submittedMemberCount: number;
  totalMemberCount: number;
  hasSubmitted: boolean;
  counts: Record<string, number>;
  hostTieBreakRequired: boolean;
}

export interface FinalSelection {
  recommendationItemId: string;
  conceptId: string | null;
  name: string;
  nameTh: string | null;
  cuisine: string | null;
}

export interface RestaurantRecommendation {
  id: string;
  restaurantId: string | null;
  rank: number | null;
  name: string;
  score: number | null;
  distanceKm: number | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  groupCoverage: number | null;
  reasons: string[];
  memberMenuOptions: unknown[];
  openNow: boolean | null;
  phone: string | null;
  openingHours: unknown;
  finalMenuMatch: boolean;
  imageUrl: string | null;
}

export interface FoodFightState {
  state: FoodFightFlowState;
  sessionId: string;
  submittedMemberCount: number;
  totalMemberCount: number;
  preferenceSubmittedMemberCount: number;
  voteProgress: { submittedMemberCount: number; totalMemberCount: number };
  finalVoteProgress: FinalVoteProgress;
  currentUser: {
    isHost: boolean;
    hasSubmittedVotes: boolean;
    votes: VoteSubmission[];
    hasSubmittedFinalVote: boolean;
  };
  currentRound: {
    id: string;
    roundNumber: number;
    status: string;
    items: RecommendationItem[];
  } | null;
  finalVoteType: FinalVoteType | null;
  finalVoteCandidates: RecommendationItem[];
  finalSelection: FinalSelection | null;
  restaurantState: RestaurantFlowState | null;
  restaurants: RestaurantRecommendation[];
}
