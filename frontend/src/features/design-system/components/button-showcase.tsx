"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Heart, Settings, Trash2, ArrowRight } from "lucide-react";

export function ButtonShowcase() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Buttons & IconButtons</h2>
          <p className="text-sm text-text-secondary">
            Interactive buttons with explicit variants, verified contrast, touch-friendly sizes, and loading states.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsLoading((prev) => !prev)}
        >
          {isLoading ? "Disable Loading" : "Test Loading State"}
        </Button>
      </div>

      {/* Button Variants */}
      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Button Variants (All Verified AAA/AA Contrast)
          </span>
          <Badge variant="neutral" size="sm">5 Variants</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Primary (Blackberry Cream)</span>
            <Button variant="primary" loading={isLoading} leftIcon={<Send className="size-4" />}>
              Primary Button
            </Button>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Secondary (Dusty Mauve)</span>
            <Button variant="secondary" loading={isLoading} leftIcon={<Sparkles className="size-4" />}>
              Secondary Button
            </Button>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Outline</span>
            <Button variant="outline" loading={isLoading} rightIcon={<ArrowRight className="size-4" />}>
              Outline Button
            </Button>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Ghost</span>
            <Button variant="ghost" loading={isLoading}>
              Ghost Button
            </Button>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Destructive</span>
            <Button variant="destructive" loading={isLoading} leftIcon={<Trash2 className="size-4" />}>
              Delete Room
            </Button>
          </div>

          <div className="flex flex-col p-3 rounded-md bg-surface-subtle space-y-2">
            <span className="text-xs text-text-muted">Disabled State</span>
            <Button variant="primary" disabled>
              Disabled Action
            </Button>
          </div>
        </div>
      </div>

      {/* Button Sizes & IconButtons */}
      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Button Sizes & IconButtons (Mobile-First Touch Targets)
          </span>
          <Badge variant="neutral" size="sm">sm / md / lg</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="primary">Small (h-8)</Button>
          <Button size="md" variant="primary">Medium (h-10)</Button>
          <Button size="lg" variant="primary">Large (h-12)</Button>
        </div>

        <div className="pt-2">
          <span className="text-xs text-text-muted block mb-2">Accessible IconButtons:</span>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton aria-label="Settings" variant="outline" size="sm" icon={<Settings className="size-3.5" />} />
            <IconButton aria-label="Favorites" variant="secondary" size="md" icon={<Heart className="size-4" />} />
            <IconButton aria-label="Send action" variant="primary" size="lg" icon={<Send className="size-5" />} />
            <IconButton aria-label="Delete" variant="destructive" size="md" icon={<Trash2 className="size-4" />} />
            <IconButton aria-label="Disabled settings" variant="ghost" size="md" disabled icon={<Settings className="size-4" />} />
          </div>
        </div>
      </div>
    </div>
  );
}
