import { describe, expect, it } from "vitest";
import { loginSchema } from "./login-schema";

describe("loginSchema", () => {
  it("accepts valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "SecretPassword123",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
      expect(result.data.password).toBe("SecretPassword123");
    }
  });

  it("trims whitespace from email", () => {
    const result = loginSchema.safeParse({
      email: "  user@example.com  ",
      password: "SecretPassword123",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects empty email with required error message", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "SecretPassword123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toContain("Email is required");
    }
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "SecretPassword123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailErrors = result.error.flatten().fieldErrors.email;
      expect(emailErrors).toContain("Please enter a valid email address");
    }
  });

  it("rejects empty password with required error message", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordErrors = result.error.flatten().fieldErrors.password;
      expect(passwordErrors).toContain("Password is required");
    }
  });
});
