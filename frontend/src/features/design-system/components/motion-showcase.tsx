"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, scaleIn, fadeIn } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw } from "lucide-react";

export function MotionShowcase() {
  const [toggle, setToggle] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Motion & Reduced-Motion</h2>
          <p className="text-sm text-text-secondary">
            Restrained, purposeful motion respecting OS reduced-motion preferences.
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<RefreshCw className="size-3.5" />}
          onClick={() => setToggle((prev) => !prev)}
        >
          Re-trigger Animation
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Motion Presets Demonstration
          </span>
          <Badge variant="neutral" size="sm">Spring / Ease</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
          {/* FadeUp Box */}
          <div className="p-4 rounded-md bg-surface-subtle border border-border-subtle flex flex-col items-center justify-center min-h-[120px] text-center space-y-2">
            <AnimatePresence mode="wait">
              {toggle && (
                <motion.div
                  key="fade-up"
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-1"
                >
                  <Badge variant="brand">fadeUp</Badge>
                  <p className="text-xs text-text-secondary">y: 12 → 0 with enter ease</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ScaleIn Box */}
          <div className="p-4 rounded-md bg-surface-subtle border border-border-subtle flex flex-col items-center justify-center min-h-[120px] text-center space-y-2">
            <AnimatePresence mode="wait">
              {toggle && (
                <motion.div
                  key="scale-in"
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-1"
                >
                  <Badge variant="petal">scaleIn</Badge>
                  <p className="text-xs text-text-secondary">scale: 0.95 → 1 with spring</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FadeIn Box */}
          <div className="p-4 rounded-md bg-surface-subtle border border-border-subtle flex flex-col items-center justify-center min-h-[120px] text-center space-y-2">
            <AnimatePresence mode="wait">
              {toggle && (
                <motion.div
                  key="fade-in"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="space-y-1"
                >
                  <Badge variant="custard">fadeIn</Badge>
                  <p className="text-xs text-text-secondary">opacity: 0 → 1</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-3 rounded-md bg-status-info-bg border border-status-info-border text-status-info-text text-xs leading-relaxed">
          <strong>Accessibility Note:</strong> When <code>prefers-reduced-motion: reduce</code> is enabled in the OS or browser, motion animations gracefully fall back to instant transitions with zero transform shifts.
        </div>
      </div>
    </div>
  );
}
