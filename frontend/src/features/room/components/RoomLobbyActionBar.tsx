'use client';

import * as React from 'react';
import { Check, LogOut, Play, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { RoomStatus } from '../types/room-types';

export interface RoomLobbyActionBarProps {
  isHost: boolean;
  status: RoomStatus;
  areAllMembersReady: boolean;
  canStartFoodFight: boolean;
  isCurrentUserReady: boolean;
  isReadyLoading: boolean;
  isStartingRoom: boolean;
  onStartFoodFight: () => void;
  onSetReady: () => void;
  onOpenLeave: () => void;
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

export function RoomLobbyActionBar({
  isHost,
  status,
  areAllMembersReady,
  canStartFoodFight,
  isCurrentUserReady,
  isReadyLoading,
  isStartingRoom,
  onStartFoodFight,
  onSetReady,
  onOpenLeave,
}: RoomLobbyActionBarProps) {
  return (
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
          [<ClipboardIcon key="preference" />, 'Everyone fills preferences'],
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
      {isHost ? (
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
            onClick={onStartFoodFight}
          >
            {status === 'IN_PROGRESS'
              ? 'FoodFight started'
              : 'Start FoodFight'}
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">
            {status === 'IN_PROGRESS'
              ? 'FoodFight is now in progress.'
              : areAllMembersReady
                ? 'Everyone is ready. You can start FoodFight.'
                : 'When everyone is ready, the host can start FoodFight.'}
          </p>
        </>
      ) : status === 'LOBBY' ? (
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
