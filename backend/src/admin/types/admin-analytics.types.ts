import { AdminAnalyticsRange } from '../dto/admin-analytics-query.dto';

export type AdminAnalyticsInsightSeverity = 'INFO' | 'POSITIVE' | 'WARNING';

export type AdminAnalyticsInsightType =
  | 'NEW_USER_GROWTH'
  | 'ROOM_CANCELLATION'
  | 'PAYMENT_COMPLETION'
  | 'BILL_ACTIVITY';

export interface AdminAnalyticsPeriod {
  range: AdminAnalyticsRange;
  start: string;
  end: string;
  previousStart: string | null;
  previousEnd: string | null;
  timezone: 'UTC';
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
  currencyLabel: 'THB';
}

export interface AdminAnalyticsPayments {
  paymentCount: number;
  paidPaymentCount: number;
  unpaidPaymentCount: number;
  paymentCompletionRate: number | null;
}

export interface AdminAnalyticsInsightEvidence {
  metric: string;
  currentValue: number;
  previousValue?: number | null;
  numerator?: number;
  denominator?: number;
}

export interface AdminAnalyticsInsight {
  id: string;
  type: AdminAnalyticsInsightType;
  severity: AdminAnalyticsInsightSeverity;
  title: string;
  summary: string;
  evidence: AdminAnalyticsInsightEvidence;
  suggestedAction?: string;
}

export interface AdminAnalyticsMetrics {
  period: AdminAnalyticsPeriod;
  users: AdminAnalyticsUsers;
  rooms: AdminAnalyticsRooms;
  bills: AdminAnalyticsBills;
  payments: AdminAnalyticsPayments;
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

export interface AdminAnalyticsResponse extends AdminAnalyticsMetrics {
  trends: AdminAnalyticsTrends;
  insights: AdminAnalyticsInsight[];
}
