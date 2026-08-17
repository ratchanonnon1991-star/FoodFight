import * as React from "react";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils/cn";

export interface PublicFooterProps {
  className?: string;
}

export function PublicFooter({ className }: PublicFooterProps) {
  return (
    <footer className={cn("border-t border-border py-6 bg-surface", className)}>
      <PageContainer
        maxWidth="lg"
        paddingY="none"
        className="text-center text-xs text-text-muted"
      >
        <span>© 2026 FoodFighter. All rights reserved.</span>
      </PageContainer>
    </footer>
  );
}
