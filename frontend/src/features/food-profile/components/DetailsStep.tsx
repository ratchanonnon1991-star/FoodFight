"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { useFoodProfile } from "../context/food-profile-context";
import { saveFoodProfile } from "../services/food-profile-service";
import { FoodProfileStepLayout } from "./FoodProfileStepLayout";

export interface DetailsStepProps {
  onComplete?: () => void;
  backHref?: string;
}

const MAX_NOTES_LENGTH = 200;

export function DetailsStep({
  onComplete,
  backHref = ROUTES.FOOD_PROFILE.RESTRICTIONS,
}: DetailsStepProps) {
  const router = useRouter();
  const { draft, setAdditionalNotes } = useFoodProfile();
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const notesLength = draft.additionalNotes.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NOTES_LENGTH) {
      setAdditionalNotes(value);
    }
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const result = await saveFoodProfile(draft);

      if (!result.ok) {
        setErrorMessage(result.error.message);
        setIsSaving(false);
        return;
      }

      if (onComplete) {
        onComplete();
      } else {
        router.push(ROUTES.AUTHENTICATED_HOME);
      }
    } catch {
      setErrorMessage(
        "An unexpected error occurred while saving your profile. Please try again."
      );
      setIsSaving(false);
    }
  };

  return (
    <FoodProfileStepLayout
      currentStep={3}
      title="Anything else we should know?"
      description="Tell us about any other food preferences, likes, dislikes, or details that help FoodFighter find your best meals. (Optional)"
      backHref={backHref}
      footer={
        <div className="space-y-3">
          {/* Error Message Alert */}
          {errorMessage && (
            <Alert variant="error" className="py-2.5 px-3">
              <AlertDescription className="text-xs text-status-danger-text leading-snug">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Informational Notice */}
          <Alert variant="info" className="py-2.5 px-3">
            <Info className="size-4 shrink-0 text-status-info-icon" />
            <AlertDescription className="text-xs text-status-info-text leading-snug">
              FoodFighter combines your profile preferences with meal-specific votes to find recommendations everyone will enjoy.
            </AlertDescription>
          </Alert>

          {/* Primary Action */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSaving}
            loadingText="Saving..."
            onClick={handleSaveAndContinue}
            id="details-save-continue-button"
          >
            Save &amp; Continue
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        {/* Accessible Label & Sub-header */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="additional-notes-input"
            className="text-sm font-semibold text-text-primary"
          >
            Additional Preferences &amp; Notes
          </Label>
          <span className="text-xs text-text-muted">Optional</span>
        </div>

        {/* Textarea Primitive */}
        <div className="relative">
          <Textarea
            id="additional-notes-input"
            name="additionalNotes"
            rows={5}
            placeholder="e.g. I prefer spicy food, don't like cilantro, looking for high-protein options..."
            value={draft.additionalNotes}
            onChange={handleChange}
            maxLength={MAX_NOTES_LENGTH}
            className="w-full text-sm leading-relaxed"
            aria-label="Additional food preferences or notes"
            aria-describedby="character-counter"
          />
        </div>

        {/* Live Character Counter */}
        <div
          id="character-counter"
          className="flex justify-end text-xs text-text-muted font-medium pr-1"
          aria-live="polite"
        >
          <span>
            {notesLength} / {MAX_NOTES_LENGTH}
          </span>
        </div>
      </div>
    </FoodProfileStepLayout>
  );
}

