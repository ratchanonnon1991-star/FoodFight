"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Utensils,
  Users,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import {
  AuthenticatedPageHeader,
  AuthenticatedPageLayout,
} from "@/components/layout/AuthenticatedPageLayout";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { useLanguage } from "@/i18n/LanguageProvider";
import { historyTranslations } from "../i18n/history-translations";
import { formatRoomDate, formatRoomTime } from "@/features/room/utils/room-format";
import { getMyHistory, HistoryApiError } from "../services/history-service";
import type { HistoryItem } from "../types/history-types";

function HistoryStatusBadge({
  status,
  t,
}: {
  status: HistoryItem["status"];
  t: { completed: string; cancelled: string };
}) {
  const isCompleted = status === "COMPLETED";

  return (
    <span
      className={
        isCompleted
          ? "rounded-full bg-status-success-bg px-2.5 py-1 text-[11px] font-bold text-status-success-text"
          : "rounded-full bg-status-danger-bg px-2.5 py-1 text-[11px] font-bold text-status-danger-text"
      }
    >
      {isCompleted ? t.completed : t.cancelled}
    </span>
  );
}

function HistoryItemCard({
  item,
  t,
}: {
  item: HistoryItem;
  t: typeof historyTranslations["en"];
}) {
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
        <HistoryStatusBadge status={item.status} t={t} />
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
          {item.memberCount} {item.memberCount === 1 ? t.memberSingular : t.memberPlural}
        </span>
      </div>

      {item.status === "COMPLETED" && (item.restaurant || item.finalMenu) ? (
        <div className="mt-4 grid gap-2 rounded-xl bg-surface-subtle p-3 sm:grid-cols-2">
          {item.restaurant ? (
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                {t.restaurant}
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
                {t.winningMenu}
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
        {item.role === "HOST" ? t.hostedByYou : t.joinedByYou}
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
  const { locale } = useLanguage();
  const t = historyTranslations[locale];
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const loadHistory = React.useCallback(async () => {
    try {
      setItems(await getMyHistory());
    } catch (error: unknown) {
      if (error instanceof HistoryApiError && error.status === 401) {
        window.localStorage.removeItem("accessToken");
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : t.errorDefault,
      );
    } finally {
      setIsLoading(false);
    }
  }, [router, t.errorDefault]);

  React.useEffect(() => {
    void Promise.resolve().then(loadHistory);
  }, [loadHistory]);

  return (
    <AuthenticatedPageLayout>
      <AuthenticatedPageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />

      {errorMessage ? (
        <Alert variant="error">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <HistoryLoadingState />
      ) : items.length > 0 ? (
        <section aria-label={t.title} className="space-y-3">
          {items.map((item) => (
            <HistoryItemCard key={item.id} item={item} t={t} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-surface-subtle text-brand-primary">
            <Clock3 className="size-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-text-primary">{t.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
            {t.emptyDesc}
          </p>
          <Link
            href={ROUTES.ROOM.CREATE}
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            {t.startFoodFight}
          </Link>
        </section>
      )}
    </AuthenticatedPageLayout>
  );
}
