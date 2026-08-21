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
  paymentCompletionRate: number | null;
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

export interface AdminAnalyticsUserTrendPoint {
  period: string;
  newUsers: number;
}

export interface AdminAnalyticsRoomTrendPoint {
  period: string;
  roomsCreated: number;
}

export interface AdminAnalyticsBillTrendPoint {
  period: string;
  billsCreated: number;
  reportedBillValue: number;
}

export interface AdminAnalyticsPaymentTrendPoint {
  period: string;
  paymentCount: number;
  paidPaymentCount: number;
  completionRate: number | null;
}

export interface AdminAnalyticsTrends {
  users: AdminAnalyticsUserTrendPoint[];
  rooms: AdminAnalyticsRoomTrendPoint[];
  bills: AdminAnalyticsBillTrendPoint[];
  payments: AdminAnalyticsPaymentTrendPoint[];
}

export interface AdminAnalyticsResponse {
  period: AdminAnalyticsPeriod;
  users: AdminAnalyticsUsers;
  rooms: AdminAnalyticsRooms;
  bills: AdminAnalyticsBills;
  payments: AdminAnalyticsPayments;
  trends: AdminAnalyticsTrends;
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

export type AdminRoomStatus =
  | "LOBBY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminRoomHost {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface AdminRoomListItem {
  id: string;
  code: string;
  name: string;
  status: AdminRoomStatus;
  createdAt: string;
  host: AdminRoomHost;
  memberCount: number;
}

export interface AdminRoomsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminRoomsResponse {
  items: AdminRoomListItem[];
  pagination: AdminRoomsPagination;
}

export interface AdminRoomsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminRoomStatus;
}

export interface AdminRoomMember {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  joinedAt: string;
  isReady: boolean;
  isHost: boolean;
}

export interface AdminRoomDetail {
  id: string;
  code: string;
  name: string;
  status: AdminRoomStatus;
  createdAt: string;
  host: AdminRoomHost;
  members: AdminRoomMember[];
}

export type AdminBillStatus =
  | "DRAFT"
  | "SPLITTING"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

export type AdminPaymentStatus = "UNPAID" | "PAID";

export interface AdminBillCreator {
  id: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface AdminBillPaymentSummary {
  paymentCount: number;
  paidPaymentCount: number;
  unpaidPaymentCount: number;
  paymentCompletionRate: number | null;
}

export interface AdminBillListItem extends AdminBillPaymentSummary {
  id: string;
  status: AdminBillStatus;
  createdAt: string;
  closedAt: string | null;
  reportedTotalAmount: number | null;
  creator: AdminBillCreator;
}

export interface AdminBillsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminBillsResponse {
  items: AdminBillListItem[];
  pagination: AdminBillsPagination;
}

export interface AdminBillsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdminBillStatus;
}

export interface AdminBillPayment {
  id: string;
  payer: AdminBillCreator;
  amount: number;
  status: AdminPaymentStatus;
  paidAt: string | null;
}

export interface AdminBillDetail extends AdminBillListItem {
  payments: AdminBillPayment[];
}
