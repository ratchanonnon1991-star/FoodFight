"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  DoorOpen,
  LogOut,
  ArrowLeft,
  Shield,
  ReceiptText,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/i18n/LanguageProvider";
import { adminTranslations } from "../i18n/admin-translations";
import { useAdminUser } from "../guards/AdminRouteGuard";

import { BarChart3 } from "lucide-react";

export interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const adminUser = useAdminUser();
  const { locale } = useLanguage();
  const t = adminTranslations[locale].shell;

  const isDashboard = pathname === ROUTES.ADMIN;
  const isAnalytics =
    pathname === ROUTES.ADMIN_ANALYTICS ||
    pathname?.startsWith(ROUTES.ADMIN_ANALYTICS + "/");
  const isUsers =
    pathname === ROUTES.ADMIN_USERS || pathname?.startsWith("/admin/users");
  const isRooms =
    pathname === ROUTES.ADMIN_ROOMS || pathname?.startsWith("/admin/rooms");
  const isBills =
    pathname === ROUTES.ADMIN_BILLS || pathname?.startsWith("/admin/bills");

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <div className="min-h-dvh bg-background text-text-primary flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.ADMIN}
              className="flex items-center gap-2.5 font-bold text-lg text-text-primary hover:opacity-90 transition-opacity"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-brand-primary text-white shadow-xs">
                <Shield className="size-5" />
              </div>
              <span>{t.title}</span>
            </Link>
            <Badge variant="brand" size="sm">
              {t.badge}
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {adminUser && (
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-medium text-text-primary">
                  {adminUser.displayName || adminUser.email}
                </span>
                <span className="text-xs text-text-secondary">
                  {adminUser.email}
                </span>
              </div>
            )}
            <Link href={ROUTES.AUTHENTICATED_HOME}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft className="size-4" />}
              >
                {t.backToApp}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="size-4" />}
            >
              {t.logout}
            </Button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="border-t border-border-subtle bg-surface-subtle">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto">
            <Link
              href={ROUTES.ADMIN}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                isDashboard
                  ? "bg-surface font-semibold text-brand-primary shadow-xs border border-border"
                  : "font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              }`}
            >
              <LayoutDashboard className="size-4" />
              <span>{t.nav.dashboard}</span>
            </Link>
            <Link
              href={ROUTES.ADMIN_USERS}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                isUsers
                  ? "bg-surface font-semibold text-brand-primary shadow-xs border border-border"
                  : "font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              }`}
            >
              <Users className="size-4" />
              <span>{t.nav.users}</span>
            </Link>
            <Link
              href={ROUTES.ADMIN_ANALYTICS}
              className={
                isAnalytics
                  ? "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors bg-surface font-semibold text-brand-primary shadow-xs border border-border"
                  : "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              }
            >
              <BarChart3 className="size-4" />
              <span>{t.nav.analytics}</span>
            </Link>
            <Link
              href={ROUTES.ADMIN_ROOMS}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                isRooms
                  ? "bg-surface font-semibold text-brand-primary shadow-xs border border-border"
                  : "font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              }`}
            >
              <DoorOpen className="size-4" />
              <span>{t.nav.rooms}</span>
            </Link>
            <Link
              href={ROUTES.ADMIN_BILLS}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
                isBills
                  ? "bg-surface font-semibold text-brand-primary shadow-xs border border-border"
                  : "font-medium text-text-secondary hover:text-text-primary hover:bg-surface-subtle"
              }`}
            >
              <ReceiptText className="size-4" />
              <span>{t.nav.bills}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
