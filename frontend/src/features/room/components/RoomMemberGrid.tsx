'use client';

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import { Check, MoreHorizontal, UserRoundPlus, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { useLanguage } from '@/i18n/LanguageProvider';
import {
  MEMBER_IDENTITY_PALETTE_15,
  resolveRoomMemberAccents,
  type MemberIdentityAccent,
} from '@/lib/member-identity/member-identity';
import { cn } from '@/lib/utils/cn';
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
  accent,
  className,
}: {
  member: RoomMember;
  accent?: MemberIdentityAccent;
  className?: string;
}) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );
  const avatarSize = className ?? 'size-10 sm:size-11';
  const shouldShowImage = Boolean(
    member.avatarUrl && failedImageUrl !== member.avatarUrl,
  );

  const ringClass = accent ? cn('ring-2', accent.ringClass) : '';

  if (shouldShowImage) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-white shadow-2xs',
          avatarSize,
          ringClass,
        )}
      >
        <img
          key={member.avatarUrl}
          src={member.avatarUrl ?? undefined}
          alt={`${member.displayName}'s profile`}
          className="size-full object-cover rounded-full"
          referrerPolicy="no-referrer"
          onError={() => setFailedImageUrl(member.avatarUrl ?? null)}
        />
      </div>
    );
  }

  return (
    <span
      className={cn(
        avatarSize,
        'relative flex items-center justify-center shrink-0 rounded-full text-xs sm:text-sm font-extrabold shadow-2xs select-none',
        ringClass,
        accent ? accent.initialsBgClass : 'bg-surface-subtle text-text-secondary',
      )}
      aria-hidden="true"
    >
      {getInitials(member.displayName) || '?'}
    </span>
  );
}

function MemberRow({
  member,
  accent,
  isHost,
  canManage,
  isActionLoading,
  onOpenActions,
  t,
}: {
  member: RoomMember;
  accent: MemberIdentityAccent;
  isHost: boolean;
  canManage: boolean;
  isActionLoading: boolean;
  onOpenActions: (member: RoomMember) => void;
  t: (typeof roomTranslations)['en']['lobby'];
}) {
  return (
    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 sm:p-4 shadow-sm flex items-center justify-between gap-3 overflow-hidden text-[#211D19]">
      {/* 4px Left Identity Rail */}
      <div
        className={cn('absolute left-0 top-0 bottom-0 w-[4px]', accent.railClass)}
      />

      <div className="flex items-center gap-3 min-w-0 pl-1 flex-1">
        <Avatar member={member} accent={accent} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="truncate text-sm sm:text-base font-extrabold text-[#211D19]">
              {member.displayName}
            </span>
            {isHost ? (
              <span className="rounded bg-brand-primary px-1.5 py-0.5 text-[10px] font-black uppercase text-white">
                {t.hostBadge}
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="size-2 rounded-full shrink-0 shadow-2xs"
              style={{ backgroundColor: accent.baseHex }}
            />
            <span className="text-[11px] font-semibold text-[#665E55]">
              {accent.nameTh} ({accent.nameEn})
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {!isHost ? (
          <Badge size="sm" variant={member.isReady ? 'success' : 'neutral'} dot>
            {member.isReady ? t.readyBadge : t.notReadyBadge}
          </Badge>
        ) : (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <Check className="size-3.5 stroke-[3]" /> {t.readyBadge}
          </span>
        )}
        {!isHost && canManage ? (
          <IconButton
            aria-label={`Actions for ${member.displayName}`}
            aria-haspopup="dialog"
            disabled={isActionLoading}
            icon={<MoreHorizontal className="size-5" aria-hidden="true" />}
            className="size-9 shrink-0 text-[#211D19]"
            onClick={() => onOpenActions(member)}
          />
        ) : null}
      </div>
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

  const accentsMap = React.useMemo(
    () => resolveRoomMemberAccents(members),
    [members],
  );

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

      {/* Member Cards Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {members.map((member, index) => {
          const accent =
            accentsMap.get(member.userId) ?? MEMBER_IDENTITY_PALETTE_15[0];

          return (
            <MemberRow
              key={member.id}
              member={member}
              accent={accent}
              isHost={index === 0}
              canManage={canManageMembers}
              isActionLoading={isMemberActionLoading}
              onOpenActions={onOpenMemberActions}
              t={t}
            />
          );
        })}
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
