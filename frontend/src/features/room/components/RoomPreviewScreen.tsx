"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, MapPin, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/config/routes";
import { roomService, RoomApiError } from "../services/room-service";
import type { RoomPreview } from "../types/room-types";
import { formatRoomDate, formatRoomTime } from "../utils/room-format";
import { RoomPageHeader } from "./RoomPageHeader";

export interface RoomPreviewScreenProps {
  code?: string;
  inviteToken?: string;
  backHref: string;
}

export function RoomPreviewScreen({ code, inviteToken, backHref }: RoomPreviewScreenProps) {
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
          throw new RoomApiError("This room preview link is incomplete.", 400);
        }

        if (isMounted) {
          setRoom(preview);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof RoomApiError
              ? requestError.message
              : "Unable to load this room. Please try again.",
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
  }, [code, inviteToken]);

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
            : "Unable to join this room. Please try again.",
        );
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-10 pt-3 sm:px-6 sm:pt-5">
        <RoomPageHeader title="Room Preview" subtitle="Review the room details before joining." backHref={backHref} />

        {isLoading ? (
          <Card variant="outline" className="rounded-2xl p-6 text-center">
            <div className="mx-auto size-8 animate-pulse rounded-full bg-surface-subtle" aria-hidden="true" />
            <p className="mt-4 text-sm text-text-secondary" role="status">Loading room details...</p>
          </Card>
        ) : error && !room ? (
          <Alert variant="error">
            <AlertTitle>Room unavailable</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : room ? (
          <>
            <Card variant="outline" className="rounded-2xl p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-status-success-text">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                Room Found!
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-text-primary">{room.name}</h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-text-secondary">Hosted by</dt>
                  <dd className="font-medium text-text-primary">{room.host.displayName}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><UsersRound className="size-4" aria-hidden="true" /> Members</dt>
                  <dd className="font-medium text-text-primary">{room.memberCount} / {room.maxMembers}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> Location</dt>
                  <dd className="text-right font-medium text-text-primary"><span className="block">{room.locationName}</span><span className="mt-1 block text-sm font-normal text-text-secondary">Within {room.searchRadiusKm} km</span></dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><CalendarDays className="size-4" aria-hidden="true" /> Date</dt>
                  <dd className="font-medium text-text-primary">{formatRoomDate(room.scheduledAt)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-sm text-text-secondary"><Clock3 className="size-4" aria-hidden="true" /> Time</dt>
                  <dd className="font-medium text-text-primary">{formatRoomTime(room.scheduledAt)}</dd>
                </div>
              </dl>
            </Card>

            {error ? (
              <Alert variant="error" className="mt-4">
                <AlertTitle>Unable to join</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {loginReturnTo ? (
              <Alert variant="info" className="mt-4">
                <AlertTitle>Log in to join this room</AlertTitle>
                <AlertDescription>
                  <Link className="font-semibold underline underline-offset-2" href={`${ROUTES.AUTH.LOGIN}?returnTo=${encodeURIComponent(loginReturnTo)}`}>Log in and return to this room</Link>
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="mt-5 space-y-3">
              <Button type="button" size="lg" fullWidth loading={isJoining} loadingText="Joining room" onClick={joinRoom}>
                Join This Room
              </Button>
              <Link href={backHref} className="inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-subtle hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-secondary">
                Cancel
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
