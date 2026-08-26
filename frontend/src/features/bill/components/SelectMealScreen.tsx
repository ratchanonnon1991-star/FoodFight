"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PackageOpen, Users } from "lucide-react";
import { ROUTES, billRoutes } from "@/config/routes";
import {
  AuthenticatedPageHeader,
  AuthenticatedPageLayout,
} from "@/components/layout/AuthenticatedPageLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { PendingBillsSection } from "./PendingBillsSection";
import { billService } from "../services/bill-service";
import { usePendingBills } from "../hooks/use-pending-bills";
import { paymentAccountService } from "../services/payment-account-service";
import type { AvailableRoom } from "../types/bill-types";

export function SelectMealScreen() {
  const router = useRouter();
  const [rooms, setRooms] = React.useState<AvailableRoom[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [creatingRoomId, setCreatingRoomId] = React.useState<string | null>(null);
  const [hasPaymentAccount, setHasPaymentAccount] = React.useState(false);
  const {
    bills: pendingBills,
    isLoading: isPendingBillsLoading,
    error: pendingBillsError,
    refresh: refreshPendingBills,
  } = usePendingBills();

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

  const pendingBillIds = React.useMemo(
    () => new Set(pendingBills.map((bill) => bill.id)),
    [pendingBills],
  );
  const roomsForCreation =
    rooms?.filter(
      (room) =>
        !room.billId ||
        isPendingBillsLoading ||
        Boolean(pendingBillsError) ||
        !pendingBillIds.has(room.billId),
    ) ?? [];

  React.useEffect(() => {
    let isMounted = true;

    paymentAccountService
      .getMine()
      .then((account) => {
        if (isMounted) {
          setHasPaymentAccount(!!account);
        }
      })
      .catch(() => {
        // Non-critical - the setup prompt just stays visible if this fails.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthenticatedPageLayout>
      <AuthenticatedPageHeader
        eyebrow="Your bills"
        title="Select Meal"
        description="Continue an unfinished bill or choose a meal to create a new one."
      />

          <PendingBillsSection
            bills={pendingBills}
            isLoading={isPendingBillsLoading}
            error={pendingBillsError}
            onRetry={() => void refreshPendingBills()}
          />

          {error && (
          <Alert variant="error">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {rooms === null ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : roomsForCreation.length === 0 ? (
          <Card variant="subtle" padding="lg" className="text-center space-y-3">
            <PackageOpen className="size-10 mx-auto text-text-muted" />
            <p className="text-sm font-medium text-text-primary">
              {pendingBills.length > 0 ? "No new meals available" : "Can't find your meal?"}
            </p>
            <p className="text-sm text-text-secondary">
              {pendingBills.length > 0
                ? "Your unfinished bills are listed above."
                : "A bill can only be created after your group has selected a final restaurant."}
            </p>
          </Card>
        ) : (
          <section aria-labelledby="new-bill-heading" className="space-y-3">
            <div>
              <h2
                id="new-bill-heading"
                className="text-sm font-bold tracking-tight text-text-primary sm:text-base"
              >
                Start a new bill
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                Only meals with a final restaurant selected can be billed.
              </p>
            </div>
            {roomsForCreation.map((room) => (
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
          </section>
        )}

        {!hasPaymentAccount && (
          <p className="text-center text-xs text-text-muted">
            Managing your PromptPay receiving account?{" "}
            <Link
              href={ROUTES.BILL_PAYMENT_ACCOUNT}
              className="font-medium text-brand-primary hover:underline"
            >
              Set up payment account
            </Link>
          </p>
        )}
    </AuthenticatedPageLayout>
  );
}
