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
import type { AdminDashboardMetrics } from "../types/admin-types";

export function AdminDashboard() {
  const [metrics, setMetrics] = React.useState<AdminDashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchAdminDashboard(token);
      setMetrics(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load dashboard statistics."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
        <Spinner size="lg" variant="primary" />
        <p className="text-sm font-medium text-text-secondary">
          Loading dashboard metrics...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 max-w-xl">
        <Alert variant="error">
          <AlertTitle>Dashboard Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          leftIcon={<RefreshCw className="size-4" />}
        >
          Retry
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
            System Overview
          </h1>
          <p className="text-sm text-text-secondary">
            Platform usage and operational metrics.
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* User Statistics Section */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          User Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          <StatCard
            label="Total Users"
            value={metrics.totalUsers}
            icon={<Users className="size-5" />}
            description="Registered accounts across the platform"
          />
          <StatCard
            label="New Users (Last 7 Days)"
            value={metrics.newUsersLast7Days}
            icon={<UserPlus className="size-5" />}
            description="Users registered within the past 7 days"
          />
        </div>
      </div>

      {/* Room Statistics Section */}
      <div>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Room Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Rooms"
            value={metrics.totalRooms}
            icon={<DoorOpen className="size-5" />}
            description="Cumulative created rooms"
          />
          <StatCard
            label="Active Rooms"
            value={metrics.activeRooms}
            icon={<PlayCircle className="size-5" />}
            description="Rooms currently in lobby or in progress"
          />
          <StatCard
            label="Completed Rooms"
            value={metrics.completedRooms}
            icon={<CheckCircle2 className="size-5" />}
            description="Successfully completed dining sessions"
          />
          <StatCard
            label="Cancelled Rooms"
            value={metrics.cancelledRooms}
            icon={<XCircle className="size-5" />}
            description="Rooms cancelled or abandoned"
          />
        </div>
      </div>
    </div>
  );
}
