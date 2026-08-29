"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ROUTES } from "@/config/routes";
import { API_BASE_URL } from "@/config/api";
import { roomService } from "@/features/room/services/room-service";
import type { RoomLobby } from "@/features/room/types/room-types";
import type { UserRole } from "@/features/auth/types/auth-types";
import type {
  AuthenticatedUserDisplay,
  CurrentFoodFightSession,
} from "@/features/home/types/home-types";
import { authService } from "@/features/auth/services/auth-runtime";
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import { HOME_TIP } from "../constants/home-static-data";
import { HomeHeader } from "./HomeHeader";
import { HomeFoodCarousel } from "./HomeFoodCarousel";
import { HomeActionCard } from "./HomeActionCard";
import { CurrentFoodFightCard } from "./CurrentFoodFightCard";
import { HomeFoodProfileCard } from "./HomeFoodProfileCard";
import { RecentFoodFightsSection } from "./RecentFoodFightsSection";
import { HomeTipCard } from "./HomeTipCard";
import { HomeLanguageProvider, useHomeLanguage } from "../i18n/HomeLanguageContext";
import type { RecentFoodFightItemData } from "@/features/home/types/home-types";

import { getMyHistory } from "@/features/history/services/history-service";
import type { HistoryItem } from "@/features/history/types/history-types";

import { formatRoomDate } from "@/features/room/utils/room-format";
import { RoomDetailsModal } from "@/features/room/components/RoomDetailsModal";
import { PendingBillsSection } from "@/features/bill/components/PendingBillsSection";
import { usePendingBills } from "@/features/bill/hooks/use-pending-bills";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";

function mapHistoryToRecentItem(item: HistoryItem): RecentFoodFightItemData {
  const menuName = item.finalMenu?.name;
  const restaurantName = item.restaurant?.name;
  const subtitle = [menuName, restaurantName].filter(Boolean).join(" • ");
  const normalizedMenuName = menuName?.toLowerCase() ?? "";

  return {
    id: item.id,
    roomId: item.room.id,
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
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [isCurrentSessionLoading, setIsCurrentSessionLoading] =
    React.useState(true);
  const [isRecentFoodFightsLoading, setIsRecentFoodFightsLoading] =
    React.useState(true);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [selectedRecentRoom, setSelectedRecentRoom] =
    React.useState<RoomLobby | null>(null);
  const [isRecentRoomLoading, setIsRecentRoomLoading] = React.useState(false);
  const [recentRoomError, setRecentRoomError] = React.useState<string | null>(
    null,
  );
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

    try {
      await authService.logout();
    } finally {
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
      } finally {
        if (isMounted) {
          setIsCurrentSessionLoading(false);
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
          role?: UserRole;
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
          role: currentUser.role,
        });
      })
      .catch(() => {
        window.localStorage.removeItem("accessToken");

        if (isMounted) {
          router.replace(ROUTES.AUTH.LOGIN);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsUserLoading(false);
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
      try {
        const historyResult = await Promise.allSettled([getMyHistory()]);

        if (!isMounted) {
          return;
        }

        if (historyResult[0]?.status === "fulfilled") {
          setRecentFoodFights(
            historyResult[0].value.slice(0, 3).map(mapHistoryToRecentItem),
          );
        }
      } finally {
        if (isMounted) {
          setIsRecentFoodFightsLoading(false);
        }
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

  const openRecentRoomDetails = async (item: RecentFoodFightItemData) => {
    setRecentRoomError(null);
    setIsRecentRoomLoading(true);

    try {
      setSelectedRecentRoom(await roomService.getRoom(item.roomId));
    } catch {
      setRecentRoomError("Unable to load room details.");
    } finally {
      setIsRecentRoomLoading(false);
    }
  };

  const closeRecentRoomDetails = () => {
    setSelectedRecentRoom(null);
    setRecentRoomError(null);
    setIsRecentRoomLoading(false);
  };

  return (
    <HomeLanguageProvider>
      <main className="relative min-h-dvh bg-background text-text-primary lg:min-h-[calc(100dvh-4rem)]">
        {/* Warm Atmosphere Hero Background Layer */}
        <AtmosphereBackground variant="hero" height="hero" className="-top-0 lg:-top-16" />

        <PageContainer
          maxWidth="wide"
          paddingY="none"
          spacing="comfortable"
          className="relative z-10 pt-3 pb-24 sm:pt-4 lg:pb-10"
        >
          {/* 1. Header with greeting and avatar/notification */}
          <HomeHeader
            user={user ?? { name: "FoodFighter" }}
            isLoading={isUserLoading}
            onLogout={handleLogout}
          />

          {/* 2. Responsive Dashboard Grid */}
          <div
            data-testid="home-dashboard-grid"
            className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10"
          >
            {/* Primary Column (Inspiration Carousel, Create/Join, Pending Bills, Current FoodFight) */}
            <div className="space-y-5 sm:space-y-6 lg:col-span-8">
              {/* 2. Food Inspiration Carousel ("What are we eating today?") */}
              <HomeFoodCarousel />

              {/* 3. Primary Action Cards (Create Room & Join Room) */}
              <HomeActionCardsGroup
                onCreateRoom={onCreateRoom}
                onJoinRoom={onJoinRoom}
              />

              {/* Unfinished Bills Section (Shared component consumed as-is) */}
              <PendingBillsSection
                bills={pendingBills}
                isLoading={isPendingBillsLoading}
                error={pendingBillsError}
                onRetry={() => void refreshPendingBills()}
                variant="home"
              />

              {/* Current FoodFight Section */}
              <CurrentFoodFightCard
                session={currentSession}
                isLoading={isCurrentSessionLoading}
                onContinue={continueCurrentRoom}
              />
            </div>

            {/* Supporting Column (Food Profile Nudge, Recent FoodFights, Tip) */}
            <div className="space-y-5 sm:space-y-6 lg:col-span-4">
              {/* Food Profile Preferences Nudge */}
              <HomeFoodProfileCard />

              {/* Recent FoodFights Section */}
              <RecentFoodFightsSection
                items={recentFoodFights}
                isLoading={isRecentFoodFightsLoading}
                onViewAll={onViewAllRecent ?? (() => router.push(ROUTES.HISTORY))}
                onItemClick={(item) => void openRecentRoomDetails(item)}
              />

              {/* Helpful Tip Card */}
              <HomeTipCard tip={HOME_TIP} />
            </div>
          </div>
        </PageContainer>

        {/* Room Details Modal Backdrop & Dialogs */}
        {isRecentRoomLoading ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-[2px]"
            role="status"
            aria-label="Loading room details"
          >
            <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 text-center shadow-2xl">
              <p className="text-sm text-text-secondary">Loading room details...</p>
            </div>
          </div>
        ) : null}

        {selectedRecentRoom ? (
          <RoomDetailsModal
            room={selectedRecentRoom}
            isHost={false}
            isSaving={false}
            error={null}
            onClose={closeRecentRoomDetails}
            onSave={async () => undefined}
            onRequestClose={() => undefined}
          />
        ) : null}

        {recentRoomError ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-[2px]"
            role="alertdialog"
            aria-modal="true"
            aria-label="Room details unavailable"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeRecentRoomDetails();
              }
            }}
          >
            <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold text-text-primary">
                  Room details
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  className="text-xl leading-none text-text-secondary hover:text-text-primary"
                  onClick={closeRecentRoomDetails}
                >
                  ×
                </button>
              </div>
              <p className="mt-4 text-sm text-status-danger-text">{recentRoomError}</p>
            </div>
          </div>
        ) : null}
      </main>
    </HomeLanguageProvider>
  );
}

function HomeActionCardsGroup({
  onCreateRoom,
  onJoinRoom,
}: {
  onCreateRoom?: () => void;
  onJoinRoom?: () => void;
}) {
  const { t } = useHomeLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
      {/* Create Room Card */}
      <HomeActionCard
        id="create-room-card"
        title={t.actionCards.createTitle}
        description={t.actionCards.createDesc}
        ctaText={t.actionCards.createCta}
        icon={<UserPlus className="size-6 text-text-primary stroke-[2]" />}
        href={ROUTES.ROOM.CREATE}
        onClick={onCreateRoom}
      />

      {/* Join Room Wrapper with Top-Right Corner 3D Decor Behind */}
      <div className="relative overflow-visible">
        {/* Decorative 3D Ornament (Behind Card, rises above top-right edge) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute z-0 -top-[48px] min-[430px]:-top-[52px] sm:-top-[85px] md:-top-[100px] lg:-top-[110px] right-0 sm:right-2 lg:right-2 w-[76px] min-[430px]:w-[80px] sm:w-[130px] md:w-[145px] lg:w-[160px] aspect-square overflow-visible"
        >
          <img
            src="/images/home/home-join-corner-decor.webp"
            alt=""
            className="size-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Join Room Action Card (Front Layer) */}
        <HomeActionCard
          id="join-room-card"
          className="relative z-10"
          title={t.actionCards.joinTitle}
          description={t.actionCards.joinDesc}
          ctaText={t.actionCards.joinCta}
          icon={<LogIn className="size-6 text-text-primary stroke-[2]" />}
          href={ROUTES.ROOM.JOIN}
          onClick={onJoinRoom}
        />
      </div>
    </div>
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
