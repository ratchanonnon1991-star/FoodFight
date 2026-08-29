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
import { formatRoomDate, formatRoomTime, getInitials } from '../utils/room-format';
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
    <main className="min-h-dvh overflow-x-clip bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-4xl lg:max-w-6xl">
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
                icon={<Settings className="size-5" aria-hidden="true" />}
                className="text-text-primary"
                onClick={onOpenSettings}
              />
              <IconButton
                aria-label={t.roomActions}
                aria-haspopup="dialog"
                icon={<MoreHorizontal className="size-5" aria-hidden="true" />}
                className="text-text-primary"
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

        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-5">
            <RoomSummaryCard
              room={room}
              hostMember={hostMember}
              canInvite={canInvite}
              onOpenDetails={onOpenDetails}
              onOpenInvite={onOpenInvite}
            />
          </div>

          <div className="min-w-0 lg:col-span-7">
            <MembersCard
              room={room}
              members={members}
              canManageMembers={canManageMembers}
              isMemberActionLoading={isMemberActionLoading}
              onOpenMemberActions={onOpenMemberActions}
            />
            <HowItWorksCard
              room={room}
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
}: {
  room: RoomLobby;
  hostMember: RoomMember;
  canInvite: boolean;
  onOpenDetails: () => void;
  onOpenInvite: () => void;
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
            <Badge size="sm">Host</Badge>
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
            <p className="text-xs text-text-secondary">Members</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end border-t border-border pt-3">
          <Button type="button" variant="outline" size="sm" onClick={onOpenDetails}>
            View details
          </Button>
        </div>
      </Card>

      {canInvite ? (
        <button
          type="button"
          onClick={onOpenInvite}
          className="mt-4 flex min-h-24 w-full items-center justify-between rounded-2xl border border-dashed border-border bg-surface px-5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-semibold">
              <UserRoundPlus className="size-5" aria-hidden="true" /> Invite Friends
            </span>
            <span className="mt-1 block text-sm text-text-secondary">
              Invite via QR code, link or room code
            </span>
          </span>
          <span className="shrink-0 text-2xl text-text-primary" aria-hidden="true">
            ›
          </span>
        </button>
      ) : null}
    </>
  );
}

function MembersCard({
  room,
  members,
  canManageMembers,
  isMemberActionLoading,
  onOpenMemberActions,
}: {
  room: RoomLobby;
  members: RoomMember[];
  canManageMembers: boolean;
  isMemberActionLoading: boolean;
  onOpenMemberActions: (member: RoomMember) => void;
}) {
  return (
    <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5 lg:mt-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-lg font-semibold">
          Members{' '}
          <span className="font-normal text-text-secondary">
            ({room.memberCount} / {room.maxMembers})
          </span>
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled
          leftIcon={<UsersRound className="size-4" aria-hidden="true" />}
        >
          Member List
        </Button>
      </div>
      <div className="relative mt-4 divide-y divide-border rounded-xl border border-border">
        {members.map((member, index) => (
          <MemberRow
            key={member.id}
            member={member}
            isHost={index === 0}
            canManage={canManageMembers}
            isActionLoading={isMemberActionLoading}
            onOpenActions={onOpenMemberActions}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface-subtle px-4 py-4">
        <UserRoundPlus className="size-8 shrink-0 text-text-primary" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-medium">Waiting for more friends to join...</p>
          <p className="mt-1 text-sm text-text-secondary">
            Share the code or invite link above!
          </p>
        </div>
      </div>
    </Card>
  );
}

function HowItWorksCard({
  room,
  areAllMembersReady,
  canStartFoodFight,
  isCurrentUserReady,
  isReadyLoading,
  isStartingRoom,
  onStartFoodFight,
  onSetReady,
  onOpenLeave,
}: {
  room: RoomLobby;
  areAllMembersReady: boolean;
  canStartFoodFight: boolean;
  isCurrentUserReady: boolean;
  isReadyLoading: boolean;
  isStartingRoom: boolean;
  onStartFoodFight: () => void;
  onSetReady: () => void;
  onOpenLeave: () => void;
}) {
  return (
    <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5">
      <h2 className="text-lg font-semibold">How it works</h2>
      <div className="mt-5 grid grid-cols-4 gap-2 text-center">
        {[
          [<UsersRound key="members" className="size-5" aria-hidden="true" />, 'Everyone joins'],
          [<CheckCircleIcon key="ready" />, 'Members get ready'],
          [<ClipboardIcon key="preference" />, 'Everyone fills preferences'],
          [<SparkleIcon key="ai" />, 'AI suggests menus'],
        ].map(([icon, label]) => (
          <div key={label as string} className="flex min-w-0 flex-col items-center gap-2">
            <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-subtle">
              {icon}
            </span>
            <span className="text-[11px] leading-snug text-text-secondary">{label}</span>
          </div>
        ))}
      </div>
      {room.isHost ? (
        <>
          <Button
            type="button"
            fullWidth
            disabled={!canStartFoodFight}
            loading={isStartingRoom}
            className="mt-5"
            leftIcon={<Play className="size-4 fill-current" aria-hidden="true" />}
            onClick={onStartFoodFight}
          >
            {room.status === 'IN_PROGRESS' ? 'FoodFight started' : 'Start FoodFight'}
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">
            {room.status === 'IN_PROGRESS'
              ? 'FoodFight is now in progress.'
              : areAllMembersReady
                ? 'Everyone is ready. You can start FoodFight.'
                : 'When everyone is ready, the host can start FoodFight.'}
          </p>
        </>
      ) : room.status === 'LOBBY' ? (
        <>
          <Button
            type="button"
            fullWidth
            loading={isReadyLoading}
            className="mt-5"
            leftIcon={<Check className="size-4" aria-hidden="true" />}
            onClick={onSetReady}
          >
            {isCurrentUserReady ? 'Not Ready' : 'Ready'}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outline"
            className="mt-2"
            leftIcon={<LogOut className="size-4" aria-hidden="true" />}
            onClick={onOpenLeave}
          >
            Exit room
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">
            When everyone is ready, the host can start FoodFight.
          </p>
        </>
      ) : (
        <p className="mt-5 text-center text-sm text-text-secondary">
          FoodFight is now in progress.
        </p>
      )}
    </Card>
  );
}

function MemberRow({
  member,
  isHost,
  canManage,
  isActionLoading,
  onOpenActions,
}: {
  member: RoomMember;
  isHost: boolean;
  canManage: boolean;
  isActionLoading: boolean;
  onOpenActions: (member: RoomMember) => void;
}) {
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
        <Badge size="sm" variant={member.isReady ? 'success' : 'neutral'} dot>
          {member.isReady ? 'Ready' : 'Not Ready'}
        </Badge>
      ) : null}
      {!isHost && canManage ? (
        <IconButton
          aria-label={`Actions for ${member.displayName}`}
          aria-haspopup="dialog"
          disabled={isActionLoading}
          icon={<MoreHorizontal className="size-5" aria-hidden="true" />}
          className="size-9 shrink-0 text-text-primary"
          onClick={() => onOpenActions(member)}
        />
      ) : null}
    </div>
  );
}

function Avatar({ member, className }: { member: RoomMember; className?: string }) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null);
  const avatarSize = className ?? 'size-11';
  const shouldShowImage = Boolean(member.avatarUrl && failedImageUrl !== member.avatarUrl);

  if (shouldShowImage) {
    return (
      <img
        key={member.avatarUrl}
        src={member.avatarUrl ?? undefined}
        alt={`${member.displayName}'s profile`}
        className={`${avatarSize} rounded-full object-cover`}
        referrerPolicy="no-referrer"
        onError={() => setFailedImageUrl(member.avatarUrl ?? null)}
      />
    );
  }

  return (
    <span
      className={`${avatarSize} flex items-center justify-center rounded-full bg-surface-subtle text-sm font-semibold text-text-secondary`}
      aria-hidden="true"
    >
      {getInitials(member.displayName) || '?'}
    </span>
  );
}

export function LobbyLoading() {
  return (
    <main className="min-h-dvh overflow-x-clip bg-background px-4 pt-5 text-text-primary">
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
    <main className="min-h-dvh overflow-x-clip bg-background px-4 pt-5 text-text-primary">
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

function CheckCircleIcon() {
  return (
    <span className="text-text-primary" aria-hidden="true">
      ✓
    </span>
  );
}

function ClipboardIcon() {
  return (
    <span className="text-text-primary" aria-hidden="true">
      ▤
    </span>
  );
}

function SparkleIcon() {
  return (
    <span className="text-text-primary" aria-hidden="true">
      ✦
    </span>
  );
}
