"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import type { ReceiptItemInput } from "../services/bill-service";

export interface AddReceiptItemFormProps {
  onAdd: (input: ReceiptItemInput) => Promise<void>;
}

export function AddReceiptItemForm({ onAdd }: AddReceiptItemFormProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale].receipt;

  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("1");
  const [unitPrice, setUnitPrice] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !unitPrice) {
      return;
    }

    setIsSaving(true);
    try {
      await onAdd({
        name: name.trim(),
        quantity: Number(quantity) || 1,
        unitPrice: Number(unitPrice) || 0,
      });
      setName("");
      setQuantity("1");
      setUnitPrice("");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pt-2 border-t border-border/60">
      <p className="text-xs font-extrabold text-text-primary mb-2.5 flex items-center gap-1.5">
        <Plus className="size-3.5 text-brand-primary" />
        <span>{t.addItemTitle}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Row 1: Full-Width Item Name */}
        <Input
          placeholder={t.itemNamePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 text-xs rounded-xl bg-surface"
          aria-label="Item name"
        />

        {/* Row 2: Quantity + Unit Price + Submit Button */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3 sm:col-span-3">
            <Input
              type="number"
              min={1}
              placeholder={t.quantityPlaceholder}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-10 text-xs text-center rounded-xl bg-surface"
              aria-label="Quantity"
            />
          </div>

          <div className="col-span-5 sm:col-span-5">
            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder={t.unitPricePlaceholder}
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="h-10 text-xs rounded-xl bg-surface"
              aria-label="Unit price"
            />
          </div>

          <div className="col-span-4 sm:col-span-4">
            <Button
              type="submit"
              size="sm"
              loading={isSaving}
              className="w-full h-10 rounded-xl text-xs font-bold gap-1 bg-brand-primary hover:bg-brand-primary-hover text-white shadow-2xs"
            >
              <Plus className="size-3.5" />
              <span>{t.addItemButton}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
