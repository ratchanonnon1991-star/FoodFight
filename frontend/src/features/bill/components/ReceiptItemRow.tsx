"use client";

import * as React from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import type { BillItem } from "../types/bill-types";
import type { ReceiptItemInput } from "../services/bill-service";

export interface ReceiptItemRowProps {
  item: BillItem;
  editable: boolean;
  onSave: (input: ReceiptItemInput) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ReceiptItemRow({
  item,
  editable,
  onSave,
  onDelete,
}: ReceiptItemRowProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState(item.name);
  const [quantity, setQuantity] = React.useState(String(item.quantity));
  const [unitPrice, setUnitPrice] = React.useState(String(item.unitPrice));

  const startEdit = () => {
    setName(item.name);
    setQuantity(String(item.quantity));
    setUnitPrice(String(item.unitPrice));
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        name,
        quantity: Number(quantity) || 1,
        unitPrice: Number(unitPrice) || 0,
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 min-w-0"
          aria-label="Item name"
        />
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-14"
          aria-label="Quantity"
        />
        <Input
          type="number"
          min={0}
          step="0.01"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          className="w-20"
          aria-label="Unit price"
        />
        <IconButton
          aria-label="Save item"
          size="sm"
          variant="primary"
          loading={isSaving}
          onClick={handleSave}
        >
          <Check className="size-4" />
        </IconButton>
        <IconButton
          aria-label="Cancel edit"
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(false)}
        >
          <X className="size-4" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {item.name}
        </p>
        <p className="text-xs text-text-secondary">
          {item.quantity} x ฿{item.unitPrice.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-semibold text-text-primary">
          ฿{item.totalPrice.toFixed(2)}
        </span>
        {editable && (
          <>
            <IconButton aria-label="Edit item" size="sm" onClick={startEdit}>
              <Pencil className="size-4" />
            </IconButton>
            <IconButton
              aria-label="Delete item"
              size="sm"
              variant="destructive"
              onClick={() => void onDelete()}
            >
              <Trash2 className="size-4" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}
