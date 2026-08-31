"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, MapPin, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

import { roomService, RoomApiError } from "../services/room-service";
import type { RoomPreview } from "../types/room-types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { roomTranslations } from "../i18n/room-translations";
import { formatRoomDate, formatRoomTime } from "../utils/room-format";
import { RoomPageHeader } from "./RoomPageHeader";

export interface RoomPreviewScreenProps {
  code?: string;
  inviteToken?: string;
  backHref: string;
}

export function RoomPreviewScreen({ code, inviteToken, backHref }: RoomPreviewScreenProps) {
  const { locale } = useLanguage();
  const t = roomTranslations[locale].preview;
  const [room, setRoom] = React.useState<RoomPreview | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isJoining, setIsJoining] = React.useState(false);
  const [loginReturnTo, setLoginReturnTo] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadRoom = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const preview = code
          ? await roomService.findRoomByCode(code)
          : inviteToken
            ? await roomService.findRoomByInviteToken(inviteToken)
            : null;

        if (!preview) {
          throw new RoomApiError(t.incompleteLink, 400);
        }

        if (isMounted) {
          setRoom(preview);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof RoomApiError
              ? requestError.message
              : t.genericError,
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadRoom();

    return () => {
      isMounted = false;
    };
  }, [code, inviteToken, t.incompleteLink, t.genericError]);

  const joinRoom = async () => {
    if (!room) {
      return;
    }

    setError(null);
    setLoginReturnTo(null);
    setIsJoining(true);

    try {
      await roomService.joinRoom(room.id);
      window.location.assign(ROUTES.ROOM.LOBBY(room.id));
    } catch (requestError) {
      if (requestError instanceof RoomApiError && requestError.status === 401) {
        setLoginReturnTo(`${window.location.pathname}${window.location.search}`);
      } else {
        setError(
          requestError instanceof RoomApiError
            ? requestError.message
            : t.genericError,
        );
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <main className="min-h-dvh overflow-x-clip bg-transparent text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-2 sm:px-6 sm:pt-4 md:max-w-2xl lg:max-w-3xl">

        <RoomPageHeader title={t.title} subtitle={t.subtitle} backHref={backHref} />

        {isLoading ? (
          <Card variant="outline" className="rounded-2xl p-6 text-center">
            <div className="mx-auto size-8 animate-pulse rounded-full bg-surface-subtle" aria-hidden="true" />
            <p className="mt-4 text-sm text-text-secondary" role="status">{t.loading}</p>
          </Card>
        ) : error && !room ? (
          <Alert variant="error">
            <AlertTitle>{t.unavailableTitle}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : room ? (
          <>
            <Card variant="outline" className="rounded-2xl p-5 sm:p-6 md:p-8">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-status-success-text">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                {t.foundBadge}
              </div>
              <h2 className="break-words text-2xl font-semibold tracking-tight text-text-primary">{room.name}</h2>

              <dl className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <dt className="text-sm text-text-secondary">{t.hostedBy}</dt>
                  <dd className="min-w-0 max-w-full break-words text-right font-medium text-text-primary">{room.host.displayName}</dd>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><UsersRound className="size-4" aria-hidden="true" /> {t.members}</dt>
                  <dd className="min-w-0 max-w-full break-words text-right font-medium text-text-primary">{room.memberCount} / {room.maxMembers}</dd>
                </div>
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {t.location}</dt>
                  <dd className="min-w-0 max-w-full break-words text-right font-medium text-text-primary"><span className="block">{room.locationName}</span><span className="mt-1 block text-sm font-normal text-text-secondary">{t.withinRadius(room.searchRadiusKm)}</span></dd>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><CalendarDays className="size-4" aria-hidden="true" /> {t.date}</dt>
                  <dd className="min-w-0 max-w-full break-words text-right font-medium text-text-primary">{formatRoomDate(room.scheduledAt)}</dd>
                </div>
                <div className="flex min-w-0 items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><Clock3 className="size-4" aria-hidden="true" /> {t.time}</dt>
                  <dd className="min-w-0 max-w-full break-words text-right font-medium text-text-primary">{formatRoomTime(room.scheduledAt)}</dd>
                </div>
              </dl>
            </Card>

            {error ? (
              <Alert variant="error" className="mt-4">
                <AlertTitle>{t.unableToJoinTitle}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {loginReturnTo ? (
              <Alert variant="info" className="mt-4">
                <AlertTitle>{t.loginToJoinTitle}</AlertTitle>
                <AlertDescription>
                  <Link className="font-semibold underline underline-offset-2" href={`${ROUTES.AUTH.LOGIN}?returnTo=${encodeURIComponent(loginReturnTo)}`}>{t.loginAndReturn}</Link>
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="mt-6 flex flex-col gap-3">
              <Button
                type="button"
                size="lg"
                fullWidth
                loading={isJoining}
                loadingText={t.joining}
                onClick={joinRoom}
                className="rounded-xl"
              >
                {t.joinButton}
              </Button>
              <Link
                href={backHref}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg", fullWidth: true }),
                  "rounded-xl font-medium",
                )}
              >
                {t.cancel}
              </Link>
            </div>

          </>
        ) : null}
      </div>
    </main>
  );
}
