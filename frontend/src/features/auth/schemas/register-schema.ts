import { z } from "zod";
import { AUTH_PASSWORD_POLICY } from "../constants/auth-policy";

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Full Name is required",
    }),

    email: z
      .string()
      .trim()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Please enter a valid email address",
      }),

    password: z
      .string()
      .min(AUTH_PASSWORD_POLICY.minLength, {
        message: `Password must be at least ${AUTH_PASSWORD_POLICY.minLength} characters`,
      })
      .refine(
        (val) => !AUTH_PASSWORD_POLICY.requireLowercase || /[a-z]/.test(val),
        {
          message: "Password must contain at least one lowercase letter",
        },
      )
      .refine(
        (val) => !AUTH_PASSWORD_POLICY.requireUppercase || /[A-Z]/.test(val),
        {
          message: "Password must contain at least one uppercase letter",
        },
      )
      .refine(
        (val) => !AUTH_PASSWORD_POLICY.requireNumber || /[0-9]/.test(val),
        {
          message: "Password must contain at least one number",
        },
      )
      .refine(
        (val) =>
          !AUTH_PASSWORD_POLICY.requireSpecialCharacter ||
          /[^A-Za-z0-9]/.test(val),
        {
          message: "Password must contain at least one special character",
        },
      ),

    confirmPassword: z.string().min(1, {
      message: "Please confirm your password",
    }),

    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
