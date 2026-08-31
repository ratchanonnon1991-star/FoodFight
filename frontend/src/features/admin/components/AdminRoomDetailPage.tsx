"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, DoorOpen, RefreshCw, Shield, User, UserX, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/i18n/LanguageProvider";
import { adminTranslations } from "../i18n/admin-translations";
import { fetchAdminRoomById } from "../services/api-admin-service";
import type { AdminRoomDetail, AdminRoomStatus } from "../types/admin-types";

function statusLabel(status: AdminRoomStatus) {
  if (status === "IN_PROGRESS") return "In progress";
  if (status === "COMPLETED") return "Completed";
  if (status === "CANCELLED") return "Cancelled";
  return "Lobby";
}

function statusVariant(status: AdminRoomStatus): "neutral" | "info" | "success" | "danger" {
  if (status === "COMPLETED") return "success";
  if (status === "CANCELLED") return "danger";
  if (status === "IN_PROGRESS") return "info";
  return "neutral";
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export interface AdminRoomDetailPageProps { roomId: string; }

export function AdminRoomDetailPage({ roomId }: AdminRoomDetailPageProps) {
  const { locale } = useLanguage();
  const t = adminTranslations[locale].roomDetail;
  const [room, setRoom] = React.useState<AdminRoomDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadRoom = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      setError("Missing authentication token.");
      setIsLoading(false);
      return;
    }
    try {
      setRoom(await fetchAdminRoomById(roomId, token));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load room details from server.");
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRoom();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadRoom]);

  if (isLoading) return <div className="flex min-h-[350px] flex-col items-center justify-center gap-3"><Spinner size="lg" variant="primary" /><p className="text-sm font-medium text-text-secondary">Loading room details...</p></div>;

  if (error === "ROOM_NOT_FOUND") return (
    <div className="mx-auto max-w-xl space-y-6 py-8">
      <Card variant="default" className="p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-status-danger-bg text-status-danger-text"><UserX className="size-6" /></div>
        <h1 className="mt-4 text-lg font-bold text-text-primary">Room Not Found</h1>
        <p className="mt-2 text-sm text-text-secondary">The requested room does not exist or is no longer available in the database.</p>
        <div className="mt-6 flex justify-center"><Link href={ROUTES.ADMIN_ROOMS}><Button variant="outline" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Rooms</Button></Link></div>
      </Card>
    </div>
  );

  if (error) return (
    <div className="max-w-xl space-y-4">
      <Alert variant="error"><AlertTitle>Error Loading Room</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
      <div className="flex items-center gap-3"><Button variant="outline" size="sm" onClick={loadRoom} leftIcon={<RefreshCw className="size-4" />}>Retry</Button><Link href={ROUTES.ADMIN_ROOMS}><Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Rooms</Button></Link></div>
    </div>
  );

  if (!room) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3"><Link href={ROUTES.ADMIN_ROOMS}><Button variant="outline" size="sm" leftIcon={<ArrowLeft className="size-4" />}>Back to Rooms</Button></Link><div className="min-w-0"><div className="flex flex-wrap items-center gap-2.5"><h1 className="truncate text-xl font-bold tracking-tight text-text-primary sm:text-2xl">{room.name}</h1><Badge variant={statusVariant(room.status)} size="sm" dot>{statusLabel(room.status)}</Badge></div><p className="font-mono text-xs text-text-secondary">Room code: {room.code}</p></div></div>
        <Button variant="outline" size="sm" onClick={loadRoom} leftIcon={<RefreshCw className="size-3.5" />}>Refresh</Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card variant="default">
            <CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="text-base">Room Information</CardTitle></CardHeader>
            <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
              <div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Current status</p><div className="mt-1.5"><Badge variant={statusVariant(room.status)} size="sm" dot>{statusLabel(room.status)}</Badge></div></div>
              <div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Created</p><p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-primary"><Calendar className="size-4 text-text-secondary" />{formatDateTime(room.createdAt)}</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Room code</p><p className="mt-1.5 font-mono text-sm text-text-primary">{room.code}</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Current members</p><p className="mt-1.5 flex items-center gap-1.5 text-sm text-text-primary"><Users className="size-4 text-text-secondary" />{room.members.length}</p></div>
            </CardContent>
          </Card>

          <Card variant="default">
            <CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><Users className="size-4 text-brand-primary" />Current Members</CardTitle></CardHeader>
            <CardContent className="pt-6">
              {room.members.length === 0 ? <p className="text-sm text-text-secondary">No current members are recorded for this room.</p> : (
                <div className="divide-y divide-border-subtle">
                  {room.members.map((member) => (
                    <div key={member.id} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{member.avatarUrl ? <img src={member.avatarUrl} alt="" className="size-10 rounded-full object-cover" /> : <User className="size-5" />}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-1.5"><p className="truncate text-sm font-medium text-text-primary">{member.displayName}</p>{member.isHost && <Badge variant="brand" size="sm"><Shield className="size-3" />Host</Badge>}</div><p className="text-xs text-text-secondary">Joined {formatDateTime(member.joinedAt)}</p></div></div>
                      <Badge variant={member.isReady ? "success" : "neutral"} size="sm" dot>{member.isReady ? "Ready" : "Not ready"}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card variant="default">
            <CardHeader className="border-b border-border-subtle pb-4"><CardTitle as="h2" className="flex items-center gap-2 text-base"><DoorOpen className="size-4 text-brand-primary" />Host</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-3 pt-6"><div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-brand-primary">{room.host.avatarUrl ? <img src={room.host.avatarUrl} alt="" className="size-12 rounded-full object-cover" /> : <User className="size-6" />}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-text-primary">{room.host.displayName}</p><p className="text-xs text-text-secondary">Current room host</p></div></CardContent>
          </Card>
          <Card variant="subtle" className="p-5"><p className="font-semibold text-text-primary">FoodFight Gameplay</p><p className="mt-1 text-sm text-text-secondary">Not available yet. Gameplay data is not available from the current Admin implementation.</p></Card>
          <Card variant="subtle" className="p-5 text-xs text-text-secondary"><p className="font-semibold text-text-primary">Read-Only Administration</p><p className="mt-1">Room inspection does not start, cancel, edit, or otherwise change the room.</p></Card>
        </div>
      </div>
    </div>
  );
}
