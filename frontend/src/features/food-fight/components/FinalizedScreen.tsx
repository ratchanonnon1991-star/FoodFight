"use client";

import * as React from "react";
import { Crown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RestaurantLoadingScreen } from "@/features/food-fight/components/RestaurantResults";
import type { FinalSelection } from "@/features/food-fight/types/food-fight-types";

export interface FinalizedScreenProps {
  finalSelection: FinalSelection | null;
  isHost: boolean;
  canStartRestaurants?: boolean;
  isStartingRestaurants: boolean;
  onStartRestaurants: () => void;
}

function StateIllustration({
  icon,
  tone = "brand",
}: {
  icon: React.ReactNode;
  tone?: "brand" | "success" | "muted";
}) {
  const toneClass =
    tone === "success"
      ? "bg-status-success-bg text-status-success-icon"
      : tone === "muted"
        ? "bg-surface-muted text-text-secondary"
        : "bg-brand-primary text-white";
  return (
    <div
      className={`mx-auto flex size-24 items-center justify-center rounded-full ${toneClass}`}
    >
      {icon}
    </div>
  );
}

export function FinalizedScreen({
  finalSelection,
  isHost,
  canStartRestaurants = true,
  isStartingRestaurants,
  onStartRestaurants,
}: FinalizedScreenProps) {
  if (isStartingRestaurants) return <RestaurantLoadingScreen />;
  if (!finalSelection)
    return (
      <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm">
        <h2 className="text-lg font-semibold">กำลังโหลดเมนูสุดท้าย...</h2>
        <p className="mt-2 text-sm text-text-secondary">
          ยังไม่ได้รับข้อมูลเมนูสุดท้ายจาก Backend
        </p>
      </Card>
    );

  return (
    <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm">
      <StateIllustration
        icon={<Crown className="size-11" aria-hidden="true" />}
        tone="muted"
      />
      <p className="mt-5 text-sm font-medium text-brand-primary">
        FoodFight เสร็จสมบูรณ์
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
        เมนูที่กลุ่มเลือกแล้ว!
      </h2>
      <div className="mt-5 rounded-2xl bg-surface-subtle p-5">
        <div className="mx-auto flex size-28 items-center justify-center rounded-xl bg-surface-muted">
          <ImageIcon className="size-12 text-text-muted" aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold">
          {finalSelection.nameTh ?? finalSelection.name}
        </h3>
        {finalSelection.nameTh &&
        finalSelection.name !== finalSelection.nameTh ? (
          <p className="mt-1 text-sm text-text-secondary">
            {finalSelection.name}
          </p>
        ) : null}
        {finalSelection.cuisine ? (
          <p className="mt-2 text-sm text-text-secondary">
            {finalSelection.cuisine}
          </p>
        ) : null}
        <p className="mt-4 text-sm font-medium">สมาชิกทุกคนยืนยันเมนูนี้แล้ว</p>
      </div>
      {isHost ? (
        <>
          <p className="mt-5 text-xs text-text-secondary">
            Host เท่านั้นที่เริ่มค้นหาร้านอาหารได้
          </p>
          <Button
            className="mt-3 w-full"
            variant="outline"
            onClick={onStartRestaurants}
            disabled={!canStartRestaurants || isStartingRestaurants}
            loading={isStartingRestaurants}
            loadingText="กำลังเริ่มค้นหา..."
          >
            ค้นหาร้านอาหาร
          </Button>
        </>
      ) : (
        <p className="mt-6 text-center text-sm text-text-secondary">
          รอ Host ค้นหาร้านอาหาร
        </p>
      )}
    </Card>
  );
}
