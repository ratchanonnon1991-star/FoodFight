import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { VerificationCodeInput } from "./VerificationCodeInput";

describe("VerificationCodeInput", () => {
  it("renders 6 segmented digit inputs with accessible labels", () => {
    render(<VerificationCodeInput value="" onChange={vi.fn()} />);

    const group = screen.getByRole("group", { name: "6-digit verification code" });
    expect(group).toBeInTheDocument();

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByLabelText(`Digit ${i} of 6`)).toBeInTheDocument();
    }
  });

  it("updates value and advances focus when typing numbers", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<VerificationCodeInput value="" onChange={handleChange} />);

    const firstInput = screen.getByLabelText("Digit 1 of 6");
    await user.type(firstInput, "5");

    expect(handleChange).toHaveBeenCalledWith("5");
  });

  it("disables all digit inputs when disabled is true", () => {
    render(<VerificationCodeInput value="123" onChange={vi.fn()} disabled />);

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByLabelText(`Digit ${i} of 6`)).toBeDisabled();
    }
  });

  it("distributes pasted 6-digit text across inputs", () => {
    const handleChange = vi.fn();
    render(<VerificationCodeInput value="" onChange={handleChange} />);

    const firstInput = screen.getByLabelText("Digit 1 of 6");
    const pasteEvent = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(pasteEvent, "clipboardData", {
      value: {
        getData: (type: string) => (type === "text" ? "654321" : ""),
      },
    });

    firstInput.dispatchEvent(pasteEvent);
    expect(handleChange).toHaveBeenCalledWith("654321");
  });
});
