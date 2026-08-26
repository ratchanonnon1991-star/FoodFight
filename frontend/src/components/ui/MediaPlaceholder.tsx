import * as React from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface MediaPlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: React.ReactNode;
}

export const MediaPlaceholder = React.forwardRef<
  HTMLDivElement,
  MediaPlaceholderProps
>(({ className, label = "Media placeholder", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(
        "flex aspect-square items-center justify-center overflow-hidden bg-surface-subtle text-text-muted",
        className,
      )}
      {...props}
    >
      {children ?? <ImageIcon className="size-6" aria-hidden="true" />}
    </div>
  );
});

MediaPlaceholder.displayName = "MediaPlaceholder";
