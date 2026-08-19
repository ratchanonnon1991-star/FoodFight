import Link from "next/link";
import { ArrowLeft, Bell, CircleUserRound } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export interface RoomPageHeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
  showAccountActions?: boolean;
  actions?: React.ReactNode;
}

export function RoomPageHeader({
  title,
  subtitle,
  backHref,
  showAccountActions = false,
  actions,
}: RoomPageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 pb-4">
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href={backHref}
          aria-label="Back"
          className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {actions}
        {showAccountActions ? (
          <>
            <IconButton
              aria-label="Notifications"
              icon={<Bell className="size-5" aria-hidden="true" />}
              className="text-text-primary"
            />
            <IconButton
              aria-label="Profile"
              icon={<CircleUserRound className="size-6" aria-hidden="true" />}
              className="text-text-primary"
            />
          </>
        ) : null}
      </div>
    </header>
  );
}
