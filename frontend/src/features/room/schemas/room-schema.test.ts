import { describe, expect, it } from "vitest";

import { createRoomSchema, roomCodeSchema } from "./room-schema";

const validRoom = {
  name: "Saturday Dinner",
  maxMembers: 4,
  locationName: "Siam, Bangkok",
  searchRadiusKm: 5 as const,
  date: "2026-08-22",
  time: "19:00",
};

describe("createRoomSchema", () => {
  it("accepts a complete room configuration", () => {
    expect(createRoomSchema.safeParse(validRoom).success).toBe(true);
  });

  it("rejects room names longer than 30 characters", () => {
    expect(
      createRoomSchema.safeParse({
        ...validRoom,
        name: "A room name that is definitely longer than thirty characters",
      }).success,
    ).toBe(false);
  });

  it("keeps member count and radius within backend limits", () => {
    expect(
      createRoomSchema.safeParse({ ...validRoom, maxMembers: 1 }).success,
    ).toBe(false);
    expect(
      createRoomSchema.safeParse({ ...validRoom, searchRadiusKm: 2 }).success,
    ).toBe(false);
  });
});

describe("roomCodeSchema", () => {
  it("accepts six-character invite codes", () => {
    expect(roomCodeSchema.safeParse("ff8k7z").success).toBe(true);
  });

  it("rejects malformed invite codes", () => {
    expect(roomCodeSchema.safeParse("short").success).toBe(false);
    expect(roomCodeSchema.safeParse("FF8K7Z!").success).toBe(false);
  });
});
