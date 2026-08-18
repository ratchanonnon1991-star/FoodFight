"use client";

import * as React from "react";
import { CheckCircle2, Info } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { useFoodProfile } from "../context/food-profile-context";
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
  const { draft, setAdditionalNotes } = useFoodProfile();
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const notesLength = draft.additionalNotes.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NOTES_LENGTH) {
      setAdditionalNotes(value);
    }
  };

  const handleSaveAndContinue = () => {
    if (onComplete) {
      onComplete();
    } else {
      // Frontend-only completion state (avoids fake backend persistence / unauthorized navigation)
      setIsSubmitted(true);
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

      {/* Subtle Frontend Completion Notice when submitted */}
      {isSubmitted && (
        <Alert
          variant="success"
          className="py-3 px-3.5 animate-fade-in border-brand-primary/20 bg-surface shadow-xs"
        >
          <CheckCircle2 className="size-4 shrink-0 text-brand-primary" />
          <div className="space-y-0.5">
            <AlertTitle className="text-xs font-semibold text-brand-primary">
              Food Profile Complete
            </AlertTitle>
            <AlertDescription className="text-xs text-text-secondary">
              Your 3-step profile is ready. Authenticated home and meal matching will be connected next.
            </AlertDescription>
          </div>
        </Alert>
      )}
    </FoodProfileStepLayout>
  );
}
