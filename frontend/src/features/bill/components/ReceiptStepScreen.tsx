"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Camera, ImageUp } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError, resolveMediaUrl } from "@/lib/api/client";
import { BillPageHeader } from "./BillPageHeader";
import { ReceiptItemRow } from "./ReceiptItemRow";
import { AddReceiptItemForm } from "./AddReceiptItemForm";
import { useBill } from "../hooks/use-bill";
import { billService, type ReceiptItemInput } from "../services/bill-service";

export interface ReceiptStepScreenProps {
  billId: string;
}

export function ReceiptStepScreen({ billId }: ReceiptStepScreenProps) {
  const router = useRouter();
  const { bill, isLoading, error, setBill } = useBill(billId);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setActionError(null);
    setIsUploading(true);
    try {
      const updated = await billService.uploadReceipt(billId, file);
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to upload receipt.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddItem = async (input: ReceiptItemInput) => {
    try {
      const updated = await billService.addItem(billId, input);
      setBill(updated);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Unable to add item.");
    }
  };

  const handleUpdateItem = async (itemId: string, input: ReceiptItemInput) => {
    try {
      const updated = await billService.updateItem(billId, itemId, input);
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to update item.",
      );
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const updated = await billService.deleteItem(billId, itemId);
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to delete item.",
      );
    }
  };

  if (isLoading && !bill) {
    return (
      <div className="flex-1 flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <main className="flex-1 py-8">
        <PageContainer maxWidth="auth" paddingY="none">
          <Alert variant="error">
            <AlertDescription>{error ?? "Bill not found."}</AlertDescription>
          </Alert>
        </PageContainer>
      </main>
    );
  }

  const receiptImageUrl = resolveMediaUrl(bill.receipt?.imageUrl);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text-primary">
      <BillPageHeader
        title="Scan Receipt"
        subtitle={bill.meal.name}
        backHref={ROUTES.BILLS}
      />

      <main className="flex-1 py-6 pb-24">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {actionError && (
            <Alert variant="error" onClose={() => setActionError(null)}>
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          )}

          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">Receipt</p>
              {bill.isCreator && (
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Camera className="size-4" />}
                  loading={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {receiptImageUrl ? "Rescan" : "Scan Receipt"}
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />

            {receiptImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={receiptImageUrl}
                alt="Uploaded receipt"
                className="w-full max-h-72 object-contain rounded-md border border-border bg-surface-subtle"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border py-10 text-text-muted">
                <ImageUp className="size-8" />
                <p className="text-xs">No receipt scanned yet</p>
              </div>
            )}
          </Card>

          <Card variant="default" padding="md">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-text-primary">
                Items ({bill.items.length})
              </p>
              <p className="text-sm font-semibold text-text-primary">
                ฿{bill.subtotal.toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              Review the items below. Food photos aren&apos;t wired up yet -
              that comes later.
            </p>

            <div className="divide-y divide-border">
              {bill.items.map((item) => (
                <ReceiptItemRow
                  key={item.id}
                  item={item}
                  editable={bill.isCreator}
                  onSave={(input) => handleUpdateItem(item.id, input)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </div>

            {bill.isCreator && <AddReceiptItemForm onAdd={handleAddItem} />}
          </Card>

          {bill.isCreator && (
            <Button
              fullWidth
              size="lg"
              disabled={bill.items.length === 0}
              onClick={() => router.push(`/bills/${billId}/split`)}
            >
              Continue to Split
            </Button>
          )}
        </PageContainer>
      </main>
    </div>
  );
}
