"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, DoorOpen, RefreshCw, Search, User, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { fetchAdminRooms } from "../services/api-admin-service";
import type { AdminRoomListItem, AdminRoomStatus, AdminRoomsPagination } from "../types/admin-types";

const ROOM_STATUSES: Array<{ value: AdminRoomStatus; label: string }> = [
  { value: "LOBBY", label: "Lobby" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function statusLabel(status: AdminRoomStatus) {
  return ROOM_STATUSES.find((option) => option.value === status)?.label ?? status;
}

function statusVariant(status: AdminRoomStatus): "neutral" | "info" | "success" | "danger" {
  if (status === "COMPLETED") return "success";
  if (status === "CANCELLED") return "danger";
  if (status === "IN_PROGRESS") return "info";
  return "neutral";
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function AdminRoomsPage() {
  const [rooms, setRooms] = React.useState<AdminRoomListItem[]>([]);
  const [pagination, setPagination] = React.useState<AdminRoomsPagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeSearch, setActiveSearch] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<AdminRoomStatus | "">("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadRooms = React.useCallback(async (targetPage: number, search: string, status: AdminRoomStatus | "") => {
    setIsLoading(true);
    setError(null);
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }
    try {
      const data = await fetchAdminRooms({ page: targetPage, limit: 20, search: search.trim() || undefined, status: status || undefined }, token);
      setRooms(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load room directory from server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRooms(page, activeSearch, selectedStatus);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [page, activeSearch, selectedStatus, loadRooms]);
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
  const changeStatus = (status: AdminRoomStatus | "") => {
    setSelectedStatus(status);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Rooms</h1>
            {!isLoading && <Badge variant="neutral" size="sm">{pagination.total} {pagination.total === 1 ? "Room" : "Rooms"}</Badge>}
          </div>
          <p className="text-sm text-text-secondary">Inspect current room status, hosts, and members. This view is read-only.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => loadRooms(page, activeSearch, selectedStatus)} leftIcon={<RefreshCw className="size-3.5" />}>Refresh</Button>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={submitSearch} className="flex w-full max-w-xl items-center gap-2">
          <div className="relative flex-1">
            <Input type="text" placeholder="Search by room code, name, or host..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} leftAdornment={<Search className="size-4" />} rightAdornment={searchInput ? <button type="button" onClick={clearSearch} className="p-1 text-text-muted hover:text-text-primary" aria-label="Clear search"><X className="size-3.5" /></button> : undefined} inputSize="sm" />
          </div>
          <Button type="submit" size="sm" variant="secondary">Search</Button>
        </form>
        <label className="flex items-center gap-2 self-start text-xs font-medium text-text-secondary lg:self-auto">
          <span>Status:</span>
          <select value={selectedStatus} onChange={(event) => changeStatus(event.target.value as AdminRoomStatus | "")} className="h-8 rounded-sm border border-border bg-surface px-2 text-xs text-text-primary outline-none focus:border-brand-secondary focus:ring-2 focus:ring-brand-secondary/20">
            <option value="">All statuses</option>
            {ROOM_STATUSES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
          <Spinner size="lg" variant="primary" />
          <p className="text-sm font-medium text-text-secondary">Loading rooms...</p>
        </div>
      ) : error ? (
        <div className="max-w-xl space-y-4">
          <Alert variant="error"><AlertTitle>Room Directory Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
          <Button variant="outline" size="sm" onClick={() => loadRooms(page, activeSearch, selectedStatus)} leftIcon={<RefreshCw className="size-4" />}>Retry</Button>
        </div>
      ) : rooms.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-subtle text-text-secondary"><DoorOpen className="size-6" /></div>
          <h2 className="mt-3 text-base font-semibold text-text-primary">No rooms found</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm text-text-secondary">{activeSearch || selectedStatus ? "No rooms matched the active search and status filter." : "No rooms are currently available in the database."}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface shadow-xs sm:block">
            <table className="min-w-full divide-y divide-border text-left text-sm">
              <thead className="bg-surface-subtle font-semibold text-text-secondary">
                <tr>
                  <th scope="col" className="px-4 py-3.5">Room</th>
                  <th scope="col" className="px-4 py-3.5">Host</th>
                  <th scope="col" className="px-4 py-3.5">Status</th>
                  <th scope="col" className="px-4 py-3.5">Members</th>
                  <th scope="col" className="px-4 py-3.5">Created</th>
                  <th scope="col" className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-surface">
                {rooms.map((room) => (
                  <tr key={room.id} className="transition-colors hover:bg-surface-subtle">
                    <td className="px-4 py-3.5"><p className="font-medium text-text-primary">{room.name}</p><p className="font-mono text-xs text-text-secondary">{room.code}</p></td>
                    <td className="px-4 py-3.5"><div className="flex items-center gap-2"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{room.host.avatarUrl ? <img src={room.host.avatarUrl} alt="" className="size-8 rounded-full object-cover" /> : <User className="size-4" />}</div><span className="max-w-[12rem] truncate">{room.host.displayName}</span></div></td>
                    <td className="whitespace-nowrap px-4 py-3.5"><Badge variant={statusVariant(room.status)} size="sm" dot>{statusLabel(room.status)}</Badge></td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-text-primary">{room.memberCount}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-xs text-text-secondary">{formatDate(room.createdAt)}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-right"><Link href={ROUTES.ADMIN_ROOM_DETAIL(room.id)}><Button variant="outline" size="sm">View details</Button></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 sm:hidden">
            {rooms.map((room) => (
              <Card key={room.id} variant="default" className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-medium text-text-primary">{room.name}</p><p className="font-mono text-xs text-text-secondary">{room.code}</p></div><Badge variant={statusVariant(room.status)} size="sm">{statusLabel(room.status)}</Badge></div>
                <div className="flex items-center gap-2 text-sm text-text-secondary"><div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{room.host.avatarUrl ? <img src={room.host.avatarUrl} alt="" className="size-8 rounded-full object-cover" /> : <User className="size-4" />}</div><span className="truncate">Host: {room.host.displayName}</span></div>
                <div className="flex items-center justify-between border-t border-border-subtle pt-2.5 text-xs text-text-secondary"><span>{room.memberCount} current members</span><span>{formatDate(room.createdAt)}</span></div>
                <Link href={ROUTES.ADMIN_ROOM_DETAIL(room.id)} className="block border-t border-border-subtle pt-2.5"><Button variant="outline" size="sm" fullWidth>View details</Button></Link>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-text-secondary">Showing page <strong className="text-text-primary">{pagination.page}</strong> of <strong className="text-text-primary">{Math.max(1, pagination.totalPages)}</strong> ({pagination.total} total {pagination.total === 1 ? "room" : "rooms"})</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={pagination.page <= 1} leftIcon={<ChevronLeft className="size-4" />}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))} disabled={pagination.totalPages === 0 || pagination.page >= pagination.totalPages} rightIcon={<ChevronRight className="size-4" />}>Next</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
