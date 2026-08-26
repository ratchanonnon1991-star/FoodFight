'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import {
  roomService,
  RoomApiError,
  subscribeToRoomEvents,
} from '../services/room-service';
import type { RoomLobby, RoomMember, UpdateRoomInput } from '../types/room-types';
import { RoomLobbyLayout, LobbyLoading, RoomUnavailable } from './RoomLobbyLayout';
import { RoomLobbyModals, type MemberAction } from './RoomLobbyModals';

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
  const [isRoomClosedModalOpen, setIsRoomClosedModalOpen] = React.useState(false);
  const [isKickedModalOpen, setIsKickedModalOpen] = React.useState(false);
  const [isRoomActionOpen, setIsRoomActionOpen] = React.useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = React.useState(false);
  const [leaveError, setLeaveError] = React.useState<string | null>(null);
  const [isLeaveLoading, setIsLeaveLoading] = React.useState(false);
  const [isReadyLoading, setIsReadyLoading] = React.useState(false);
  const [isStartingRoom, setIsStartingRoom] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<RoomMember | null>(null);
  const [memberAction, setMemberAction] = React.useState<MemberAction | null>(null);
  const [memberActionError, setMemberActionError] = React.useState<string | null>(null);
  const [isMemberActionLoading, setIsMemberActionLoading] = React.useState(false);

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
    if (room?.status === 'IN_PROGRESS') {
      router.replace(ROUTES.ROOM.PREFERENCES(room.id));
    }
  }, [room?.id, room?.status, router]);

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
      router.push(ROUTES.ROOM.PREFERENCES(room.id));
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

  const openDetails = () => {
    setDetailsError(null);
    setIsDetailsOpen(true);
  };

  const openLeave = () => {
    setLeaveError(null);
    setIsLeaveModalOpen(true);
  };

  const closeLeave = () => {
    if (!isLeaveLoading) {
      setIsLeaveModalOpen(false);
    }
  };

  const closeRoomModal = () => {
    if (!isClosingRoom) {
      setIsCloseModalOpen(false);
    }
  };

  if (isLoading) {
    return <LobbyLoading />;
  }

  if (!room) {
    return <RoomUnavailable error={error} />;
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
    <>
      <RoomLobbyLayout
        room={room}
        hostMember={hostMember}
        members={members}
        error={error}
        canInvite={canInvite}
        canManageMembers={canManageMembers}
        areAllMembersReady={areAllMembersReady}
        canStartFoodFight={canStartFoodFight}
        isCurrentUserReady={isCurrentUserReady}
        isReadyLoading={isReadyLoading}
        isStartingRoom={isStartingRoom}
        isMemberActionLoading={isMemberActionLoading}
        onOpenInvite={() => setIsInviteOpen(true)}
        onOpenSettings={() => setIsQuickActionsOpen(true)}
        onOpenRoomActions={() => setIsRoomActionOpen(true)}
        onOpenDetails={openDetails}
        onOpenMemberActions={openMemberActions}
        onStartFoodFight={() => void startFoodFight()}
        onSetReady={() => void setReady()}
        onOpenLeave={openLeave}
      />
      <RoomLobbyModals
        room={room}
        canInvite={canInvite}
        isInviteOpen={isInviteOpen}
        isRoomActionOpen={isRoomActionOpen}
        isLeaveModalOpen={isLeaveModalOpen}
        isDetailsOpen={isDetailsOpen}
        isQuickActionsOpen={isQuickActionsOpen}
        isCloseModalOpen={isCloseModalOpen}
        isRoomClosedModalOpen={isRoomClosedModalOpen}
        isKickedModalOpen={isKickedModalOpen}
        isReadyLoading={isReadyLoading}
        isLeaveLoading={isLeaveLoading}
        leaveError={leaveError}
        selectedMember={selectedMember}
        memberAction={memberAction}
        memberActionError={memberActionError}
        isMemberActionLoading={isMemberActionLoading}
        isDetailsSaving={isDetailsSaving}
        detailsError={detailsError}
        isClosingRoom={isClosingRoom}
        closeCountdown={closeCountdown}
        closeError={closeError}
        isCurrentUserReady={isCurrentUserReady}
        onCloseInvite={() => setIsInviteOpen(false)}
        onCloseRoomActions={() => setIsRoomActionOpen(false)}
        onOpenInvite={() => setIsInviteOpen(true)}
        onSetReady={() => void setReady()}
        onOpenLeave={openLeave}
        onCloseLeave={closeLeave}
        onLeave={() => void leaveRoom()}
        onCloseMemberActions={closeMemberActions}
        onChooseMemberAction={(action) => setMemberAction(action)}
        onConfirmMemberAction={() => void confirmMemberAction()}
        onCloseDetails={() => setIsDetailsOpen(false)}
        onSaveDetails={updateRoom}
        onRequestCloseRoom={openCloseRoomModal}
        onCloseSettings={() => setIsQuickActionsOpen(false)}
        onOpenDetails={openDetails}
        onCloseRoomModal={closeRoomModal}
        onCloseRoom={() => void closeRoom()}
        onRedirectHome={() => router.replace(ROUTES.AUTHENTICATED_HOME)}
      />
    </>
  );
}
