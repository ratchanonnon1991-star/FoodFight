import { Injectable } from '@nestjs/common';
import { Prisma } from '../../database/generated/prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { PaymentStatus } from '../../database/generated/prisma/enums';
import { AdminAnalyticsRange } from '../dto/admin-analytics-query.dto';
import {
  AdminAnalyticsBillTrendPoint,
  AdminAnalyticsPaymentTrendPoint,
  AdminAnalyticsRoomTrendPoint,
  AdminAnalyticsTrends,
  AdminAnalyticsUserTrendPoint,
} from '../types/admin-analytics.types';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const DAY_IN_SECONDS = 24 * 60 * 60;

type NumericValue = number | bigint | string | null | undefined;
type DateValue = Date | string;

interface AnalyticsTrendWindow {
  range: AdminAnalyticsRange;
  start: Date;
  end: Date;
}

interface DailyCountRow {
  bucketIndex: NumericValue;
  count: NumericValue;
}

interface DailyBillRow {
  bucketIndex: NumericValue;
  billsCreated: NumericValue;
  reportedBillValue: NumericValue;
}

interface DailyPaymentRow {
  bucketIndex: NumericValue;
  paymentCount: NumericValue;
  paidPaymentCount: NumericValue;
}

interface MonthlyCountRow {
  period: DateValue;
  count: NumericValue;
}

interface MonthlyBillRow {
  period: DateValue;
  billsCreated: NumericValue;
  reportedBillValue: NumericValue;
}

interface MonthlyPaymentRow {
  period: DateValue;
  paymentCount: NumericValue;
  paidPaymentCount: NumericValue;
}

function roundTo(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function toNumber(value: NumericValue): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'bigint') {
    return Number(value);
  }

  if (typeof value === 'string') {
    return Number(value);
  }

  return 0;
}

function toDate(value: DateValue): Date {
  return value instanceof Date ? value : new Date(value);
}

function dailyBucketExpression(start: Date) {
  return Prisma.sql`
    FLOOR(
      EXTRACT(EPOCH FROM ("createdAt" - CAST(${start} AS timestamp)))
      / ${DAY_IN_SECONDS}
    )::int
  `;
}

function monthlyBucketExpression() {
  return Prisma.sql`date_trunc('month', "createdAt" AT TIME ZONE 'UTC', 'UTC')`;
}

function startOfUtcMonth(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1));
}

function addUtcMonth(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth() + 1, 1));
}

function completionRate(paymentCount: number, paidPaymentCount: number) {
  if (paymentCount === 0) {
    return null;
  }

  return roundTo((paidPaymentCount / paymentCount) * 100);
}

function getDailyPeriods(start: Date, bucketCount: number): Date[] {
  return Array.from(
    { length: bucketCount },
    (_, index) => new Date(start.getTime() + index * DAY_IN_MILLISECONDS),
  );
}

function getMonthlyPeriods(firstPeriod: Date, end: Date): Date[] {
  const periods: Date[] = [];
  const lastPeriod = startOfUtcMonth(end);
  let cursor = startOfUtcMonth(firstPeriod);

  while (cursor.getTime() <= lastPeriod.getTime()) {
    periods.push(new Date(cursor));
    cursor = addUtcMonth(cursor);
  }

  return periods;
}

function firstPeriodFromRows(rows: Array<{ period: DateValue }>): Date | null {
  if (rows.length === 0) {
    return null;
  }

  return rows
    .map((row) => toDate(row.period))
    .reduce((earliest, current) =>
      current.getTime() < earliest.getTime() ? current : earliest,
    );
}

@Injectable()
export class AdminAnalyticsTrendsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTrends(window: AnalyticsTrendWindow): Promise<AdminAnalyticsTrends> {
    if (window.range === AdminAnalyticsRange.ALL) {
      return this.getMonthlyTrends(window);
    }

    const bucketCount =
      window.range === AdminAnalyticsRange.SEVEN_DAYS ? 7 : 30;
    return this.getDailyTrends(window, bucketCount);
  }

  private async getDailyTrends(
    window: AnalyticsTrendWindow,
    bucketCount: number,
  ): Promise<AdminAnalyticsTrends> {
    const bucket = dailyBucketExpression(window.start);
    const dateFilter = Prisma.sql`
      WHERE "createdAt" >= ${window.start}
        AND "createdAt" < ${window.end}
    `;

    const [userRows, roomRows, billRows, paymentRows] = await Promise.all([
      this.prisma.$queryRaw<DailyCountRow[]>(Prisma.sql`
        SELECT ${bucket} AS "bucketIndex", COUNT(*)::int AS "count"
        FROM "users"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<DailyCountRow[]>(Prisma.sql`
        SELECT ${bucket} AS "bucketIndex", COUNT(*)::int AS "count"
        FROM "rooms"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<DailyBillRow[]>(Prisma.sql`
        SELECT
          ${bucket} AS "bucketIndex",
          COUNT(*)::int AS "billsCreated",
          COALESCE(SUM("totalAmount"), 0)::double precision AS "reportedBillValue"
        FROM "bills"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<DailyPaymentRow[]>(Prisma.sql`
        SELECT
          ${bucket} AS "bucketIndex",
          COUNT(*)::int AS "paymentCount",
          COUNT(*) FILTER (WHERE "status" = ${PaymentStatus.PAID})::int
            AS "paidPaymentCount"
        FROM "user_payments"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
    ]);

    return this.buildDailyTrends(
      getDailyPeriods(window.start, bucketCount),
      userRows,
      roomRows,
      billRows,
      paymentRows,
    );
  }

  private buildDailyTrends(
    periods: Date[],
    userRows: DailyCountRow[],
    roomRows: DailyCountRow[],
    billRows: DailyBillRow[],
    paymentRows: DailyPaymentRow[],
  ): AdminAnalyticsTrends {
    const usersByBucket = new Map(
      userRows.map((row) => [
        Math.trunc(toNumber(row.bucketIndex)),
        Math.trunc(toNumber(row.count)),
      ]),
    );
    const roomsByBucket = new Map(
      roomRows.map((row) => [
        Math.trunc(toNumber(row.bucketIndex)),
        Math.trunc(toNumber(row.count)),
      ]),
    );
    const billsByBucket = new Map(
      billRows.map((row) => [
        Math.trunc(toNumber(row.bucketIndex)),
        {
          billsCreated: Math.trunc(toNumber(row.billsCreated)),
          reportedBillValue: roundTo(toNumber(row.reportedBillValue), 2),
        },
      ]),
    );
    const paymentsByBucket = new Map(
      paymentRows.map((row) => [
        Math.trunc(toNumber(row.bucketIndex)),
        {
          paymentCount: Math.trunc(toNumber(row.paymentCount)),
          paidPaymentCount: Math.trunc(toNumber(row.paidPaymentCount)),
        },
      ]),
    );

    const users: AdminAnalyticsUserTrendPoint[] = periods.map(
      (period, index) => ({
        period: period.toISOString(),
        newUsers: usersByBucket.get(index) ?? 0,
      }),
    );
    const rooms: AdminAnalyticsRoomTrendPoint[] = periods.map(
      (period, index) => ({
        period: period.toISOString(),
        roomsCreated: roomsByBucket.get(index) ?? 0,
      }),
    );
    const bills: AdminAnalyticsBillTrendPoint[] = periods.map(
      (period, index) => {
        const bucket = billsByBucket.get(index);
        return {
          period: period.toISOString(),
          billsCreated: bucket?.billsCreated ?? 0,
          reportedBillValue: bucket?.reportedBillValue ?? 0,
        };
      },
    );
    const payments: AdminAnalyticsPaymentTrendPoint[] = periods.map(
      (period, index) => {
        const bucket = paymentsByBucket.get(index);
        const paymentCount = bucket?.paymentCount ?? 0;
        const paidPaymentCount = bucket?.paidPaymentCount ?? 0;
        return {
          period: period.toISOString(),
          paymentCount,
          paidPaymentCount,
          completionRate: completionRate(paymentCount, paidPaymentCount),
        };
      },
    );

    return { users, rooms, bills, payments };
  }

  private async getMonthlyTrends(
    window: AnalyticsTrendWindow,
  ): Promise<AdminAnalyticsTrends> {
    const period = monthlyBucketExpression();
    const dateFilter = Prisma.sql`
      WHERE "createdAt" >= ${window.start}
        AND "createdAt" < ${window.end}
    `;

    const [userRows, roomRows, billRows, paymentRows] = await Promise.all([
      this.prisma.$queryRaw<MonthlyCountRow[]>(Prisma.sql`
        SELECT ${period} AS "period", COUNT(*)::int AS "count"
        FROM "users"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<MonthlyCountRow[]>(Prisma.sql`
        SELECT ${period} AS "period", COUNT(*)::int AS "count"
        FROM "rooms"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<MonthlyBillRow[]>(Prisma.sql`
        SELECT
          ${period} AS "period",
          COUNT(*)::int AS "billsCreated",
          COALESCE(SUM("totalAmount"), 0)::double precision AS "reportedBillValue"
        FROM "bills"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
      this.prisma.$queryRaw<MonthlyPaymentRow[]>(Prisma.sql`
        SELECT
          ${period} AS "period",
          COUNT(*)::int AS "paymentCount",
          COUNT(*) FILTER (WHERE "status" = ${PaymentStatus.PAID})::int
            AS "paidPaymentCount"
        FROM "user_payments"
        ${dateFilter}
        GROUP BY 1
        ORDER BY 1
      `),
    ]);

    const firstPeriod = firstPeriodFromRows([
      ...userRows,
      ...roomRows,
      ...billRows,
      ...paymentRows,
    ]);

    if (!firstPeriod) {
      return { users: [], rooms: [], bills: [], payments: [] };
    }

    const periods = getMonthlyPeriods(firstPeriod, window.end);
    const usersByPeriod = new Map(
      userRows.map((row) => [
        toDate(row.period).getTime(),
        Math.trunc(toNumber(row.count)),
      ]),
    );
    const roomsByPeriod = new Map(
      roomRows.map((row) => [
        toDate(row.period).getTime(),
        Math.trunc(toNumber(row.count)),
      ]),
    );
    const billsByPeriod = new Map(
      billRows.map((row) => [
        toDate(row.period).getTime(),
        {
          billsCreated: Math.trunc(toNumber(row.billsCreated)),
          reportedBillValue: roundTo(toNumber(row.reportedBillValue), 2),
        },
      ]),
    );
    const paymentsByPeriod = new Map(
      paymentRows.map((row) => [
        toDate(row.period).getTime(),
        {
          paymentCount: Math.trunc(toNumber(row.paymentCount)),
          paidPaymentCount: Math.trunc(toNumber(row.paidPaymentCount)),
        },
      ]),
    );

    const users: AdminAnalyticsUserTrendPoint[] = periods.map((month) => ({
      period: month.toISOString(),
      newUsers: usersByPeriod.get(month.getTime()) ?? 0,
    }));
    const rooms: AdminAnalyticsRoomTrendPoint[] = periods.map((month) => ({
      period: month.toISOString(),
      roomsCreated: roomsByPeriod.get(month.getTime()) ?? 0,
    }));
    const bills: AdminAnalyticsBillTrendPoint[] = periods.map((month) => {
      const bucket = billsByPeriod.get(month.getTime());
      return {
        period: month.toISOString(),
        billsCreated: bucket?.billsCreated ?? 0,
        reportedBillValue: bucket?.reportedBillValue ?? 0,
      };
    });
    const payments: AdminAnalyticsPaymentTrendPoint[] = periods.map((month) => {
      const bucket = paymentsByPeriod.get(month.getTime());
      const paymentCount = bucket?.paymentCount ?? 0;
      const paidPaymentCount = bucket?.paidPaymentCount ?? 0;
      return {
        period: month.toISOString(),
        paymentCount,
        paidPaymentCount,
        completionRate: completionRate(paymentCount, paidPaymentCount),
      };
    });

    return { users, rooms, bills, payments };
  }
}
