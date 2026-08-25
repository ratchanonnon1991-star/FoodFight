import { API_BASE_URL } from "@/config/api";
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import type { FoodFightState, MealPreferenceDraft, VoteSubmission } from "@/features/food-fight/types/food-fight-types";

export class FoodFightApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "FoodFightApiError";
  }
}

type ApiErrorBody = { message?: string | string[] };

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const accessToken = getStoredAccessToken();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response: Response;
  try {
    response = await apiFetch(
      `${API_BASE_URL}${path}`,
      { ...init, headers },
      accessToken,
    );
  } catch {
    throw new FoodFightApiError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", 0);
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorBody | null;
    const message = Array.isArray(body?.message) ? body.message.join(", ") : body?.message ?? "ไม่สามารถดำเนินการกับ FoodFight ได้";
    throw new FoodFightApiError(message, response.status);
  }
  return (await response.json()) as T;
}

function preferencePayload(payload: MealPreferenceDraft) {
  return {
    cookingMethods: payload.cookingMethods,
    cookingMethodsOther: payload.cookingMethodsOther.trim() || null,
    cuisines: payload.cuisines,
    cuisinesOther: payload.cuisinesOther.trim() || null,
    proteins: payload.proteins,
    proteinsOther: payload.proteinsOther.trim() || null,
    budget: payload.budget,
    restaurantStyles: payload.restaurantStyles,
    restaurantStylesOther: payload.restaurantStylesOther.trim() || null,
    additionalNuances: payload.additionalNuances.trim() || null,
  };
}

export function getFoodFightState(roomId: string) {
  return request<FoodFightState>(`/rooms/${encodeURIComponent(roomId)}/food-fight/state`);
}

export function submitMealPreference(roomId: string, payload: MealPreferenceDraft) {
  return request<{ message: string }>(`/rooms/${encodeURIComponent(roomId)}/preferences`, {
    method: "PUT",
    body: JSON.stringify(preferencePayload(payload)),
  });
}

export function startRecommendation(roomId: string) {
  return request<{ state: "VOTING"; sessionId: string; roundId: string; roundNumber: number; recommendations: unknown[] }>(`/rooms/${encodeURIComponent(roomId)}/recommendations/start`, { method: "POST" });
}

export function submitVotes(roomId: string, votes: VoteSubmission[]) {
  return request<FoodFightState>(`/rooms/${encodeURIComponent(roomId)}/votes`, {
    method: "PUT",
    body: JSON.stringify({ votes }),
  });
}

export function submitFinalVote(roomId: string, recommendationItemId: string) {
  return request<FoodFightState>(`/rooms/${encodeURIComponent(roomId)}/final-votes`, {
    method: "PUT",
    body: JSON.stringify({ recommendationItemId }),
  });
}

export function submitHostTieBreak(roomId: string, recommendationItemId: string) {
  return request<FoodFightState>(`/rooms/${encodeURIComponent(roomId)}/final-votes/host-tie-break`, {
    method: "PUT",
    body: JSON.stringify({ recommendationItemId }),
  });
}

export function rerollRecommendation(roomId: string) {
  return request<{ state: "VOTING"; sessionId: string; roundId: string; roundNumber: number; recommendations: unknown[] }>(`/rooms/${encodeURIComponent(roomId)}/recommendations/reroll`, { method: "POST" });
}

export function startRestaurantRecommendations(roomId: string) {
  return request<FoodFightState>(`/rooms/${encodeURIComponent(roomId)}/restaurants/start`, {
    method: "POST",
  });
}

export const foodFightService = { getFoodFightState, submitMealPreference, startRecommendation, submitVotes, submitFinalVote, submitHostTieBreak, rerollRecommendation, startRestaurantRecommendations };
