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
import { AdminTrendChart } from "./AdminTrendChart";
import { fetchAdminAnalytics } from "../services/api-admin-service";
import { useLanguage } from "@/i18n/LanguageProvider";
import { adminTranslations } from "../i18n/admin-translations";
import type {
  AdminAnalyticsRange,
  AdminAnalyticsResponse,
} from "../types/admin-types";

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

function formatTrendPeriod(value: string, range: AdminAnalyticsRange) {
  return new Date(value).toLocaleDateString(undefined, {
    timeZone: "UTC",
    month: "short",
    ...(range === "all" ? { year: "numeric" } : { day: "numeric" }),
  });
}

function formatTrendMoney(value: number) {
  return formatMoney(value, "THB");
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
  isThai: boolean,
) {
  if (previous === null) {
    return isThai ? "ไม่มีข้อมูลช่วงก่อนหน้าเพื่อเปรียบเทียบ" : "No previous-period comparison";
  }

  if (growthPercent === null) {
    return (isThai ? "ช่วงก่อนหน้า: " : "Previous period: ") + formatNumber(previous);
  }

  const sign = growthPercent > 0 ? "+" : "";
  return (
    (isThai ? "ช่วงก่อนหน้า: " : "Previous period: ") +
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
  const { locale } = useLanguage();
  const t = adminTranslations[locale].analytics;
  const isThai = locale === "th";

  const [range, setRange] = React.useState<AdminAnalyticsRange>("30d");
  const [analytics, setAnalytics] =
    React.useState<AdminAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const rangeOptions: Array<{
    value: AdminAnalyticsRange;
    label: string;
  }> = [
    { value: "7d", label: t.ranges["7d"] },
    { value: "30d", label: t.ranges["30d"] },
    { value: "all", label: t.ranges.all },
  ];

  const loadAnalytics = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError(isThai ? "ไม่พบโทเค็นการยืนยันตัวตน" : "Missing authentication token.");
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
          : (isThai ? "ไม่สามารถโหลดการวิเคราะห์ได้" : "Unable to load product analytics."),
      );
    } finally {
      setIsLoading(false);
    }
  }, [range, isThai]);

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
          {t.loading}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl space-y-4">
        <Alert variant="error">
          <AlertTitle>{t.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          size="sm"
          onClick={loadAnalytics}
          leftIcon={<RefreshCw className="size-4" />}
        >
          {t.retry}
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
              {t.title}
            </h1>
          </div>
          <p className="mt-1 text-sm text-text-secondary">
            {t.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="admin-analytics-range"
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            {isThai ? "ช่วงเวลา" : "Period"}
          </label>
          <select
            id="admin-analytics-range"
            value={range}
            onChange={(event) =>
              setRange(event.target.value as AdminAnalyticsRange)
            }
            className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {rangeOptions.map((option) => (
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
            {t.refresh}
          </Button>
        </div>
      </div>

      <Card variant="subtle" className="p-4 text-xs text-text-secondary">
        <p className="font-semibold text-text-primary">{isThai ? "ช่วงเวลาข้อมูลที่ตรวจสอบ" : "Verified data window"}</p>
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
          {isThai ? "ตัวชี้วัดหลัก" : "Primary Metrics"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t.metrics.newUsers}
            value={analytics.users.newUsers}
            icon={<Users className="size-5" />}
            description={comparisonLabel(
              analytics.users.previousPeriodNewUsers,
              analytics.users.newUserGrowthPercent,
              isThai,
            )}
          />
          <StatCard
            label={t.metrics.roomsCreated}
            value={analytics.rooms.roomsCreated}
            icon={<DoorOpen className="size-5" />}
            description={
              analytics.rooms.previousPeriodRoomsCreated === null
                ? (isThai ? "ไม่มีข้อมูลช่วงก่อนหน้า" : "No previous-period comparison")
                : (isThai ? "ช่วงก่อนหน้า: " : "Previous period: ") +
                  formatNumber(analytics.rooms.previousPeriodRoomsCreated)
            }
          />
          <StatCard
            label={t.metrics.billVolume}
            value={formatMoney(
              analytics.bills.billVolume,
              analytics.bills.currencyLabel,
            )}
            icon={<ReceiptText className="size-5" />}
            description={isThai ? "ยอดบิลรวมของมื้ออาหาร" : "Reported meal bill value, not platform revenue"}
          />
          <StatCard
            label={t.metrics.completionRate}
            value={
              analytics.payments.paymentCompletionRate === null
                ? "N/A"
                : formatPercent(analytics.payments.paymentCompletionRate)
            }
            icon={<CreditCard className="size-5" />}
            description={
              analytics.payments.paymentCompletionRate === null
                ? (isThai ? "ไม่มีข้อมูลการชำระเงิน" : "No payment data")
                : (isThai ? "รายการชำระเงินที่ทำเครื่องหมายว่าชำระแล้ว" : "Peer-to-peer payments marked paid")
            }
          />
        </div>
      </section>

      <section aria-labelledby="admin-analytics-detail">
        <h2
          id="admin-analytics-detail"
          className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary"
        >
          {isThai ? "ตัวชี้วัดสนับสนุน" : "Supporting Metrics"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label={t.metrics.totalUsers}
            value={analytics.users.totalUsers}
            icon={<Users className="size-5" />}
            description={isThai ? "บัญชีผู้ใช้ทั้งหมดในระบบ" : "All registered accounts"}
          />
          <StatCard
            label={t.metrics.activeRooms}
            value={analytics.rooms.activeRooms}
            icon={<DoorOpen className="size-5" />}
            description={isThai ? "ห้องที่กำลังใช้งานในปัจจุบัน" : "Lobby or in-progress rooms now"}
          />
          <StatCard
            label={t.metrics.cancelledRooms}
            value={analytics.rooms.cancelledRooms}
            icon={<DoorOpen className="size-5" />}
            description={
              formatPercent(analytics.rooms.cancellationRate) +
              (isThai ? " ของห้องที่สร้างในช่วงเวลานี้ถูกยกเลิก" : " of rooms created in this period are currently cancelled")
            }
          />
          <StatCard
            label={t.metrics.billsCreated}
            value={analytics.bills.billsCreated}
            icon={<ReceiptText className="size-5" />}
            description={
              analytics.bills.previousPeriodBillsCreated === null
                ? (isThai ? "ไม่มีข้อมูลช่วงก่อนหน้า" : "No previous-period comparison")
                : (isThai ? "ช่วงก่อนหน้า: " : "Previous period: ") +
                  formatNumber(analytics.bills.previousPeriodBillsCreated)
            }
          />
          <StatCard
            label={t.metrics.averageBill}
            value={formatMoney(
              analytics.bills.averageBillValue,
              analytics.bills.currencyLabel,
            )}
            icon={<ReceiptText className="size-5" />}
            description={isThai ? "ยอดเฉลี่ยของบิลที่มียอดเงิน" : "Average of bills with a reported total"}
          />
          <StatCard
            label={t.metrics.paidPayments + " / " + t.metrics.unpaidPayments}
            value={
              analytics.payments.paidPaymentCount +
              " / " +
              analytics.payments.unpaidPaymentCount
            }
            icon={<CreditCard className="size-5" />}
            description={
              analytics.payments.paymentCount + (isThai ? " รายการในช่วงเวลานี้" : " payment records in period")
            }
          />
        </div>
      </section>

      <section aria-labelledby="admin-analytics-trends" className="space-y-3">
        <div>
          <h2
            id="admin-analytics-trends"
            className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            {t.trendsTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {isThai
              ? "แนวโน้มสถิติตามช่วงเวลา UTC รายการที่ไม่มีข้อมูลจะแสดงว่าไม่มีข้อมูลแทนที่จะเป็น 0%"
              : "Aggregate UTC buckets for the selected period. Payment buckets without records remain unavailable rather than becoming 0%."}
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <AdminTrendChart
            title={t.charts.users}
            description={isThai ? "การลงทะเบียนผู้ใช้ใหม่ตามช่วงเวลา" : "New registered users per UTC bucket."}
            data={analytics.trends.users.map((point) => ({
              period: point.period,
              value: point.newUsers,
            }))}
            valueFormatter={formatNumber}
            periodFormatter={(period) =>
              formatTrendPeriod(period, analytics.period.range)
            }
          />
          <AdminTrendChart
            title={t.charts.rooms}
            description={isThai ? "จำนวนห้องที่สร้างตามช่วงเวลา" : "Rooms created per UTC bucket."}
            data={analytics.trends.rooms.map((point) => ({
              period: point.period,
              value: point.roomsCreated,
            }))}
            variant="bar"
            valueFormatter={formatNumber}
            periodFormatter={(period) =>
              formatTrendPeriod(period, analytics.period.range)
            }
          />
          <AdminTrendChart
            title={t.charts.bills}
            description={isThai ? "ยอดรวมบิลมื้ออาหารตามช่วงเวลา" : "Reported meal bill value per bucket; not platform revenue."}
            data={analytics.trends.bills.map((point) => ({
              period: point.period,
              value: point.reportedBillValue,
            }))}
            variant="bar"
            valueFormatter={formatTrendMoney}
            periodFormatter={(period) =>
              formatTrendPeriod(period, analytics.period.range)
            }
          />
          <AdminTrendChart
            title={t.charts.payments}
            description={isThai ? "อัตราการชำระเงินสำเร็จตามช่วงเวลา" : "Peer-to-peer payments marked paid per UTC bucket."}
            data={analytics.trends.payments.map((point) => ({
              period: point.period,
              value: point.completionRate,
            }))}
            emptyLabel={isThai ? "ไม่มีข้อมูลการชำระเงินสำหรับช่วงนี้" : "No payment data for this period."}
            valueFormatter={formatPercent}
            periodFormatter={(period) =>
              formatTrendPeriod(period, analytics.period.range)
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
            {t.insightsTitle}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {isThai ? "ข้อคิดเห็นและข้อสังเกตจากข้อมูลที่ตรวจสอบแล้ว" : "Rule-based observations generated only from the verified metrics above."}
          </p>
        </div>
        {analytics.insights.length === 0 ? (
          <Alert variant="info">
            <AlertTitle>{isThai ? "ไม่พบประเด็นสำคัญ" : "No material rule-based insights"}</AlertTitle>
            <AlertDescription>
              {t.noInsights}
            </AlertDescription>
          </Alert>
        ) : (
          analytics.insights.map((insight) => (
            <Alert key={insight.id} variant={insightVariant(insight.severity)}>
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>
                <p>{insight.summary}</p>
                <p className="mt-1 text-xs">
                  {isThai ? "หลักฐาน: " : "Evidence: "} {insight.evidence.metric} ={" "}
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
                    {isThai ? "คำแนะนำ: " : "Suggested action: "} {insight.suggestedAction}
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
