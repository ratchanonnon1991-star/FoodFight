import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, Users, Vote, MapPin, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-text-primary">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <PageContainer maxWidth="lg" paddingY="none" className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-brand-primary">
              FoodFighter
            </span>
            <Badge variant="petal" size="sm">Beta</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/design-system" className="text-xs text-text-muted hover:text-brand-primary transition-colors">
              Design System
            </Link>
          </div>
        </PageContainer>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1 flex items-center py-12 sm:py-16">
        <PageContainer maxWidth="md" className="space-y-8 text-center sm:text-left">
          <div className="space-y-4">
            <div className="flex justify-center sm:justify-start">
              <Badge variant="apricot" size="md">
                Group Meal Decision Platform
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-primary leading-tight">
              Fight for the best meal with your group.
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto sm:mx-0">
              ช่วยกลุ่มเพื่อนตัดสินใจเลือกร้านอาหารและเมนูที่เหมาะสมที่สุดด้วย AI
              วิเคราะห์เงื่อนไขอาหาร อาหารที่แพ้ และงบประมาณของทุกคนอย่างลงตัว
            </p>
          </div>

          {/* Quick Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <Card variant="subtle" className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
                <Users className="size-4 text-brand-secondary" />
                <span>Room & Lobby</span>
              </div>
              <p className="text-xs text-text-secondary">
                สร้างห้อง แชร์ Room Code และยืนยันความพร้อมของสมาชิกแบบ Realtime
              </p>
            </Card>

            <Card variant="subtle" className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
                <Sparkles className="size-4 text-brand-secondary" />
                <span>AI Recommendation</span>
              </div>
              <p className="text-xs text-text-secondary">
                วิเคราะห์ Food Profile แนะนำ 2 เมนูที่ทุกคนรับประทานได้อย่างปลอดภัย
              </p>
            </Card>

            <Card variant="subtle" className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
                <Vote className="size-4 text-brand-secondary" />
                <span>OK / Pass Voting</span>
              </div>
              <p className="text-xs text-text-secondary">
                โหวตเมนูร่วมกันอย่างโปร่งใสพร้อมระบบ Tie Break ตัดสินอัตโนมัติ
              </p>
            </Card>

            <Card variant="subtle" className="p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
                <MapPin className="size-4 text-brand-secondary" />
                <span>Restaurant Discovery</span>
              </div>
              <p className="text-xs text-text-secondary">
                ค้นหาร้านอาหารใกล้เคียงตามระยะทางที่กำหนดพร้อมตำแหน่งบนแผนที่
              </p>
            </Card>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
            <Link href="/design-system" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="size-4" />}>
                Explore Design System
              </Button>
            </Link>
          </div>
        </PageContainer>
      </main>

      {/* Product Footer */}
      <footer className="border-t border-border py-6 bg-surface">
        <PageContainer maxWidth="lg" paddingY="none" className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <span>© 2026 FoodFighter. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/design-system" className="hover:text-brand-primary transition-colors">
              UI Design System
            </Link>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
}
