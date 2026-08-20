"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PackageOpen, Users } from "lucide-react";
import { ROUTES, billRoutes } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { BillPageHeader } from "./BillPageHeader";
import { billService } from "../services/bill-service";
import type { AvailableRoom } from "../types/bill-types";

export function SelectMealScreen() {
  const router = useRouter();
  const [rooms, setRooms] = React.useState<AvailableRoom[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [creatingRoomId, setCreatingRoomId] = React.useState<string | null>(null);

  const handleSelect = async (room: AvailableRoom) => {
    setError(null);

    if (room.billId) {
      router.push(billRoutes.receipt(room.billId));
      return;
    }

    setCreatingRoomId(room.roomId);
    try {
      const bill = await billService.createBill(room.roomId);
      router.push(billRoutes.receipt(bill.id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to start a bill for this meal.",
      );
    } finally {
      setCreatingRoomId(null);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    billService
      .listAvailableRooms()
      .then((data) => {
        if (isMounted) {
          setRooms(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err instanceof ApiError ? err.message : "Unable to load meals.",
          );
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text-primary">
      <BillPageHeader title="Select Meal" backHref={ROUTES.AUTHENTICATED_HOME} />

      <main className="flex-1 py-6 sm:py-8 pb-28">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            Choose the meal to create a bill for. Only meals with a final
            restaurant selected can be billed.
          </p>

          {error && (
          <Alert variant="error">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {rooms === null ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : rooms.length === 0 ? (
          <Card variant="subtle" padding="lg" className="text-center space-y-3">
            <PackageOpen className="size-10 mx-auto text-text-muted" />
            <p className="text-sm font-medium text-text-primary">
              Can&apos;t find your meal?
            </p>
            <p className="text-sm text-text-secondary">
              A bill can only be created after your group has selected a
              final restaurant.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => (
              <Card
                key={room.roomId}
                variant="default"
                padding="md"
                className="space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-text-primary">
                      {room.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {new Date(room.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  {room.billStatus && (
                    <Badge variant={room.billStatus === "DRAFT" ? "warning" : "info"}>
                      {room.billStatus === "DRAFT" ? "In progress" : "Splitting"}
                    </Badge>
                  )}
                </div>

                {room.restaurantName ? (
                  <Badge variant="brand-secondary">{room.restaurantName}</Badge>
                ) : (
                  <p className="text-xs text-text-muted">
                    No final restaurant selected yet.
                  </p>
                )}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {room.members.slice(0, 4).map((member) => (
                        <Avatar
                          key={member.userId}
                          size="sm"
                          name={member.displayName}
                          src={member.avatarUrl}
                          className="ring-2 ring-surface"
                        />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                      <Users className="size-3.5" />
                      {room.members.length}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    loading={creatingRoomId === room.roomId}
                    onClick={() => handleSelect(room)}
                  >
                    {room.billId ? "Continue" : "Create Bill"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-text-muted">
          Managing your PromptPay receiving account?{" "}
          <Link
            href={ROUTES.BILL_PAYMENT_ACCOUNT}
            className="font-medium text-brand-primary hover:underline"
          >
            Set up payment account
          </Link>
        </p>
        </PageContainer>
      </main>
    </div>
  );
}
