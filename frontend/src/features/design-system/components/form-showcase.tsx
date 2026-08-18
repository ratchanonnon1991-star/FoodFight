"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField, FormLabel, FormDescription, FormError } from "@/components/ui/form-field";
import { Mail, Lock, User } from "lucide-react";

export function FormShowcase() {
  const [emailVal, setEmailVal] = React.useState("pure@example.com");
  const [invalidVal, setInvalidVal] = React.useState("invalid-email-format");
  const [agreed, setAgreed] = React.useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Form Controls & Validation</h2>
        <p className="text-sm text-text-secondary">
          Accessible form primitives with proper aria associations, helper text, and invalid states.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email Input */}
          <FormField name="email-showcase">
            <FormLabel required>Email Address (อีเมล)</FormLabel>
            <Input
              value={emailVal}
              onChange={(e) => setEmailVal(e.target.value)}
              leftAdornment={<Mail className="size-4" />}
              placeholder="pure@example.com"
            />
            <FormDescription>
              We will send a 6-digit OTP code to verify your identity.
            </FormDescription>
          </FormField>

          {/* Password Input */}
          <FormField name="password-showcase">
            <FormLabel required>Password (รหัสผ่าน)</FormLabel>
            <PasswordInput
              leftAdornment={<Lock className="size-4" />}
              placeholder="Enter your password"
            />
            <FormDescription>
              Minimum 8 characters with at least one number and uppercase letter.
            </FormDescription>
          </FormField>

          {/* Invalid Input State */}
          <FormField name="invalid-showcase" isInvalid>
            <FormLabel required>Error State Example (เกิดข้อผิดพลาด)</FormLabel>
            <Input
              invalid
              value={invalidVal}
              onChange={(e) => setInvalidVal(e.target.value)}
              leftAdornment={<Mail className="size-4" />}
            />
            <FormError error="Please enter a valid email address (e.g. name@example.com)." />
          </FormField>

          {/* Disabled Input */}
          <FormField name="disabled-showcase" disabled>
            <FormLabel disabled>Disabled Field (ไม่สามารถแก้ไขได้)</FormLabel>
            <Input
              disabled
              defaultValue="fixed-room-code-8F2Q9"
              leftAdornment={<User className="size-4" />}
            />
            <FormDescription>
              This field is locked by the session host.
            </FormDescription>
          </FormField>
        </div>

        {/* Checkbox Examples */}
        <div className="border-t border-border pt-5 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Checkbox States
          </span>
          <div className="space-y-3">
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label="Accept Terms of Service & Privacy Policy"
              description="ยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัวของ FoodFighter"
            />

            <Checkbox
              disabled
              defaultChecked
              label="Halal Only (อาหารฮาลาลเท่านั้น)"
              description="Set from your persistent Food Profile (Disabled in session preference)."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
