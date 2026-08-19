'use client';

/* User avatars may be served by the backend and are not configured as Next image domains. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  Check,
  Clock3,
  Crown,
  LogOut,
  MapPin,
  MoreHorizontal,
  Play,
  Settings,
  UserRoundPlus,
  UsersRound,
  X,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/config/routes';
import {
  roomService,
  RoomApiError,
  subscribeToRoomEvents,
} from '../services/room-service';
import type {
  RoomLobby,
  RoomMember,
  UpdateRoomInput,
} from '../types/room-types';
import {
  formatRoomDate,
  formatRoomTime,
  getInitials,
} from '../utils/room-format';
import { LocationPicker } from './LocationPicker';
import { InviteFriendsSheet } from './InviteFriendsSheet';
import { RoomPageHeader } from './RoomPageHeader';

type MemberAction = 'transfer' | 'kick';

export function RoomLobbyScreen({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [room, setRoom] = React.useState<RoomLobby | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInviteOpen, setIsInviteOpen] = React.useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [detailsError, setDetailsError] = React.useState<string | null>(null);
  const [isDetailsSaving, setIsDetailsSaving] = React.useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = React.useState(false);
  const [closeError, setCloseError] = React.useState<string | null>(null);
  const [isClosingRoom, setIsClosingRoom] = React.useState(false);
  const [closeCountdown, setCloseCountdown] = React.useState(0);
  const [isRoomClosedModalOpen, setIsRoomClosedModalOpen] =
    React.useState(false);
  const [isKickedModalOpen, setIsKickedModalOpen] = React.useState(false);
  const [isRoomActionOpen, setIsRoomActionOpen] = React.useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = React.useState(false);
  const [leaveError, setLeaveError] = React.useState<string | null>(null);
  const [isLeaveLoading, setIsLeaveLoading] = React.useState(false);
  const [isReadyLoading, setIsReadyLoading] = React.useState(false);
  const [isStartingRoom, setIsStartingRoom] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<RoomMember | null>(
    null,
  );
  const [memberAction, setMemberAction] = React.useState<MemberAction | null>(
    null,
  );
  const [memberActionError, setMemberActionError] = React.useState<
    string | null
  >(null);
  const [isMemberActionLoading, setIsMemberActionLoading] =
    React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadRoom = async () => {
      try {
        const result = await roomService.getRoom(roomId);

        if (isMounted) {
          setRoom(result);
          if (result.status === 'CANCELLED') {
            setIsRoomClosedModalOpen(true);
          }
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof RoomApiError
              ? requestError.message
              : 'Unable to load the room.',
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

  const isRoomLoaded = room !== null;

  React.useEffect(() => {
    if (!isRoomLoaded) {
      return;
    }

    const controller = new AbortController();
    let retryTimer: number | undefined;

    const refreshRoom = (updatedRoomId: string) => {
      void roomService
        .getRoom(updatedRoomId)
        .then((updatedRoom) => {
          if (updatedRoom.status === 'CANCELLED') {
            controller.abort();
            setRoom(updatedRoom);
            setIsRoomClosedModalOpen(true);
            return;
          }

          setRoom(updatedRoom);
        })
        .catch((requestError) => {
          if (
            requestError instanceof RoomApiError &&
            requestError.status === 403
          ) {
            controller.abort();
            setIsKickedModalOpen(true);
          }
        });
    };

    const connect = async () => {
      try {
        await subscribeToRoomEvents(roomId, refreshRoom, controller.signal);
      } catch {
        if (!controller.signal.aborted) {
          retryTimer = window.setTimeout(() => void connect(), 2000);
        }
        return;
      }

      if (!controller.signal.aborted) {
        retryTimer = window.setTimeout(() => void connect(), 1000);
      }
    };

    void connect();

    return () => {
      controller.abort();
      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [isRoomLoaded, roomId]);

  React.useEffect(() => {
    if (!isKickedModalOpen) {
      return;
    }

    const redirectTimer = window.setTimeout(
      () => router.replace(ROUTES.AUTHENTICATED_HOME),
      3000,
    );

    return () => window.clearTimeout(redirectTimer);
  }, [isKickedModalOpen, router]);

  React.useEffect(() => {
    if (!isRoomClosedModalOpen) {
      return;
    }

    const redirectTimer = window.setTimeout(
      () => router.replace(ROUTES.AUTHENTICATED_HOME),
      3000,
    );

    return () => window.clearTimeout(redirectTimer);
  }, [isRoomClosedModalOpen, router]);

  React.useEffect(() => {
    if (!isCloseModalOpen || closeCountdown <= 0) {
      return;
    }

    const countdownTimer = window.setTimeout(
      () => setCloseCountdown((seconds) => Math.max(0, seconds - 1)),
      1000,
    );

    return () => window.clearTimeout(countdownTimer);
  }, [closeCountdown, isCloseModalOpen]);

  const setReady = async () => {
    if (!room || room.isHost || !room.currentMember) {
      return;
    }

    setIsReadyLoading(true);

    try {
      setRoom(await roomService.setReady(room.id, !room.currentMember.isReady));
    } catch (requestError) {
      setError(
        requestError instanceof RoomApiError
          ? requestError.message
          : 'Unable to update your ready status.',
      );
    } finally {
      setIsReadyLoading(false);
    }
  };

  const startFoodFight = async () => {
    if (!room || !room.isHost || room.status !== 'LOBBY') {
      return;
    }

    const areAllMembersReady =
      room.members.length > 0 && room.members.every((member) => member.isReady);

    if (!areAllMembersReady) {
      return;
    }

    setError(null);
    setIsStartingRoom(true);

    try {
      setRoom(await roomService.startRoom(room.id));
    } catch (requestError) {
      setError(
        requestError instanceof RoomApiError
          ? requestError.message
          : 'Unable to start FoodFight.',
      );
    } finally {
      setIsStartingRoom(false);
    }
  };

  const leaveRoom = async () => {
    if (!room || room.isHost) {
      return;
    }

    setLeaveError(null);
    setIsLeaveLoading(true);

    try {
      await roomService.leaveRoom(room.id);
      router.replace(ROUTES.AUTHENTICATED_HOME);
    } catch (requestError) {
      setLeaveError(
        requestError instanceof RoomApiError
          ? requestError.message
          : 'Unable to leave this room.',
      );
    } finally {
      setIsLeaveLoading(false);
    }
  };

  const openMemberActions = (member: RoomMember) => {
    setSelectedMember(member);
    setMemberAction(null);
    setMemberActionError(null);
  };

  const closeMemberActions = () => {
    if (isMemberActionLoading) {
      return;
    }

    setSelectedMember(null);
    setMemberAction(null);
    setMemberActionError(null);
  };

  const confirmMemberAction = async () => {
    if (!room || !selectedMember || !memberAction) {
      return;
    }

    setMemberActionError(null);
    setIsMemberActionLoading(true);

    try {
      const updatedRoom =
        memberAction === 'transfer'
          ? await roomService.transferHost(room.id, selectedMember.id)
          : await roomService.kickMember(room.id, selectedMember.id);

      setRoom(updatedRoom);
      setSelectedMember(null);
      setMemberAction(null);
    } catch (requestError) {
      setMemberActionError(
        requestError instanceof RoomApiError
          ? requestError.message
          : memberAction === 'transfer'
            ? 'Unable to change the room host.'
            : 'Unable to remove this member.',
      );
    } finally {
      setIsMemberActionLoading(false);
    }
  };

  const updateRoom = async (input: UpdateRoomInput) => {
    if (!room || !room.isHost) {
      return;
    }

    setDetailsError(null);
    setIsDetailsSaving(true);

    try {
      setRoom(await roomService.updateRoom(room.id, input));
      setIsDetailsOpen(false);
    } catch (requestError) {
      setDetailsError(
        requestError instanceof RoomApiError
          ? requestError.message
          : 'Unable to update room details.',
      );
    } finally {
      setIsDetailsSaving(false);
    }
  };

  const openCloseRoomModal = () => {
    if (!room?.isHost) {
      return;
    }

    setIsDetailsOpen(false);
    setIsQuickActionsOpen(false);
    setCloseError(null);
    setCloseCountdown(room.memberCount > 1 ? 5 : 0);
    setIsCloseModalOpen(true);
  };

  const closeRoom = async () => {
    if (!room || !room.isHost || closeCountdown > 0) {
      return;
    }

    setCloseError(null);
    setIsClosingRoom(true);

    try {
      await roomService.closeRoom(room.id);
      router.replace(ROUTES.AUTHENTICATED_HOME);
    } catch (requestError) {
      setCloseError(
        requestError instanceof RoomApiError
          ? requestError.message
          : 'Unable to close this room.',
      );
    } finally {
      setIsClosingRoom(false);
    }
  };

  if (isLoading) {
    return <LobbyLoading />;
  }

  if (!room) {
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
            <AlertDescription>
              {error ?? 'This room could not be loaded.'}
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }

  const hostMember: RoomMember = {
    id: `host-${room.id}`,
    userId: 'host',
    displayName: room.host.displayName,
    avatarUrl: room.host.avatarUrl,
    isReady: false,
    joinedAt: room.scheduledAt,
  };
  const members = [hostMember, ...room.members];
  const canInvite = Boolean(room.inviteLink);
  const canManageMembers = room.isHost && room.status === 'LOBBY';
  const isCurrentUserReady = room.currentMember?.isReady ?? false;
  const areAllMembersReady =
    room.members.length > 0 && room.members.every((member) => member.isReady);
  const canStartFoodFight =
    room.isHost && room.status === 'LOBBY' && areAllMembersReady;

  return (
    <main className="min-h-dvh overflow-x-clip bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-4xl lg:max-w-6xl">
        <RoomPageHeader
          title="Room Lobby"
          subtitle="Invite friends and get ready!"
          backHref={ROUTES.AUTHENTICATED_HOME}
          actions={
            <>
              <IconButton
                aria-label={
                  room.isHost ? 'Room settings' : 'Room settings (host only)'
                }
                aria-haspopup={room.isHost ? 'dialog' : undefined}
                disabled={!room.isHost}
                icon={<Settings className="size-5" aria-hidden="true" />}
                className="text-text-primary"
                onClick={() => setIsQuickActionsOpen(true)}
              />
              <IconButton
                aria-label="Room actions"
                aria-haspopup="dialog"
                icon={<MoreHorizontal className="size-5" aria-hidden="true" />}
                className="text-text-primary"
                onClick={() => setIsRoomActionOpen(true)}
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDetailsError(null);
                setIsDetailsOpen(true);
              }}
            >
              View details
            </Button>
          </div>
        </Card>

        {canInvite ? (
          <button
            type="button"
            onClick={() => setIsInviteOpen(true)}
            className="mt-4 flex min-h-24 w-full items-center justify-between rounded-2xl border border-dashed border-border bg-surface px-5 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2 font-semibold">
                <UserRoundPlus className="size-5" aria-hidden="true" /> Invite
                Friends
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
          </div>

          <div className="min-w-0 lg:col-span-7">
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
                onOpenActions={openMemberActions}
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

        <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5">
          <h2 className="text-lg font-semibold">How it works</h2>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {[
              [
                <UsersRound
                  key="members"
                  className="size-5"
                  aria-hidden="true"
                />,
                'Everyone joins',
              ],
              [<CheckCircleIcon key="ready" />, 'Members get ready'],
              [
                <ClipboardIcon key="preference" />,
                'Everyone fills preferences',
              ],
              [<SparkleIcon key="ai" />, 'AI suggests menus'],
            ].map(([icon, label]) => (
              <div
                key={label as string}
                className="flex min-w-0 flex-col items-center gap-2"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-subtle">
                  {icon}
                </span>
                <span className="text-[11px] leading-snug text-text-secondary">
                  {label}
                </span>
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
                leftIcon={
                  <Play className="size-4 fill-current" aria-hidden="true" />
                }
                onClick={() => void startFoodFight()}
              >
                {room.status === 'IN_PROGRESS'
                  ? 'FoodFight started'
                  : 'Start FoodFight'}
              </Button>
              <p className="mt-2 text-center text-xs text-text-secondary">
                {room.status === 'IN_PROGRESS'
                  ? 'FoodFight is now in progress.'
                  : areAllMembersReady
                    ? 'Everyone is ready. You can start FoodFight.'
                    : 'When everyone is ready, the host can start FoodFight.'}
              </p>
            </>
          ) : (
            <>
              {room.status === 'LOBBY' ? (
                <>
                  <Button
                    type="button"
                    fullWidth
                    loading={isReadyLoading}
                    className="mt-5"
                    leftIcon={<Check className="size-4" aria-hidden="true" />}
                    onClick={() => void setReady()}
                  >
                    {isCurrentUserReady ? 'Not Ready' : 'Ready'}
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="outline"
                    className="mt-2"
                    leftIcon={<LogOut className="size-4" aria-hidden="true" />}
                    onClick={() => {
                      setLeaveError(null);
                      setIsLeaveModalOpen(true);
                    }}
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
            </>
          )}
        </Card>
          </div>
        </div>
      </div>

      {isInviteOpen ? (
        <InviteFriendsSheet
          room={room}
          onClose={() => setIsInviteOpen(false)}
        />
      ) : null}

      {isRoomActionOpen ? (
        <RoomModal
          title="Room actions"
          onClose={() => setIsRoomActionOpen(false)}
        >
          {room.isHost ? (
            <>
              <p className="text-sm leading-relaxed text-text-secondary">
                You are the host. Use the three-dot button beside a member to
                transfer host or remove that member.
              </p>
              {canInvite ? (
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  className="mt-5"
                  leftIcon={
                    <UserRoundPlus className="size-4" aria-hidden="true" />
                  }
                  onClick={() => {
                    setIsRoomActionOpen(false);
                    setIsInviteOpen(true);
                  }}
                >
                  Invite friends
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-text-secondary">
                Update your status or leave this room.
              </p>
              <Button
                type="button"
                fullWidth
                className="mt-5"
                loading={isReadyLoading}
                leftIcon={<Check className="size-4" aria-hidden="true" />}
                onClick={() => {
                  setIsRoomActionOpen(false);
                  void setReady();
                }}
              >
                {isCurrentUserReady ? 'Mark as not ready' : 'Mark as ready'}
              </Button>
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="mt-2 text-status-danger-text"
                leftIcon={<LogOut className="size-4" aria-hidden="true" />}
                onClick={() => {
                  setIsRoomActionOpen(false);
                  setLeaveError(null);
                  setIsLeaveModalOpen(true);
                }}
              >
                Exit room
              </Button>
            </>
          )}
        </RoomModal>
      ) : null}

      {isLeaveModalOpen ? (
        <RoomModal
          title="Exit room"
          onClose={() => {
            if (!isLeaveLoading) setIsLeaveModalOpen(false);
          }}
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            Are you sure you want to leave {room.name}? You can join this room
            again later while it is still open.
          </p>
          {leaveError ? (
            <p className="mt-3 text-sm text-status-danger-text" role="alert">
              {leaveError}
            </p>
          ) : null}
          <div className="mt-6 flex gap-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              disabled={isLeaveLoading}
              onClick={() => setIsLeaveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              fullWidth
              loading={isLeaveLoading}
              onClick={() => void leaveRoom()}
            >
              Exit room
            </Button>
          </div>
        </RoomModal>
      ) : null}

      {selectedMember ? (
        <RoomModal
          title={
            memberAction
              ? memberAction === 'transfer'
                ? 'Make new host'
                : 'Kick member'
              : 'Member actions'
          }
          onClose={closeMemberActions}
        >
          {!memberAction ? (
            <>
              <p className="text-sm text-text-secondary">
                Choose an action for{' '}
                <span className="font-semibold text-text-primary">
                  {selectedMember.displayName}
                </span>
                .
              </p>
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="mt-5 justify-start"
                leftIcon={<Crown className="size-4" aria-hidden="true" />}
                onClick={() => setMemberAction('transfer')}
              >
                Make host
              </Button>
              <Button
                type="button"
                variant="destructive"
                fullWidth
                className="mt-2 justify-start"
                leftIcon={<X className="size-4" aria-hidden="true" />}
                onClick={() => setMemberAction('kick')}
              >
                Kick from room
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-text-secondary">
                {memberAction === 'transfer'
                  ? `Make ${selectedMember.displayName} the new host? You will stay in the room as a member.`
                  : `Remove ${selectedMember.displayName} from this room? They can join again later.`}
              </p>
              {memberActionError ? (
                <p
                  className="mt-3 text-sm text-status-danger-text"
                  role="alert"
                >
                  {memberActionError}
                </p>
              ) : null}
              <div className="mt-6 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  disabled={isMemberActionLoading}
                  onClick={() => setMemberAction(null)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant={memberAction === 'kick' ? 'destructive' : 'primary'}
                  fullWidth
                  loading={isMemberActionLoading}
                  onClick={() => void confirmMemberAction()}
                >
                  Confirm
                </Button>
              </div>
            </>
          )}
        </RoomModal>
      ) : null}

      {isDetailsOpen ? (
        <RoomDetailsModal
          room={room}
          isHost={room.isHost}
          isSaving={isDetailsSaving}
          error={detailsError}
          onClose={() => setIsDetailsOpen(false)}
          onSave={updateRoom}
          onRequestClose={openCloseRoomModal}
        />
      ) : null}

      {isQuickActionsOpen ? (
        <RoomModal
          title="Room settings"
          onClose={() => setIsQuickActionsOpen(false)}
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            Quickly manage this room as the host.
          </p>
          <Button
            type="button"
            variant="outline"
            fullWidth
            className="mt-5 justify-start"
            leftIcon={<Settings className="size-4" aria-hidden="true" />}
            onClick={() => {
              setIsQuickActionsOpen(false);
              setDetailsError(null);
              setIsDetailsOpen(true);
            }}
          >
            Edit room
          </Button>
          <Button
            type="button"
            variant="destructive"
            fullWidth
            className="mt-2 justify-start"
            leftIcon={<X className="size-4" aria-hidden="true" />}
            onClick={openCloseRoomModal}
          >
            Close room
          </Button>
        </RoomModal>
      ) : null}

      {isCloseModalOpen ? (
        <RoomModal
          title="Close room"
          onClose={() => {
            if (!isClosingRoom) {
              setIsCloseModalOpen(false);
            }
          }}
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            {room.memberCount > 1
              ? 'Members are still in this room. Please wait before confirming that you want to close it.'
              : 'Close this room? It will no longer be available for anyone to join.'}
          </p>
          {closeError ? (
            <p className="mt-3 text-sm text-status-danger-text" role="alert">
              {closeError}
            </p>
          ) : null}
          <div className="mt-6 flex gap-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              disabled={isClosingRoom}
              onClick={() => setIsCloseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              fullWidth
              loading={isClosingRoom}
              disabled={closeCountdown > 0}
              onClick={() => void closeRoom()}
            >
              {closeCountdown > 0
                ? `Confirm in ${closeCountdown}s`
                : 'Confirm close'}
            </Button>
          </div>
        </RoomModal>
      ) : null}

      {isRoomClosedModalOpen ? (
        <RoomModal
          title="Room closed"
          onClose={() => router.replace(ROUTES.AUTHENTICATED_HOME)}
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            This room was closed by the host. You will be returned to Home.
          </p>
          <Button
            type="button"
            fullWidth
            className="mt-6"
            onClick={() => router.replace(ROUTES.AUTHENTICATED_HOME)}
          >
            Back to Home
          </Button>
        </RoomModal>
      ) : null}

      {isKickedModalOpen ? (
        <RoomModal
          title="Removed from room"
          onClose={() => router.replace(ROUTES.AUTHENTICATED_HOME)}
        >
          <p className="text-sm leading-relaxed text-text-secondary">
            The host removed you from this room. You will be returned to Home.
          </p>
          <Button
            type="button"
            fullWidth
            className="mt-6"
            onClick={() => router.replace(ROUTES.AUTHENTICATED_HOME)}
          >
            Back to Home
          </Button>
        </RoomModal>
      ) : null}
    </main>
  );
}

type RoomDetailsFormState = {
  name: string;
  maxMembers: string;
  locationName: string;
  latitude: number | null;
  longitude: number | null;
  searchRadiusKm: 1 | 3 | 5 | 10;
  date: string;
  time: string;
};

function RoomDetailsModal({
  room,
  isHost,
  isSaving,
  error,
  onClose,
  onSave,
  onRequestClose,
}: {
  room: RoomLobby;
  isHost: boolean;
  isSaving: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (input: UpdateRoomInput) => Promise<void>;
  onRequestClose: () => void;
}) {
  const [form, setForm] = React.useState<RoomDetailsFormState>(() =>
    getRoomDetailsForm(room),
  );
  const [validationError, setValidationError] = React.useState<string | null>(
    null,
  );

  const updateForm = <K extends keyof RoomDetailsFormState>(
    field: K,
    value: RoomDetailsFormState[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    const name = form.name.trim();
    const locationName = form.locationName.trim();
    const maxMembers = Number(form.maxMembers);
    const scheduledAt = new Date(`${form.date}T${form.time}:00`);

    if (!name || name.length > 30) {
      setValidationError('Room name must be between 1 and 30 characters.');
      return;
    }

    if (!locationName) {
      setValidationError('Location is required.');
      return;
    }

    if (
      !Number.isInteger(maxMembers) ||
      maxMembers < room.memberCount ||
      maxMembers > 15
    ) {
      setValidationError(
        `Maximum members must be between ${room.memberCount} and 15.`,
      );
      return;
    }

    if (Number.isNaN(scheduledAt.getTime())) {
      setValidationError('Select a valid date and time.');
      return;
    }

    await onSave({
      name,
      maxMembers,
      locationName,
      latitude: form.latitude,
      longitude: form.longitude,
      searchRadiusKm: form.searchRadiusKm,
      scheduledAt: scheduledAt.toISOString(),
    });
  };

  return (
    <RoomModal title="Room details" onClose={onClose}>
      {!isHost ? (
        <RoomDetailsReadOnly room={room} />
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-primary">
              Room name
            </span>
            <Input
              value={form.name}
              maxLength={30}
              onChange={(event) => updateForm('name', event.target.value)}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text-primary">
              Max members
            </span>
            <Input
              type="number"
              min={room.memberCount}
              max={15}
              value={form.maxMembers}
              onChange={(event) => updateForm('maxMembers', event.target.value)}
            />
          </label>

          <div className="space-y-1.5">
            <span className="text-sm font-medium text-text-primary">
              Location
            </span>
            <LocationPicker
              id="room-details-location"
              value={form.locationName}
              latitude={form.latitude}
              longitude={form.longitude}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  locationName: value,
                  latitude: null,
                  longitude: null,
                }))
              }
              onPlaceSelected={({ locationName, latitude, longitude }) =>
                setForm((current) => ({
                  ...current,
                  locationName,
                  latitude,
                  longitude,
                }))
              }
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-text-primary">
                Search radius
              </span>
              <span className="text-xs text-text-secondary">
                Within {form.searchRadiusKm} km
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 3, 5, 10].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  aria-pressed={form.searchRadiusKm === radius}
                  onClick={() =>
                    updateForm(
                      'searchRadiusKm',
                      radius as RoomDetailsFormState['searchRadiusKm'],
                    )
                  }
                  className={`h-10 rounded-lg border text-xs transition-colors ${form.searchRadiusKm === radius ? 'border-brand-primary bg-surface-subtle font-semibold' : 'border-border bg-surface hover:bg-surface-subtle'}`}
                >
                  {radius} km
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-primary">
                Date
              </span>
              <Input
                type="date"
                value={form.date}
                onChange={(event) => updateForm('date', event.target.value)}
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-text-primary">
                Time
              </span>
              <Input
                type="time"
                value={form.time}
                onChange={(event) => updateForm('time', event.target.value)}
              />
            </label>
          </div>

          {validationError || error ? (
            <p className="text-sm text-status-danger-text" role="alert">
              {validationError ?? error}
            </p>
          ) : null}

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              fullWidth
              disabled={isSaving}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth loading={isSaving}>
              Save changes
            </Button>
          </div>

          <div className="border-t border-border pt-4">
            <p className="font-semibold text-status-danger-text">Close room</p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">
              Closing the room prevents anyone from joining it again.
            </p>
            <Button
              type="button"
              variant="destructive"
              fullWidth
              className="mt-3"
              onClick={onRequestClose}
            >
              Close room
            </Button>
          </div>
        </form>
      )}
    </RoomModal>
  );
}

function RoomDetailsReadOnly({ room }: { room: RoomLobby }) {
  return (
    <dl className="space-y-4">
      <div>
        <dt className="text-xs text-text-secondary">Room name</dt>
        <dd className="mt-1 font-semibold text-text-primary">{room.name}</dd>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <UsersRound className="size-4" aria-hidden="true" /> Members
          </dt>
          <dd className="mt-1 font-medium text-text-primary">
            {room.memberCount} / {room.maxMembers}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <MapPin className="size-4" aria-hidden="true" /> Radius
          </dt>
          <dd className="mt-1 font-medium text-text-primary">
            Within {room.searchRadiusKm} km
          </dd>
        </div>
      </div>
      <div>
        <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
          <MapPin className="size-4" aria-hidden="true" /> Location
        </dt>
        <dd className="mt-1 font-medium text-text-primary">
          {room.locationName}
        </dd>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <CalendarDays className="size-4" aria-hidden="true" /> Date
          </dt>
          <dd className="mt-1 font-medium text-text-primary">
            {formatRoomDate(room.scheduledAt)}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Clock3 className="size-4" aria-hidden="true" /> Time
          </dt>
          <dd className="mt-1 font-medium text-text-primary">
            {formatRoomTime(room.scheduledAt)}
          </dd>
        </div>
      </div>
    </dl>
  );
}

function getRoomDetailsForm(room: RoomLobby): RoomDetailsFormState {
  const scheduledAt = new Date(room.scheduledAt);

  return {
    name: room.name,
    maxMembers: String(room.maxMembers),
    locationName: room.locationName,
    latitude: room.latitude ?? null,
    longitude: room.longitude ?? null,
    searchRadiusKm:
      room.searchRadiusKm as RoomDetailsFormState['searchRadiusKm'],
    date: formatDateInput(scheduledAt),
    time: formatTimeInput(scheduledAt),
  };
}

function formatDateInput(date: Date) {
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatTimeInput(date: Date) {
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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

function RoomModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl transition-all duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <IconButton
            aria-label="Close"
            icon={<X className="size-5" aria-hidden="true" />}
            className="-mr-2 -mt-2 text-text-primary"
            onClick={onClose}
          />
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function Avatar({
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

function LobbyLoading() {
  return (
    <main className="min-h-dvh overflow-x-clip bg-background px-4 pt-5 text-text-primary">
      <div className="mx-auto w-full max-w-md md:max-w-4xl lg:max-w-6xl">
        <RoomPageHeader
          title="Room Lobby"
          subtitle="Invite friends and get ready!"
          backHref={ROUTES.AUTHENTICATED_HOME}
        />
        <Card variant="outline" className="rounded-2xl p-6 text-center">
          <div
            className="mx-auto size-8 animate-pulse rounded-full bg-surface-subtle"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-text-secondary" role="status">
            Loading room...
          </p>
        </Card>
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
