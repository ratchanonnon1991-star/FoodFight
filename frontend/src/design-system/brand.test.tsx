import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandMark } from "./brand";

describe("BrandMark primitive", () => {
  it("renders the primary horizontal logo with default dimensions", () => {
    render(<BrandMark variant="primary" size="md" alt="FoodFighter Logo" />);
    const img = screen.getByRole("img", { name: "FoodFighter Logo" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "120");
    expect(img).toHaveAttribute("height", "40");
    expect(img).toHaveAttribute("sizes", "120px");
  });

  it("renders the stacked vertical logo with correct aspect ratio", () => {
    render(<BrandMark variant="stacked" size="md" alt="Stacked Logo" />);
    const img = screen.getByRole("img", { name: "Stacked Logo" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "88");
    expect(img).toHaveAttribute("height", "101");
    expect(img).toHaveAttribute("sizes", "88px");
  });

  it("renders the symbol icon with 1:1 square dimensions", () => {
    render(<BrandMark variant="icon" size="sm" alt="Icon Mark" />);
    const img = screen.getByRole("img", { name: "Icon Mark" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("width", "32");
    expect(img).toHaveAttribute("height", "32");
    expect(img).toHaveAttribute("sizes", "32px");
  });

  it("calculates height automatically when custom width is supplied", () => {
    // primary ratio is 3:1 -> 150 / 3 = 50
    render(<BrandMark variant="primary" width={150} alt="Custom Width" />);
    const img = screen.getByRole("img", { name: "Custom Width" });
    expect(img).toHaveAttribute("width", "150");
    expect(img).toHaveAttribute("height", "50");
    expect(img).toHaveAttribute("sizes", "150px");
  });

  it("supports decorative mode with empty alt and aria-hidden", () => {
    const { container } = render(<BrandMark variant="icon" decorative />);
    const wrapper = container.querySelector(".ff-ds-brand-mark");
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });

  it("accepts custom sizes attribute override", () => {
    render(<BrandMark variant="primary" sizes="(max-width: 768px) 96px, 120px" alt="Responsive Logo" />);
    const img = screen.getByRole("img", { name: "Responsive Logo" });
    expect(img).toHaveAttribute("sizes", "(max-width: 768px) 96px, 120px");
  });
});
