/**
 * Authenticated Home Domain & Display Types
 */

import type { UserRole } from "@/features/auth/types/auth-types";

export interface AuthenticatedUserDisplay {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: UserRole;
}

export interface CurrentFoodFightMember {
  id: string;
  userId?: string;
  name: string;
  avatarUrl?: string | null;
  joinedAt?: string;
}

export type FoodFightJourneyStepNumber = 1 | 2 | 3 | 4 | 5;

export type FoodFightJourneyStepId =
  | "LOBBY"
  | "PREFERENCES"
  | "MENU"
  | "RESTAURANT"
  | "BILL";

export interface FoodFightJourneyInfo {
  currentStep: FoodFightJourneyStepNumber;
  stepId: FoodFightJourneyStepId;
  stageName: string;
  stageSubLabel: string;
}

export interface CurrentFoodFightSession {
  id: string;
  title: string;
  status: string;
  memberCount: number;
  statusDescription: string;
  members: CurrentFoodFightMember[];
  continueHref?: string;
  journey?: FoodFightJourneyInfo;
}

export type RecentFoodFightIconType = "soup" | "pizza" | "drink";

export interface RecentFoodFightItemData {
  id: string;
  roomId: string;
  title: string;
  subtitle: string;
  date: string;
  memberCount: number;
  iconType: RecentFoodFightIconType;
}

export interface HomeTipData {
  id: string;
  title: string;
  text: string;
}
