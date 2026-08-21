"use client";

import * as React from "react";
import {
  BarChart3,
  CreditCard,
  DoorOpen,
  ReceiptText,
  RefreshCw,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { StatCard } from "./StatCard";
import { fetchAdminAnalytics } from "../services/api-admin-service";
import type {
  AdminAnalyticsRange,
  AdminAnalyticsResponse,
} from "../types/admin-types";

const RANGE_OPTIONS: Array<{
  value: AdminAnalyticsRange;
  label: string;
}> = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "all", label: "All time" },
];

function formatNumber(value: number) {
  return value.toLocaleString();
}

function formatMoney(value: number, currency: string) {
  return (
    currency +
    " " +
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatPercent(value: number) {
  return value.toFixed(1) + "%";
}

function formatUtc(value: string) {
  return (
    new Date(value).toLocaleString(undefined, {
      timeZone: "UTC",
    }) + " UTC"
  );
}

function comparisonLabel(
  previous: number | null,
  growthPercent: number | null,
) {
  if (previous === null) {
    return "No previous-period comparison";
  }

  if (growthPercent === null) {
    return "Previous period: " + formatNumber(previous);
  }

  const sign = growthPercent > 0 ? "+" : "";
  return (
    "Previous period: " +
    formatNumber(previous) +
    " (" +
    sign +
    formatPercent(growthPercent) +
    ")"
  );
}

function insightVariant(
  severity: "INFO" | "POSITIVE" | "WARNING",
): "info" | "success" | "warning" {
  if (severity === "WARNING") {
    return "warning";
  }

  if (severity === "POSITIVE") {
    return "success";
  }

  return "info";
}

export function AdminAnalytics() {
  const [range, setRange] = React.useState<AdminAnalyticsRange>("30d");
  const [analytics, setAnalytics] =
    React.useState<AdminAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadAnalytics = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchAdminAnalytics(range, token);
      setAnalytics(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load product analytics.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [range]);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAnalytics();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadAnalytics]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
        <Spinner size="lg" variant="primary" />
        <p className="text-sm font-medium text-text-secondary">
          Loading product analytics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl space-y-4">
        <Alert variant="error">
          <AlertTitle>Analytics Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          size="sm"
          onClick={loadAnalytics}
          leftIcon={<RefreshCw className="size-4" />}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-brand-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Product Analytics
            </h1>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            Deterministic metrics from transactional data. All periods use UTC.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="admin-analytics-range"
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            Period
          </label>
          <select
            id="admin-analytics-range"
            value={range}
            onChange={(event) =>
              setRange(event.target.value as AdminAnalyticsRange)
            }
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={loadAnalytics}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      <Card variant="subtle" className="p-4 text-xs text-text-secondary">
        <p className="font-semibold text-text-primary">Verified data window</p>
        <p className="mt-1">
          {formatUtc(analytics.period.start)} to{" "}
          {formatUtc(analytics.period.end)} ({analytics.period.timezone})
        </p>
      </Card>

      <section aria-labelledby="admin-analytics-primary">
        <h2
          id="admin-analytics-primary"
          className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary"
        >
          Primary Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="New Users"
            value={analytics.users.newUsers}
            icon={<Users className="size-5" />}
            description={comparisonLabel(
              analytics.users.previousPeriodNewUsers,
              analytics.users.newUserGrowthPercent,
            )}
          />
          <StatCard
            label="Rooms Created"
            value={analytics.rooms.roomsCreated}
            icon={<DoorOpen className="size-5" />}
            description={
              analytics.rooms.previousPeriodRoomsCreated === null
                ? "No previous-period comparison"
                : "Previous period: " +
                  formatNumber(analytics.rooms.previousPeriodRoomsCreated)
            }
          />
          <StatCard
            label="Bill Volume"
            value={formatMoney(
              analytics.bills.billVolume,
              analytics.bills.currencyLabel,
            )}
            icon={<ReceiptText className="size-5" />}
            description="Reported meal bill value, not platform revenue"
          />
          <StatCard
            label="Payment Completion"
            value={formatPercent(analytics.payments.paymentCompletionRate)}
            icon={<CreditCard className="size-5" />}
            description="Peer-to-peer payments marked paid"
          />
        </div>
      </section>

      <section aria-labelledby="admin-analytics-detail">
        <h2
          id="admin-analytics-detail"
          className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary"
        >
          Supporting Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Users"
            value={analytics.users.totalUsers}
            icon={<Users className="size-5" />}
            description="All registered accounts"
          />
          <StatCard
            label="Current Active Rooms"
            value={analytics.rooms.activeRooms}
            icon={<DoorOpen className="size-5" />}
            description="Lobby or in-progress rooms now"
          />
          <StatCard
            label="Currently Cancelled Rooms"
            value={analytics.rooms.cancelledRooms}
            icon={<DoorOpen className="size-5" />}
            description={
              formatPercent(analytics.rooms.cancellationRate) +
              " of rooms created in this period are currently cancelled"
            }
          />
          <StatCard
            label="Bills Created"
            value={analytics.bills.billsCreated}
            icon={<ReceiptText className="size-5" />}
            description={
              analytics.bills.previousPeriodBillsCreated === null
                ? "No previous-period comparison"
                : "Previous period: " +
                  formatNumber(analytics.bills.previousPeriodBillsCreated)
            }
          />
          <StatCard
            label="Average Bill Value"
            value={formatMoney(
              analytics.bills.averageBillValue,
              analytics.bills.currencyLabel,
            )}
            icon={<ReceiptText className="size-5" />}
            description="Average of bills with a reported total"
          />
          <StatCard
            label="Paid / Unpaid Payments"
            value={
              analytics.payments.paidPaymentCount +
              " / " +
              analytics.payments.unpaidPaymentCount
            }
            icon={<CreditCard className="size-5" />}
            description={
              analytics.payments.paymentCount + " payment records in period"
            }
          />
        </div>
      </section>

      <section aria-labelledby="admin-analytics-insights" className="space-y-3">
        <div>
          <h2
            id="admin-analytics-insights"
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            Intelligent Insights
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Rule-based observations generated only from the verified metrics
            above.
          </p>
        </div>
        {analytics.insights.length === 0 ? (
          <Alert variant="info">
            <AlertTitle>No material rule-based insights</AlertTitle>
            <AlertDescription>
              The selected period does not meet the configured comparison or
              denominator thresholds.
            </AlertDescription>
          </Alert>
        ) : (
          analytics.insights.map((insight) => (
            <Alert key={insight.id} variant={insightVariant(insight.severity)}>
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>
                <p>{insight.summary}</p>
                <p className="mt-1 text-xs">
                  Evidence: {insight.evidence.metric} ={" "}
                  {insight.evidence.currentValue}
                  {insight.evidence.numerator !== undefined &&
                    insight.evidence.denominator !== undefined && (
                      <span>
                        {" ("}
                        {insight.evidence.numerator}/
                        {insight.evidence.denominator}
                        {")"}
                      </span>
                    )}
                </p>
                {insight.suggestedAction && (
                  <p className="mt-1 text-xs">
                    Suggested action: {insight.suggestedAction}
                  </p>
                )}
              </AlertDescription>
            </Alert>
          ))
        )}
      </section>
    </div>
  );
}
