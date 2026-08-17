import * as React from "react";
import { Badge } from "@/components/ui/badge";

export function TypographyShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Typography Scale (Thai & English)</h2>
        <p className="text-sm text-text-secondary">
          Bilingual typography hierarchy with comfortable line-heights and no vowel clipping.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface divide-y divide-border">
        {/* Display */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Display</span>
            <Badge variant="neutral" size="sm">text-3xl / 4xl · font-bold</Badge>
          </div>
          <div className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
            FoodFight! โหวตเมนูที่ใช่
          </div>
        </div>

        {/* Heading 1 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 1</span>
            <Badge variant="neutral" size="sm">text-2xl / 3xl · font-bold</Badge>
          </div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            วันนี้กินอะไรดี? ตัดสินใจร่วมกันใน 3 นาที
          </div>
        </div>

        {/* Heading 2 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 2</span>
            <Badge variant="neutral" size="sm">text-xl / 2xl · font-bold</Badge>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-text-primary">
            เมนูแนะนำโดย AI ประจำกลุ่ม (AI Recommendations)
          </div>
        </div>

        {/* Heading 3 */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Heading 3</span>
            <Badge variant="neutral" size="sm">text-lg / xl · font-semibold</Badge>
          </div>
          <div className="text-lg sm:text-xl font-semibold text-text-primary">
            มื้อเย็นวันเสาร์ · สมาชิกพร้อม 4/4 คน
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Body (Default)</span>
            <Badge variant="neutral" size="sm">text-base · leading-relaxed</Badge>
          </div>
          <p className="text-base text-text-primary leading-relaxed">
            FoodFighter ช่วยวิเคราะห์เงื่อนไขอาหาร เช่น ข้อจำกัดทางศาสนาและอาหารที่แพ้
            เพื่อแนะนำเมนูที่ทุกคนในกลุ่มรับประทานร่วมกันได้อย่างมีความสุข
          </p>
        </div>

        {/* Body Small */}
        <div className="p-4 sm:p-5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Body Small</span>
            <Badge variant="neutral" size="sm">text-sm · text-secondary</Badge>
          </div>
          <p className="text-sm text-text-secondary leading-normal">
            ระบบจะส่งรหัสยืนยัน OTP 6 หลักไปยังอีเมลของคุณ รหัสมีอายุ 5 นาที
          </p>
        </div>

        {/* Label & Caption */}
        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Label & Caption</span>
            <Badge variant="neutral" size="sm">text-xs · uppercase / muted</Badge>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              EMAIL ADDRESS (อีเมล)
            </span>
            <span className="text-xs text-text-muted">
              Caption: อัปเดตล่าสุดเมื่อ 17 ส.ค. 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
