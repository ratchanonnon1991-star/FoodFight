import { describe, it, expect, afterEach, vi } from "vitest";
import {
  mapDraftToUpsertInput,
  mapResponseToDraft,
  getMyFoodProfile,
  saveMyFoodProfile,
  saveFoodProfile,
  type FoodProfileResponse,
} from "./food-profile-service";
import type { FoodProfileDraft } from "../types/food-profile-types";

describe("Food Profile Service", () => {
  describe("mapDraftToUpsertInput", () => {
    it("should map standard populated draft into backend DTO format", () => {
      const draft: FoodProfileDraft = {
        allergies: ["dairy", "seafood"],
        otherAllergies: "sesame",
        hasNoAllergies: false,
        restrictions: ["vegetarian"],
        otherRestrictions: "no garlic",
        hasNoRestrictions: false,
        additionalNotes: "mild spice only",
      };

      const result = mapDraftToUpsertInput(draft);

      expect(result).toEqual({
        allergies: ["dairy", "seafood"],
        otherAllergies: "sesame",
        restrictions: ["vegetarian"],
        otherRestrictions: "no garlic",
        additionalNotes: "mild spice only",
      });
    });

    it("should strip allergies and otherAllergies when hasNoAllergies is true", () => {
      const draft: FoodProfileDraft = {
        allergies: ["dairy"],
        otherAllergies: "sesame",
        hasNoAllergies: true,
        restrictions: ["halal"],
        otherRestrictions: "",
        hasNoRestrictions: false,
        additionalNotes: "",
      };

      const result = mapDraftToUpsertInput(draft);

      expect(result.allergies).toEqual([]);
      expect(result.otherAllergies).toBeNull();
      expect(result.restrictions).toEqual(["halal"]);
      expect(result.otherRestrictions).toBeNull();
      expect(result.additionalNotes).toBeNull();
    });

    it("should strip restrictions and otherRestrictions when hasNoRestrictions is true", () => {
      const draft: FoodProfileDraft = {
        allergies: ["nuts"],
        otherAllergies: "",
        hasNoAllergies: false,
        restrictions: ["vegetarian", "vegan"],
        otherRestrictions: "no onions",
        hasNoRestrictions: true,
        additionalNotes: "extra sauce",
      };

      const result = mapDraftToUpsertInput(draft);

      expect(result.allergies).toEqual(["nuts"]);
      expect(result.otherAllergies).toBeNull();
      expect(result.restrictions).toEqual([]);
      expect(result.otherRestrictions).toBeNull();
      expect(result.additionalNotes).toBe("extra sauce");
    });

    it("should normalize empty and whitespace-only strings to null", () => {
      const draft: FoodProfileDraft = {
        allergies: [],
        otherAllergies: "   ",
        hasNoAllergies: false,
        restrictions: [],
        otherRestrictions: "",
        hasNoRestrictions: false,
        additionalNotes: "   ",
      };

      const result = mapDraftToUpsertInput(draft);

      expect(result.otherAllergies).toBeNull();
      expect(result.otherRestrictions).toBeNull();
      expect(result.additionalNotes).toBeNull();
    });
  });

  describe("mapResponseToDraft", () => {
    it("should map populated backend response to frontend draft", () => {
      const response: FoodProfileResponse = {
        id: "fp-1",
        userId: "u-1",
        allergies: ["peanut"],
        otherAllergies: "kiwi",
        restrictions: ["halal"],
        otherRestrictions: null,
        additionalNotes: "no cilantro",
        createdAt: "2026-08-19T00:00:00.000Z",
        updatedAt: "2026-08-19T00:00:00.000Z",
      };

      const draft = mapResponseToDraft(response);

      expect(draft).toEqual({
        allergies: ["peanut"],
        otherAllergies: "kiwi",
        hasNoAllergies: false,
        restrictions: ["halal"],
        otherRestrictions: "",
        hasNoRestrictions: false,
        additionalNotes: "no cilantro",
      });
    });

    it("should set hasNoAllergies and hasNoRestrictions when backend lists are empty", () => {
      const response: FoodProfileResponse = {
        id: "fp-2",
        userId: "u-2",
        allergies: [],
        otherAllergies: null,
        restrictions: [],
        otherRestrictions: null,
        additionalNotes: null,
        createdAt: "2026-08-19T00:00:00.000Z",
        updatedAt: "2026-08-19T00:00:00.000Z",
      };

      const draft = mapResponseToDraft(response);

      expect(draft.hasNoAllergies).toBe(true);
      expect(draft.hasNoRestrictions).toBe(true);
      expect(draft.allergies).toEqual([]);
      expect(draft.restrictions).toEqual([]);
      expect(draft.otherAllergies).toBe("");
      expect(draft.otherRestrictions).toBe("");
      expect(draft.additionalNotes).toBe("");
    });
  });

  describe("HTTP Transport: getMyFoodProfile & saveMyFoodProfile", () => {
    const originalFetch = global.fetch;

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it("should handle successful GET 200 response", async () => {
      const mockResponse: FoodProfileResponse = {
        id: "fp-1",
        userId: "u-1",
        allergies: ["dairy"],
        otherAllergies: null,
        restrictions: [],
        otherRestrictions: null,
        additionalNotes: "none",
        createdAt: "2026-08-19T00:00:00.000Z",
        updatedAt: "2026-08-19T00:00:00.000Z",
      };

      global.fetch = vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getMyFoodProfile("fake-jwt-token");

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data).toEqual(mockResponse);
      }
    });

    it("should handle GET 404 not found response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        status: 404,
        ok: false,
      });

      const result = await getMyFoodProfile("fake-jwt-token");

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.kind).toBe("not_found");
        expect(result.error.statusCode).toBe(404);
      }
    });

    it("should handle PUT 401 unauthorized response", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        status: 401,
        ok: false,
      });

      const result = await saveMyFoodProfile({
        allergies: ["dairy"],
        restrictions: [],
      });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.kind).toBe("unauthorized");
        expect(result.error.statusCode).toBe(401);
      }
    });

    it("should handle network exception gracefully", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Connection refused"));

      const result = await saveMyFoodProfile({
        allergies: [],
        restrictions: [],
      });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error.kind).toBe("network");
      }
    });
  });

  describe("saveFoodProfile helper in mock mode", () => {
    it("should return successful mock result when in mock mode without real JWT", async () => {
      const draft: FoodProfileDraft = {
        allergies: ["seafood"],
        otherAllergies: "",
        hasNoAllergies: false,
        restrictions: [],
        otherRestrictions: "",
        hasNoRestrictions: true,
        additionalNotes: "testing",
      };

      const result = await saveFoodProfile(draft);

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.data.allergies).toEqual(["seafood"]);
        expect(result.data.restrictions).toEqual([]);
        expect(result.data.additionalNotes).toBe("testing");
      }
    });
  });
});
