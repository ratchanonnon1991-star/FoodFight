"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, CircleUserRound, LogOut, House } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { ROUTES } from "@/config/routes";

export interface RoomPageHeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
  showAccountActions?: boolean;
  actions?: React.ReactNode;
}

export function RoomPageHeader({
  title,
  subtitle,
  backHref,
  showAccountActions = false,
  actions,
}: RoomPageHeaderProps) {
  const [openMenu, setOpenMenu] = React.useState<"notifications" | "profile" | null>(null);
  const actionsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = (menu: "notifications" | "profile") => {
    setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));
  };

  const signOut = () => {
    window.localStorage.removeItem("accessToken");
    window.location.assign(ROUTES.AUTH.LOGIN);
  };

  return (
    <header className="flex items-start justify-between gap-3 pb-4">
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href={backHref}
          aria-label="Back"
          className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>

      <div ref={actionsRef} className="relative flex shrink-0 items-center gap-1">
        {actions}
        {showAccountActions ? (
          <>
            <IconButton
              aria-label="Notifications"
              icon={<Bell className="size-5" aria-hidden="true" />}
              className="text-text-primary"
              aria-expanded={openMenu === "notifications"}
              aria-haspopup="dialog"
              onClick={() => toggleMenu("notifications")}
            />
            <IconButton
              aria-label="Profile"
              icon={<CircleUserRound className="size-6" aria-hidden="true" />}
              className="text-text-primary"
              aria-expanded={openMenu === "profile"}
              aria-haspopup="menu"
              onClick={() => toggleMenu("profile")}
            />

            {openMenu === "notifications" ? (
              <div
                role="dialog"
                aria-label="Notifications"
                className="absolute right-0 top-12 z-20 w-64 rounded-2xl border border-border bg-surface p-4 shadow-xl"
              >
                <p className="font-semibold text-text-primary">Notifications</p>
                <p className="mt-1 text-sm text-text-secondary">You&apos;re all caught up.</p>
              </div>
            ) : null}

            {openMenu === "profile" ? (
              <div
                role="menu"
                aria-label="Profile menu"
                className="absolute right-0 top-12 z-20 w-52 rounded-2xl border border-border bg-surface p-2 shadow-xl"
              >
                <Link
                  href={ROUTES.AUTHENTICATED_HOME}
                  role="menuitem"
                  onClick={() => setOpenMenu(null)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
                >
                  <House className="size-4" aria-hidden="true" />
                  Home
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={signOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-status-danger-text transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </header>
  );
}
