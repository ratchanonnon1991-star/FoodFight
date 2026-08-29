"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, CreditCard, ReceiptText, RefreshCw, ShieldCheck, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/i18n/LanguageProvider";
import { adminTranslations } from "../i18n/admin-translations";
import { fetchAdminBillById } from "../services/api-admin-service";
import type { AdminBillDetail, AdminBillStatus, AdminPaymentStatus } from "../types/admin-types";

function statusLabel(status: AdminBillStatus) {
  if (status === "SPLITTING") return "Splitting";
  if (status === "COMPLETED") return "Completed";
  if (status === "CLOSED") return "Closed";
  if (status === "CANCELLED") return "Cancelled";
  return "Draft";
}

function statusVariant(status: AdminBillStatus): "neutral" | "info" | "success" | "warning" | "danger" {
  if (status === "COMPLETED") return "success";
  if (status === "CLOSED") return "info";
  if (status === "CANCELLED") return "danger";
  if (status === "SPLITTING") return "warning";
  return "neutral";
}

function paymentVariant(status: AdminPaymentStatus): "neutral" | "success" {
  return status === "PAID" ? "success" : "neutral";
}

function paymentLabel(status: AdminPaymentStatus) {
  return status === "PAID" ? "Paid" : "Unpaid";
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(value: number | null) {
  return value == null
    ? "Not calculated"
    : `THB ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export interface AdminBillDetailPageProps {
  billId: string;
}

export function AdminBillDetailPage({ billId }: AdminBillDetailPageProps) {
  const { locale } = useLanguage();
  const t = adminTranslations[locale].billDetail;
  const [bill, setBill] = React.useState<AdminBillDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadBill = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }
    try {
      setBill(await fetchAdminBillById(billId, token));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bill details from server.");
    } finally {
      setIsLoading(false);
    }
  }, [billId]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => void loadBill(), 0);
    return () => window.clearTimeout(timer);
  }, [loadBill]);

  if (isLoading) {
    return <div className="flex min-h-[350px] flex-col items-center justify-center gap-3"><Spinner size="lg" variant="primary" /><p className="text-sm font-medium text-text-secondary">Loading bill details...</p></div>;
  }

  if (error === "BILL_NOT_FOUND") {
    return <div className="mx-auto max-w-xl space-y-6 py-8"><Card variant="default" className="p-8 text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-status-danger-bg text-status-danger-text"><ReceiptText className="size-6" /></div><h1 className="mt-4 text-lg font-bold text-text-primary">Bill Not Found</h1><p className="mt-2 text-sm text-text-secondary">The requested bill does not exist or is no longer available in the database.</p><div className="mt-6 flex justify-center"><Link href={ROUTES.ADMIN_BILLS}><Button variant="outline" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Bills</Button></Link></div></Card></div>;
  }

  if (error) {
    return <div className="max-w-xl space-y-4"><Alert variant="error"><AlertTitle>Error Loading Bill</AlertTitle><AlertDescription>{error}</AlertDescription></Alert><div className="flex items-center gap-3"><Button variant="outline" size="sm" onClick={loadBill} leftIcon={<RefreshCw className="size-4" />}>Retry</Button><Link href={ROUTES.ADMIN_BILLS}><Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Bills</Button></Link></div></div>;
  }

  if (!bill) return null;
  const completion = bill.paymentCompletionRate == null ? "?" : `${bill.paymentCompletionRate.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3"><Link href={ROUTES.ADMIN_BILLS}><Button variant="outline" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Bills</Button></Link><div className="min-w-0"><div className="flex flex-wrap items-center gap-2.5"><h1 className="truncate font-mono text-lg font-bold tracking-tight text-text-primary sm:text-xl">{bill.id}</h1><Badge variant={statusVariant(bill.status)} size="sm" dot>{statusLabel(bill.status)}</Badge></div><p className="text-xs text-text-secondary">Read-only bill inspection</p></div></div>
        <Button variant="outline" size="sm" onClick={loadBill} leftIcon={<RefreshCw className="size-3.5" />}>Refresh</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card variant="default"><CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="text-base">Bill Information</CardTitle></CardHeader><CardContent className="grid gap-5 pt-6 sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Current status</p><div className="mt-1.5"><Badge variant={statusVariant(bill.status)} size="sm" dot>{statusLabel(bill.status)}</Badge></div></div><div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Created</p><p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-primary"><Calendar className="size-4 text-text-secondary" />{formatDateTime(bill.createdAt)}</p></div>{bill.closedAt && <div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Closed</p><p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-primary"><Calendar className="size-4 text-text-secondary" />{formatDateTime(bill.closedAt)}</p></div>}<div className="sm:col-span-2"><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Bill ID</p><p className="mt-1.5 break-all font-mono text-xs text-text-primary">{bill.id}</p></div></CardContent></Card>

          <Card variant="default"><CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><CreditCard className="size-4 text-brand-primary" />Payment Summary</CardTitle></CardHeader><CardContent className="pt-6"><div className="grid gap-4 sm:grid-cols-4"><div><p className="text-xs text-text-secondary">Payment records</p><p className="mt-1 text-xl font-semibold text-text-primary">{bill.paymentCount}</p></div><div><p className="text-xs text-text-secondary">Paid</p><p className="mt-1 text-xl font-semibold text-status-success-text">{bill.paidPaymentCount}</p></div><div><p className="text-xs text-text-secondary">Unpaid</p><p className="mt-1 text-xl font-semibold text-text-primary">{bill.unpaidPaymentCount}</p></div><div><p className="text-xs text-text-secondary">Completion</p><p className="mt-1 text-xl font-semibold text-text-primary">{completion}</p></div></div>{bill.paymentCount === 0 && <p className="mt-5 rounded-md bg-surface-subtle p-3 text-sm text-text-secondary">No payment records. A missing denominator is shown as ?, not as failed payment.</p>}</CardContent></Card>

          <Card variant="default"><CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><CreditCard className="size-4 text-brand-primary" />Current Payments</CardTitle></CardHeader><CardContent className="pt-6">{bill.payments.length === 0 ? <p className="text-sm text-text-secondary">No payment records.</p> : <div className="overflow-x-auto"><table className="min-w-full divide-y divide-border text-left text-sm"><thead className="text-xs font-semibold text-text-secondary"><tr><th className="pb-3 pr-4">Member</th><th className="pb-3 pr-4">Amount</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Paid at</th></tr></thead><tbody className="divide-y divide-border-subtle">{bill.payments.map((payment) => <tr key={payment.id}><td className="py-3 pr-4"><div className="flex items-center gap-2"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{payment.payer.avatarUrl ? <img src={payment.payer.avatarUrl} alt="" className="size-8 rounded-full object-cover" /> : <User className="size-4" />}</div><span className="max-w-[12rem] truncate">{payment.payer.displayName}</span></div></td><td className="whitespace-nowrap py-3 pr-4 text-text-primary">{formatMoney(payment.amount)}</td><td className="py-3 pr-4"><Badge variant={paymentVariant(payment.status)} size="sm" dot>{paymentLabel(payment.status)}</Badge></td><td className="whitespace-nowrap py-3 text-xs text-text-secondary">{payment.paidAt ? formatDateTime(payment.paidAt) : "?"}</td></tr>)}</tbody></table></div>}</CardContent></Card>
        </div>

        <div className="space-y-6">
          <Card variant="default"><CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><User className="size-4 text-brand-primary" />Creator</CardTitle></CardHeader><CardContent className="flex items-center gap-3 pt-6"><div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{bill.creator.avatarUrl ? <img src={bill.creator.avatarUrl} alt="" className="size-12 rounded-full object-cover" /> : <User className="size-6" />}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-text-primary">{bill.creator.displayName}</p><p className="text-xs text-text-secondary">Bill creator</p></div></CardContent></Card>
          <Card variant="default"><CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><ReceiptText className="size-4 text-brand-primary" />Reported Bill Value</CardTitle></CardHeader><CardContent className="pt-6"><p className="text-2xl font-bold text-text-primary">{formatMoney(bill.reportedTotalAmount)}</p><p className="mt-2 text-xs leading-relaxed text-text-secondary">Reported meal bill value ? not FoodFighter revenue.</p></CardContent></Card>
          <Card variant="subtle" className="p-5 text-xs text-text-secondary"><p className="flex items-center gap-2 font-semibold text-text-primary"><ShieldCheck className="size-4 text-brand-primary" />Read-Only Administration</p><p className="mt-2">This page shows current transactional states only. It does not expose receipt contents, payment slips, PromptPay details, or payment-account credentials.</p></Card>
        </div>
      </div>
    </div>
  );
}
