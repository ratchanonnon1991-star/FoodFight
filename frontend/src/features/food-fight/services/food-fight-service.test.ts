import { beforeEach, describe, expect, it, vi } from "vitest";

const { apiFetchMock, getStoredAccessTokenMock } = vi.hoisted(() => ({
  apiFetchMock: vi.fn(),
  getStoredAccessTokenMock: vi.fn(),
}));

vi.mock("@/config/api-client", () => ({
  apiFetch: apiFetchMock,
  getStoredAccessToken: getStoredAccessTokenMock,
}));

import {
  getFoodFightState,
  rerollRecommendation,
  startRecommendation,
  startRestaurantRecommendations,
  submitFinalVote,
  submitHostTieBreak,
  submitMealPreference,
  submitVotes,
} from "./food-fight-service";

const roomId = "room-1";
const accessToken = "current-access-token";
const preference = {
  cookingMethods: ["GRILLED"],
  cookingMethodsOther: "",
  cuisines: ["THAI"],
  cuisinesOther: "",
  proteins: ["CHICKEN"],
  proteinsOther: "",
  budget: "MID" as const,
  budgetOther: "",
  restaurantStyles: ["CASUAL"],
  restaurantStylesOther: "",
  additionalNuances: "",
};

const requests = [
  ["gets food-fight state", "/food-fight/state", undefined, () => getFoodFightState(roomId)],
  ["submits meal preferences", "/preferences", "PUT", () => submitMealPreference(roomId, preference)],
  ["starts recommendations", "/recommendations/start", "POST", () => startRecommendation(roomId)],
  ["submits votes", "/votes", "PUT", () => submitVotes(roomId, [{ recommendationItemId: "item-1", vote: "OK" }])],
  ["submits a final vote", "/final-votes", "PUT", () => submitFinalVote(roomId, "item-1")],
  ["submits the host tie-break", "/final-votes/host-tie-break", "PUT", () => submitHostTieBreak(roomId, "item-1")],
  ["rerolls recommendations", "/recommendations/reroll", "POST", () => rerollRecommendation(roomId)],
  ["starts restaurant recommendations", "/restaurants/start", "POST", () => startRestaurantRecommendations(roomId)],
] as const;

describe("foodFightService authentication", () => {
  beforeEach(() => {
    apiFetchMock.mockReset();
    getStoredAccessTokenMock.mockReset();
    getStoredAccessTokenMock.mockReturnValue(accessToken);
    apiFetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
  });

  it.each(requests)("$0 uses the authenticated API path", async (_, path, method, request) => {
    await request();

    expect(apiFetchMock).toHaveBeenCalledTimes(1);
    const [url, init, token] = apiFetchMock.mock.calls[0] as [string, RequestInit, string];
    expect(url).toContain(`/rooms/${roomId}${path}`);
    expect(init.method).toBe(method);
    expect(new Headers(init.headers).get("Authorization")).toBe(`Bearer ${accessToken}`);
    expect(token).toBe(accessToken);
  });
});
