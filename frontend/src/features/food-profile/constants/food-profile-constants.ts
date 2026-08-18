import type { AllergyOption, FoodProfileDraft } from "../types/food-profile-types";

export const STANDARD_ALLERGIES: readonly AllergyOption[] = [
  { id: "seafood", label: "Seafood" },
  { id: "peanut", label: "Peanut" },
  { id: "tree_nuts", label: "Tree Nuts" },
  { id: "dairy", label: "Dairy" },
  { id: "egg", label: "Egg" },
  { id: "soy", label: "Soy" },
  { id: "wheat_gluten", label: "Wheat / Gluten" },
  { id: "sesame", label: "Sesame" },
] as const;

export const INITIAL_FOOD_PROFILE_DRAFT: FoodProfileDraft = {
  allergies: [],
  otherAllergies: "",
  hasNoAllergies: false,
  restrictions: [],
  otherRestrictions: "",
  hasNoRestrictions: false,
  additionalNotes: "",
};

export const FOOD_PROFILE_TOTAL_STEPS = 3;

export const FOOD_PROFILE_STEPS = [
  { step: 1, label: "Allergies" },
  { step: 2, label: "Restrictions" },
  { step: 3, label: "Details" },
] as const;
