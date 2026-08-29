"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  ChevronLeft,
  FileText,
  ImageUp,
  Receipt,
  X,
  ZoomIn,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError, resolveMediaUrl } from "@/lib/api/client";
import { compressImage } from "@/lib/utils/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { ReceiptItemRow } from "./ReceiptItemRow";
import { AddReceiptItemForm } from "./AddReceiptItemForm";
import { useBill } from "../hooks/use-bill";
import { billService, type ReceiptItemInput } from "../services/bill-service";
import { cn } from "@/lib/utils/cn";

export interface ReceiptStepScreenProps {
  billId: string;
}

function formatMoney(amount: number): string {
  return `฿${new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function ReceiptStepScreen({ billId }: ReceiptStepScreenProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = billTranslations[locale].receipt;

  const { bill, isLoading, error, setBill } = useBill(billId);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [scanWarning, setScanWarning] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEnlargedOpen, setIsEnlargedOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEnlargedOpen(false);
      }
    };
    if (isEnlargedOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnlargedOpen]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setActionError(null);
    setScanWarning(null);
    setIsUploading(true);
    try {
      const compressed = await compressImage(file);
      const updated = await billService.uploadReceipt(billId, compressed);
      setBill(updated);

      if (updated.receipt?.ocrStatus === "FAILED") {
        setScanWarning(t.ocrFailedDesc);
      }
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
      setActionError(
        err instanceof ApiError ? err.message : "Unable to add item.",
      );
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
      <div className="flex min-h-dvh items-center justify-center py-20 bg-background text-text-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <main className="min-h-dvh flex items-center justify-center p-4 bg-background text-text-primary">
        <Card
          variant="outline"
          className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md max-w-md w-full space-y-4"
        >
          <AlertTriangle className="size-10 text-status-danger-text mx-auto" />
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            {error ?? "Bill not found."}
          </h2>
          <Button variant="outline" onClick={() => router.push(ROUTES.BILLS)}>
            {isTh ? "กลับไปหน้ารายการบิล" : "Back to Bills"}
          </Button>
        </Card>
      </main>
    );
  }

  const receiptImageUrl = resolveMediaUrl(bill.receipt?.imageUrl);
  const showOcrWarning =
    Boolean(scanWarning) || bill.receipt?.ocrStatus === "FAILED";
  const hasItems = bill.items.length > 0;

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white flex flex-col">
      {/* Warm Atmosphere Hero Background Layer */}
      <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-5 md:max-w-3xl lg:max-w-5xl flex-1 flex flex-col">
        {/* Navigation & Step Indicator Row */}
        <div className="mb-2 flex items-center justify-between">
          <Link
            href={ROUTES.BILLS}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeft className="size-4" />
            <span>{isTh ? "ย้อนกลับ" : "Back to Bills"}</span>
          </Link>
          <span className="text-[11px] font-bold text-white/70">
            {isTh ? "ขั้นตอนที่ 1 จาก 3" : "Step 1 of 3"}
          </span>
        </div>

        {/* Singular Hero Header with High-Contrast White Text */}
        <div className="mb-4 text-center sm:mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-1 max-w-sm text-xs font-medium leading-relaxed text-white/85 sm:text-sm md:max-w-md">
            {t.subtitle(
              bill.meal.restaurantName ?? bill.meal.name,
              bill.members.length,
            )}
          </p>
        </div>

        {/* Error alert */}
        {actionError && (
          <div className="mb-4 rounded-2xl border border-status-danger-border bg-status-danger-bg p-3.5 text-xs text-status-danger-text flex items-center justify-between shadow-xs">
            <span>{actionError}</span>
            <button
              type="button"
              onClick={() => setActionError(null)}
              className="text-status-danger-text hover:opacity-75"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Saffron OCR Warning Banner (when scan failed) */}
        {showOcrWarning && (
          <div className="mb-4 rounded-2xl border border-amber-500/50 bg-amber-500/10 p-3.5 text-amber-950 dark:text-amber-100 shadow-xs flex items-start gap-3">
            <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <p className="font-extrabold">{t.ocrFailedTitle}</p>
              <p className="leading-relaxed text-amber-800 dark:text-amber-200">
                {t.ocrFailedDesc}
              </p>
            </div>
          </div>
        )}

        {/* Main Grid: Responsive 2-Column on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6 items-start">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT COLUMN (Desktop col-span-5): RECEIPT PHOTO CARD              */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-3">
            <Card
              variant="outline"
              className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="size-4 text-brand-primary" />
                  <h2 className="text-sm font-extrabold tracking-tight text-text-primary">
                    {t.receiptCardTitle}
                  </h2>
                </div>

                {bill.isCreator && (
                  <Button
                    size="sm"
                    variant="outline"
                    loading={isUploading}
                    className="h-8 text-xs font-bold gap-1.5 rounded-xl"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="size-3.5" />
                    <span>{receiptImageUrl ? t.rescanReceipt : t.scanReceipt}</span>
                  </Button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Receipt Photo / Preview Area */}
              {receiptImageUrl ? (
                <div className="relative group rounded-2xl border-2 border-border-subtle bg-surface-muted overflow-hidden shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={receiptImageUrl}
                    alt="Uploaded receipt document"
                    className="w-full max-h-72 sm:max-h-80 object-contain rounded-xl cursor-pointer transition-transform duration-200 group-hover:scale-[1.01]"
                    onClick={() => setIsEnlargedOpen(true)}
                  />

                  {/* Click to enlarge hint overlay */}
                  <button
                    type="button"
                    onClick={() => setIsEnlargedOpen(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px] text-white font-bold text-xs gap-1.5 cursor-pointer"
                  >
                    <ZoomIn className="size-4" />
                    <span>{isTh ? "แตะเพื่อดูภาพขยาย" : "Tap to enlarge"}</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-10 text-text-muted bg-surface-subtle/50 text-center p-4">
                  <div className="size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted shadow-2xs">
                    <ImageUp className="size-6 stroke-[1.8]" />
                  </div>
                  <p className="text-xs font-bold text-text-secondary mt-1">
                    {t.noReceiptYet}
                  </p>
                  <p className="text-[11px] text-text-muted max-w-[220px]">
                    {isTh
                      ? "ถ่ายภาพใบเสร็จเพื่อช่วยดึงรายการอาหารอัตโนมัติ"
                      : "Take a photo of the receipt to extract items automatically"}
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT COLUMN (Desktop col-span-7): BILL ITEMS & ENTRY CARD        */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-4">
            <Card
              variant="outline"
              className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-4"
            >
              {/* Items Card Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-brand-primary" />
                  <h2 className="text-sm font-extrabold tracking-tight text-text-primary">
                    {isTh
                      ? `รายการอาหาร (${bill.items.length})`
                      : `Items (${bill.items.length})`}
                  </h2>
                </div>

                {/* Subtotal Pill */}
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-text-secondary mr-1.5">
                    {t.subtotalLabel}:
                  </span>
                  {isUploading ? (
                    <Skeleton className="h-5 w-16 inline-block" />
                  ) : (
                    <span className="text-base sm:text-lg font-black text-text-primary">
                      {formatMoney(bill.subtotal)}
                    </span>
                  )}
                </div>
              </div>

              {/* Items List or Loading Skeleton */}
              {isUploading ? (
                <div className="divide-y divide-border/60">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/5" />
                        <Skeleton className="h-3 w-2/5" />
                      </div>
                      <Skeleton className="h-4 w-12 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : bill.items.length === 0 ? (
                <div className="py-8 text-center text-text-muted text-xs font-medium">
                  {t.emptyItemsHint}
                </div>
              ) : (
                <div className="divide-y divide-border/60">
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
              )}

              {/* Add Item Form (Host Only) */}
              {!isUploading && bill.isCreator && (
                <AddReceiptItemForm onAdd={handleAddItem} />
              )}
            </Card>

            {/* Continue to Split Primary CTA (Host Only) */}
            {bill.isCreator && (
              <div className="pt-1 text-center space-y-2">
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2",
                    hasItems && !isUploading
                      ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99] cursor-pointer"
                      : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                  )}
                  disabled={isUploading || !hasItems}
                  onClick={() => router.push(`/bills/${billId}/split`)}
                >
                  <span>{t.continueToSplit}</span>
                  <ArrowRight className="size-5 stroke-[2.5]" />
                </Button>

                <p className="text-xs text-text-secondary">
                  {t.continueHelper}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* LIGHTBOX MODAL: ENLARGED RECEIPT VIEW (Frontend Only)                 */}
      {/* ===================================================================== */}
      {isEnlargedOpen && receiptImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsEnlargedOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.receiptCardTitle}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-surface rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4 border border-border flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-2 border-b border-border px-2">
              <span className="text-xs font-bold text-text-primary">
                {t.receiptCardTitle}
              </span>
              <button
                type="button"
                onClick={() => setIsEnlargedOpen(false)}
                className="size-8 rounded-full bg-surface-muted hover:bg-surface-subtle flex items-center justify-center text-text-primary transition-colors cursor-pointer"
                title={isTh ? "ปิด" : "Close"}
                aria-label={isTh ? "ปิด" : "Close"}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Enlarged Image Container */}
            <div className="overflow-auto max-h-[80vh] p-2 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={receiptImageUrl}
                alt="Enlarged receipt document"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
