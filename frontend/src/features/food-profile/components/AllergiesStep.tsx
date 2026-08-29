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
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodProfileTranslations } from "../i18n/food-profile-translations";
import { STANDARD_ALLERGIES } from "../constants/food-profile-constants";
import { useFoodProfile } from "../context/food-profile-context";
import { FoodProfileStepLayout } from "./FoodProfileStepLayout";
import { SelectableOptionCard } from "./SelectableOptionCard";

export interface AllergiesStepProps {
  onNext?: () => void;
  backHref?: string;
}

export function AllergiesStep({
  onNext,
  backHref,
}: AllergiesStepProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = foodProfileTranslations[locale].allergies;
  const {
    draft,
    toggleAllergy,
    setOtherAllergies,
    setHasNoAllergies,
    isAllergiesStepValid,
  } = useFoodProfile();

  const [isCustomInputOpen, setIsCustomInputOpen] = React.useState<boolean>(
    Boolean(draft.otherAllergies && draft.otherAllergies.trim().length > 0)
  );

  const customInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenCustomInput = () => {
    setIsCustomInputOpen(true);
    // Focus input after state update
    setTimeout(() => {
      customInputRef.current?.focus();
    }, 50);
  };

  const handleClearCustomInput = () => {
    setOtherAllergies("");
    setIsCustomInputOpen(false);
  };

  const handleNext = () => {
    if (!isAllergiesStepValid) return;

    if (onNext) {
      onNext();
    } else {
      router.push(ROUTES.FOOD_PROFILE.RESTRICTIONS);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <FoodProfileStepLayout
      currentStep={1}
      title={t.title}
      description={t.description}
      backHref={backHref}
      onBack={backHref ? undefined : handleBack}
      footer={
        <div className="space-y-3">
          {/* Informational Notice */}
          <Alert variant="info" className="py-2.5 px-3">
            <Info className="size-4 shrink-0 text-status-info-icon" />
            <AlertDescription className="text-xs text-status-info-text leading-snug">
              {t.notice}
            </AlertDescription>
          </Alert>

          {/* Primary Action */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isAllergiesStepValid}
            onClick={handleNext}
            id="allergies-next-button"
          >
            {t.next}
          </Button>
        </div>
      }
    >
      {/* Standard 8 Allergy Options Grid */}
      <div
        className="grid grid-cols-2 gap-2.5 sm:gap-3"
        role="group"
        aria-label={t.title}
      >
        {STANDARD_ALLERGIES.map((option) => {
          const isSelected = draft.allergies.includes(option.id);
          const optionLabel = t.options[option.id] ?? option.label;
          return (
            <SelectableOptionCard
              key={option.id}
              id={`allergy-${option.id}`}
              label={optionLabel}
              selected={isSelected}
              onClick={() => toggleAllergy(option.id)}
            />
          );
        })}
      </div>

      {/* Custom Allergy Section */}
      <div className="pt-1">
        {isCustomInputOpen ? (
          <div className="space-y-1.5 p-3.5 rounded-xl border border-border bg-surface shadow-2xs animate-fade-in">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-allergy-input" className="text-xs font-semibold text-text-primary">
                {t.otherAllergy}
              </Label>
              <button
                type="button"
                onClick={handleClearCustomInput}
                className="text-xs text-text-muted hover:text-text-primary flex items-center gap-0.5 transition-colors cursor-pointer"
                aria-label={t.remove}
              >
                <X className="size-3.5" />
                <span>{t.remove}</span>
              </button>
            </div>
            <Input
              ref={customInputRef}
              id="custom-allergy-input"
              type="text"
              placeholder={t.otherPlaceholder}
              value={draft.otherAllergies}
              onChange={(e) => setOtherAllergies(e.target.value)}
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
            id="add-other-allergy-button"
          >
            {t.addOtherAllergy}
          </Button>
        )}
      </div>

      {/* OR Divider */}
      <div className="py-1">
        <Separator text={t.or} className="text-xs font-medium text-text-muted" />
      </div>

      {/* No Allergies Option (Mutually Exclusive) */}
      <div>
        <SelectableOptionCard
          id="no-allergies-option"
          label={t.noAllergiesLabel}
          description={t.noAllergiesDesc}
          selected={draft.hasNoAllergies}
          onClick={() => setHasNoAllergies(!draft.hasNoAllergies)}
          icon={<ShieldCheck className="size-5 text-brand-primary" />}
          className="w-full border-border/80"
          aria-label={t.noAllergiesLabel}
        />
      </div>
    </FoodProfileStepLayout>
  );
}
