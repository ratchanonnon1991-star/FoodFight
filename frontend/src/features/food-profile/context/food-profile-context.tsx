"use client";

import * as React from "react";
import type { FoodProfileContextValue, FoodProfileDraft } from "../types/food-profile-types";
import { INITIAL_FOOD_PROFILE_DRAFT } from "../constants/food-profile-constants";
import { resolveAuthMode } from "@/features/auth/services/auth-runtime";
import {
  getMyFoodProfile,
  mapResponseToDraft,
} from "../services/food-profile-service";

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

  React.useEffect(() => {
    let isCancelled = false;

    const loadFoodProfile = async () => {
      if (resolveAuthMode() !== "api") {
        return;
      }

      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      const result = await getMyFoodProfile(token);

      if (!isCancelled && result.ok) {
        setDraft(mapResponseToDraft(result.data));
      }
    };

    void loadFoodProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  // --- Step 1: Allergies Actions ---
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

  // --- Step 2: Restrictions Actions ---
  const setRestrictions = React.useCallback((restrictions: string[]) => {
    setDraft((prev) => ({
      ...prev,
      restrictions,
      hasNoRestrictions: restrictions.length > 0 ? false : prev.hasNoRestrictions,
    }));
  }, []);

  const toggleRestriction = React.useCallback((restrictionId: string) => {
    setDraft((prev) => {
      const isSelected = prev.restrictions.includes(restrictionId);
      const nextRestrictions = isSelected
        ? prev.restrictions.filter((id) => id !== restrictionId)
        : [...prev.restrictions, restrictionId];

      return {
        ...prev,
        restrictions: nextRestrictions,
        hasNoRestrictions: nextRestrictions.length > 0 ? false : prev.hasNoRestrictions,
      };
    });
  }, []);

  const setOtherRestrictions = React.useCallback((otherRestrictions: string) => {
    setDraft((prev) => ({
      ...prev,
      otherRestrictions,
      hasNoRestrictions: otherRestrictions.trim().length > 0 ? false : prev.hasNoRestrictions,
    }));
  }, []);

  const setHasNoRestrictions = React.useCallback((hasNoRestrictions: boolean) => {
    setDraft((prev) => {
      if (hasNoRestrictions) {
        return {
          ...prev,
          restrictions: [],
          otherRestrictions: "",
          hasNoRestrictions: true,
        };
      }
      return {
        ...prev,
        hasNoRestrictions: false,
      };
    });
  }, []);

  // --- Step 3: Details Actions ---
  const setAdditionalNotes = React.useCallback((additionalNotes: string) => {
    setDraft((prev) => ({
      ...prev,
      additionalNotes,
    }));
  }, []);

  // --- Shared Actions ---
  const updateDraft = React.useCallback((updates: Partial<FoodProfileDraft>) => {
    setDraft((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetDraft = React.useCallback(() => {
    setDraft(INITIAL_FOOD_PROFILE_DRAFT);
  }, []);

  // --- Validation Helpers ---
  const isAllergiesStepValid = React.useMemo(() => {
    return draft.hasNoAllergies || draft.allergies.length > 0 || draft.otherAllergies.trim().length > 0;
  }, [draft.hasNoAllergies, draft.allergies.length, draft.otherAllergies]);

  const isRestrictionsStepValid = React.useMemo(() => {
    return draft.hasNoRestrictions || draft.restrictions.length > 0 || draft.otherRestrictions.trim().length > 0;
  }, [draft.hasNoRestrictions, draft.restrictions.length, draft.otherRestrictions]);

  const value = React.useMemo(
    () => ({
      draft,
      // Allergies
      setAllergies,
      setOtherAllergies,
      setHasNoAllergies,
      toggleAllergy,
      isAllergiesStepValid,
      // Restrictions
      setRestrictions,
      setOtherRestrictions,
      setHasNoRestrictions,
      toggleRestriction,
      isRestrictionsStepValid,
      // Details
      setAdditionalNotes,
      // Shared
      updateDraft,
      resetDraft,
    }),
    [
      draft,
      setAllergies,
      setOtherAllergies,
      setHasNoAllergies,
      toggleAllergy,
      isAllergiesStepValid,
      setRestrictions,
      setOtherRestrictions,
      setHasNoRestrictions,
      toggleRestriction,
      isRestrictionsStepValid,
      setAdditionalNotes,
      updateDraft,
      resetDraft,
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
