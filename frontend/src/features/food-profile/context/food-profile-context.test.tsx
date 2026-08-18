import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import * as React from "react";
import { FoodProfileProvider, useFoodProfile } from "./food-profile-context";

function wrapper({ children }: { children: React.ReactNode }) {
  return <FoodProfileProvider>{children}</FoodProfileProvider>;
}

describe("FoodProfileContext - Mutual Exclusivity and Draft Logic", () => {
  describe("Allergies (Step 1)", () => {
    it("initializes with empty allergies, empty custom allergy, and hasNoAllergies=false", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      expect(result.current.draft.allergies).toEqual([]);
      expect(result.current.draft.otherAllergies).toBe("");
      expect(result.current.draft.hasNoAllergies).toBe(false);
      expect(result.current.isAllergiesStepValid).toBe(false);
    });

    it("case 1: selecting a normal allergy removes hasNoAllergies flag", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setHasNoAllergies(true);
      });
      expect(result.current.draft.hasNoAllergies).toBe(true);
      expect(result.current.isAllergiesStepValid).toBe(true);

      act(() => {
        result.current.toggleAllergy("seafood");
      });

      expect(result.current.draft.allergies).toEqual(["seafood"]);
      expect(result.current.draft.hasNoAllergies).toBe(false);
      expect(result.current.isAllergiesStepValid).toBe(true);
    });

    it("case 2: selecting No Allergies clears all standard allergies", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setAllergies(["peanut", "dairy"]);
      });
      expect(result.current.draft.allergies).toEqual(["peanut", "dairy"]);

      act(() => {
        result.current.setHasNoAllergies(true);
      });

      expect(result.current.draft.allergies).toEqual([]);
      expect(result.current.draft.hasNoAllergies).toBe(true);
    });

    it("case 3: selecting No Allergies clears custom otherAllergies", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setOtherAllergies("Kiwi");
      });
      expect(result.current.draft.otherAllergies).toBe("Kiwi");

      act(() => {
        result.current.setHasNoAllergies(true);
      });

      expect(result.current.draft.otherAllergies).toBe("");
      expect(result.current.draft.hasNoAllergies).toBe(true);
    });

    it("case 4: entering a custom allergy removes hasNoAllergies flag", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setHasNoAllergies(true);
      });
      expect(result.current.draft.hasNoAllergies).toBe(true);

      act(() => {
        result.current.setOtherAllergies("Shellfish");
      });

      expect(result.current.draft.otherAllergies).toBe("Shellfish");
      expect(result.current.draft.hasNoAllergies).toBe(false);
    });

    it("allows multi-selection and toggling of standard allergies", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.toggleAllergy("egg");
        result.current.toggleAllergy("soy");
      });
      expect(result.current.draft.allergies).toEqual(["egg", "soy"]);

      act(() => {
        result.current.toggleAllergy("egg");
      });
      expect(result.current.draft.allergies).toEqual(["soy"]);
    });
  });

  describe("Restrictions (Step 2)", () => {
    it("initializes with empty restrictions, empty custom restriction, and hasNoRestrictions=false", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      expect(result.current.draft.restrictions).toEqual([]);
      expect(result.current.draft.otherRestrictions).toBe("");
      expect(result.current.draft.hasNoRestrictions).toBe(false);
      expect(result.current.isRestrictionsStepValid).toBe(false);
    });

    it("case 1: selecting a normal restriction removes hasNoRestrictions flag", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setHasNoRestrictions(true);
      });
      expect(result.current.draft.hasNoRestrictions).toBe(true);
      expect(result.current.isRestrictionsStepValid).toBe(true);

      act(() => {
        result.current.toggleRestriction("vegan");
      });

      expect(result.current.draft.restrictions).toEqual(["vegan"]);
      expect(result.current.draft.hasNoRestrictions).toBe(false);
      expect(result.current.isRestrictionsStepValid).toBe(true);
    });

    it("case 2: selecting No Restrictions clears all standard restrictions", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setRestrictions(["vegetarian", "halal"]);
      });
      expect(result.current.draft.restrictions).toEqual(["vegetarian", "halal"]);

      act(() => {
        result.current.setHasNoRestrictions(true);
      });

      expect(result.current.draft.restrictions).toEqual([]);
      expect(result.current.draft.hasNoRestrictions).toBe(true);
    });

    it("case 3: selecting No Restrictions clears custom otherRestrictions", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setOtherRestrictions("Low sodium");
      });
      expect(result.current.draft.otherRestrictions).toBe("Low sodium");

      act(() => {
        result.current.setHasNoRestrictions(true);
      });

      expect(result.current.draft.otherRestrictions).toBe("");
      expect(result.current.draft.hasNoRestrictions).toBe(true);
    });

    it("case 4: entering a custom restriction removes hasNoRestrictions flag", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.setHasNoRestrictions(true);
      });
      expect(result.current.draft.hasNoRestrictions).toBe(true);

      act(() => {
        result.current.setOtherRestrictions("Diabetic-friendly");
      });

      expect(result.current.draft.otherRestrictions).toBe("Diabetic-friendly");
      expect(result.current.draft.hasNoRestrictions).toBe(false);
    });

    it("allows multi-selection and toggling of standard restrictions", () => {
      const { result } = renderHook(() => useFoodProfile(), { wrapper });

      act(() => {
        result.current.toggleRestriction("gluten_free");
        result.current.toggleRestriction("no_pork");
      });
      expect(result.current.draft.restrictions).toEqual(["gluten_free", "no_pork"]);

      act(() => {
        result.current.toggleRestriction("gluten_free");
      });
      expect(result.current.draft.restrictions).toEqual(["no_pork"]);
    });
  });
});
