"use client";

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { Crown, MoreHorizontal, Play, Settings, UserRoundPlus, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { ROUTES } from "@/config/routes";
import { roomService, RoomApiError } from "../services/room-service";
import type { RoomLobby, RoomMember } from "../types/room-types";
import { formatRoomDate, formatRoomTime, getInitials } from "../utils/room-format";
import { InviteFriendsSheet } from "./InviteFriendsSheet";
import { RoomPageHeader } from "./RoomPageHeader";

export function RoomLobbyScreen({ roomId }: { roomId: string }) {
  const [room, setRoom] = React.useState<RoomLobby | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadRoom = async () => {
      try {
        const result = await roomService.getRoom(roomId);

        if (isMounted) {
          setRoom(result);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof RoomApiError
              ? requestError.message
              : "Unable to load the room.",
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
  }, [roomId]);

  if (isLoading) {
    return <LobbyLoading />;
  }

  if (!room) {
    return (
      <main className="min-h-dvh bg-background px-4 pt-5 text-text-primary">
        <div className="mx-auto max-w-md">
          <RoomPageHeader title="Room Lobby" subtitle="Invite friends and get ready!" backHref={ROUTES.AUTHENTICATED_HOME} />
          <Alert variant="error">
            <AlertTitle>Room unavailable</AlertTitle>
            <AlertDescription>{error ?? "This room could not be loaded."}</AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  const hostMember: RoomMember = {
    id: `host-${room.id}`,
    userId: "host",
    displayName: room.host.displayName,
    avatarUrl: room.host.avatarUrl,
    isReady: false,
    joinedAt: room.scheduledAt,
  };
  const members = [hostMember, ...room.members];
  const canInvite = Boolean(room.inviteLink);

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5">
        <RoomPageHeader
          title="Room Lobby"
          subtitle="Invite friends and get ready!"
          backHref={ROUTES.AUTHENTICATED_HOME}
          actions={
            <>
              <IconButton aria-label="Room settings (coming soon)" disabled icon={<Settings className="size-5" aria-hidden="true" />} className="text-text-primary" />
              <IconButton aria-label="More room actions (coming soon)" disabled icon={<MoreHorizontal className="size-5" aria-hidden="true" />} className="text-text-primary" />
            </>
          }
        />

        <Card variant="outline" className="rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div className="relative flex size-16 items-center justify-center rounded-full border border-border bg-surface-subtle">
                <Crown className="absolute -top-3 size-5 text-text-primary" aria-hidden="true" />
                <Avatar member={hostMember} />
              </div>
              <Badge size="sm">Host</Badge>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold">{room.name}</h2>
              <p className="mt-1 text-sm text-text-secondary">{formatRoomDate(room.scheduledAt)}</p>
              <p className="mt-1 text-sm text-text-secondary">{formatRoomTime(room.scheduledAt)}</p>
              <p className="mt-1 truncate text-sm text-text-secondary">{room.locationName} <span aria-hidden="true">•</span> Within {room.searchRadiusKm} km</p>
            </div>
            <div className="shrink-0 text-right">
              <UsersRound className="ml-auto size-7 text-text-primary" aria-hidden="true" />
              <p className="mt-1 text-lg font-semibold">{room.memberCount} / {room.maxMembers}</p>
              <p className="text-xs text-text-secondary">Members</p>
            </div>
          </div>
        </Card>

        {canInvite ? (
          <button type="button" onClick={() => setIsInviteOpen(true)} className="mt-4 flex min-h-24 w-full items-center justify-between rounded-2xl border border-dashed border-border bg-surface px-5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary">
            <span>
              <span className="flex items-center gap-2 font-semibold"><UserRoundPlus className="size-5" aria-hidden="true" /> Invite Friends</span>
              <span className="mt-1 block text-sm text-text-secondary">Invite via QR code, link or room code</span>
            </span>
            <span className="text-2xl text-text-primary" aria-hidden="true">›</span>
          </button>
        ) : null}

        <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Members <span className="font-normal text-text-secondary">({room.memberCount} / {room.maxMembers})</span></h2>
            <Button type="button" variant="outline" size="sm" disabled leftIcon={<UsersRound className="size-4" aria-hidden="true" />}>Member List</Button>
          </div>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {members.map((member, index) => (
              <MemberRow key={member.id} member={member} isHost={index === 0} />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface-subtle px-4 py-4">
            <UserRoundPlus className="size-8 shrink-0 text-text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">Waiting for more friends to join...</p>
              <p className="mt-1 text-sm text-text-secondary">Share the code or invite link above!</p>
            </div>
          </div>
        </Card>

        <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5">
          <h2 className="text-lg font-semibold">How it works</h2>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {[
              [<UsersRound key="members" className="size-5" aria-hidden="true" />, "Everyone joins"],
              [<CheckCircleIcon key="ready" />, "Members get ready"],
              [<ClipboardIcon key="preference" />, "Everyone fills preferences"],
              [<SparkleIcon key="ai" />, "AI suggests menus"],
            ].map(([icon, label]) => (
              <div key={label as string} className="flex min-w-0 flex-col items-center gap-2">
                <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-subtle">{icon}</span>
                <span className="text-[11px] leading-snug text-text-secondary">{label}</span>
              </div>
            ))}
          </div>
          <Button type="button" fullWidth disabled className="mt-5" leftIcon={<Play className="size-4 fill-current" aria-hidden="true" />}>
            Start FoodFight
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">Ready and Start will be enabled in the next room phase.</p>
        </Card>
      </div>

      {isInviteOpen ? <InviteFriendsSheet room={room} onClose={() => setIsInviteOpen(false)} /> : null}
    </main>
  );
}

function MemberRow({ member, isHost }: { member: RoomMember; isHost: boolean }) {
  return (
    <div className="flex min-h-16 items-center gap-3 px-3 py-2.5">
      <Avatar member={member} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium">{member.displayName}</span>
          {isHost ? <Badge size="sm">Host</Badge> : null}
        </div>
      </div>
      {!isHost ? (
        <Badge size="sm" variant={member.isReady ? "success" : "neutral"} dot>{member.isReady ? "Ready" : "Not Ready"}</Badge>
      ) : null}
      <MoreHorizontal className="size-5 shrink-0 text-text-primary" aria-hidden="true" />
    </div>
  );
}

function Avatar({ member }: { member: RoomMember }) {
  if (member.avatarUrl) {
    return <img src={member.avatarUrl} alt="" className="size-11 rounded-full object-cover" />;
  }

  return <span className="flex size-11 items-center justify-center rounded-full bg-surface-subtle text-sm font-semibold text-text-secondary" aria-hidden="true">{getInitials(member.displayName) || "?"}</span>;
}

function LobbyLoading() {
  return (
    <main className="min-h-dvh bg-background px-4 pt-5 text-text-primary">
      <div className="mx-auto max-w-md">
        <RoomPageHeader title="Room Lobby" subtitle="Invite friends and get ready!" backHref={ROUTES.AUTHENTICATED_HOME} />
        <Card variant="outline" className="rounded-2xl p-6 text-center">
          <div className="mx-auto size-8 animate-pulse rounded-full bg-surface-subtle" aria-hidden="true" />
          <p className="mt-4 text-sm text-text-secondary" role="status">Loading room...</p>
        </Card>
      </div>
    </main>
  );
}

function CheckCircleIcon() {
  return <span className="text-text-primary" aria-hidden="true">✓</span>;
}

function ClipboardIcon() {
  return <span className="text-text-primary" aria-hidden="true">▤</span>;
}

function SparkleIcon() {
  return <span className="text-text-primary" aria-hidden="true">✦</span>;
}
