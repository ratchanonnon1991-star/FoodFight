'use client';

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import {
  Check,
  Crown,
  LogOut,
  MoreHorizontal,
  Play,
  Settings,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { ROUTES } from '@/config/routes';
import { useLanguage } from '@/i18n/LanguageProvider';
import { roomTranslations } from '../i18n/room-translations';
import type { RoomLobby, RoomMember } from '../types/room-types';
import { formatRoomDate, formatRoomTime } from '../utils/room-format';
import { RoomMemberGrid, Avatar } from './RoomMemberGrid';
import { RoomLobbyActionBar } from './RoomLobbyActionBar';
import { RoomPageHeader } from './RoomPageHeader';

type RoomLobbyLayoutProps = {
  room: RoomLobby;
  hostMember: RoomMember;
  members: RoomMember[];
  error: string | null;
  canInvite: boolean;
  canManageMembers: boolean;
  areAllMembersReady: boolean;
  canStartFoodFight: boolean;
  isCurrentUserReady: boolean;
  isReadyLoading: boolean;
  isStartingRoom: boolean;
  isMemberActionLoading: boolean;
  onOpenInvite: () => void;
  onOpenSettings: () => void;
  onOpenRoomActions: () => void;
  onOpenDetails: () => void;
  onOpenMemberActions: (member: RoomMember) => void;
  onStartFoodFight: () => void;
  onSetReady: () => void;
  onOpenLeave: () => void;
};

export function RoomLobbyLayout({
  room,
  hostMember,
  members,
  error,
  canInvite,
  canManageMembers,
  areAllMembersReady,
  canStartFoodFight,
  isCurrentUserReady,
  isReadyLoading,
  isStartingRoom,
  isMemberActionLoading,
  onOpenInvite,
  onOpenSettings,
  onOpenRoomActions,
  onOpenDetails,
  onOpenMemberActions,
  onStartFoodFight,
  onSetReady,
  onOpenLeave,
}: RoomLobbyLayoutProps) {
  const { locale } = useLanguage();
  const t = roomTranslations[locale].lobby;

  return (
    <main className="min-h-dvh overflow-x-clip bg-transparent text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-2 sm:px-6 sm:pt-4 md:max-w-4xl lg:max-w-6xl">

        <RoomPageHeader
          title={t.title}
          subtitle={t.subtitle}
          backHref={ROUTES.AUTHENTICATED_HOME}
          actions={
            <>
              <IconButton
                aria-label={
                  room.isHost ? t.settingsHost : t.settingsHostOnly
                }
                aria-haspopup={room.isHost ? 'dialog' : undefined}
                disabled={!room.isHost}
                variant="glass"
                icon={<Settings className="size-5" aria-hidden="true" />}
                onClick={onOpenSettings}
              />
              <IconButton
                aria-label={t.roomActions}
                aria-haspopup="dialog"
                variant="glass"
                icon={<MoreHorizontal className="size-5" aria-hidden="true" />}
                onClick={onOpenRoomActions}
              />
            </>
          }

        />
        {error ? (
          <Alert variant="error" className="mb-4">
            <AlertTitle>Action unavailable</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-5">
            <RoomSummaryCard
              room={room}
              hostMember={hostMember}
              canInvite={canInvite}
              onOpenDetails={onOpenDetails}
              onOpenInvite={onOpenInvite}
              t={t}
            />
          </div>

          <div className="min-w-0 space-y-4 lg:col-span-7">
            <RoomMemberGrid
              memberCount={room.memberCount}
              maxMembers={room.maxMembers}
              members={members}
              canManageMembers={canManageMembers}
              isMemberActionLoading={isMemberActionLoading}
              onOpenMemberActions={onOpenMemberActions}
            />
            <RoomLobbyActionBar
              isHost={room.isHost}
              status={room.status}
              areAllMembersReady={areAllMembersReady}
              canStartFoodFight={canStartFoodFight}
              isCurrentUserReady={isCurrentUserReady}
              isReadyLoading={isReadyLoading}
              isStartingRoom={isStartingRoom}
              onStartFoodFight={onStartFoodFight}
              onSetReady={onSetReady}
              onOpenLeave={onOpenLeave}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function RoomSummaryCard({
  room,
  hostMember,
  canInvite,
  onOpenDetails,
  onOpenInvite,
  t,
}: {
  room: RoomLobby;
  hostMember: RoomMember;
  canInvite: boolean;
  onOpenDetails: () => void;
  onOpenInvite: () => void;
  t: (typeof roomTranslations)['en']['lobby'];
}) {
  return (
    <>
      <Card variant="outline" className="rounded-2xl p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="relative flex size-16 items-center justify-center rounded-full border border-border bg-surface-subtle">
              <Crown
                className="absolute -top-3 z-10 size-5 text-text-primary"
                aria-hidden="true"
              />
              <Avatar member={hostMember} className="size-14" />
            </div>
            <Badge size="sm">{t.hostBadge}</Badge>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold">{room.name}</h2>
            <p className="mt-1 text-sm text-text-secondary">
              {formatRoomDate(room.scheduledAt)}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {formatRoomTime(room.scheduledAt)}
            </p>
            <p className="mt-1 truncate text-sm text-text-secondary">
              {room.locationName} <span aria-hidden="true">•</span> Within{' '}
              {room.searchRadiusKm} km
            </p>
          </div>
          <div className="shrink-0 text-right">
            <UsersRound
              className="ml-auto size-7 text-text-primary"
              aria-hidden="true"
            />
            <p className="mt-1 text-lg font-semibold">
              {room.memberCount} / {room.maxMembers}
            </p>
            <p className="text-xs text-text-secondary">{t.membersTitle}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end border-t border-border pt-3">
          <Button type="button" variant="outline" size="sm" onClick={onOpenDetails}>
            {t.viewDetails}
          </Button>
        </div>
      </Card>

      {canInvite ? (
        <button
          type="button"
          onClick={onOpenInvite}
          className="mt-4 flex min-h-20 w-full items-center justify-between rounded-2xl border border-dashed border-border bg-surface px-5 py-4 text-left shadow-2xs transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary active:scale-[0.99]"
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-semibold text-text-primary">
              <UserRoundPlus className="size-5" aria-hidden="true" /> {t.inviteFriends}
            </span>
            <span className="mt-1 block text-sm text-text-secondary">
              {t.inviteSubtitle}
            </span>
          </span>
          <span className="shrink-0 text-2xl text-text-secondary" aria-hidden="true">
            ›
          </span>
        </button>
      ) : null}
    </>
  );
}

export function LobbyLoading() {
  return (
    <main className="min-h-dvh overflow-x-clip bg-transparent px-4 pt-5 text-text-primary">
      <div className="mx-auto w-full max-w-md md:max-w-4xl lg:max-w-6xl">
        <RoomPageHeader
          title="Room Lobby"
          subtitle="Invite friends and get ready!"
          backHref={ROUTES.AUTHENTICATED_HOME}
        />
        <Card variant="outline" className="rounded-2xl p-6 text-center">
          <div className="mx-auto size-8 animate-pulse rounded-full bg-surface-subtle" aria-hidden="true" />
          <p className="mt-4 text-sm text-text-secondary" role="status">
            Loading room...
          </p>
        </Card>
      </div>
    </main>
  );
}

export function RoomUnavailable({ error }: { error: string | null }) {
  return (
    <main className="min-h-dvh overflow-x-clip bg-transparent px-4 pt-5 text-text-primary">
      <div className="mx-auto w-full max-w-md md:max-w-4xl lg:max-w-6xl">
        <RoomPageHeader
          title="Room Lobby"
          subtitle="Invite friends and get ready!"
          backHref={ROUTES.AUTHENTICATED_HOME}
        />
        <Alert variant="error">
          <AlertTitle>Room unavailable</AlertTitle>
          <AlertDescription>{error ?? 'This room could not be loaded.'}</AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
