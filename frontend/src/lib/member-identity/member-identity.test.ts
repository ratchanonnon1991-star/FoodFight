import { describe, expect, it } from "vitest";
import {
  MEMBER_IDENTITY_PALETTE_15,
  getMemberAccent,
  resolveRoomMemberAccents,
} from "./member-identity";

describe("Member Identity Accent System (Standard Recognizable Colors)", () => {
  it("defines exactly 15 standard recognizable base colors in alternating families", () => {
    expect(MEMBER_IDENTITY_PALETTE_15).toHaveLength(15);

    // Verify 15 unique slot numbers
    const slotNumbers = new Set(MEMBER_IDENTITY_PALETTE_15.map((a) => a.slot));
    expect(slotNumbers.size).toBe(15);

    // Verify 15 unique IDs
    const ids = new Set(MEMBER_IDENTITY_PALETTE_15.map((a) => a.id));
    expect(ids.size).toBe(15);

    // Verify base colors match standard palette
    expect(MEMBER_IDENTITY_PALETTE_15[0].baseHex).toBe("#D95C4F"); // Red
    expect(MEMBER_IDENTITY_PALETTE_15[1].baseHex).toBe("#5A9A68"); // Green
    expect(MEMBER_IDENTITY_PALETTE_15[2].baseHex).toBe("#DF8240"); // Orange
    expect(MEMBER_IDENTITY_PALETTE_15[3].baseHex).toBe("#C96B8A"); // Pink
    expect(MEMBER_IDENTITY_PALETTE_15[4].baseHex).toBe("#627FB2"); // Blue
  });

  it("resolves identically regardless of input array order (Input Reorder Stability)", () => {
    const roster1 = [
      { userId: "u1_poh", joinedAt: "2026-08-29T10:00:00.000Z" },
      { userId: "u2_may", joinedAt: "2026-08-29T10:01:00.000Z" },
      { userId: "u3_golf", joinedAt: "2026-08-29T10:02:00.000Z" },
      { userId: "u4_earn", joinedAt: "2026-08-29T10:03:00.000Z" },
    ];

    const roster2 = [
      { userId: "u3_golf", joinedAt: "2026-08-29T10:02:00.000Z" },
      { userId: "u1_poh", joinedAt: "2026-08-29T10:00:00.000Z" },
      { userId: "u4_earn", joinedAt: "2026-08-29T10:03:00.000Z" },
      { userId: "u2_may", joinedAt: "2026-08-29T10:01:00.000Z" },
    ];

    const map1 = resolveRoomMemberAccents(roster1);
    const map2 = resolveRoomMemberAccents(roster2);

    expect(map1.get("u1_poh")?.id).toBe("red");
    expect(map2.get("u1_poh")?.id).toBe("red");

    expect(map1.get("u2_may")?.id).toBe("green");
    expect(map2.get("u2_may")?.id).toBe("green");

    expect(map1.get("u3_golf")?.id).toBe("orange");
    expect(map2.get("u3_golf")?.id).toBe("orange");

    expect(map1.get("u4_earn")?.id).toBe("pink");
    expect(map2.get("u4_earn")?.id).toBe("pink");
  });

  it("guarantees cross-flow stability across Home, Lobby, Split, Summary, and Payment", () => {
    // Canonical room members
    const canonicalRoster = [
      { userId: "u_poh", joinedAt: "2026-08-29T10:00:00.000Z" },
      { userId: "u_may", joinedAt: "2026-08-29T10:01:00.000Z" },
      { userId: "u_golf", joinedAt: "2026-08-29T10:02:00.000Z" },
      { userId: "u_earn", joinedAt: "2026-08-29T10:03:00.000Z" },
    ];

    // Home flow format: CurrentFoodFightMember[]
    const homeMembers = canonicalRoster.map((m) => ({
      id: m.userId,
      userId: m.userId,
      name: m.userId,
      joinedAt: m.joinedAt,
    }));

    // Lobby flow format: RoomMember[]
    const lobbyMembers = canonicalRoster.map((m) => ({
      id: `rm_${m.userId}`,
      userId: m.userId,
      displayName: m.userId,
      isReady: true,
      joinedAt: m.joinedAt,
    }));

    // Bill / Split / Summary / Payment format: BillMember[]
    const billMembers = canonicalRoster.map((m) => ({
      userId: m.userId,
      displayName: m.userId,
      role: "MEMBER" as const,
      joinedAt: m.joinedAt,
    }));

    const homeMap = resolveRoomMemberAccents(homeMembers);
    const lobbyMap = resolveRoomMemberAccents(lobbyMembers);
    const billMap = resolveRoomMemberAccents(billMembers);

    for (const member of canonicalRoster) {
      const homeAccent = homeMap.get(member.userId);
      const lobbyAccent = lobbyMap.get(member.userId);
      const billAccent = billMap.get(member.userId);

      expect(homeAccent).toBeDefined();
      expect(lobbyAccent).toBeDefined();
      expect(billAccent).toBeDefined();

      expect(homeAccent?.id).toBe(lobbyAccent?.id);
      expect(lobbyAccent?.id).toBe(billAccent?.id);
    }
  });

  it("preserves existing member accents when a new member joins (New Member Stability)", () => {
    const initialRoster = [
      { userId: "u1", joinedAt: "2026-08-29T10:00:00.000Z" },
      { userId: "u2", joinedAt: "2026-08-29T10:01:00.000Z" },
      { userId: "u3", joinedAt: "2026-08-29T10:02:00.000Z" },
      { userId: "u4", joinedAt: "2026-08-29T10:03:00.000Z" },
    ];

    const initialMap = resolveRoomMemberAccents(initialRoster);

    const updatedRoster = [
      ...initialRoster,
      { userId: "u5", joinedAt: "2026-08-29T10:04:00.000Z" },
    ];

    const updatedMap = resolveRoomMemberAccents(updatedRoster);

    // Existing 4 members MUST retain their exact accents
    expect(updatedMap.get("u1")?.id).toBe(initialMap.get("u1")?.id);
    expect(updatedMap.get("u2")?.id).toBe(initialMap.get("u2")?.id);
    expect(updatedMap.get("u3")?.id).toBe(initialMap.get("u3")?.id);
    expect(updatedMap.get("u4")?.id).toBe(initialMap.get("u4")?.id);

    // New 5th member gets the 5th slot (Blue)
    expect(updatedMap.get("u5")?.id).toBe("blue");
    expect(updatedMap.get("u5")?.slot).toBe(5);
  });

  it("assigns 15 distinct, collision-free slots in a 15-member room", () => {
    const roster15 = Array.from({ length: 15 }, (_, i) => ({
      userId: `user_${String(i + 1).padStart(2, "0")}`,
      joinedAt: new Date(Date.now() + i * 1000).toISOString(),
    }));

    const map = resolveRoomMemberAccents(roster15);
    expect(map.size).toBe(15);

    const assignedSlots = new Set(Array.from(map.values()).map((a) => a.slot));
    expect(assignedSlots.size).toBe(15);
  });

  it("handles single lookup helper getMemberAccent", () => {
    const roster = [
      { userId: "userA", joinedAt: "2026-08-29T10:00:00.000Z" },
      { userId: "userB", joinedAt: "2026-08-29T10:01:00.000Z" },
    ];
    const accentA = getMemberAccent("userA", roster);
    const accentB = getMemberAccent("userB", roster);

    expect(accentA.id).toBe("red");
    expect(accentB.id).toBe("green");
  });

  it("guarantees 2-member Home avatar stack maps both Host and Guest with unique accents", () => {
    const roomHost = { displayName: "Poh (Host)", avatarUrl: "/mascot.png" };
    const roomGuest = {
      id: "guest-1",
      userId: "u2",
      displayName: "May",
      avatarUrl: null,
      isReady: true,
      joinedAt: "2026-08-29T10:01:00.000Z",
    };

    const hostMember = {
      id: "host-room-1",
      userId: "host",
      name: roomHost.displayName,
      avatarUrl: roomHost.avatarUrl,
      joinedAt: "2026-08-29T10:00:00.000Z",
    };
    const guestMember = {
      id: roomGuest.userId,
      userId: roomGuest.userId,
      name: roomGuest.displayName,
      avatarUrl: roomGuest.avatarUrl,
      joinedAt: roomGuest.joinedAt,
    };

    const allMembers = [hostMember, guestMember];
    expect(allMembers).toHaveLength(2);

    const accents = resolveRoomMemberAccents(allMembers);
    expect(accents.size).toBe(2);

    const hostAccent = accents.get("host");
    const guestAccent = accents.get("u2");

    expect(hostAccent?.id).toBe("red"); // Slot 1
    expect(guestAccent?.id).toBe("green"); // Slot 2
    expect(hostAccent?.id).not.toBe(guestAccent?.id);
  });
});
