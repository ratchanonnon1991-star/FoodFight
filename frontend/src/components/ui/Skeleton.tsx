import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-pulse rounded-md bg-surface-subtle", className)}
      {...props}
    />
  );
}
