import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import { AllergiesStep } from "@/features/food-profile/components/AllergiesStep";

export const metadata: Metadata = {
  title: "Food Allergies | FoodFighter",
  description: "Set your dietary allergy preferences for personalized FoodFighter meal recommendations.",
};

type AllergiesSearchParams = Promise<{
  from?: string | string[];
}>;

function getValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AllergiesPage({
  searchParams,
}: {
  searchParams: AllergiesSearchParams;
}) {
  const params = await searchParams;
  const from = getValue(params.from);

  return (
    <AllergiesStep
      backHref={from === "profile" ? ROUTES.PROFILE : undefined}
    />
  );
}
