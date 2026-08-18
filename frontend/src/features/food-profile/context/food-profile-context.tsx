"use client";

import * as React from "react";
import type { FoodProfileContextValue, FoodProfileDraft } from "../types/food-profile-types";
import { INITIAL_FOOD_PROFILE_DRAFT } from "../constants/food-profile-constants";

const FoodProfileContext = React.createContext<FoodProfileContextValue | null>(null);

export interface FoodProfileProviderProps {
  children: React.ReactNode;
  initialDraft?: Partial<FoodProfileDraft>;
}

export function FoodProfileProvider({ children, initialDraft }: FoodProfileProviderProps) {
  const [draft, setDraft] = React.useState<FoodProfileDraft>(() => ({
    ...INITIAL_FOOD_PROFILE_DRAFT,
    ...initialDraft,
  }));

  const setAllergies = React.useCallback((allergies: string[]) => {
    setDraft((prev) => ({
      ...prev,
      allergies,
      hasNoAllergies: allergies.length > 0 ? false : prev.hasNoAllergies,
    }));
  }, []);

  const toggleAllergy = React.useCallback((allergyId: string) => {
    setDraft((prev) => {
      const isSelected = prev.allergies.includes(allergyId);
      const nextAllergies = isSelected
        ? prev.allergies.filter((id) => id !== allergyId)
        : [...prev.allergies, allergyId];

      return {
        ...prev,
        allergies: nextAllergies,
        hasNoAllergies: nextAllergies.length > 0 ? false : prev.hasNoAllergies,
      };
    });
  }, []);

  const setOtherAllergies = React.useCallback((otherAllergies: string) => {
    setDraft((prev) => ({
      ...prev,
      otherAllergies,
      hasNoAllergies: otherAllergies.trim().length > 0 ? false : prev.hasNoAllergies,
    }));
  }, []);

  const setHasNoAllergies = React.useCallback((hasNoAllergies: boolean) => {
    setDraft((prev) => {
      if (hasNoAllergies) {
        return {
          ...prev,
          allergies: [],
          otherAllergies: "",
          hasNoAllergies: true,
        };
      }
      return {
        ...prev,
        hasNoAllergies: false,
      };
    });
  }, []);

  const updateDraft = React.useCallback((updates: Partial<FoodProfileDraft>) => {
    setDraft((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetDraft = React.useCallback(() => {
    setDraft(INITIAL_FOOD_PROFILE_DRAFT);
  }, []);

  const isAllergiesStepValid = React.useMemo(() => {
    return draft.hasNoAllergies || draft.allergies.length > 0 || draft.otherAllergies.trim().length > 0;
  }, [draft.hasNoAllergies, draft.allergies.length, draft.otherAllergies]);

  const value = React.useMemo(
    () => ({
      draft,
      setAllergies,
      setOtherAllergies,
      setHasNoAllergies,
      toggleAllergy,
      updateDraft,
      resetDraft,
      isAllergiesStepValid,
    }),
    [
      draft,
      setAllergies,
      setOtherAllergies,
      setHasNoAllergies,
      toggleAllergy,
      updateDraft,
      resetDraft,
      isAllergiesStepValid,
    ]
  );

  return (
    <FoodProfileContext.Provider value={value}>
      {children}
    </FoodProfileContext.Provider>
  );
}

export function useFoodProfile(): FoodProfileContextValue {
  const context = React.useContext(FoodProfileContext);
  if (!context) {
    throw new Error("useFoodProfile must be used within a FoodProfileProvider");
  }
  return context;
}
