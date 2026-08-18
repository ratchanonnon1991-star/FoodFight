/**
 * Food Profile Domain Types
 */

export interface AllergyOption {
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
  setAllergies: (allergies: string[]) => void;
  setOtherAllergies: (other: string) => void;
  setHasNoAllergies: (hasNoAllergies: boolean) => void;
  toggleAllergy: (allergyId: string) => void;
  updateDraft: (updates: Partial<FoodProfileDraft>) => void;
  resetDraft: () => void;
  isAllergiesStepValid: boolean;
}
