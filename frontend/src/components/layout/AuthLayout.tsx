import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";

export interface AuthLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerBadge?: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({
  className,
  title,
  subtitle,
  headerBadge,
  footer,
  children,
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-background",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          {headerBadge && (
            <div className="flex justify-center mb-2">{headerBadge}</div>
          )}
          <div className="inline-block">
            <span className="font-bold text-2xl tracking-tight text-brand-primary">
              FoodFighter
            </span>
          </div>
          {title && (
            <h1 className="text-xl font-bold tracking-tight text-text-primary">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>

        {/* Auth Content Card */}
        <Card variant="default" className="p-6 sm:p-8 shadow-sm">
          {children}
        </Card>

        {/* Optional Auth Footer (e.g. Terms / Privacy / Help links) */}
        {footer && (
          <div className="text-center text-xs text-text-muted space-y-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
