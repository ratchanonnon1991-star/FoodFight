'use client';

import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeaderUtilities } from '@/components/layout/HeaderUtilities';
import type { AccountDropdownUser } from '@/components/layout/AccountDropdown';
import { useLanguage } from '@/i18n/LanguageProvider';
import { roomTranslations } from '../i18n/room-translations';

export interface RoomPageHeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
  showBackButton?: boolean;
  showAccountActions?: boolean;
  user?: AccountDropdownUser | null;
  onLogout?: () => void;
  actions?: React.ReactNode;
}

export function RoomPageHeader({
  title,
  subtitle,
  backHref,
  showBackButton = true,
  showAccountActions = false,
  user,
  onLogout,
  actions,
}: RoomPageHeaderProps) {
  const { locale } = useLanguage();
  const t = roomTranslations[locale].header;

  return (
    <header className="flex items-start justify-between gap-3 pb-3 pt-1">
      <div className="flex min-w-0 items-start gap-3">
        {showBackButton ? (
          <a
            href={backHref}
            aria-label={t.back}
            className="relative z-10 mt-0.5 inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-xs backdrop-blur-md transition-all hover:bg-black/30 hover:border-white/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </a>
        ) : null}
        <div className="min-w-0">
          <h1 className="truncate text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-xs">
            {title}
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-white/80 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-1.5">
        {actions}
        {showAccountActions ? (
          <HeaderUtilities
            user={user}
            onLogout={onLogout}
            className="lg:fixed lg:right-10 lg:top-3 lg:z-40 2xl:right-[calc((100vw-1440px)/2+2.5rem)]"
          />
        ) : null}
      </div>
    </header>
  );
}
