import { z } from "zod";

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .trim()
    .min(1, { message: "New email address is required" })
    .email({ message: "Please enter a valid email address" }),
});

export type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;
