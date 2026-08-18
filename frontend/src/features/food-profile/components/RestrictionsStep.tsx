"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Info, Plus, ShieldCheck, X } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { STANDARD_RESTRICTIONS } from "../constants/food-profile-constants";
import { useFoodProfile } from "../context/food-profile-context";
import { FoodProfileStepLayout } from "./FoodProfileStepLayout";
import { SelectableOptionCard } from "./SelectableOptionCard";

export interface RestrictionsStepProps {
  onNext?: () => void;
  backHref?: string;
}

export function RestrictionsStep({
  onNext,
  backHref = ROUTES.FOOD_PROFILE.ALLERGIES,
}: RestrictionsStepProps) {
  const router = useRouter();
  const {
    draft,
    toggleRestriction,
    setOtherRestrictions,
    setHasNoRestrictions,
    isRestrictionsStepValid,
  } = useFoodProfile();

  const [isCustomInputOpen, setIsCustomInputOpen] = React.useState<boolean>(
    Boolean(draft.otherRestrictions && draft.otherRestrictions.trim().length > 0)
  );

  const customInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenCustomInput = () => {
    setIsCustomInputOpen(true);
    setTimeout(() => {
      customInputRef.current?.focus();
    }, 50);
  };

  const handleClearCustomInput = () => {
    setOtherRestrictions("");
    setIsCustomInputOpen(false);
  };

  const handleNext = () => {
    if (!isRestrictionsStepValid) return;

    if (onNext) {
      onNext();
    } else {
      router.push(ROUTES.FOOD_PROFILE.DETAILS);
    }
  };

  return (
    <FoodProfileStepLayout
      currentStep={2}
      title="Do you have any dietary or food restrictions?"
      description="Select all that apply."
      backHref={backHref}
      footer={
        <div className="space-y-3">
          {/* Informational Notice */}
          <Alert variant="info" className="py-2.5 px-3">
            <Info className="size-4 shrink-0 text-status-info-icon" />
            <AlertDescription className="text-xs text-status-info-text leading-snug">
              FoodFighter uses this information to personalize your meal recommendations and filter out unsuitable options.
            </AlertDescription>
          </Alert>

          {/* Primary Action */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isRestrictionsStepValid}
            onClick={handleNext}
            id="restrictions-next-button"
          >
            Next
          </Button>
        </div>
      }
    >
      {/* Standard 8 Restrictions Grid */}
      <div
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
        role="group"
        aria-label="Standard Dietary Restrictions"
      >
        {STANDARD_RESTRICTIONS.map((option) => {
          const isSelected = draft.restrictions.includes(option.id);
          return (
            <SelectableOptionCard
              key={option.id}
              id={`restriction-${option.id}`}
              label={option.label}
              selected={isSelected}
              onClick={() => toggleRestriction(option.id)}
            />
          );
        })}
      </div>

      {/* Custom Restriction Section */}
      <div className="pt-1">
        {isCustomInputOpen ? (
          <div className="space-y-1.5 p-3.5 rounded-xl border border-border bg-surface shadow-2xs animate-fade-in">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-restriction-input" className="text-xs font-semibold text-text-primary">
                Other Restriction
              </Label>
              <button
                type="button"
                onClick={handleClearCustomInput}
                className="text-xs text-text-muted hover:text-text-primary flex items-center gap-0.5 transition-colors cursor-pointer"
                aria-label="Remove custom restriction input"
              >
                <X className="size-3.5" />
                <span>Remove</span>
              </button>
            </div>
            <Input
              ref={customInputRef}
              id="custom-restriction-input"
              type="text"
              placeholder="e.g. Low sodium, Diabetic-friendly"
              value={draft.otherRestrictions}
              onChange={(e) => setOtherRestrictions(e.target.value)}
              className="text-sm h-10"
              maxLength={100}
            />
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="md"
            fullWidth
            onClick={handleOpenCustomInput}
            leftIcon={<Plus className="size-4" />}
            className="border-dashed hover:border-solid text-text-secondary hover:text-brand-primary"
            id="add-other-restriction-button"
          >
            Add other restriction
          </Button>
        )}
      </div>

      {/* OR Divider */}
      <div className="py-1">
        <Separator text="OR" className="text-xs font-medium text-text-muted" />
      </div>

      {/* No Restrictions Option (Mutually Exclusive) */}
      <div>
        <SelectableOptionCard
          id="no-restrictions-option"
          label="No other restrictions"
          description="None of the above apply to me"
          selected={draft.hasNoRestrictions}
          onClick={() => setHasNoRestrictions(!draft.hasNoRestrictions)}
          icon={<ShieldCheck className="size-5 text-brand-primary" />}
          className="w-full border-border/80"
          aria-label="No other restrictions"
        />
      </div>
    </FoodProfileStepLayout>
  );
}
