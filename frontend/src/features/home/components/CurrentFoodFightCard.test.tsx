import { describe, expect, it } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { CurrentFoodFightCard } from "./CurrentFoodFightCard";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { CurrentFoodFightSession } from "../types/home-types";

function renderWithLanguage(ui: React.ReactElement, defaultLocale: "th" | "en" = "th") {
  return render(
    <LanguageProvider defaultLocale={defaultLocale}>
      {ui}
    </LanguageProvider>,
  );
}

describe("CurrentFoodFightCard Member Avatar Stack Parity & Host Regression", () => {
  it("renders 2 member identities (including Host) for a 2-member room", () => {
    const session: CurrentFoodFightSession = {
      id: "room-1",
      title: "Somtum Squad",
      status: "In progress",
      statusDescription: "กำลังเลือกร้านอาหาร",
      memberCount: 2,
      members: [
        {
          id: "host-room-1",
          userId: "host",
          name: "Poh",
          avatarUrl: "/mascot.png",
          joinedAt: "2026-08-29T10:00:00.000Z",
        },
        {
          id: "guest-1",
          userId: "u2",
          name: "May",
          avatarUrl: null,
          joinedAt: "2026-08-29T10:01:00.000Z",
        },
      ],
    };

    renderWithLanguage(<CurrentFoodFightCard session={session} />, "th");

    // 1. Check displayed member count in Thai
    expect(screen.getByText("2 สมาชิก")).toBeDefined();

    // 2. Check both Host and Guest are rendered in avatar stack
    expect(screen.getByTitle("Poh")).toBeDefined();
    expect(screen.getByTitle("May")).toBeDefined();

    // 3. Guest has no avatarUrl -> verify initials fallback "M" renders
    expect(screen.getByText("M")).toBeDefined();

    // 4. Verify no overflow badge for 2 members
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it("renders 4 visible avatars and +2 overflow for a 6-member room", () => {
    const session: CurrentFoodFightSession = {
      id: "room-2",
      title: "Hotpot Squad",
      status: "In progress",
      statusDescription: "กำลังเลือกร้านอาหาร",
      memberCount: 6,
      members: [
        { id: "host-1", userId: "host", name: "Poh", avatarUrl: null, joinedAt: "2026-08-29T10:00:00.000Z" },
        { id: "guest-1", userId: "u2", name: "May", avatarUrl: null, joinedAt: "2026-08-29T10:01:00.000Z" },
        { id: "guest-2", userId: "u3", name: "Golf", avatarUrl: null, joinedAt: "2026-08-29T10:02:00.000Z" },
        { id: "guest-3", userId: "u4", name: "Earn", avatarUrl: null, joinedAt: "2026-08-29T10:03:00.000Z" },
        { id: "guest-4", userId: "u5", name: "Bank", avatarUrl: null, joinedAt: "2026-08-29T10:04:00.000Z" },
        { id: "guest-5", userId: "u6", name: "Tang", avatarUrl: null, joinedAt: "2026-08-29T10:05:00.000Z" },
      ],
    };

    renderWithLanguage(<CurrentFoodFightCard session={session} />, "th");

    expect(screen.getByText("6 สมาชิก")).toBeDefined();
    expect(screen.getByText("+2")).toBeDefined();

    // Verify exactly 4 visible titles in the avatar stack
    expect(screen.getByTitle("Poh")).toBeDefined();
    expect(screen.getByTitle("May")).toBeDefined();
    expect(screen.getByTitle("Golf")).toBeDefined();
    expect(screen.getByTitle("Earn")).toBeDefined();
  });

  it("renders 4 visible avatars and +11 overflow for a 15-member room", () => {
    const session: CurrentFoodFightSession = {
      id: "room-3",
      title: "Buffet Party",
      status: "In progress",
      statusDescription: "กำลังเลือกร้านอาหาร",
      memberCount: 15,
      members: Array.from({ length: 15 }, (_, i) => ({
        id: `member-${i + 1}`,
        userId: i === 0 ? "host" : `u${i + 1}`,
        name: i === 0 ? "Poh" : `User ${i + 1}`,
        avatarUrl: null,
        joinedAt: new Date(1756461600000 + i * 60000).toISOString(),
      })),
    };

    renderWithLanguage(<CurrentFoodFightCard session={session} />, "th");

    expect(screen.getByText("15 สมาชิก")).toBeDefined();
    expect(screen.getByText("+11")).toBeDefined();
  });
});
