"use client";

import * as React from "react";
import {
  Users,
  UserPlus,
  DoorOpen,
  PlayCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { StatCard } from "./StatCard";
import { fetchAdminDashboard } from "../services/api-admin-service";
import { useLanguage } from "@/i18n/LanguageProvider";
import { adminTranslations } from "../i18n/admin-translations";
import type { AdminDashboardMetrics } from "../types/admin-types";

export function AdminDashboard() {
  const { locale } = useLanguage();
  const t = adminTranslations[locale].dashboard;
  const [metrics, setMetrics] = React.useState<AdminDashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError(locale === "th" ? "ไม่พบโทเค็นการยืนยันตัวตน" : "Missing authentication token.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchAdminDashboard(token);
      setMetrics(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : (locale === "th" ? "ไม่สามารถโหลดสถิติแดชบอร์ดได้" : "Unable to load dashboard statistics.")
      );
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

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
      <div className="space-y-4 max-w-xl">
        <Alert variant="error">
          <AlertTitle>{t.errorTitle}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          leftIcon={<RefreshCw className="size-4" />}
        >
          {t.retry}
        </Button>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {t.title}
          </h1>
          <p className="text-sm text-text-secondary">
            {t.subtitle}
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            {t.refresh}
          </Button>
        </div>
      </div>

      {/* User Statistics Section */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {t.userMetrics}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard
            label={t.totalUsers}
            value={metrics.totalUsers}
            icon={<Users className="size-5" />}
            description={t.totalUsersDesc}
          />
          <StatCard
            label={t.newUsers7d}
            value={metrics.newUsersLast7Days}
            icon={<UserPlus className="size-5" />}
            description={t.newUsers7dDesc}
          />
        </div>
      </div>

      {/* Room Statistics Section */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          {t.roomMetrics}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={t.totalRooms}
            value={metrics.totalRooms}
            icon={<DoorOpen className="size-5" />}
            description={t.totalRoomsDesc}
          />
          <StatCard
            label={t.activeRooms}
            value={metrics.activeRooms}
            icon={<PlayCircle className="size-5" />}
            description={t.activeRoomsDesc}
          />
          <StatCard
            label={t.completedRooms}
            value={metrics.completedRooms}
            icon={<CheckCircle2 className="size-5" />}
            description={t.completedRoomsDesc}
          />
          <StatCard
            label={t.cancelledRooms}
            value={metrics.cancelledRooms}
            icon={<XCircle className="size-5" />}
            description={t.cancelledRoomsDesc}
          />
        </div>
      </div>
    </div>
  );
}
