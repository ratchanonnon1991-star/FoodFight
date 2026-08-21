"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ReceiptItemInput } from "../services/bill-service";

export interface AddReceiptItemFormProps {
  onAdd: (input: ReceiptItemInput) => Promise<void>;
}

export function AddReceiptItemForm({ onAdd }: AddReceiptItemFormProps) {
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
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
      <Input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 min-w-0"
        aria-label="New item name"
      />
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-14"
        aria-label="New item quantity"
      />
      <Input
        type="number"
        min={0}
        step="0.01"
        placeholder="Price"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
        className="w-20"
        aria-label="New item unit price"
      />
      <Button type="submit" size="sm" variant="outline" loading={isSaving}>
        <Plus className="size-4" />
      </Button>
    </form>
  );
}
