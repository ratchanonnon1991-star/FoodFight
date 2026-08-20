"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Utensils,
  Users,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { formatRoomDate, formatRoomTime } from "@/features/room/utils/room-format";
import { getMyHistory, HistoryApiError } from "../services/history-service";
import type { HistoryItem } from "../types/history-types";

function HistoryStatusBadge({ status }: { status: HistoryItem["status"] }) {
  const isCompleted = status === "COMPLETED";

  return (
    <span
      className={
        isCompleted
          ? "rounded-full bg-status-success-bg px-2.5 py-1 text-[11px] font-bold text-status-success-text"
          : "rounded-full bg-status-danger-bg px-2.5 py-1 text-[11px] font-bold text-status-danger-text"
      }
    >
      {isCompleted ? "Completed" : "Cancelled"}
    </span>
  );
}

function HistoryItemCard({ item }: { item: HistoryItem }) {
  return (
    <article className="rounded-2xl border border-border/80 bg-surface p-4 shadow-xs sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-text-primary">{item.room.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{item.room.locationName}</span>
          </p>
        </div>
        <HistoryStatusBadge status={item.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5" />
          {formatRoomDate(item.completedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5" />
          {formatRoomTime(item.completedAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="size-3.5" />
          {item.memberCount} {item.memberCount === 1 ? "member" : "members"}
        </span>
      </div>

      {item.status === "COMPLETED" && (item.restaurant || item.finalMenu) ? (
        <div className="mt-4 grid gap-2 rounded-xl bg-surface-subtle p-3 sm:grid-cols-2">
          {item.restaurant ? (
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Restaurant
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-text-primary">
                {item.restaurant.name}
              </p>
              {item.restaurant.address ? (
                <p className="mt-0.5 truncate text-xs text-text-secondary">
                  {item.restaurant.address}
                </p>
              ) : null}
            </div>
          ) : null}
          {item.finalMenu ? (
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                Winning menu
              </p>
              <p className="mt-1 flex items-center gap-1.5 truncate text-sm font-semibold text-text-primary">
                <Utensils className="size-3.5 shrink-0 text-brand-primary" />
                <span className="truncate">{item.finalMenu.name}</span>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-3 text-xs text-text-muted">
        {item.role === "HOST" ? "Hosted by you" : "Joined by you"}
      </p>
    </article>
  );
}

function HistoryLoadingState() {
  return (
    <div className="space-y-3" aria-label="Loading history" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-36 animate-pulse rounded-2xl bg-surface-muted" />
      ))}
    </div>
  );
}

export function HistoryPageContent() {
  const router = useRouter();
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const loadHistory = React.useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setItems(await getMyHistory());
    } catch (error: unknown) {
      if (error instanceof HistoryApiError && error.status === 401) {
        window.localStorage.removeItem("accessToken");
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load your history.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  React.useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer maxWidth="auth" className="space-y-5 pb-32 pt-5 sm:space-y-6 sm:pt-8">
        <header className="flex items-start gap-3">
          <Link
            href={ROUTES.AUTHENTICATED_HOME}
            aria-label="Back to home"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
              Your activity
            </p>
            <h1 className="text-2xl font-bold text-text-primary">History</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Review your completed FoodFights and past group meals.
            </p>
          </div>
        </header>

        {errorMessage ? (
          <Alert variant="error">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <HistoryLoadingState />
        ) : items.length > 0 ? (
          <section aria-label="FoodFight history" className="space-y-3">
            {items.map((item) => (
              <HistoryItemCard key={item.id} item={item} />
            ))}
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center shadow-xs">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-surface-subtle text-brand-primary">
              <Clock3 className="size-6" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text-primary">No history yet</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
              Your completed FoodFights will appear here once you finish a group meal.
            </p>
            <Link
              href={ROUTES.ROOM.CREATE}
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
            >
              Start a FoodFight
            </Link>
          </section>
        )}
      </PageContainer>
    </main>
  );
}
