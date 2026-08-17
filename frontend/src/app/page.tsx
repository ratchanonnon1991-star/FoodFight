import { PublicHeader } from "@/components/layout/public-header";
import { HomeHero } from "@/features/home/components/home-hero";
import { PublicFooter } from "@/components/layout/public-footer";

export default function RootPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between bg-background text-text-primary">
      <PublicHeader />
      <HomeHero />
      <PublicFooter />
    </div>
  );
}
