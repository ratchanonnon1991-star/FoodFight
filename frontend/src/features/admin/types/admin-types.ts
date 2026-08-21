export interface AdminDashboardMetrics {
  totalUsers: number;
  newUsersLast7Days: number;
  totalRooms: number;
  activeRooms: number;
  completedRooms: number;
  cancelledRooms: number;
}

export type AdminAnalyticsRange = "7d" | "30d" | "all";

export interface AdminAnalyticsPeriod {
  range: AdminAnalyticsRange;
  start: string;
  end: string;
  previousStart: string | null;
  previousEnd: string | null;
  timezone: "UTC";
}

export interface AdminAnalyticsUsers {
  totalUsers: number;
  newUsers: number;
  previousPeriodNewUsers: number | null;
  newUserGrowthPercent: number | null;
}

export interface AdminAnalyticsRooms {
  roomsCreated: number;
  previousPeriodRoomsCreated: number | null;
  activeRooms: number;
  cancelledRooms: number;
  cancellationRate: number;
}

export interface AdminAnalyticsBills {
  billsCreated: number;
  previousPeriodBillsCreated: number | null;
  billVolume: number;
  averageBillValue: number;
  currencyLabel: "THB";
}

export interface AdminAnalyticsPayments {
  paymentCount: number;
  paidPaymentCount: number;
  unpaidPaymentCount: number;
  paymentCompletionRate: number;
}

export type AdminAnalyticsInsightSeverity = "INFO" | "POSITIVE" | "WARNING";

export interface AdminAnalyticsInsight {
  id: string;
  type:
    | "NEW_USER_GROWTH"
    | "ROOM_CANCELLATION"
    | "PAYMENT_COMPLETION"
    | "BILL_ACTIVITY";
  severity: AdminAnalyticsInsightSeverity;
  title: string;
  summary: string;
  evidence: {
    metric: string;
    currentValue: number;
    previousValue?: number | null;
    numerator?: number;
    denominator?: number;
  };
  suggestedAction?: string;
}

export interface AdminAnalyticsResponse {
  period: AdminAnalyticsPeriod;
  users: AdminAnalyticsUsers;
  rooms: AdminAnalyticsRooms;
  bills: AdminAnalyticsBills;
  payments: AdminAnalyticsPayments;
  insights: AdminAnalyticsInsight[];
}

export type AdminUserRole = "USER" | "ADMIN";

export interface AdminUserListItem {
  id: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  role: AdminUserRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AdminUsersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersResponse {
  items: AdminUserListItem[];
  pagination: AdminUsersPagination;
}

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: AdminUserRole;
}

export interface AdminUserActivity {
  hostedRoomsCount: number;
  joinedRoomsCount: number;
}

export interface AdminUserDetail {
  id: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  role: AdminUserRole;
  avatarUrl: string | null;
  createdAt: string;
  providers: string[];
  activity: AdminUserActivity;
}
