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
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import { HOME_TIP } from "../constants/home-static-data";
import { HomeHeader } from "./HomeHeader";
import { HomeActionCard } from "./HomeActionCard";
import { CurrentFoodFightCard } from "./CurrentFoodFightCard";
import { RecentFoodFightsSection } from "./RecentFoodFightsSection";
import { HomeTipCard } from "./HomeTipCard";
import type { RecentFoodFightItemData } from "@/features/home/types/home-types";

import { getMyHistory } from "@/features/history/services/history-service";
import type { HistoryItem } from "@/features/history/types/history-types";

import { formatRoomDate } from "@/features/room/utils/room-format";
import { PendingBillsSection } from "@/features/bill/components/PendingBillsSection";
import { usePendingBills } from "@/features/bill/hooks/use-pending-bills";

function mapHistoryToRecentItem(item: HistoryItem): RecentFoodFightItemData {
  const menuName = item.finalMenu?.name;
  const restaurantName = item.restaurant?.name;
  const subtitle = [menuName, restaurantName].filter(Boolean).join(" • ");
  const normalizedMenuName = menuName?.toLowerCase() ?? "";

  return {
    id: item.id,
    title: item.room.name,
    subtitle: subtitle || item.room.locationName,
    date: formatRoomDate(item.completedAt),
    memberCount: item.memberCount,
    iconType: normalizedMenuName.includes("pizza")
      ? "pizza"
      : normalizedMenuName.includes("drink") ||
          normalizedMenuName.includes("tea")
        ? "drink"
        : "soup",
    href: ROUTES.HISTORY,
  };
}

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
  const [currentSession, setCurrentSession] =
    React.useState<CurrentFoodFightSession | null>(null);
  const [recentFoodFights, setRecentFoodFights] = React.useState<
    readonly RecentFoodFightItemData[]
  >([]);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const {
    bills: pendingBills,
    isLoading: isPendingBillsLoading,
    error: pendingBillsError,
    refresh: refreshPendingBills,
  } = usePendingBills();

  const handleLogout = React.useCallback(async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    const accessToken = getStoredAccessToken();

    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      });
    } finally {
      window.localStorage.removeItem("accessToken");
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [isLoggingOut, router]);

  React.useEffect(() => {
    let isMounted = true;
    const accessToken = getStoredAccessToken();

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
          setCurrentSession(
            currentRoom ? toCurrentFoodFightSession(currentRoom) : null,
          );
        }
      } catch {
        if (isMounted) {
          setCurrentSession(null);
        }
      }
    };

    void loadCurrentRoom();

    apiFetch(
      `${API_BASE_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      accessToken,
    )
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
          email: currentUser.email,
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

  React.useEffect(() => {
    let isMounted = true;
    const accessToken = getStoredAccessToken();

    if (!accessToken) {
      return () => {
        isMounted = false;
      };
    }

    const loadHomeData = async () => {
      const historyResult = await Promise.allSettled([getMyHistory()]);

      if (!isMounted) {
        return;
      }

      if (historyResult[0]?.status === "fulfilled") {
        setRecentFoodFights(
          historyResult[0].value.slice(0, 3).map(mapHistoryToRecentItem),
        );
      }
    };

    void loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

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
        <HomeHeader
          user={user ?? { name: "FoodFighter" }}
          onLogout={handleLogout}
        />

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

        {/* 3. Unfinished Bills Section */}
        <PendingBillsSection
          bills={pendingBills}
          isLoading={isPendingBillsLoading}
          error={pendingBillsError}
          onRetry={() => void refreshPendingBills()}
          variant="home"
        />

        {/* 4. Current FoodFight Section */}
        <CurrentFoodFightCard
          session={currentSession}
          onContinue={continueCurrentRoom}
        />

        {/* 5. Recent FoodFights Section */}
        <RecentFoodFightsSection
          items={recentFoodFights}
          onViewAll={onViewAllRecent ?? (() => router.push(ROUTES.HISTORY))}
        />

        {/* 6. Helpful Tip Card */}
        <HomeTipCard tip={HOME_TIP} />
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
    statusDescription: isLobby
      ? "Waiting for preferences"
      : "FoodFight in progress",
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
