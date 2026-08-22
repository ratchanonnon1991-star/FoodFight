import * as React from 'react';
import { X } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

export function RoomModal({
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
