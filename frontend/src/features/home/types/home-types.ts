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
  name: string;
  avatarUrl?: string | null;
}

export interface CurrentFoodFightSession {
  id: string;
  title: string;
  status: string;
  memberCount: number;
  statusDescription: string;
  members: CurrentFoodFightMember[];
  continueHref?: string;
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
