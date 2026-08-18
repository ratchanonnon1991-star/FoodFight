import { PublicHeader } from "@/components/layout/PublicHeader";
import { HomeHero } from "@/features/home/components/HomeHero";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function RootPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between bg-background text-text-primary">
      <PublicHeader />
      <HomeHero />
      <PublicFooter />
    </div>
  );
}
