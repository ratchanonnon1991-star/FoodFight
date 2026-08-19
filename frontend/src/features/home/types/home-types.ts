/**
 * Authenticated Home Domain & Display Types
 */

export interface AuthenticatedUserDisplay {
  name: string;
  avatarUrl?: string;
}

export interface CurrentFoodFightSession {
  id: string;
  title: string;
  status: string;
  memberCount: number;
  statusDescription: string;
  members: string[];
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
