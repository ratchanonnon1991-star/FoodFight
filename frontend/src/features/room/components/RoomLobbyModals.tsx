import * as React from 'react';
import { Check, Crown, LogOut, Settings, UserRoundPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { RoomLobby, RoomMember, UpdateRoomInput } from '../types/room-types';
import { InviteFriendsSheet } from './InviteFriendsSheet';
import { RoomDetailsModal } from './RoomDetailsModal';
import { RoomModal } from './RoomModal';

type MemberAction = 'transfer' | 'kick';

type RoomLobbyModalsProps = {
  room: RoomLobby;
  canInvite: boolean;
  isInviteOpen: boolean;
  isRoomActionOpen: boolean;
  isLeaveModalOpen: boolean;
  isDetailsOpen: boolean;
  isQuickActionsOpen: boolean;
  isCloseModalOpen: boolean;
  isRoomClosedModalOpen: boolean;
  isKickedModalOpen: boolean;
  isReadyLoading: boolean;
  isLeaveLoading: boolean;
  leaveError: string | null;
  selectedMember: RoomMember | null;
  memberAction: MemberAction | null;
  memberActionError: string | null;
  isMemberActionLoading: boolean;
  isDetailsSaving: boolean;
  detailsError: string | null;
  isClosingRoom: boolean;
  closeCountdown: number;
  closeError: string | null;
  isCurrentUserReady: boolean;
  onCloseInvite: () => void;
  onCloseRoomActions: () => void;
  onOpenInvite: () => void;
  onSetReady: () => void;
  onOpenLeave: () => void;
  onCloseLeave: () => void;
  onLeave: () => void;
  onCloseMemberActions: () => void;
  onChooseMemberAction: (action: MemberAction | null) => void;
  onConfirmMemberAction: () => void;
  onCloseDetails: () => void;
  onSaveDetails: (input: UpdateRoomInput) => Promise<void>;
  onRequestCloseRoom: () => void;
  onCloseSettings: () => void;
  onOpenDetails: () => void;
  onCloseRoomModal: () => void;
  onCloseRoom: () => void;
  onRedirectHome: () => void;
};

export function RoomLobbyModals({
  room,
  canInvite,
  isInviteOpen,
  isRoomActionOpen,
  isLeaveModalOpen,
  isDetailsOpen,
  isQuickActionsOpen,
  isCloseModalOpen,
  isRoomClosedModalOpen,
  isKickedModalOpen,
  isReadyLoading,
  isLeaveLoading,
  leaveError,
  selectedMember,
  memberAction,
  memberActionError,
  isMemberActionLoading,
  isDetailsSaving,
  detailsError,
  isClosingRoom,
  closeCountdown,
  closeError,
  isCurrentUserReady,
  onCloseInvite,
  onCloseRoomActions,
  onOpenInvite,
  onSetReady,
  onOpenLeave,
  onCloseLeave,
  onLeave,
  onCloseMemberActions,
  onChooseMemberAction,
  onConfirmMemberAction,
  onCloseDetails,
  onSaveDetails,
  onRequestCloseRoom,
  onCloseSettings,
  onOpenDetails,
  onCloseRoomModal,
  onCloseRoom,
  onRedirectHome,
}: RoomLobbyModalsProps) {
  return (
    <>
      {isInviteOpen ? <InviteFriendsSheet room={room} onClose={onCloseInvite} /> : null}

      {isRoomActionOpen ? (
        <RoomModal title="Room actions" onClose={onCloseRoomActions}>
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
                  leftIcon={<UserRoundPlus className="size-4" aria-hidden="true" />}
                  onClick={() => {
                    onCloseRoomActions();
                    onOpenInvite();
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
                  onCloseRoomActions();
                  onSetReady();
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
                  onCloseRoomActions();
                  onOpenLeave();
                }}
              >
                Exit room
              </Button>
            </>
          )}
        </RoomModal>
      ) : null}

      {isLeaveModalOpen ? (
        <RoomModal title="Exit room" onClose={onCloseLeave}>
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
            <Button type="button" variant="outline" fullWidth disabled={isLeaveLoading} onClick={onCloseLeave}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" fullWidth loading={isLeaveLoading} onClick={onLeave}>
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
          onClose={onCloseMemberActions}
        >
          {!memberAction ? (
            <>
              <p className="text-sm text-text-secondary">
                Choose an action for{' '}
                <span className="font-semibold text-text-primary">{selectedMember.displayName}</span>.
              </p>
              <Button
                type="button"
                variant="outline"
                fullWidth
                className="mt-5 justify-start"
                leftIcon={<Crown className="size-4" aria-hidden="true" />}
                onClick={() => onChooseMemberAction('transfer')}
              >
                Make host
              </Button>
              <Button
                type="button"
                variant="destructive"
                fullWidth
                className="mt-2 justify-start"
                leftIcon={<X className="size-4" aria-hidden="true" />}
                onClick={() => onChooseMemberAction('kick')}
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
                <p className="mt-3 text-sm text-status-danger-text" role="alert">
                  {memberActionError}
                </p>
              ) : null}
              <div className="mt-6 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  disabled={isMemberActionLoading}
                  onClick={() => onChooseMemberAction(null)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant={memberAction === 'kick' ? 'destructive' : 'primary'}
                  fullWidth
                  loading={isMemberActionLoading}
                  onClick={onConfirmMemberAction}
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
          onClose={onCloseDetails}
          onSave={onSaveDetails}
          onRequestClose={onRequestCloseRoom}
        />
      ) : null}

      {isQuickActionsOpen ? (
        <RoomModal title="Room settings" onClose={onCloseSettings}>
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
              onCloseSettings();
              onOpenDetails();
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
            onClick={onRequestCloseRoom}
          >
            Close room
          </Button>
        </RoomModal>
      ) : null}

      {isCloseModalOpen ? (
        <RoomModal title="Close room" onClose={onCloseRoomModal}>
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
            <Button type="button" variant="outline" fullWidth disabled={isClosingRoom} onClick={onCloseRoomModal}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              fullWidth
              loading={isClosingRoom}
              disabled={closeCountdown > 0}
              onClick={onCloseRoom}
            >
              {closeCountdown > 0 ? `Confirm in ${closeCountdown}s` : 'Confirm close'}
            </Button>
          </div>
        </RoomModal>
      ) : null}

      {isRoomClosedModalOpen ? (
        <RoomModal title="Room closed" onClose={onRedirectHome}>
          <p className="text-sm leading-relaxed text-text-secondary">
            This room was closed by the host. You will be returned to Home.
          </p>
          <Button type="button" fullWidth className="mt-6" onClick={onRedirectHome}>
            Back to Home
          </Button>
        </RoomModal>
      ) : null}

      {isKickedModalOpen ? (
        <RoomModal title="Removed from room" onClose={onRedirectHome}>
          <p className="text-sm leading-relaxed text-text-secondary">
            The host removed you from this room. You will be returned to Home.
          </p>
          <Button type="button" fullWidth className="mt-6" onClick={onRedirectHome}>
            Back to Home
          </Button>
        </RoomModal>
      ) : null}
    </>
  );
}

export type { MemberAction };
