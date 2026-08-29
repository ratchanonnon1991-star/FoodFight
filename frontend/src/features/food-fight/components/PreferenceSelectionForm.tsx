"use client";

import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ROUTES } from "@/config/routes";
import { RoomPageHeader } from "@/features/room/components/RoomPageHeader";
import {
  BUDGET_OPTIONS,
  COOKING_METHOD_OPTIONS,
  CUISINE_OPTIONS,
  PROTEIN_OPTIONS,
  RESTAURANT_STYLE_OPTIONS,
  type MealPreferenceOption,
} from "@/features/food-fight/constants/meal-preference-options";
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodFightTranslations } from "../i18n/food-fight-translations";
import type {
  MealPreferenceBudget,
  MealPreferenceDraft,
} from "@/features/food-fight/types/food-fight-types";

export const EMPTY_MEAL_PREFERENCE_DRAFT: MealPreferenceDraft = {
  cookingMethods: ["ANY"],
  cookingMethodsOther: "",
  cuisines: ["ANY"],
  cuisinesOther: "",
  proteins: ["ANY"],
  proteinsOther: "",
  budget: "ANY",
  budgetOther: "",
  restaurantStyles: ["ANY"],
  restaurantStylesOther: "",
  additionalNuances: "",
};

export interface PreferenceSelectionFormProps {
  roomId: string;
  initialDraft?: MealPreferenceDraft;
  error: string | null;
  isSubmitting: boolean;
  onSubmit: (preference: MealPreferenceDraft) => void | Promise<void>;
}

export function PreferenceSelectionForm({
  roomId,
  initialDraft = EMPTY_MEAL_PREFERENCE_DRAFT,
  error,
  isSubmitting,
  onSubmit,
}: PreferenceSelectionFormProps) {
  const { locale } = useLanguage();
  const t = foodFightTranslations[locale].preferences;
  const [draft, setDraft] = React.useState<MealPreferenceDraft>(initialDraft);

  const updateDraft = <K extends keyof MealPreferenceDraft>(
    key: K,
    value: MealPreferenceDraft[K],
  ) => setDraft((current) => ({ ...current, [key]: value }));

  const toggleOption = (
    key: "cookingMethods" | "cuisines" | "proteins" | "restaurantStyles",
    value: string,
  ) =>
    setDraft((current) => {
      const otherKey = {
        cookingMethods: "cookingMethodsOther",
        cuisines: "cuisinesOther",
        proteins: "proteinsOther",
        restaurantStyles: "restaurantStylesOther",
      }[key] as
        | "cookingMethodsOther"
        | "cuisinesOther"
        | "proteinsOther"
        | "restaurantStylesOther";
      const selectedValues = current[key];

      if (value === "ANY") {
        const isAnySelected = selectedValues.includes("ANY");
        return {
          ...current,
          [key]: isAnySelected ? [] : ["ANY"],
          [otherKey]: isAnySelected ? current[otherKey] : "",
        };
      }

      const withoutAny = selectedValues.filter((item) => item !== "ANY");
      return {
        ...current,
        [key]: withoutAny.includes(value)
          ? withoutAny.filter((item) => item !== value)
          : [...withoutAny, value],
      };
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const preference: MealPreferenceDraft = {
      ...draft,
      cookingMethods: draft.cookingMethods.length ? draft.cookingMethods : ["ANY"],
      cuisines: draft.cuisines.length ? draft.cuisines : ["ANY"],
      proteins: draft.proteins.length ? draft.proteins : ["ANY"],
      budget: draft.budget ?? "ANY",
      restaurantStyles: draft.restaurantStyles.length
        ? draft.restaurantStyles
        : ["ANY"],
    };
    void onSubmit(preference);
  };

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-2xl">
        <RoomPageHeader
          title={t.title}
          subtitle={t.subtitle}
          backHref={ROUTES.ROOM.LOBBY(roomId)}
        />
        {error ? (
          <Alert variant="warning" className="mb-4">
            <AlertTitle>
              {locale === "th" ? "ข้อมูลยังไม่ครบ" : "Incomplete Information"}
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}
        <Card variant="outline" className="rounded-2xl p-4 sm:p-6">
          <div className="flex items-start gap-3 rounded-xl bg-surface-subtle p-4">
            <Sparkles
              className="mt-0.5 size-5 shrink-0 text-brand-primary"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-text-secondary">
              {t.description}
            </p>
          </div>
          <form className="mt-6 space-y-7" onSubmit={handleSubmit}>
            <OptionGroup
              title={t.cookingMethod}
              options={COOKING_METHOD_OPTIONS}
              selectedValues={draft.cookingMethods}
              onToggle={(value) => toggleOption("cookingMethods", value)}
              otherValue={draft.cookingMethodsOther}
              onOtherChange={(value) =>
                updateDraft("cookingMethodsOther", value)
              }
            />
            <OptionGroup
              title={t.cuisine}
              options={CUISINE_OPTIONS}
              selectedValues={draft.cuisines}
              onToggle={(value) => toggleOption("cuisines", value)}
              otherValue={draft.cuisinesOther}
              onOtherChange={(value) => updateDraft("cuisinesOther", value)}
            />
            <OptionGroup
              title={t.protein}
              options={PROTEIN_OPTIONS}
              selectedValues={draft.proteins}
              onToggle={(value) => toggleOption("proteins", value)}
              otherValue={draft.proteinsOther}
              onOtherChange={(value) => updateDraft("proteinsOther", value)}
            />
            <fieldset>
              <legend className="text-sm font-semibold">{t.budget}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={draft.budget === option.value}
                    onClick={() =>
                      updateDraft(
                        "budget",
                        option.value as MealPreferenceBudget,
                      )
                    }
                    className={`rounded-xl border p-3 text-left ${draft.budget === option.value ? "border-brand-primary bg-brand-primary/10" : "border-border bg-surface"}`}
                  >
                    <span className="block text-sm font-semibold">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-xs text-text-secondary">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
            <OptionGroup
              title={t.restaurantStyle}
              options={RESTAURANT_STYLE_OPTIONS}
              selectedValues={draft.restaurantStyles}
              onToggle={(value) => toggleOption("restaurantStyles", value)}
              otherValue={draft.restaurantStylesOther}
              onOtherChange={(value) =>
                updateDraft("restaurantStylesOther", value)
              }
            />
            <label className="block">
              <span className="text-sm font-semibold">{t.additionalNotes}</span>
              <Textarea
                value={draft.additionalNuances}
                onChange={(event) =>
                  updateDraft("additionalNuances", event.target.value)
                }
                className="mt-3"
                placeholder={t.additionalNotesPlaceholder}
                rows={4}
              />
            </label>
            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              loadingText={t.submitting}
              rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
            >
              {t.submit}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}

function OptionGroup({
  title,
  options,
  selectedValues,
  onToggle,
  otherValue,
  onOtherChange,
}: {
  title: string;
  options: MealPreferenceOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = selectedValues.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option.value)}
              className={`rounded-full border px-3.5 py-2 text-left text-sm ${selected ? "border-brand-primary bg-brand-primary text-white" : "border-border bg-surface text-text-primary"}`}
            >
              {option.label}
              <span
                className={`ml-1 text-xs ${selected ? "text-white/80" : "text-text-muted"}`}
              >
                {option.englishLabel}
              </span>
            </button>
          );
        })}
      </div>
      <Input
        value={otherValue}
        onChange={(event) => onOtherChange(event.target.value)}
        disabled={selectedValues.includes("ANY")}
        className="mt-3"
        placeholder="อื่น ๆ (ถ้ามี)"
        aria-label={`${title} อื่น ๆ`}
      />
    </fieldset>
  );
}
