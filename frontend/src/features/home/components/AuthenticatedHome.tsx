"use client";

import * as React from "react";
import { LogIn, UserPlus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  DEMO_CURRENT_FOODFIGHT,
  DEMO_RECENT_FOODFIGHTS,
  DEMO_TIP,
  DEMO_USER,
} from "../constants/home-demo-data";
import { HomeHeader } from "./HomeHeader";
import { HomeActionCard } from "./HomeActionCard";
import { CurrentFoodFightCard } from "./CurrentFoodFightCard";
import { RecentFoodFightsSection } from "./RecentFoodFightsSection";
import { HomeTipCard } from "./HomeTipCard";

export interface AuthenticatedHomeProps {
  onCreateRoom?: () => void;
  onJoinRoom?: () => void;
  onContinueCurrent?: () => void;
  onViewAllRecent?: () => void;
}

export function AuthenticatedHome({
  onCreateRoom,
  onJoinRoom,
  onContinueCurrent,
  onViewAllRecent,
}: AuthenticatedHomeProps) {
  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer maxWidth="auth" paddingY="none" className="space-y-5 pt-3 sm:pt-4 pb-28">
        {/* 1. Header with greeting and avatar/notification */}
        <HomeHeader user={DEMO_USER} />

        {/* 2. Primary Action Cards (Create Room & Join Room) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          <HomeActionCard
            id="create-room-card"
            title="CREATE ROOM"
            description="Start a new FoodFight"
            icon={<UserPlus className="size-6 text-text-primary stroke-[2]" />}
            onClick={onCreateRoom}
          />
          <HomeActionCard
            id="join-room-card"
            title="JOIN ROOM"
            description="Enter code or scan QR"
            icon={<LogIn className="size-6 text-text-primary stroke-[2]" />}
            onClick={onJoinRoom}
          />
        </div>

        {/* 3. Current FoodFight Section */}
        <CurrentFoodFightCard
          session={DEMO_CURRENT_FOODFIGHT}
          onContinue={onContinueCurrent}
        />

        {/* 4. Recent FoodFights Section */}
        <RecentFoodFightsSection
          items={DEMO_RECENT_FOODFIGHTS}
          onViewAll={onViewAllRecent}
        />

        {/* 5. Helpful Tip Card */}
        <HomeTipCard tip={DEMO_TIP} />
      </PageContainer>
    </main>
  );
}
