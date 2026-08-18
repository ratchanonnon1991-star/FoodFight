import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  text?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      text,
      ...props
    },
    ref
  ) => {
    if (orientation === "horizontal" && text) {
      return (
        <div
          ref={ref}
          role={decorative ? "none" : "separator"}
          aria-orientation="horizontal"
          className={cn("relative flex items-center w-full my-4", className)}
          {...props}
        >
          <div className="grow border-t border-border" />
          <span className="shrink-0 px-3 text-xs uppercase font-medium text-text-muted">
            {text}
          </span>
          <div className="grow border-t border-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full my-4" : "h-full w-px mx-4",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
