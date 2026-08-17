import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface ColorItem {
  name: string;
  hex: string;
  role: string;
  textColor: string;
  contrastRatio: string;
  sampleBgClass: string;
  sampleTextClass: string;
}

const colors: ColorItem[] = [
  {
    name: "Pastel Petal",
    hex: "#FFC6D9",
    role: "Selected / Soft Accent",
    textColor: "#48284A (Blackberry Cream)",
    contrastRatio: "~8.5:1 (AAA)",
    sampleBgClass: "bg-[#FFC6D9]",
    sampleTextClass: "text-[#48284A]",
  },
  {
    name: "Soft Apricot",
    hex: "#FFE1C6",
    role: "Warm Surface / Accent",
    textColor: "#48284A (Blackberry Cream)",
    contrastRatio: "~10.0:1 (AAA)",
    sampleBgClass: "bg-[#FFE1C6]",
    sampleTextClass: "text-[#48284A]",
  },
  {
    name: "Vanilla Custard",
    hex: "#FFF7AE",
    role: "Highlight / Accent",
    textColor: "#48284A (Blackberry Cream)",
    contrastRatio: "~11.4:1 (AAA)",
    sampleBgClass: "bg-[#FFF7AE]",
    sampleTextClass: "text-[#48284A]",
  },
  {
    name: "Blackberry Cream",
    hex: "#48284A",
    role: "Brand Primary / Text",
    textColor: "#FFFFFF (White)",
    contrastRatio: "~12.5:1 (AAA)",
    sampleBgClass: "bg-[#48284A]",
    sampleTextClass: "text-white",
  },
  {
    name: "Dusty Mauve",
    hex: "#916C80",
    role: "Brand Secondary / Focus",
    textColor: "#FFFFFF (White)",
    contrastRatio: "~4.5:1 (AA)",
    sampleBgClass: "bg-[#916C80]",
    sampleTextClass: "text-white",
  },
];

export function ColorShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Approved Brand Palette</h2>
        <p className="text-sm text-text-secondary">
          Owner-approved source colors mapped to semantic CSS tokens with verified contrast ratios.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {colors.map((c) => (
          <div
            key={c.hex}
            className="flex flex-col rounded-lg border border-border bg-surface p-4 space-y-3 shadow-xs"
          >
            <div
              className={`h-16 w-full rounded-md flex items-center justify-center font-bold text-sm shadow-inner ${c.sampleBgClass} ${c.sampleTextClass}`}
            >
              {c.hex}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-text-primary">{c.name}</span>
                <Badge variant="neutral" size="sm">{c.contrastRatio}</Badge>
              </div>
              <p className="text-xs text-text-muted">{c.role}</p>
              <p className="text-xs text-text-secondary">Text: {c.textColor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
