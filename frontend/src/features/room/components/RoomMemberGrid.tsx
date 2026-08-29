'use client';

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import { MoreHorizontal, UserRoundPlus, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { useLanguage } from '@/i18n/LanguageProvider';
import { roomTranslations } from '../i18n/room-translations';
import type { RoomMember } from '../types/room-types';
import { getInitials } from '../utils/room-format';

export interface RoomMemberGridProps {
  memberCount: number;
  maxMembers: number;
  members: RoomMember[];
  canManageMembers: boolean;
  isMemberActionLoading: boolean;
  onOpenMemberActions: (member: RoomMember) => void;
}

export function Avatar({
  member,
  className,
}: {
  member: RoomMember;
  className?: string;
}) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );
  const avatarSize = className ?? 'size-11';
  const shouldShowImage = Boolean(
    member.avatarUrl && failedImageUrl !== member.avatarUrl,
  );

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

function MemberRow({
  member,
  isHost,
  canManage,
  isActionLoading,
  onOpenActions,
  t,
}: {
  member: RoomMember;
  isHost: boolean;
  canManage: boolean;
  isActionLoading: boolean;
  onOpenActions: (member: RoomMember) => void;
  t: (typeof roomTranslations)['en']['lobby'];
}) {
  return (
    <div className="flex min-h-16 items-center gap-3 px-3 py-2.5">
      <Avatar member={member} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium">{member.displayName}</span>
          {isHost ? <Badge size="sm">{t.hostBadge}</Badge> : null}
        </div>
      </div>
      {!isHost ? (
        <Badge size="sm" variant={member.isReady ? 'success' : 'neutral'} dot>
          {member.isReady ? t.readyBadge : t.notReadyBadge}
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

export function RoomMemberGrid({
  memberCount,
  maxMembers,
  members,
  canManageMembers,
  isMemberActionLoading,
  onOpenMemberActions,
}: RoomMemberGridProps) {
  const { locale } = useLanguage();
  const t = roomTranslations[locale].lobby;

  return (
    <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5 lg:mt-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-lg font-semibold">
          {t.membersTitle}{' '}
          <span className="font-normal text-text-secondary">
            ({memberCount} / {maxMembers})
          </span>
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled
          leftIcon={<UsersRound className="size-4" aria-hidden="true" />}
        >
          {t.memberList}
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
            t={t}
          />
        ))}
      </div>
      {memberCount < maxMembers ? (
        <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl border border-border/80 bg-surface-subtle/80 px-3.5 py-3 shadow-2xs">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface text-text-primary shadow-2xs">
              <UserRoundPlus className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-text-primary sm:text-sm">
                {t.waitingMoreFriends}
              </p>
              <p className="truncate text-[11px] text-text-secondary sm:text-xs">
                {t.shareCodePrompt}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-semibold text-text-secondary shadow-2xs">
            {memberCount} / {maxMembers}
          </span>
        </div>
      ) : null}
    </Card>
  );
}
