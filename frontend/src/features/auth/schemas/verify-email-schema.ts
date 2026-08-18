import { z } from "zod";
import { EMAIL_VERIFICATION_POLICY } from "../constants/auth-policy";

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .length(EMAIL_VERIFICATION_POLICY.codeLength, {
      message: `Verification code must be exactly ${EMAIL_VERIFICATION_POLICY.codeLength} digits.`,
    })
    .regex(/^\d+$/, { message: "Verification code must contain only numbers." }),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
