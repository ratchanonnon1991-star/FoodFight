import * as React from "react";
import { Sparkles } from "lucide-react";

export interface CompatibilityIndicatorProps {
  percentage?: number | null;
}

export function CompatibilityIndicator({
  percentage,
}: CompatibilityIndicatorProps) {
  if (
    typeof percentage !== "number" ||
    !Number.isFinite(percentage) ||
    percentage < 0 ||
    percentage > 100
  ) {
    return null;
  }

  return (
    <div className="mt-2" aria-label={`เหมาะกับกลุ่ม ${percentage}%`}>
      <p className="flex items-center gap-1 text-sm font-semibold text-brand-primary">
        <Sparkles className="size-4" aria-hidden="true" />
        เหมาะกับกลุ่ม {percentage}%
      </p>
      <progress
        className="foodfight-compatibility-meter mt-1"
        max={100}
        value={percentage}
      >
        {percentage}%
      </progress>
    </div>
  );
}
