"use client";

import * as React from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import type { BillItem } from "../types/bill-types";
import type { ReceiptItemInput } from "../services/bill-service";

export interface ReceiptItemRowProps {
  item: BillItem;
  editable: boolean;
  onSave: (input: ReceiptItemInput) => Promise<void>;
  onDelete: () => Promise<void>;
}

function formatMoney(amount: number): string {
  return `฿${new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function ReceiptItemRow({
  item,
  editable,
  onSave,
  onDelete,
}: ReceiptItemRowProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale].receipt;

  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState(item.name);
  const [quantity, setQuantity] = React.useState(String(item.quantity));
  const [unitPrice, setUnitPrice] = React.useState(String(item.unitPrice));

  React.useEffect(() => {
    setName(item.name);
    setQuantity(String(item.quantity));
    setUnitPrice(String(item.unitPrice));
  }, [item, isEditing]);

  const startEdit = () => {
    setName(item.name);
    setQuantity(String(item.quantity));
    setUnitPrice(String(item.unitPrice));
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        name: name.trim() || item.name,
        quantity: Number(quantity) || 1,
        unitPrice: Number(unitPrice) || 0,
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------------------------------------------------
  // EDIT MODE: Responsive mobile 390 layout (Name top, Qty & Price grid below)
  // -------------------------------------------------------------------------
  if (isEditing) {
    return (
      <form
        onSubmit={handleSave}
        className="py-3 space-y-2.5 rounded-2xl bg-surface-subtle p-3 my-1 border border-border-subtle"
      >
        {/* Name input */}
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.itemNamePlaceholder}
          className="h-9 text-xs rounded-xl bg-surface"
          aria-label="Edit item name"
        />

        {/* Qty, Unit Price & Actions Grid */}
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-3">
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-9 text-xs text-center rounded-xl bg-surface"
              aria-label="Edit quantity"
            />
          </div>

          <div className="col-span-4">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="h-9 text-xs rounded-xl bg-surface"
              aria-label="Edit price"
            />
          </div>

          <div className="col-span-5 flex items-center justify-end gap-1.5">
            <button
              type="submit"
              disabled={isSaving}
              className="size-9 rounded-xl bg-accent-fresh text-white flex items-center justify-center shadow-2xs hover:opacity-90 cursor-pointer disabled:opacity-50"
              title={t.saveItem}
              aria-label={t.saveItem}
            >
              <Check className="size-4 stroke-[3]" />
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="size-9 rounded-xl border border-border bg-surface text-text-secondary flex items-center justify-center hover:bg-surface-muted cursor-pointer"
              title={t.cancelEdit}
              aria-label={t.cancelEdit}
            >
              <X className="size-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </form>
    );
  }

  // -------------------------------------------------------------------------
  // NORMAL VIEW MODE: Quick financial scan
  // -------------------------------------------------------------------------
  return (
    <div className="flex items-center justify-between gap-2.5 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-bold text-text-primary truncate">
          {item.name}
        </p>
        <p className="text-[11px] text-text-secondary font-medium mt-0.5">
          {item.quantity} × {formatMoney(item.unitPrice)}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs sm:text-sm font-extrabold text-text-primary">
          {formatMoney(item.totalPrice)}
        </span>

        {/* 44px Accessible Touch Targets */}
        {editable && (
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={startEdit}
              className="size-9 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
              title={t.editItem}
              aria-label={`${t.editItem}: ${item.name}`}
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => void onDelete()}
              className="size-9 rounded-lg flex items-center justify-center text-text-muted hover:text-status-danger-text hover:bg-status-danger-bg transition-colors cursor-pointer"
              title={t.deleteItem}
              aria-label={`${t.deleteItem}: ${item.name}`}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
