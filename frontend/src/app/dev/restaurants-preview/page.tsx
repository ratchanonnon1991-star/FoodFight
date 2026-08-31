"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import {
  Check,
  Crown,
  MapPin,
  RotateCcw,
  Store,
} from "lucide-react";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LocationMap } from "@/features/room/components/LocationMap";
import {
  RestaurantLoadingScreen,
  TactileRestaurantCard,
} from "@/features/food-fight/components/RestaurantResults";
import { foodFightTranslations } from "@/features/food-fight/i18n/food-fight-translations";
import { cn } from "@/lib/utils/cn";
import type {
  RestaurantRecommendation,
} from "@/features/food-fight/types/food-fight-types";

// Development Guard
const isDev = process.env.NODE_ENV !== "production";

type DevPreviewState =
  | "RESTAURANTS_READY"
  | "RESTAURANT_SELECTED"
  | "RECOMMENDING_RESTAURANTS"
  | "RESTAURANTS_EMPTY";

type DevPreviewLocale = "th" | "en";

const PREVIEW_RESTAURANTS: RestaurantRecommendation[] = [
  {
    id: "rest-1",
    restaurantId: "place-1",
    rank: 1,
    name: "ร้านไก่ย่างเสือใหญ่ (สาขาอารีย์)",
    score: 4.8,
    distanceKm: 0.85,
    address: "12/4 ซอยพหลโยธิน 7 แขวงพญาไท เขตพญาไท กรุงเทพฯ",
    latitude: 13.7795,
    longitude: 100.5448,
    groupCoverage: 0.96,
    reasons: [
      "มีเมนูไก่ย่างสมุนไพรเตาถ่านสูตรพิเศษตรงกับเมนูที่กลุ่มเลือก 100%",
      "ระยะทางใกล้กลุ่มที่สุด (850 ม.) มีที่จอดรถสะดวกสบาย",
      "มีตัวเลือกอาหารสำหรับสมาชิกที่ทานเผ็ดน้อย",
    ],
    memberMenuOptions: [
      { memberName: "You (Host)", options: ["ไก่ย่างสมุนไพรครึ่งตัว", "ข้าวเหนียวดำ"] },
      { memberName: "Alex", options: ["ไก่ย่างเนื้อน่อง", "ส้มตำไทยไม่ใส่ถั่ว"] },
      { memberName: "Sam", options: ["ไก่ย่างหนังกรอบ", "ต้มแซ่บหมูสมุนไพร"] },
    ],
    openNow: true,
    phone: "02-278-5544",
    openingHours: "10:30 - 21:00",
    finalMenuMatch: true,
    imageUrl: "/images/home/home-current-foodfight.webp",
  },
  {
    id: "rest-2",
    restaurantId: "place-2",
    rank: 2,
    name: "ส้มตำนัว & ไก่ย่างเขาสวนกวาง",
    score: 4.6,
    distanceKm: 1.4,
    address: "392/14 ซอยสยามสแควร์ 5 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ",
    latitude: 13.7452,
    longitude: 100.5312,
    groupCoverage: 0.91,
    reasons: [
      "ไก่ย่างหมักสมุนไพรต้นตำรับเขาสวนกวาง เนื้อนุ่มฉ่ำ",
      "บรรยากาศห้องแอร์ รองรับกลุ่มเพื่อนได้สะดวก",
    ],
    memberMenuOptions: [
      { memberName: "ทุกคนในกลุ่ม", options: ["ชุดไก่ย่างเขาสวนกวาง + ข้าวเหนียวกระติ๊บ", "ลาบหมูคั่วสมุนไพร"] },
    ],
    openNow: true,
    phone: "02-658-4567",
    openingHours: "11:00 - 21:30",
    finalMenuMatch: true,
    imageUrl: "/images/home/home-current-foodfight.webp",
  },
  {
    id: "rest-3",
    restaurantId: "place-3",
    rank: 3,
    name: "ครัวป้าณี ไก่ย่างโคราช",
    score: 4.4,
    distanceKm: 2.2,
    address: "88/1 ถนนประดิพัทธ์ แขวงพญาไท เขตพญาไท กรุงเทพฯ",
    latitude: 13.7912,
    longitude: 100.5389,
    groupCoverage: 0.85,
    reasons: [
      "ไก่ย่างสูตรเด็ดรสเข้มข้น ราคาประหยัด",
      "ร้านเปิดตลอดวัน มีบริการเดลิเวอรี",
    ],
    memberMenuOptions: [
      { memberName: "ทุกคนในกลุ่ม", options: ["ไก่ย่างสมุนไพรทรงเครื่อง", "น้ำจิ้มแจ่วรสเด็ด"] },
    ],
    openNow: false,
    phone: "081-998-1122",
    openingHours: "09:00 - 18:00 (ปิดแล้ว)",
    finalMenuMatch: true,
    imageUrl: null, // Tests missing image fallback!
  },
];

const PREVIEW_STATES_CONFIG: Array<{
  id: DevPreviewState;
  label: string;
  desc: string;
}> = [
  {
    id: "RESTAURANTS_READY",
    label: "A. Restaurants Ready",
    desc: "Exercising Production RestaurantResults • Map + 3 Tactile Cards • Calibrated Density",
  },
  {
    id: "RESTAURANT_SELECTED",
    label: "B. Restaurant Selected",
    desc: "Exercising Production RestaurantResults • Restaurant #1 Selected • Herb Rim & Glow",
  },
  {
    id: "RECOMMENDING_RESTAURANTS",
    label: "C. Finding Restaurants",
    desc: "Exercising Production RestaurantLoadingScreen • Active Progress Stages • Restrained Motion",
  },
  {
    id: "RESTAURANTS_EMPTY",
    label: "D. No Results (Empty)",
    desc: "Exercising Production Empty State • Balanced Vertical Center • Host Retry Action",
  },
];

export default function RestaurantsDevPreviewPage() {
  if (!isDev) {
    notFound();
  }

  const [previewState, setPreviewState] =
    React.useState<DevPreviewState>("RESTAURANTS_READY");
  const [locale, setLocale] = React.useState<DevPreviewLocale>("th");
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState<
    string | null
  >("rest-1");

  const isTh = locale === "th";
  const t = foodFightTranslations[locale].restaurants;

  const handleSelectState = (stateId: DevPreviewState) => {
    setPreviewState(stateId);
    if (stateId === "RESTAURANT_SELECTED") {
      setSelectedRestaurantId("rest-1");
    } else if (stateId === "RESTAURANTS_READY") {
      setSelectedRestaurantId(null);
    }
  };

  const effectiveSelectedId =
    previewState === "RESTAURANT_SELECTED"
      ? "rest-1"
      : selectedRestaurantId;

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. DEV PREVIEW CONTROL BAR (Technical Overlay, Clearly Distinct) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950 px-3 py-2.5 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          {/* Badge & Mode */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase text-black">
              DEV QA HARNESS
            </span>
            <span className="hidden font-bold text-slate-200 sm:inline">
              Production Restaurant Selection Port
            </span>
          </div>

          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {PREVIEW_STATES_CONFIG.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectState(option.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-bold transition-all",
                  previewState === option.id
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Controls: Locale toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(isTh ? "en" : "th")}
              className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[11px] font-bold text-slate-200 hover:bg-slate-700"
              title="Toggle Locale"
            >
              Lang: {locale.toUpperCase()}
            </button>
          </div>
        </div>

        {/* State description subtitle */}
        <div className="mx-auto mt-1.5 flex max-w-6xl items-center justify-between border-t border-slate-800/80 pt-1 text-[11px] text-slate-400">
          <div>
            <span className="font-semibold text-amber-300">Exercising: </span>
            {PREVIEW_STATES_CONFIG.find((s) => s.id === previewState)?.desc}
          </div>
          <span className="hidden font-mono text-[10px] text-slate-500 md:inline">
            Zero Network Mutation • Local Production UI QA
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC HERO & SINGLE CLEAN HEADER (White on Atmosphere) */}
      {/* ========================================================================= */}
      <div className="relative min-h-[calc(100dvh-5rem)] flex flex-col">
        {/* Warm Atmosphere Hero Background Layer */}
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

        <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-6 md:max-w-3xl lg:max-w-4xl flex-1 flex flex-col">
          {/* Singular Hero Header with High-Contrast White Text */}
          <div className="mb-5 text-center sm:mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-bold text-white shadow-2xs backdrop-blur-md">
              <Crown className="size-3.5 text-amber-300" aria-hidden="true" />
              <span>
                {isTh
                  ? "เมนูที่กลุ่มเลือก: ไก่ย่างสมุนไพรข้าวเหนียว"
                  : "Winning Dish: Grilled Herb Chicken"}
              </span>
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
              {previewState === "RECOMMENDING_RESTAURANTS"
                ? t.findingHeroTitle
                : previewState === "RESTAURANTS_EMPTY"
                  ? t.noRestaurantsFound
                  : t.title}
            </h1>

            <p className="mx-auto mt-1 max-w-sm text-xs font-medium leading-relaxed text-white/85 sm:text-sm md:max-w-md">
              {previewState === "RECOMMENDING_RESTAURANTS"
                ? t.findingHeroSubtitle
                : previewState === "RESTAURANTS_EMPTY"
                  ? t.noRestaurantsDesc
                  : t.subtitle}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3. SOLID TACTILE CONTENT CANVAS (Exercising Production Components) */}
          {/* ========================================================================= */}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE A & B: RESTAURANTS READY / RESTAURANT SELECTED */}
          {/* ------------------------------------------------------------------------- */}
          {(previewState === "RESTAURANTS_READY" ||
            previewState === "RESTAURANT_SELECTED") && (
            <div className="space-y-4 sm:space-y-6">
              {/* Interactive Map Surface */}
              <div className="overflow-hidden rounded-3xl border-2 border-border/80 bg-surface shadow-md">
                <div className="flex items-center justify-between border-b border-border/60 bg-surface-subtle/80 px-4 py-2.5 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-text-primary">
                    <MapPin className="size-4 text-brand-primary" />
                    <span>{t.mapLocationTitle}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-text-secondary">
                    {t.spotsNearby(PREVIEW_RESTAURANTS.length)}
                  </span>
                </div>

                <div className="h-52 sm:h-64 w-full">
                  <LocationMap
                    latitude={null}
                    longitude={null}
                    onPositionChange={() => undefined}
                    onError={() => undefined}
                    markers={PREVIEW_RESTAURANTS.map((r) => ({
                      id: r.id,
                      latitude: r.latitude,
                      longitude: r.longitude,
                      label: `#${r.rank} ${r.name}`,
                    }))}
                    selectedMarkerId={effectiveSelectedId}
                    onMarkerSelect={setSelectedRestaurantId}
                    readOnly
                  />
                </div>
              </div>

              {/* Restaurant Cards List (Using Production TactileRestaurantCard) */}
              <div className="space-y-3 sm:space-y-3.5">
                {PREVIEW_RESTAURANTS.map((restaurant) => (
                  <TactileRestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isSelected={restaurant.id === effectiveSelectedId}
                    onSelect={() => setSelectedRestaurantId(restaurant.id)}
                    isTh={isTh}
                  />
                ))}
              </div>

              {/* Confirm Destination Primary CTA */}
              <div className="mx-auto max-w-md pt-2 text-center">
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2",
                    effectiveSelectedId
                      ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99] cursor-pointer"
                      : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                  )}
                  disabled={!effectiveSelectedId}
                  onClick={() => {
                    const chosen = PREVIEW_RESTAURANTS.find(
                      (r) => r.id === effectiveSelectedId,
                    );
                    alert(
                      isTh
                        ? `เลือกร้าน "${chosen?.name}" สำเร็จ!`
                        : `Selected "${chosen?.name}"!`,
                    );
                  }}
                >
                  <Check className="size-5 stroke-[3]" />
                  <span>{t.confirmSelection}</span>
                </Button>
                <p className="mt-2 text-xs text-text-secondary">
                  {t.confirmHelper}
                </p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE C: RECOMMENDING RESTAURANTS (Production RestaurantLoadingScreen) */}
          {/* ------------------------------------------------------------------------- */}
          {previewState === "RECOMMENDING_RESTAURANTS" && (
            <RestaurantLoadingScreen />
          )}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE D: RESTAURANTS EMPTY (Production Empty State Visual) */}
          {/* ------------------------------------------------------------------------- */}
          {previewState === "RESTAURANTS_EMPTY" && (
            <div className="mx-auto max-w-lg my-auto py-6 sm:py-8">
              <Card
                variant="outline"
                className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 text-center space-y-6"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 shadow-2xs">
                  <Store className="size-8 stroke-[2]" aria-hidden="true" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                    {t.noRestaurantsFound}
                  </h2>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
                    {t.noRestaurantsDesc}
                  </p>
                </div>

                {/* Host Retry CTA */}
                <div className="space-y-2 pt-2">
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    onClick={() => handleSelectState("RESTAURANTS_READY")}
                  >
                    <RotateCcw className="size-5 stroke-[2.5]" />
                    <span>{t.hostRetrySearch}</span>
                  </Button>
                  <p className="text-center text-xs font-semibold text-text-muted">
                    {t.hostOnlyRetryHint}
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
