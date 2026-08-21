import { Injectable } from '@nestjs/common';
import {
  AdminAnalyticsInsight,
  AdminAnalyticsMetrics,
} from '../types/admin-analytics.types';

export interface AnalyticsIntelligenceProvider {
  analyze(
    metrics: AdminAnalyticsMetrics,
  ): AdminAnalyticsInsight[] | Promise<AdminAnalyticsInsight[]>;
}

const COMPARISON_THRESHOLD_PERCENT = 20;
const MIN_COMPARISON_SAMPLE = 3;
const ROOM_CANCELLATION_THRESHOLD_PERCENT = 30;
const PAYMENT_COMPLETION_THRESHOLD_PERCENT = 80;

function roundTo(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function percentageChange(current: number, previous: number): number | null {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return roundTo(((current - previous) / previous) * 100);
}

@Injectable()
export class RuleBasedAnalyticsIntelligenceProvider implements AnalyticsIntelligenceProvider {
  analyze(metrics: AdminAnalyticsMetrics): AdminAnalyticsInsight[] {
    const insights: AdminAnalyticsInsight[] = [];

    this.addNewUserGrowthInsight(metrics, insights);
    this.addRoomCancellationInsight(metrics, insights);
    this.addPaymentCompletionInsight(metrics, insights);
    this.addBillActivityInsight(metrics, insights);

    return insights;
  }

  private addNewUserGrowthInsight(
    metrics: AdminAnalyticsMetrics,
    insights: AdminAnalyticsInsight[],
  ) {
    const current = metrics.users.newUsers;
    const previous = metrics.users.previousPeriodNewUsers;
    const growthPercent = metrics.users.newUserGrowthPercent;

    if (
      previous === null ||
      growthPercent === null ||
      previous < MIN_COMPARISON_SAMPLE ||
      Math.abs(growthPercent) < COMPARISON_THRESHOLD_PERCENT
    ) {
      return;
    }

    const increased = growthPercent > 0;
    insights.push({
      id: 'new-user-growth',
      type: 'NEW_USER_GROWTH',
      severity: increased ? 'POSITIVE' : 'WARNING',
      title: increased
        ? 'New-user acquisition increased'
        : 'New-user acquisition decreased',
      summary:
        'New users changed from ' +
        previous +
        ' to ' +
        current +
        ' (' +
        (growthPercent > 0 ? '+' : '') +
        growthPercent +
        '%).',
      evidence: {
        metric: 'users.newUsers',
        currentValue: current,
        previousValue: previous,
      },
      suggestedAction: increased
        ? 'Review which acquisition or product changes may be contributing to the increase.'
        : 'Investigate registration and verification friction before changing acquisition strategy.',
    });
  }

  private addRoomCancellationInsight(
    metrics: AdminAnalyticsMetrics,
    insights: AdminAnalyticsInsight[],
  ) {
    const created = metrics.rooms.roomsCreated;
    const cancelled = metrics.rooms.cancelledRooms;

    if (
      created < MIN_COMPARISON_SAMPLE ||
      cancelled === 0 ||
      metrics.rooms.cancellationRate < ROOM_CANCELLATION_THRESHOLD_PERCENT
    ) {
      return;
    }

    insights.push({
      id: 'room-cancellation',
      type: 'ROOM_CANCELLATION',
      severity: 'WARNING',
      title: 'Room cancellation is elevated',
      summary:
        cancelled +
        ' of ' +
        created +
        ' rooms created in this period are currently cancelled (' +
        metrics.rooms.cancellationRate +
        '%).',
      evidence: {
        metric: 'rooms.cancellationRate',
        currentValue: metrics.rooms.cancellationRate,
        numerator: cancelled,
        denominator: created,
      },
      suggestedAction:
        'Investigate room-start and group-coordination friction before changing room lifecycle behavior.',
    });
  }

  private addPaymentCompletionInsight(
    metrics: AdminAnalyticsMetrics,
    insights: AdminAnalyticsInsight[],
  ) {
    const total = metrics.payments.paymentCount;
    const paid = metrics.payments.paidPaymentCount;

    if (
      total === 0 ||
      metrics.payments.paymentCompletionRate >=
        PAYMENT_COMPLETION_THRESHOLD_PERCENT
    ) {
      return;
    }

    insights.push({
      id: 'payment-completion',
      type: 'PAYMENT_COMPLETION',
      severity: 'WARNING',
      title: 'Payment completion is below the operating threshold',
      summary:
        paid +
        ' of ' +
        total +
        ' peer-to-peer payments are marked paid (' +
        metrics.payments.paymentCompletionRate +
        '%).',
      evidence: {
        metric: 'payments.paymentCompletionRate',
        currentValue: metrics.payments.paymentCompletionRate,
        numerator: paid,
        denominator: total,
      },
      suggestedAction:
        'Investigate payment-account setup, payment instructions, and the mark-paid flow.',
    });
  }

  private addBillActivityInsight(
    metrics: AdminAnalyticsMetrics,
    insights: AdminAnalyticsInsight[],
  ) {
    const current = metrics.bills.billsCreated;
    const previous = metrics.bills.previousPeriodBillsCreated;

    if (
      previous === null ||
      current < MIN_COMPARISON_SAMPLE ||
      previous < MIN_COMPARISON_SAMPLE
    ) {
      return;
    }

    const changePercent = percentageChange(current, previous);
    if (
      changePercent === null ||
      Math.abs(changePercent) < COMPARISON_THRESHOLD_PERCENT
    ) {
      return;
    }

    const increased = changePercent > 0;
    insights.push({
      id: 'bill-activity',
      type: 'BILL_ACTIVITY',
      severity: increased ? 'POSITIVE' : 'INFO',
      title: increased ? 'Bill activity increased' : 'Bill activity decreased',
      summary:
        'Bills created changed from ' +
        previous +
        ' to ' +
        current +
        ' (' +
        (changePercent > 0 ? '+' : '') +
        changePercent +
        '%).',
      evidence: {
        metric: 'bills.billsCreated',
        currentValue: current,
        previousValue: previous,
      },
      suggestedAction: increased
        ? 'Compare bill adoption with completed FoodFights as the next product-analytics step.'
        : 'Review whether users are reaching the bill flow after completing a meal decision.',
    });
  }
}
