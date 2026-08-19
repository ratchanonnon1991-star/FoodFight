/**
 * Food Profile Domain Types
 */

export interface AllergyOption {
  id: string;
  label: string;
}

export interface RestrictionOption {
  id: string;
  label: string;
}

export interface FoodProfileDraft {
  allergies: string[];
  otherAllergies: string;
  hasNoAllergies: boolean;

  restrictions: string[];
  otherRestrictions: string;
  hasNoRestrictions: boolean;

  additionalNotes: string;
}

export interface FoodProfileContextValue {
  draft: FoodProfileDraft;

  // Allergies Step 1
  setAllergies: (allergies: string[]) => void;
  setOtherAllergies: (other: string) => void;
  setHasNoAllergies: (hasNoAllergies: boolean) => void;
  toggleAllergy: (allergyId: string) => void;
  isAllergiesStepValid: boolean;

  // Restrictions Step 2
  setRestrictions: (restrictions: string[]) => void;
  setOtherRestrictions: (other: string) => void;
  setHasNoRestrictions: (hasNoRestrictions: boolean) => void;
  toggleRestriction: (restrictionId: string) => void;
  isRestrictionsStepValid: boolean;

  // Details Step 3
  setAdditionalNotes: (notes: string) => void;

  // Shared
  updateDraft: (updates: Partial<FoodProfileDraft>) => void;
  resetDraft: () => void;
}
