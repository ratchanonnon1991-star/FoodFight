import { describe, expect, it } from "vitest";
import { verifyEmailSchema } from "./verify-email-schema";

describe("verifyEmailSchema", () => {
  it("accepts a valid 6-digit numeric verification code", () => {
    const result = verifyEmailSchema.safeParse({ code: "123456" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.code).toBe("123456");
    }
  });

  it("rejects codes with fewer than 6 digits", () => {
    const result = verifyEmailSchema.safeParse({ code: "12345" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.code).toContain("Verification code must be exactly 6 digits.");
    }
  });

  it("rejects codes with more than 6 digits", () => {
    const result = verifyEmailSchema.safeParse({ code: "1234567" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.code).toContain("Verification code must be exactly 6 digits.");
    }
  });

  it("rejects non-numeric characters", () => {
    const result = verifyEmailSchema.safeParse({ code: "12345a" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.code).toContain("Verification code must contain only numbers.");
    }
  });
});
