import type {
  AuthenticatedUserDisplay,
  CurrentFoodFightSession,
  RecentFoodFightItemData,
  HomeTipData,
} from "../types/home-types";

export const DEMO_USER: AuthenticatedUserDisplay = {
  name: "Pure",
};

export const DEMO_CURRENT_FOODFIGHT: CurrentFoodFightSession = {
  id: "ff-silom-01",
  title: "มื้อเย็นสีลม",
  status: "Lobby",
  memberCount: 4,
  statusDescription: "Waiting for preferences",
  members: ["Pure", "Alex", "Noon", "Korn"],
};

export const DEMO_RECENT_FOODFIGHTS: readonly RecentFoodFightItemData[] = [
  {
    id: "recent-1",
    title: "Korean Night",
    subtitle: "Korean BBQ • Seoul Garden",
    date: "12 Aug 2026",
    memberCount: 4,
    iconType: "soup",
  },
  {
    id: "recent-2",
    title: "Pizza Party",
    subtitle: "Pizza • Pizza Place",
    date: "8 Aug 2026",
    memberCount: 5,
    iconType: "pizza",
  },
  {
    id: "recent-3",
    title: "Thai Food Hunt",
    subtitle: "Thai Food • Local Restaurant",
    date: "28 Apr 2026",
    memberCount: 5,
    iconType: "drink",
  },
] as const;

export const DEMO_TIP: HomeTipData = {
  id: "tip-1",
  title: "Tip",
  text: "The more accurate your food profile, the better our recommendations!",
};
