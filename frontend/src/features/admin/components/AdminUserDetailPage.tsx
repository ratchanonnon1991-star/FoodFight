"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Key,
  DoorOpen,
  Users,
  RefreshCw,
  UserX,
} from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { ROUTES } from "@/config/routes";
import { fetchAdminUserById } from "../services/api-admin-service";
import type { AdminUserDetail } from "../types/admin-types";

export interface AdminUserDetailPageProps {
  userId: string;
}

export function AdminUserDetailPage({ userId }: AdminUserDetailPageProps) {
  const [user, setUser] = React.useState<AdminUserDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadUser = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchAdminUserById(userId, token);
      setUser(data);
    } catch (err) {
      if (err instanceof Error && err.message === "USER_NOT_FOUND") {
        setError("USER_NOT_FOUND");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load user details from server."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center gap-3">
        <Spinner size="lg" variant="primary" />
        <p className="text-sm font-medium text-text-secondary">
          Loading user details...
        </p>
      </div>
    );
  }

  if (error === "USER_NOT_FOUND") {
    return (
      <div className="space-y-6 max-w-xl mx-auto py-8">
        <Card variant="default" className="p-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-status-danger-bg text-status-danger-text">
            <UserX className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-text-primary">
            User Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            The requested user account with ID{" "}
            <code className="rounded bg-surface-subtle px-1.5 py-0.5 font-mono text-xs text-text-primary">
              {userId}
            </code>{" "}
            does not exist or has been removed.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href={ROUTES.ADMIN_USERS}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft className="size-4" />}
              >
                Back to Users
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 max-w-xl">
        <Alert variant="error">
          <AlertTitle>Error Loading User</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={loadUser}
            leftIcon={<RefreshCw className="size-4" />}
          >
            Retry
          </Button>
          <Link href={ROUTES.ADMIN_USERS}>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="size-4" />}
            >
              Back to Users
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top Header with Back Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href={ROUTES.ADMIN_USERS}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="size-4" />}
            >
              Back to Users
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                {user.displayName || user.email}
              </h1>
              <Badge
                variant={user.role === "ADMIN" ? "brand" : "neutral"}
                size="sm"
              >
                {user.role === "ADMIN" && <Shield className="size-3 mr-1" />}
                {user.role}
              </Badge>
            </div>
            <p className="text-xs text-text-secondary">
              User ID: <span className="font-mono">{user.id}</span>
            </p>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadUser}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Grid: Identity & Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Account Profile Details (2 cols on lg) */}
        <div className="space-y-6 lg:col-span-2">
          <Card variant="default" className="border-border bg-surface">
            <CardHeader className="border-b border-border-subtle pb-4">
              <CardTitle as="h2" className="text-base font-semibold">
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-surface-subtle font-bold text-brand-primary text-xl shadow-xs">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="size-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="size-8" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-text-primary truncate">
                    {user.displayName || "No Display Name"}
                  </h3>
                  <p className="text-sm text-text-secondary truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 border-t border-border-subtle pt-6 text-sm">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Email Verification
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    {user.emailVerified ? (
                      <Badge variant="success" size="sm" dot>
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm" dot>
                        Unverified
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Role
                  </span>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge
                      variant={user.role === "ADMIN" ? "brand" : "neutral"}
                      size="sm"
                    >
                      {user.role === "ADMIN" && (
                        <Shield className="size-3 mr-1" />
                      )}
                      {user.role}
                    </Badge>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Registered On
                  </span>
                  <div className="mt-1.5 flex items-center gap-1.5 text-text-primary">
                    <Calendar className="size-4 text-text-secondary" />
                    <span>
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Connected Providers
                  </span>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    {user.providers && user.providers.length > 0 ? (
                      user.providers.map((p) => (
                        <Badge key={p} variant="neutral" size="sm">
                          <Key className="size-3 mr-1" />
                          {p}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-text-secondary">
                        Email & Password only
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Platform Activity & Notice (1 col on lg) */}
        <div className="space-y-6">
          <Card variant="default" className="border-border bg-surface">
            <CardHeader className="border-b border-border-subtle pb-4">
              <CardTitle as="h2" className="text-base font-semibold">
                Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-surface-subtle p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-surface text-brand-primary shadow-xs">
                    <DoorOpen className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Hosted Rooms
                    </p>
                    <p className="text-xs text-text-secondary">
                      Rooms created by user
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-text-primary">
                  {user.activity.hostedRoomsCount}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border-subtle bg-surface-subtle p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-surface text-brand-secondary shadow-xs">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                      Joined Rooms
                    </p>
                    <p className="text-xs text-text-secondary">
                      Rooms user participated in
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-text-primary">
                  {user.activity.joinedRoomsCount}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card variant="subtle" className="p-4 text-xs text-text-secondary">
            <p className="font-semibold text-text-primary mb-1">
              Read-Only Administration
            </p>
            <p>
              Account inspection is strictly read-only. Role adjustments and
              account modifications are managed through secure administrative
              tooling.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
