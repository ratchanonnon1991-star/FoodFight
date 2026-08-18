import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { Separator } from "@/components/ui/Separator";

export function FeedbackShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Feedback, Badges & Alerts</h2>
        <p className="text-sm text-text-secondary">
          Status indicators, alert messages, loading indicators, and separators.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 sm:p-6 space-y-6">
        {/* Badges */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Badges & Status Tags
          </span>
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="brand" dot>Brand Primary</Badge>
            <Badge variant="brand-secondary">Brand Secondary</Badge>
            <Badge variant="petal">Petal Accent</Badge>
            <Badge variant="apricot">Apricot Accent</Badge>
            <Badge variant="custard">Custard Accent</Badge>
            <Badge variant="success" dot>Success (พร้อม)</Badge>
            <Badge variant="warning" dot>Warning (รอสมาชิก)</Badge>
            <Badge variant="danger" dot>Danger (ยังไม่พร้อม)</Badge>
            <Badge variant="info" dot>Info (AI แนะนำ)</Badge>
          </div>
        </div>

        <Separator />

        {/* Alerts */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Alerts & System Notifications
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Alert variant="info">
              <AlertTitle>Food Profile Incomplete</AlertTitle>
              <AlertDescription>
                กรุณาระบุข้อมูลการแพ้อาหารก่อนเริ่มเข้าร่วม Session
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <AlertTitle>Ready Confirmed (พร้อมแล้ว)</AlertTitle>
              <AlertDescription>
                คุณได้ยืนยันความพร้อมเรียบร้อยแล้ว รอหัวหน้าห้องเริ่ม FoodFight
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTitle>Time Warning</AlertTitle>
              <AlertDescription>
                การโหวตจะสิ้นสุดในอีก 30 วินาที กรุณาเลือก OK หรือ Pass
              </AlertDescription>
            </Alert>

            <Alert variant="error">
              <AlertTitle>Invalid Room Code</AlertTitle>
              <AlertDescription>
                ไม่พบห้องที่ตรงกับรหัสที่ระบุ กรุณาตรวจสอบอีกครั้ง
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <Separator />

        {/* Spinners & Separators */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Loading Spinners & Social Separator
          </span>
          <div className="flex flex-wrap items-center gap-4 py-2">
            <div className="flex items-center gap-2">
              <Spinner size="sm" variant="primary" />
              <span className="text-xs text-text-secondary">sm (16px)</span>
            </div>
            <div className="flex items-center gap-2">
              <Spinner size="md" variant="secondary" />
              <span className="text-xs text-text-secondary">md (20px)</span>
            </div>
            <div className="flex items-center gap-2">
              <Spinner size="lg" variant="primary" />
              <span className="text-xs text-text-secondary">lg (28px)</span>
            </div>
          </div>

          <div className="max-w-md pt-2">
            <Separator text="OR CONTINUE WITH (หรือเข้าสู่ระบบด้วย)" />
          </div>
        </div>
      </div>
    </div>
  );
}
