import { API_BASE_URL } from "@/config/api";
import { resolveAuthMode, setMockFoodProfileComplete } from "@/features/auth/services/auth-runtime";
import type { FoodProfileDraft } from "../types/food-profile-types";

export interface UpsertFoodProfileInput {
  allergies: string[];
  otherAllergies?: string | null;
  restrictions: string[];
  otherRestrictions?: string | null;
  additionalNotes?: string | null;
}

export interface FoodProfileResponse {
  id: string;
  userId: string;
  allergies: string[];
  otherAllergies: string | null;
  restrictions: string[];
  otherRestrictions: string | null;
  additionalNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export type FoodProfileResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: FoodProfileError };

export interface FoodProfileError {
  kind: "unauthorized" | "not_found" | "validation" | "network" | "server";
  message: string;
  statusCode?: number;
}

/**
 * Maps frontend UI draft state to the backend DTO format.
 * Strips UI-only flags (hasNoAllergies, hasNoRestrictions) and normalizes empty strings to null.
 */
export function mapDraftToUpsertInput(draft: FoodProfileDraft): UpsertFoodProfileInput {
  const allergies = draft.hasNoAllergies ? [] : draft.allergies;
  const otherAllergies = draft.hasNoAllergies
    ? null
    : draft.otherAllergies.trim() || null;

  const restrictions = draft.hasNoRestrictions ? [] : draft.restrictions;
  const otherRestrictions = draft.hasNoRestrictions
    ? null
    : draft.otherRestrictions.trim() || null;

  const additionalNotes = draft.additionalNotes.trim() || null;

  return {
    allergies,
    otherAllergies,
    restrictions,
    otherRestrictions,
    additionalNotes,
  };
}

/**
 * Maps a backend FoodProfileResponse to the frontend FoodProfileDraft state.
 */
export function mapResponseToDraft(response: FoodProfileResponse): FoodProfileDraft {
  const allergies = response.allergies ?? [];
  const restrictions = response.restrictions ?? [];
  const otherAllergies = response.otherAllergies ?? "";
  const otherRestrictions = response.otherRestrictions ?? "";

  return {
    allergies,
    otherAllergies,
    hasNoAllergies: allergies.length === 0 && !otherAllergies,
    restrictions,
    otherRestrictions,
    hasNoRestrictions: restrictions.length === 0 && !otherRestrictions,
    additionalNotes: response.additionalNotes ?? "",
  };
}

/**
 * Fetches the authenticated user's food profile from GET /food-profile/me.
 */
export async function getMyFoodProfile(
  token?: string
): Promise<FoodProfileResult<FoodProfileResponse>> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/food-profile/me`, {
      method: "GET",
      headers,
    });

    if (response.status === 200) {
      const data = (await response.json()) as FoodProfileResponse;
      return { ok: true, data };
    }

    if (response.status === 404) {
      return {
        ok: false,
        error: {
          kind: "not_found",
          message: "Food profile not found.",
          statusCode: 404,
        },
      };
    }

    if (response.status === 401) {
      return {
        ok: false,
        error: {
          kind: "unauthorized",
          message: "Authentication required. Please log in.",
          statusCode: 401,
        },
      };
    }

    return {
      ok: false,
      error: {
        kind: "server",
        message: "Failed to retrieve food profile. Please try again later.",
        statusCode: response.status,
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Network error. Please check your connection and try again.",
      },
    };
  }
}

/**
 * Persists the user's food profile via PUT /food-profile/me.
 */
export async function saveMyFoodProfile(
  input: UpsertFoodProfileInput,
  token?: string
): Promise<FoodProfileResult<FoodProfileResponse>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/food-profile/me`, {
      method: "PUT",
      headers,
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const data = (await response.json()) as FoodProfileResponse;
      return { ok: true, data };
    }

    if (response.status === 401) {
      return {
        ok: false,
        error: {
          kind: "unauthorized",
          message: "Authentication required. Please log in.",
          statusCode: 401,
        },
      };
    }

    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      const message =
        Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message || "Invalid food profile data. Please check your entries.";

      return {
        ok: false,
        error: {
          kind: "validation",
          message,
          statusCode: 400,
        },
      };
    }

    return {
      ok: false,
      error: {
        kind: "server",
        message: "Failed to save food profile. Please try again later.",
        statusCode: response.status,
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        kind: "network",
        message: "Network error. Please check your connection and try again.",
      },
    };
  }
}

/**
 * Top-level profile submission handler used by the Food Profile flow.
 * Validates, maps, and executes save against real API when active or mock runtime when in mock mode.
 */
export async function saveFoodProfile(
  draft: FoodProfileDraft,
  token?: string
): Promise<FoodProfileResult<FoodProfileResponse>> {
  const input = mapDraftToUpsertInput(draft);
  const mode = resolveAuthMode();

  // If mock mode is explicitly active and no real JWT is provided, preserve local UX flow
  if (mode === "mock" && !token) {
    setMockFoodProfileComplete(true);
    const mockResponse: FoodProfileResponse = {
      id: "mock-food-profile-id",
      userId: "mock-user-id",
      allergies: input.allergies,
      otherAllergies: input.otherAllergies ?? null,
      restrictions: input.restrictions,
      otherRestrictions: input.otherRestrictions ?? null,
      additionalNotes: input.additionalNotes ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return { ok: true, data: mockResponse };
  }

  const accessToken =
    token ??
    (typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken") ?? undefined
      : undefined);

  // Real HTTP execution
  return saveMyFoodProfile(input, accessToken);
}
