import { describe, expect, it } from "vitest";
import { changeEmailSchema } from "./change-email-schema";

describe("changeEmailSchema", () => {
  it("accepts a valid email address and trims whitespace", () => {
    const result = changeEmailSchema.safeParse({ newEmail: "  new-user@example.com  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.newEmail).toBe("new-user@example.com");
    }
  });

  it("rejects empty new email", () => {
    const result = changeEmailSchema.safeParse({ newEmail: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.newEmail).toContain("New email address is required");
    }
  });

  it("rejects invalid new email format", () => {
    const result = changeEmailSchema.safeParse({ newEmail: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.newEmail).toContain("Please enter a valid email address");
    }
  });
});
