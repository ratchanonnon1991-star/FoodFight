import * as React from 'react';
import { Check, CheckCircle2, ClipboardList, LogOut, Play, Sparkles, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useLanguage } from '@/i18n/LanguageProvider';
import { roomTranslations } from '../i18n/room-translations';
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
  const { locale } = useLanguage();
  const t = roomTranslations[locale].lobby;

  const steps = [
    { icon: <UsersRound className="size-5 text-text-primary" aria-hidden="true" />, label: t.howItWorksStep1 },
    { icon: <CheckCircle2 className="size-5 text-text-primary" aria-hidden="true" />, label: t.howItWorksStep2 },
    { icon: <ClipboardList className="size-5 text-text-primary" aria-hidden="true" />, label: t.howItWorksStep3 },
    { icon: <Sparkles className="size-5 text-text-primary" aria-hidden="true" />, label: t.howItWorksStep4 },
  ];

  return (
    <Card variant="outline" className="mt-4 rounded-2xl p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-text-primary">{t.howItWorksTitle}</h2>
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        {steps.map((step) => (
          <div
            key={step.label}
            className="flex min-w-0 flex-col items-center gap-2"
          >
            <span className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-subtle shadow-2xs">
              {step.icon}
            </span>
            <span className="text-[11px] leading-snug text-text-secondary">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {isHost ? (
        <>
          <Button
            type="button"
            size="lg"
            fullWidth
            disabled={!canStartFoodFight}
            loading={isStartingRoom}
            loadingText={t.starting}
            className="mt-5 rounded-xl disabled:bg-surface-muted disabled:text-text-disabled disabled:opacity-100 disabled:shadow-none"
            leftIcon={
              <Play className="size-4 fill-current" aria-hidden="true" />
            }
            onClick={onStartFoodFight}
          >
            {status === 'IN_PROGRESS'
              ? t.startFoodFight
              : t.startFoodFight}
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">
            {status === 'IN_PROGRESS'
              ? t.waitingForMembers
              : areAllMembersReady
                ? t.readyPromptHost
                : t.readyPromptMember}
          </p>
        </>
      ) : status === 'LOBBY' ? (
        <>
          <Button
            type="button"
            size="lg"
            fullWidth
            loading={isReadyLoading}
            className="mt-5 rounded-xl"
            leftIcon={<Check className="size-4" aria-hidden="true" />}
            onClick={onSetReady}
          >
            {isCurrentUserReady ? t.iAmNotReady : t.iAmReady}
          </Button>
          <Button
            type="button"
            size="lg"
            fullWidth
            variant="outline"
            className="mt-2 rounded-xl"
            leftIcon={<LogOut className="size-4" aria-hidden="true" />}
            onClick={onOpenLeave}
          >
            {t.leaveRoom}
          </Button>
          <p className="mt-2 text-center text-xs text-text-secondary">
            {t.readyPromptMember}
          </p>
        </>
      ) : (
        <p className="mt-5 text-center text-sm text-text-secondary">
          {t.waitingForMembers}
        </p>
      )}
    </Card>
  );
}
