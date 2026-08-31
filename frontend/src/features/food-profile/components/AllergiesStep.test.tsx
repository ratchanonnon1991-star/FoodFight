import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { FoodProfileProvider } from "../context/food-profile-context";
import { AllergiesStep } from "./AllergiesStep";

// Mock Next.js navigation and link
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", { href, ...rest }, children),
}));

function renderWithProvider(ui: React.ReactElement) {
  return render(<FoodProfileProvider>{ui}</FoodProfileProvider>);
}

describe("AllergiesStep Component", () => {
  it("renders 8 standard allergy options and screen headings", () => {
    renderWithProvider(<AllergiesStep />);

    expect(screen.getByRole("heading", { name: /do you have any food allergies\?/i })).toBeInTheDocument();
    expect(screen.getByText(/select all that apply/i)).toBeInTheDocument();
    expect(screen.getByText(/step 1 of 3/i)).toBeInTheDocument();

    const standardAllergies = [
      "Seafood",
      "Peanut",
      "Tree Nuts",
      "Dairy",
      "Egg",
      "Soy",
      "Wheat / Gluten",
      "Sesame",
    ];

    standardAllergies.forEach((allergy) => {
      expect(screen.getByRole("checkbox", { name: allergy })).toBeInTheDocument();
    });

    expect(screen.getByRole("checkbox", { name: /i (do not|don't) have any food allergies/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add other allergy/i })).toBeInTheDocument();
  });


  it("allows user to multi-select standard allergies and updates selected state", async () => {
    const user = userEvent.setup();
    renderWithProvider(<AllergiesStep />);

    const seafood = screen.getByRole("checkbox", { name: "Seafood" });
    const peanut = screen.getByRole("checkbox", { name: "Peanut" });

    expect(seafood).toHaveAttribute("aria-checked", "false");
    expect(peanut).toHaveAttribute("aria-checked", "false");

    await user.click(seafood);
    expect(seafood).toHaveAttribute("aria-checked", "true");

    await user.click(peanut);
    expect(peanut).toHaveAttribute("aria-checked", "true");
    expect(seafood).toHaveAttribute("aria-checked", "true");
  });

  it("handles 'No Allergies' mutual exclusivity properly in UI", async () => {
    const user = userEvent.setup();
    renderWithProvider(<AllergiesStep />);

    const dairy = screen.getByRole("checkbox", { name: "Dairy" });
    const noAllergies = screen.getByRole("checkbox", { name: /i (do not|don't) have any food allergies/i });


    // 1. Select Dairy
    await user.click(dairy);
    expect(dairy).toHaveAttribute("aria-checked", "true");
    expect(noAllergies).toHaveAttribute("aria-checked", "false");

    // 2. Click No Allergies -> Dairy should be unchecked, No Allergies checked
    await user.click(noAllergies);
    expect(dairy).toHaveAttribute("aria-checked", "false");
    expect(noAllergies).toHaveAttribute("aria-checked", "true");

    // 3. Click Dairy again -> No Allergies should be unchecked, Dairy checked
    await user.click(dairy);
    expect(dairy).toHaveAttribute("aria-checked", "true");
    expect(noAllergies).toHaveAttribute("aria-checked", "false");
  });

  it("supports adding and typing a custom other allergy", async () => {
    const user = userEvent.setup();
    renderWithProvider(<AllergiesStep />);

    const addOtherBtn = screen.getByRole("button", { name: /add other allergy/i });
    await user.click(addOtherBtn);

    const input = screen.getByRole("textbox", { name: /other allergy/i });
    expect(input).toBeInTheDocument();

    await user.type(input, "Strawberries");
    expect(input).toHaveValue("Strawberries");

    // Removing custom input clears value
    const removeBtn = screen.getByRole("button", { name: /remove custom allergy input/i });
    await user.click(removeBtn);

    expect(screen.queryByRole("textbox", { name: /other allergy/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add other allergy/i })).toBeInTheDocument();
  });

  it("renders informational notice regarding settings update", () => {
    renderWithProvider(<AllergiesStep />);

    expect(
      screen.getByText(/you can update your food profile anytime in your account settings/i)
    ).toBeInTheDocument();
  });

  it("disables Next button when no option chosen and enables when an allergy or No Allergies is chosen", async () => {
    const user = userEvent.setup();
    const handleNext = vi.fn();
    renderWithProvider(<AllergiesStep onNext={handleNext} />);

    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).toBeDisabled();

    // Select an allergy -> Next should become enabled
    const egg = screen.getByRole("checkbox", { name: "Egg" });
    await user.click(egg);
    expect(nextBtn).toBeEnabled();

    // Click Next
    await user.click(nextBtn);
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
