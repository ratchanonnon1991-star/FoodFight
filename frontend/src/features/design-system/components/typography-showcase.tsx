import * as React from "react";
import { Badge } from "@/components/ui/Badge";

export function TypographyShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Typography Scale (Poppins + Noto Sans Thai)</h2>
        <p className="text-sm text-text-secondary">
          Rounded geometric sans-serif styling aligned with mobile UI reference (Poppins 400/500/600/700 + Noto Sans Thai).
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {/* Brand / Logo */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Brand / Logo</span>
            <Badge variant="neutral" size="sm">text-xl / 2xl · font-semibold (600)</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-semibold tracking-tight text-brand-primary">
            FoodFighter
          </div>
        </div>

        {/* Display */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Display</span>
            <Badge variant="neutral" size="sm">text-3xl / 4xl · font-bold (700)</Badge>
          </div>
          <div className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
            Create your account
          </div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-secondary">
            FoodFight! โหวตเมนูที่ใช่
          </div>
        </div>

        {/* Heading 1 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 1</span>
            <Badge variant="neutral" size="sm">text-2xl / 3xl · font-bold (700)</Badge>
          </div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Verify your email
          </div>
          <div className="text-xl sm:text-2xl font-bold text-text-primary">
            วันนี้กินอะไรดี? ตัดสินใจร่วมกันใน 3 นาที
          </div>
        </div>

        {/* Heading 2 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 2</span>
            <Badge variant="neutral" size="sm">text-xl / 2xl · font-semibold (600)</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-text-primary">
            Welcome back · เข้าสู่ระบบ
          </div>
        </div>

        {/* Heading 3 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 3</span>
            <Badge variant="neutral" size="sm">text-lg / xl · font-semibold (600)</Badge>
          </div>
          <div className="text-lg sm:text-xl font-semibold text-text-primary">
            มื้อเย็นวันเสาร์ · Enter 6-digit OTP code
          </div>
        </div>

        {/* Form Label & Button */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Form Label & Button Weight</span>
            <Badge variant="neutral" size="sm">text-sm · font-medium (500) / font-semibold (600)</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium text-text-primary">Email (อีเมล)</span>
            <span className="font-medium text-text-primary">Password (รหัสผ่าน)</span>
            <span className="font-semibold text-brand-primary px-3 py-1 bg-surface-subtle rounded-sm border border-border">
              เข้าสู่ระบบ (Log in)
            </span>
            <span className="font-semibold text-white px-3 py-1 bg-brand-primary rounded-sm">
              Create Account
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Body (Default)</span>
            <Badge variant="neutral" size="sm">text-base · font-normal (400) · leading-relaxed</Badge>
          </div>
          <p className="text-base text-text-primary leading-relaxed">
            FoodFighter helps groups decide meals effortlessly by filtering dietary restrictions, allergies, and budgets with AI.
            (ช่วยวิเคราะห์เงื่อนไขอาหารและแนะนำเมนูที่ทุกคนในกลุ่มรับประทานร่วมกันได้อย่างมีความสุข)
          </p>
        </div>

        {/* Body Small / Helper */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Body Small / Helper</span>
            <Badge variant="neutral" size="sm">text-sm · font-normal (400) · text-secondary</Badge>
          </div>
          <p className="text-sm text-text-secondary leading-normal">
            At least 8 characters with numbers and uppercase letters. (รหัสยืนยัน OTP มีอายุ 5 นาที)
          </p>
        </div>

        {/* Label & Caption */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Label & Caption</span>
            <Badge variant="neutral" size="sm">text-xs · uppercase / muted</Badge>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              EMAIL ADDRESS (อีเมล)
            </span>
            <span className="text-xs text-text-muted">
              Caption: Updated on 17 Aug 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
