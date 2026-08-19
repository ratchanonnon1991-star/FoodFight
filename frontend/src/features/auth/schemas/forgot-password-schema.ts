import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
