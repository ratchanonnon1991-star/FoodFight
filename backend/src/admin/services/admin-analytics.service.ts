import { Injectable } from '@nestjs/common';
import {
  PaymentStatus,
  RoomStatus,
} from '../../database/generated/prisma/enums';
import { PrismaService } from '../../database/prisma.service';
import {
  AdminAnalyticsQueryDto,
  AdminAnalyticsRange,
} from '../dto/admin-analytics-query.dto';
import {
  AdminAnalyticsMetrics,
  AdminAnalyticsResponse,
} from '../types/admin-analytics.types';
import { RuleBasedAnalyticsIntelligenceProvider } from './admin-analytics-intelligence.service';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

function roundTo(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function calculateRate(numerator: number, denominator: number): number {
  if (denominator === 0) {
    return 0;
  }

  return roundTo((numerator / denominator) * 100);
}

function calculateGrowth(
  current: number,
  previous: number | null,
): number | null {
  if (previous === null) {
    return null;
  }

  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return roundTo(((current - previous) / previous) * 100);
}

interface AnalyticsWindow {
  range: AdminAnalyticsRange;
  start: Date;
  end: Date;
  previousStart: Date | null;
  previousEnd: Date | null;
}

export function createAnalyticsWindow(
  range: AdminAnalyticsRange,
  now: Date,
): AnalyticsWindow {
  const end = new Date(now);

  if (range === AdminAnalyticsRange.ALL) {
    return {
      range,
      start: new Date(0),
      end,
      previousStart: null,
      previousEnd: null,
    };
  }

  const duration =
    range === AdminAnalyticsRange.SEVEN_DAYS
      ? 7 * DAY_IN_MILLISECONDS
      : 30 * DAY_IN_MILLISECONDS;
  const start = new Date(end.getTime() - duration);

  return {
    range,
    start,
    end,
    previousStart: new Date(start.getTime() - duration),
    previousEnd: start,
  };
}

@Injectable()
export class AdminAnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly intelligence: RuleBasedAnalyticsIntelligenceProvider,
  ) {}

  async getAnalytics(
    query: AdminAnalyticsQueryDto,
    now: Date = new Date(),
  ): Promise<AdminAnalyticsResponse> {
    const range = query.range ?? AdminAnalyticsRange.THIRTY_DAYS;
    const window = createAnalyticsWindow(range, now);
    const currentCreatedAt = {
      gte: window.start,
      lt: window.end,
    };
    const previousCreatedAt = window.previousStart &&
      window.previousEnd && {
        gte: window.previousStart,
        lt: window.previousEnd,
      };

    const [
      totalUsers,
      newUsers,
      previousPeriodNewUsers,
      roomsCreated,
      previousPeriodRoomsCreated,
      activeRooms,
      cancelledRooms,
      billsCreated,
      previousPeriodBillsCreated,
      billAggregate,
      paymentCount,
      paidPaymentCount,
      unpaidPaymentCount,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { createdAt: currentCreatedAt } }),
      previousCreatedAt
        ? this.prisma.user.count({ where: { createdAt: previousCreatedAt } })
        : Promise.resolve(null),
      this.prisma.room.count({ where: { createdAt: currentCreatedAt } }),
      previousCreatedAt
        ? this.prisma.room.count({ where: { createdAt: previousCreatedAt } })
        : Promise.resolve(null),
      this.prisma.room.count({
        where: {
          status: {
            in: [RoomStatus.LOBBY, RoomStatus.IN_PROGRESS],
          },
        },
      }),
      this.prisma.room.count({
        where: {
          createdAt: currentCreatedAt,
          status: RoomStatus.CANCELLED,
        },
      }),
      this.prisma.bill.count({ where: { createdAt: currentCreatedAt } }),
      previousCreatedAt
        ? this.prisma.bill.count({ where: { createdAt: previousCreatedAt } })
        : Promise.resolve(null),
      this.prisma.bill.aggregate({
        where: {
          createdAt: currentCreatedAt,
        },
        _sum: {
          totalAmount: true,
        },
        _avg: {
          totalAmount: true,
        },
      }),
      this.prisma.userPayment.count({ where: { createdAt: currentCreatedAt } }),
      this.prisma.userPayment.count({
        where: {
          createdAt: currentCreatedAt,
          status: PaymentStatus.PAID,
        },
      }),
      this.prisma.userPayment.count({
        where: {
          createdAt: currentCreatedAt,
          status: PaymentStatus.UNPAID,
        },
      }),
    ]);

    const billVolume = Number(billAggregate._sum.totalAmount ?? 0);
    const averageBillValue = Number(billAggregate._avg.totalAmount ?? 0);
    const metrics: AdminAnalyticsMetrics = {
      period: {
        range: window.range,
        start: window.start.toISOString(),
        end: window.end.toISOString(),
        previousStart: window.previousStart?.toISOString() ?? null,
        previousEnd: window.previousEnd?.toISOString() ?? null,
        timezone: 'UTC',
      },
      users: {
        totalUsers,
        newUsers,
        previousPeriodNewUsers,
        newUserGrowthPercent: calculateGrowth(newUsers, previousPeriodNewUsers),
      },
      rooms: {
        roomsCreated,
        previousPeriodRoomsCreated,
        activeRooms,
        cancelledRooms,
        cancellationRate: calculateRate(cancelledRooms, roomsCreated),
      },
      bills: {
        billsCreated,
        previousPeriodBillsCreated,
        billVolume: roundTo(billVolume, 2),
        averageBillValue: roundTo(averageBillValue, 2),
        currencyLabel: 'THB',
      },
      payments: {
        paymentCount,
        paidPaymentCount,
        unpaidPaymentCount,
        paymentCompletionRate: calculateRate(paidPaymentCount, paymentCount),
      },
    };

    return {
      ...metrics,
      insights: await Promise.resolve(this.intelligence.analyze(metrics)),
    };
  }
}
