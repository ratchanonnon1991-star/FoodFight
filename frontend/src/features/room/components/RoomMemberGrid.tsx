'use client';

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import { MoreHorizontal, UserRoundPlus, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
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

export function RoomMemberGrid({
  memberCount,
  maxMembers,
  members,
  canManageMembers,
  isMemberActionLoading,
  onOpenMemberActions,
}: RoomMemberGridProps) {
  return (
    <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5 lg:mt-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-lg font-semibold">
          Members{' '}
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
        <UserRoundPlus
          className="size-8 shrink-0 text-text-primary"
          aria-hidden="true"
        />
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
