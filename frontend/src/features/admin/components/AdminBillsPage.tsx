"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ReceiptText,
  RefreshCw,
  Search,
  User,
  X,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { fetchAdminBills } from "../services/api-admin-service";
import type {
  AdminBillListItem,
  AdminBillStatus,
  AdminBillsPagination,
} from "../types/admin-types";

const BILL_STATUSES: Array<{ value: AdminBillStatus; label: string }> = [
  { value: "DRAFT", label: "Draft" },
  { value: "SPLITTING", label: "Splitting" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CLOSED", label: "Closed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function statusLabel(status: AdminBillStatus) {
  return BILL_STATUSES.find((option) => option.value === status)?.label ?? status;
}

function statusVariant(
  status: AdminBillStatus,
): "neutral" | "info" | "success" | "warning" | "danger" {
  if (status === "COMPLETED") return "success";
  if (status === "CLOSED") return "info";
  if (status === "CANCELLED") return "danger";
  if (status === "SPLITTING") return "warning";
  return "neutral";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatMoney(value: number | null) {
  return value == null
    ? "Not calculated"
    : `THB ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function paymentLabel(bill: AdminBillListItem) {
  if (bill.paymentCount === 0) return "No payment data";
  const rate = bill.paymentCompletionRate == null ? "?" : `${bill.paymentCompletionRate.toFixed(1)}%`;
  return `${bill.paidPaymentCount}/${bill.paymentCount} paid ? ${rate}`;
}

export function AdminBillsPage() {
  const [bills, setBills] = React.useState<AdminBillListItem[]>([]);
  const [pagination, setPagination] = React.useState<AdminBillsPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeSearch, setActiveSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<AdminBillStatus | "">("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadBills = React.useCallback(
    async (targetPage: number, search: string, status: AdminBillStatus | "") => {
      setIsLoading(true);
      setError(null);
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        setError("Missing authentication token.");
        setIsLoading(false);
        return;
      }
      try {
        const data = await fetchAdminBills(
          {
            page: targetPage,
            limit: 20,
            search: search.trim() || undefined,
            status: status || undefined,
          },
          token,
        );
        setBills(data.items);
        setPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load bills from server.");
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadBills(page, activeSearch, selectedStatus);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [activeSearch, loadBills, page, selectedStatus]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    setActiveSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
    setPage(1);
  };

  const changeStatus = (status: AdminBillStatus | "") => {
    setSelectedStatus(status);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Bills &amp; Payments
            </h1>
            {!isLoading && (
              <Badge variant="neutral" size="sm">
                {pagination.total} {pagination.total === 1 ? "Bill" : "Bills"}
              </Badge>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            Inspect reported meal bill values and current payment states. This view is read-only.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => loadBills(page, activeSearch, selectedStatus)}
          leftIcon={<RefreshCw className="size-3.5" />}
        >
          Refresh
        </Button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={submitSearch} className="flex w-full max-w-xl items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by bill ID or creator..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              leftAdornment={<Search className="size-4" />}
              rightAdornment={
                searchInput ? (
                  <button type="button" onClick={clearSearch} className="p-1 text-text-muted hover:text-text-primary" aria-label="Clear search">
                    <X className="size-3.5" />
                  </button>
                ) : undefined
              }
              inputSize="sm"
            />
          </div>
          <Button type="submit" size="sm" variant="secondary">Search</Button>
        </form>
        <label className="flex items-center gap-2 self-start text-xs font-medium text-text-secondary lg:self-auto">
          <span>Status:</span>
          <select
            value={selectedStatus}
            onChange={(event) => changeStatus(event.target.value as AdminBillStatus | "")}
            className="h-8 rounded-sm border border-border bg-surface px-2 text-xs text-text-primary outline-none focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20"
          >
            <option value="">All statuses</option>
            {BILL_STATUSES.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
          <Spinner size="lg" variant="primary" />
          <p className="text-sm font-medium text-text-secondary">Loading bills...</p>
        </div>
      ) : error ? (
        <div className="max-w-xl space-y-4">
          <Alert variant="error"><AlertTitle>Bill Directory Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
          <Button variant="outline" size="sm" onClick={() => loadBills(page, activeSearch, selectedStatus)} leftIcon={<RefreshCw className="size-4" />}>Retry</Button>
        </div>
      ) : bills.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-subtle text-text-secondary"><ReceiptText className="size-6" /></div>
          <h2 className="mt-3 text-base font-semibold text-text-primary">No bills found</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-text-secondary">{activeSearch || selectedStatus ? "No bills matched the active search and status filter." : "No bills are currently available in the database."}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface shadow-xs sm:block">
            <table className="min-w-full divide-y divide-border text-left text-sm">
              <thead className="bg-surface-subtle font-semibold text-text-secondary">
                <tr><th className="px-4 py-3.5">Bill</th><th className="px-4 py-3.5">Creator</th><th className="px-4 py-3.5">Status</th><th className="px-4 py-3.5">Bill Value</th><th className="px-4 py-3.5">Payments</th><th className="px-4 py-3.5">Created</th><th className="px-4 py-3.5 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-surface">
                {bills.map((bill) => (
                  <tr key={bill.id} className="transition-colors hover:bg-surface-subtle">
                    <td className="max-w-[13rem] px-4 py-3.5"><p className="truncate font-mono text-xs text-text-primary" title={bill.id}>{bill.id}</p><p className="text-xs text-text-secondary">Reported meal bill value</p></td>
                    <td className="px-4 py-3.5"><div className="flex items-center gap-2"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{bill.creator.avatarUrl ? <img src={bill.creator.avatarUrl} alt="" className="size-8 rounded-full object-cover" /> : <User className="size-4" />}</div><span className="max-w-[12rem] truncate">{bill.creator.displayName}</span></div></td>
                    <td className="whitespace-nowrap px-4 py-3.5"><Badge variant={statusVariant(bill.status)} size="sm" dot>{statusLabel(bill.status)}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-text-primary">{formatMoney(bill.reportedTotalAmount)}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-text-secondary">{paymentLabel(bill)}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-text-secondary">{formatDate(bill.createdAt)}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right"><Link href={ROUTES.ADMIN_BILL_DETAIL(bill.id)}><Button variant="outline" size="sm">View details</Button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 sm:hidden">
            {bills.map((bill) => (
              <Card key={bill.id} variant="default" className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-mono text-xs text-text-primary">{bill.id}</p><p className="mt-1 text-xs text-text-secondary">{bill.creator.displayName}</p></div><Badge variant={statusVariant(bill.status)} size="sm">{statusLabel(bill.status)}</Badge></div>
                <div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-3 text-xs"><div><p className="text-text-secondary">Bill value</p><p className="mt-1 font-medium text-text-primary">{formatMoney(bill.reportedTotalAmount)}</p></div><div><p className="text-text-secondary">Payments</p><p className="mt-1 font-medium text-text-primary">{paymentLabel(bill)}</p></div></div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-2.5 text-xs text-text-secondary"><span>{formatDate(bill.createdAt)}</span><Link href={ROUTES.ADMIN_BILL_DETAIL(bill.id)}><Button variant="outline" size="sm">View details</Button></Link></div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-text-secondary">Showing page <strong className="text-text-primary">{pagination.page}</strong> of <strong className="text-text-primary">{Math.max(1, pagination.totalPages)}</strong> ({pagination.total} total {pagination.total === 1 ? "bill" : "bills"})</div>
            <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={pagination.page <= 1} leftIcon={<ChevronLeft className="size-4" />}>Previous</Button><Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))} disabled={pagination.totalPages === 0 || pagination.page >= pagination.totalPages} rightIcon={<ChevronRight className="size-4" />}>Next</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}
