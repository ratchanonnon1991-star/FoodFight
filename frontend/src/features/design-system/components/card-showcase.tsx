import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Utensils, MapPin, CheckCircle2 } from "lucide-react";

export function CardShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Cards & Surface Hierarchy</h2>
        <p className="text-sm text-text-secondary">
          Composable card primitives providing clear visual elevation without clutter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Default Card */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="petal">ห้องเลือกอาหาร</Badge>
              <Utensils className="size-4 text-brand-primary" />
            </div>
            <CardTitle as="h3">มื้อเย็นวันเสาร์</CardTitle>
            <CardDescription>Created by Pure · 4/8 Members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">
              AI กำลังเตรียมวิเคราะห์เงื่อนไขอาหารของสมาชิกทุกคนเพื่อแนะนำ 2 เมนูที่เหมาะสมที่สุด
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-text-muted">รัศมี 5 km</span>
            <Button size="sm" variant="primary">เข้าร่วมห้อง</Button>
          </CardFooter>
        </Card>

        {/* Subtle Card */}
        <Card variant="subtle">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="custard">AI Recommendation</Badge>
              <Sparkles className="size-4 text-brand-primary" />
            </div>
            <CardTitle as="h3">ชาบูต้มยำ & สุกี้โบราณ</CardTitle>
            <CardDescription>Match Score 95%</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">
              เหมาะสมกับงบประมาณเฉลี่ย 300-500 บาท และตรงตามเงื่อนไขไม่มีอาหารทะเล
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs font-medium text-status-success-text">สมาชิกพร้อม 4/4</span>
            <Button size="sm" variant="secondary">OK</Button>
          </CardFooter>
        </Card>

        {/* Elevated Card */}
        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="success">Final Result</Badge>
              <CheckCircle2 className="size-4 text-status-success-icon" />
            </div>
            <CardTitle as="h3">ร้านอาหารแนะนำ</CardTitle>
            <CardDescription>ระยะห่าง 1.2 กม. จากจุดนัดพบ</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary">
              เปิดบริการ 11:00 - 22:00 น. มีที่จอดรถและรองรับการชำระเงินแบบไร้เงินสด
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <MapPin className="size-3.5 text-brand-secondary" />
              <span>เปิดอยู่</span>
            </div>
            <Button size="sm" variant="outline">ดูแผนที่</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
