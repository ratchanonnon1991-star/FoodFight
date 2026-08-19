import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { FoodProfileProvider } from "../context/food-profile-context";
import { RestrictionsStep } from "./RestrictionsStep";

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

describe("RestrictionsStep Component", () => {
  it("renders 8 standard restriction options and screen headings", () => {
    renderWithProvider(<RestrictionsStep />);

    expect(
      screen.getByRole("heading", { name: /do you have any dietary or food restrictions\?/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/select all that apply/i)).toBeInTheDocument();
    expect(screen.getByText(/step 2 of 3/i)).toBeInTheDocument();

    const standardRestrictions = [
      "Vegetarian",
      "Vegan",
      "Pescatarian",
      "Gluten-free",
      "Halal only",
      "Kosher",
      "No pork",
      "No beef",
    ];

    standardRestrictions.forEach((restriction) => {
      expect(screen.getByRole("checkbox", { name: restriction })).toBeInTheDocument();
    });

    expect(screen.getByRole("checkbox", { name: /no other restrictions/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add other restriction/i })).toBeInTheDocument();
  });

  it("allows user to multi-select standard restrictions and updates selected state", async () => {
    const user = userEvent.setup();
    renderWithProvider(<RestrictionsStep />);

    const vegetarian = screen.getByRole("checkbox", { name: "Vegetarian" });
    const noPork = screen.getByRole("checkbox", { name: "No pork" });

    expect(vegetarian).toHaveAttribute("aria-checked", "false");
    expect(noPork).toHaveAttribute("aria-checked", "false");

    await user.click(vegetarian);
    expect(vegetarian).toHaveAttribute("aria-checked", "true");

    await user.click(noPork);
    expect(noPork).toHaveAttribute("aria-checked", "true");
    expect(vegetarian).toHaveAttribute("aria-checked", "true");
  });

  it("handles 'No other restrictions' mutual exclusivity properly in UI", async () => {
    const user = userEvent.setup();
    renderWithProvider(<RestrictionsStep />);

    const vegan = screen.getByRole("checkbox", { name: "Vegan" });
    const noRestrictions = screen.getByRole("checkbox", { name: /no other restrictions/i });

    // 1. Select Vegan
    await user.click(vegan);
    expect(vegan).toHaveAttribute("aria-checked", "true");
    expect(noRestrictions).toHaveAttribute("aria-checked", "false");

    // 2. Click No other restrictions -> Vegan should be unchecked, No other restrictions checked
    await user.click(noRestrictions);
    expect(vegan).toHaveAttribute("aria-checked", "false");
    expect(noRestrictions).toHaveAttribute("aria-checked", "true");

    // 3. Click Vegan again -> No other restrictions should be unchecked, Vegan checked
    await user.click(vegan);
    expect(vegan).toHaveAttribute("aria-checked", "true");
    expect(noRestrictions).toHaveAttribute("aria-checked", "false");
  });

  it("supports adding and typing a custom other restriction", async () => {
    const user = userEvent.setup();
    renderWithProvider(<RestrictionsStep />);

    const addOtherBtn = screen.getByRole("button", { name: /add other restriction/i });
    await user.click(addOtherBtn);

    const input = screen.getByRole("textbox", { name: /other restriction/i });
    expect(input).toBeInTheDocument();

    await user.type(input, "Low sodium");
    expect(input).toHaveValue("Low sodium");

    // Removing custom input clears value
    const removeBtn = screen.getByRole("button", { name: /remove custom restriction input/i });
    await user.click(removeBtn);

    expect(screen.queryByRole("textbox", { name: /other restriction/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add other restriction/i })).toBeInTheDocument();
  });

  it("renders informational notice regarding recommendations", () => {
    renderWithProvider(<RestrictionsStep />);

    expect(
      screen.getByText(/foodfighter uses this information to personalize your meal recommendations/i)
    ).toBeInTheDocument();
  });

  it("disables Next button when no option chosen and enables when a restriction or No other restrictions is chosen", async () => {
    const user = userEvent.setup();
    const handleNext = vi.fn();
    renderWithProvider(<RestrictionsStep onNext={handleNext} />);

    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).toBeDisabled();

    // Select a restriction -> Next should become enabled
    const halal = screen.getByRole("checkbox", { name: "Halal only" });
    await user.click(halal);
    expect(nextBtn).toBeEnabled();

    // Click Next
    await user.click(nextBtn);
    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
