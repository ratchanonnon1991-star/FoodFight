export type HistoryStatus = "COMPLETED" | "CANCELLED";
export type HistoryMemberRole = "HOST" | "MEMBER";

export interface HistoryItem {
  id: string;
  status: HistoryStatus;
  role: HistoryMemberRole;
  memberCount: number;
  startedAt: string;
  completedAt: string;
  room: {
    id: string;
    name: string;
    locationName: string;
    scheduledAt: string;
  };
  finalMenu: {
    name: string;
    imageUrl: string | null;
  } | null;
  restaurant: {
    name: string;
    address: string | null;
    imageUrl: string | null;
  } | null;
}
