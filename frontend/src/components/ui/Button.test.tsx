import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with its accessible name", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("handles user click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button and prevents click when disabled prop is true", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled Action
      </Button>
    );

    const button = screen.getByRole("button", { name: "Disabled Action" });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("sets aria-busy and disables interaction when loading is true", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button loading loadingText="Saving..." onClick={handleClick}>
        Save
      </Button>
    );

    const button = screen.getByRole("button", { name: /saving/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
