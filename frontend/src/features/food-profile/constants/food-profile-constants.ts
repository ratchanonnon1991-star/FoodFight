import type { AllergyOption, FoodProfileDraft, RestrictionOption } from "../types/food-profile-types";

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

export const STANDARD_RESTRICTIONS: readonly RestrictionOption[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "gluten_free", label: "Gluten-free" },
  { id: "halal", label: "Halal only" },
  { id: "kosher", label: "Kosher" },
  { id: "no_pork", label: "No pork" },
  { id: "no_beef", label: "No beef" },
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
