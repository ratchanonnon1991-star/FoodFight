import { describe, expect, it } from "vitest";
import { registerSchema } from "./register-schema";

describe("registerSchema", () => {
  const validPayload = {
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    confirmPassword: "Password123",
    termsAccepted: true,
  };

  it("accepts a valid registration payload", () => {
    const result = registerSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John Doe");
      expect(result.data.email).toBe("john@example.com");
      expect(result.data.termsAccepted).toBe(true);
    }
  });

  it("trims whitespace from name and email", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      name: "  John Doe  ",
      email: "  john@example.com  ",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("John Doe");
      expect(result.data.email).toBe("john@example.com");
    }
  });

  it("rejects empty full name", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      name: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain("Full Name is required");
    }
  });

  it("rejects invalid email format", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      email: "invalid-email-address",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain("Please enter a valid email address");
    }
  });

  it("enforces password minimum length of 8 characters", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "Pass1",
      confirmPassword: "Pass1",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toContain("Password must be at least 8 characters");
    }
  });

  it("enforces password uppercase requirement", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toContain("Password must contain at least one uppercase letter");
    }
  });

  it("enforces password lowercase requirement", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "PASSWORD123",
      confirmPassword: "PASSWORD123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toContain("Password must contain at least one lowercase letter");
    }
  });

  it("enforces password number requirement", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: "PasswordWithoutNumber",
      confirmPassword: "PasswordWithoutNumber",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.password).toContain("Password must contain at least one number");
    }
  });

  it("rejects password confirmation mismatch", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      confirmPassword: "DifferentPassword123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain("Passwords do not match");
    }
  });

  it("rejects when terms are not accepted", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      termsAccepted: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.termsAccepted).toContain("You must accept the Terms of Service and Privacy Policy");
    }
  });
});
