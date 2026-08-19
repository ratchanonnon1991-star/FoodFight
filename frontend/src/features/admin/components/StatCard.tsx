import * as React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

export interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card variant="default" className={cn("p-5 flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          {label}
        </span>
        <div className="flex size-9 items-center justify-center rounded-lg bg-surface-subtle text-brand-primary">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold tracking-tight text-text-primary">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {description && (
          <p className="mt-1 text-xs text-text-secondary">{description}</p>
        )}
      </div>
    </Card>
  );
}
