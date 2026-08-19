"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ROUTES } from "@/config/routes";
import { API_BASE_URL } from "@/config/api";
import { roomService } from "@/features/room/services/room-service";
import type { RoomLobby } from "@/features/room/types/room-types";
import type {
  AuthenticatedUserDisplay,
  CurrentFoodFightSession,
} from "@/features/home/types/home-types";
import {
  DEMO_RECENT_FOODFIGHTS,
  DEMO_TIP,
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
  const router = useRouter();
  const [user, setUser] = React.useState<AuthenticatedUserDisplay | null>(null);
  const [currentSession, setCurrentSession] = React.useState<CurrentFoodFightSession | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      router.replace(ROUTES.AUTH.LOGIN);
      return () => {
        isMounted = false;
      };
    }

    const loadCurrentRoom = async () => {
      try {
        const currentRoom = await roomService.getCurrentRoom();

        if (isMounted) {
          setCurrentSession(currentRoom ? toCurrentFoodFightSession(currentRoom) : null);
        }
      } catch {
        if (isMounted) {
          setCurrentSession(null);
        }
      }
    };

    void loadCurrentRoom();

    fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Session is no longer valid");
        }

        return (await response.json()) as {
          displayName?: string;
          email?: string;
          avatarUrl?: string | null;
        };
      })
      .then((currentUser) => {
        if (!isMounted) {
          return;
        }

        const fallbackName = currentUser.email?.split("@")[0] || "FoodFighter";

        setUser({
          name: currentUser.displayName?.trim() || fallbackName,
          avatarUrl: currentUser.avatarUrl ?? undefined,
        });
      })
      .catch(() => {
        window.localStorage.removeItem("accessToken");

        if (isMounted) {
          router.replace(ROUTES.AUTH.LOGIN);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const continueCurrentRoom = () => {
    if (onContinueCurrent) {
      onContinueCurrent();
      return;
    }

    if (currentSession?.continueHref) {
      router.push(currentSession.continueHref);
    }
  };

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer
        maxWidth="auth"
        paddingY="none"
        className="space-y-5 sm:space-y-6 pt-3 sm:pt-4 pb-32"
      >
        {/* 1. Header with greeting and avatar/notification */}
        <HomeHeader user={user ?? { name: "FoodFighter" }} />

        {/* 2. Primary Action Cards (Create Room & Join Room) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          <HomeActionCard
            id="create-room-card"
            title="CREATE ROOM"
            description="Start a new FoodFight"
            icon={<UserPlus className="size-6 text-text-primary stroke-[2]" />}
            href={ROUTES.ROOM.CREATE}
            onClick={onCreateRoom}
          />
          <HomeActionCard
            id="join-room-card"
            title="JOIN ROOM"
            description="Enter code or scan QR"
            icon={<LogIn className="size-6 text-text-primary stroke-[2]" />}
            href={ROUTES.ROOM.JOIN}
            onClick={onJoinRoom}
          />
        </div>

        {/* 3. Current FoodFight Section */}
        {currentSession ? (
          <CurrentFoodFightCard session={currentSession} onContinue={continueCurrentRoom} />
        ) : null}

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

function toCurrentFoodFightSession(room: RoomLobby): CurrentFoodFightSession {
  const isLobby = room.status === "LOBBY";

  return {
    id: room.id,
    title: room.name,
    status: isLobby ? "Lobby" : "In progress",
    memberCount: room.memberCount,
    statusDescription: isLobby ? "Waiting for preferences" : "FoodFight in progress",
    members: [
      {
        id: `host-${room.id}`,
        name: room.host.displayName,
        avatarUrl: room.host.avatarUrl,
      },
      ...room.members.map((member) => ({
        id: member.id,
        name: member.displayName,
        avatarUrl: member.avatarUrl,
      })),
    ],
    continueHref: ROUTES.ROOM.LOBBY(room.id),
  };
}
