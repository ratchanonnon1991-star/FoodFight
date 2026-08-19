"use client";

import * as React from "react";
import { ShieldCheck, Database, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAdminUser } from "@/features/admin/guards/AdminRouteGuard";

export default function AdminPage() {
  const adminUser = useAdminUser();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            FoodFighter Admin Console
          </h1>
          <Badge variant="success" dot size="sm">
            Operational
          </Badge>
        </div>
        <p className="mt-1.5 text-sm text-text-secondary">
          Administrative foundation and access management.
        </p>
      </div>

      <Card variant="default" className="border-border bg-surface">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-status-success-bg text-status-success-text">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <CardTitle as="h2" className="text-base font-semibold">
                Admin Session Active
              </CardTitle>
              <CardDescription>
                Authenticated as {adminUser?.email || "Administrator"} with role{" "}
                <strong className="text-text-primary">ADMIN</strong>.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border-subtle bg-surface-subtle p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <ShieldCheck className="size-4 text-brand-primary" />
                <span>Security Status</span>
              </div>
              <p className="mt-2 text-sm font-medium text-text-primary">
                Role-Based Guard Active
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Protected by JWT + RolesGuard verification
              </p>
            </div>

            <div className="rounded-lg border border-border-subtle bg-surface-subtle p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <Database className="size-4 text-brand-secondary" />
                <span>API Foundation</span>
              </div>
              <p className="mt-2 text-sm font-medium text-text-primary">
                Backend Endpoints Ready
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Dashboard & User Management APIs connected
              </p>
            </div>

            <div className="rounded-lg border border-border-subtle bg-surface-subtle p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                <Activity className="size-4 text-accent-apricot" />
                <span>Next Phase</span>
              </div>
              <p className="mt-2 text-sm font-medium text-text-primary">
                Dashboard Integration
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                Live metric cards and user directory tables
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
