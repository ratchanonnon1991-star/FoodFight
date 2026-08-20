/**
 * Authenticated Home Domain & Display Types
 */

export interface AuthenticatedUserDisplay {
  name: string;
  email?: string;
  avatarUrl?: string;
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
  title: string;
  subtitle: string;
  date: string;
  memberCount: number;
  iconType: RecentFoodFightIconType;
  href?: string;
}

export interface HomeTipData {
  id: string;
  title: string;
  text: string;
}
