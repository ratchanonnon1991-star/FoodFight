"use client";

import * as React from "react";
import { ChevronDown, Clock3, Info, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CookingAnimation } from "@/features/food-fight/components/CookingAnimation";
import { foodFightService, FoodFightApiError } from "@/features/food-fight/services/food-fight-service";
import { LocationMap } from "@/features/room/components/LocationMap";
import type { FoodFightState, RestaurantRecommendation } from "@/features/food-fight/types/food-fight-types";

interface RestaurantResultsProps {
  roomId: string;
  state?: FoodFightState;
}

export function RestaurantResults({ roomId, state: providedState }: RestaurantResultsProps) {
  const [loadedState, setLoadedState] = React.useState<FoodFightState | null>(null);
  const [retryState, setRetryState] = React.useState<FoodFightState | null>(null);
  const [isLoadingState, setIsLoadingState] = React.useState(!providedState);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState<string | null>(null);

  const loadState = React.useCallback(async (showLoading = true) => {
    if (showLoading) setIsLoadingState(true);
    setError(null);
    try {
      setLoadedState(await foodFightService.getFoodFightState(roomId));
    } catch (requestError) {
      setError(requestError instanceof FoodFightApiError ? requestError.message : "ไม่สามารถโหลดร้านอาหารได้");
    } finally {
      if (showLoading) setIsLoadingState(false);
    }
  }, [roomId]);

  React.useEffect(() => {
    if (providedState) return;
    const loadTimer = window.setTimeout(() => void loadState(), 0);
    return () => window.clearTimeout(loadTimer);
  }, [loadState, providedState]);

  const retryRestaurantSearch = async () => {
    setIsRetrying(true);
    setError(null);
    try {
      setRetryState(await foodFightService.startRestaurantRecommendations(roomId));
    } catch (requestError) {
      setError(requestError instanceof FoodFightApiError ? requestError.message : "ไม่สามารถค้นหาร้านอาหารได้");
    } finally {
      setIsRetrying(false);
    }
  };

  const state = retryState ?? providedState ?? loadedState;
  const isLoading = providedState ? false : isLoadingState;

  React.useEffect(() => {
    const restaurantState = state?.restaurantState;
    const foodFightState = state?.state;
    if (
      providedState ||
      restaurantState == null ||
      restaurantState === "RESTAURANTS_EMPTY" ||
      restaurantState === "RESTAURANTS_READY" ||
      foodFightState === "RESTAURANTS_READY"
    ) return;
    const pollId = window.setInterval(() => void loadState(false), 2000);
    return () => window.clearInterval(pollId);
  }, [loadState, providedState, state?.restaurantState, state?.state]);

  const effectiveSelectedRestaurantId = state?.restaurants.some(
    (restaurant) => restaurant.id === selectedRestaurantId,
  )
    ? selectedRestaurantId
    : state?.restaurants[0]?.id ?? null;

  if (isLoading && !state) return <RestaurantLoadingScreen />;
  if (error && !state) {
    return (
      <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm">
        <Info className="mx-auto size-10 text-status-danger-text" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold">โหลดร้านอาหารไม่สำเร็จ</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{error}</p>
        <Button className="mt-5" variant="outline" onClick={() => void loadState()}>ลองใหม่</Button>
      </Card>
    );
  }
  if (
    !state ||
    state.restaurantState === "RECOMMENDING_RESTAURANTS" ||
    state.state === "RECOMMENDING_RESTAURANTS"
  ) return <RestaurantLoadingScreen />;
  if (
    state.restaurantState !== "RESTAURANTS_EMPTY" &&
    state.restaurantState !== "RESTAURANTS_READY" &&
    state.state !== "RESTAURANTS_READY"
  ) {
    return (
      <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm">
        <Clock3 className="mx-auto size-10 text-text-secondary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold">รอ Host เริ่มค้นหาร้านอาหาร</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">เมนูสุดท้ายพร้อมแล้ว ระบบจะแสดงร้านอาหารเมื่อ Host เริ่มค้นหา</p>
      </Card>
    );
  }

  const restaurants = state.restaurants;
  const mappedRestaurants = restaurants.filter(
    (restaurant) =>
      typeof restaurant.latitude === "number" &&
      Number.isFinite(restaurant.latitude) &&
      typeof restaurant.longitude === "number" &&
      Number.isFinite(restaurant.longitude),
  );
  return (
    <section aria-labelledby="restaurant-results-title">
      <div className="mb-5">
        <p className="text-sm font-medium text-brand-primary">{state.restaurantState === "RESTAURANTS_EMPTY" ? "ค้นหาร้านอาหารอีกครั้งได้" : "Restaurants Ready"}</p>
        <h2 id="restaurant-results-title" className="mt-1 text-2xl font-semibold tracking-tight">{state.restaurantState === "RESTAURANTS_EMPTY" ? "ยังไม่พบร้านอาหารที่ใช้ได้" : "ร้านอาหารที่เหมาะกับกลุ่ม"}</h2>
        <p className="mt-2 text-sm leading-6 text-text-secondary">{state.restaurantState === "RESTAURANTS_EMPTY" ? "ผู้ให้บริการยังไม่ส่งร้านที่ใช้งานได้กลับมา ลองค้นหาอีกครั้งได้" : "รายการร้านและเหตุผลด้านล่างมาจากผลลัพธ์ที่ Backend บันทึกไว้"}</p>
      </div>
      {state.finalSelection ? (
        <Card variant="subtle" className="mb-4 rounded-2xl p-4">
          <p className="text-xs font-medium text-text-secondary">เมนูที่กลุ่มเลือกแล้ว</p>
          <p className="mt-1 font-semibold">{state.finalSelection.nameTh ?? state.finalSelection.name}</p>
        </Card>
      ) : null}
      {mappedRestaurants.length ? (
        <LocationMap
          latitude={null}
          longitude={null}
          onPositionChange={() => undefined}
          onError={setError}
          markers={mappedRestaurants.map((restaurant) => ({ id: restaurant.id, latitude: restaurant.latitude, longitude: restaurant.longitude, label: restaurant.name }))}
          selectedMarkerId={effectiveSelectedRestaurantId}
          onMarkerSelect={setSelectedRestaurantId}
          readOnly
        />
      ) : (
        <Card variant="subtle" className="rounded-2xl p-4 text-sm text-text-secondary">
          ร้านที่แนะนำยังไม่มีพิกัดสำหรับแสดงบนแผนที่
        </Card>
      )}
      {error ? <div className="mt-3 rounded-xl border border-status-danger-border bg-status-danger-bg px-3 py-2 text-sm text-status-danger-text">{error}</div> : null}
      {!restaurants.length ? (
        <Card variant="outline" className="mt-4 rounded-2xl p-6 text-center">
          <p className="font-semibold">ยังไม่พบร้านอาหาร</p>
          <p className="mt-2 text-sm text-text-secondary">ยังไม่มีรายการร้านอาหารจาก Backend</p>
          {state.currentUser.isHost ? <Button className="mt-5" variant="outline" onClick={() => void retryRestaurantSearch()} loading={isRetrying} loadingText="กำลังค้นหา...">ค้นหาอีกครั้ง</Button> : null}
        </Card>
      ) : (
        <div className="mt-5 grid gap-3">
          {restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} selected={restaurant.id === effectiveSelectedRestaurantId} onSelect={() => setSelectedRestaurantId(restaurant.id)} />)}
        </div>
      )}
    </section>
  );
}

export function RestaurantLoadingScreen() {
  return (
    <Card variant="outline" className="rounded-3xl p-8 text-center shadow-sm">
      <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary"><CookingAnimation size="sm" /></div>
      <div className="mt-5 flex justify-center gap-2 text-text-muted" aria-hidden="true"><span className="size-2 rounded-full bg-text-muted" /><span className="size-2 rounded-full bg-text-muted opacity-70" /><span className="size-2 rounded-full bg-text-muted opacity-40" /></div>
      <h2 className="mt-6 text-xl font-semibold">กำลังค้นหาร้านที่เหมาะกับทุกคน...</h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">กำลังตรวจเมนู ระยะทาง และข้อจำกัดของสมาชิก</p>
      <Button className="mt-7 w-full" variant="outline" loading loadingText="กำลังค้นหา...">กำลังค้นหา...</Button>
    </Card>
  );
}

function RestaurantCard({ restaurant, selected, onSelect }: { restaurant: RestaurantRecommendation; selected: boolean; onSelect: () => void }) {
  return (
    <Card variant="outline" className={`rounded-2xl p-4 shadow-sm transition-colors ${selected ? "border-brand-primary bg-brand-primary/5" : ""}`}>
      {!restaurant.finalMenuMatch ? <p className="mb-3 rounded-xl bg-surface-subtle p-3 text-sm leading-5 text-text-secondary">ร้านนี้ค้นพบจากเมนูที่เลือก แต่รายละเอียดเมนูสำหรับสมาชิกยังไม่ได้รับการยืนยัน</p> : null}
      <button type="button" aria-pressed={selected} onClick={onSelect} className="flex w-full items-start gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-sm font-semibold text-text-secondary">{restaurant.rank == null ? <MapPin className="size-5" aria-hidden="true" /> : `#${restaurant.rank}`}</span>
        <span className="min-w-0 flex-1"><span className="block text-lg font-semibold">{restaurant.name}</span><span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-secondary">{restaurant.distanceKm != null ? <span className="inline-flex items-center gap-1"><MapPin className="size-4" aria-hidden="true" />{formatNumber(restaurant.distanceKm)} กม.</span> : null}{restaurant.openNow != null ? <span>{restaurant.openNow ? "เปิดอยู่" : "ปิดอยู่"}</span> : null}</span></span>
        <ChevronDown className={`mt-1 size-5 shrink-0 text-text-muted transition-transform ${selected ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-text-secondary">
        {restaurant.score != null ? <div className="rounded-xl bg-surface-subtle p-3"><span className="flex items-center gap-1 font-medium text-text-primary"><Star className="size-3.5" aria-hidden="true" /> คะแนน</span><span className="mt-1 block">{formatNumber(restaurant.score)}</span></div> : null}
        {restaurant.groupCoverage != null ? <div className="rounded-xl bg-surface-subtle p-3"><span className="block font-medium text-text-primary">ความเข้ากันกับกลุ่ม</span><span className="mt-1 block">{formatCoverage(restaurant.groupCoverage)}</span></div> : null}
      </div>
      <div className="mt-4"><h4 className="text-sm font-semibold">ทำไมร้านนี้เหมาะกับกลุ่ม</h4>{restaurant.reasons.length ? <ul className="mt-2 space-y-1 text-sm leading-5 text-text-secondary">{restaurant.reasons.map((reason, index) => <li key={`${restaurant.id}-reason-${index}`} className="flex gap-2"><span aria-hidden="true">•</span><span>{reason}</span></li>)}</ul> : <p className="mt-2 text-sm text-text-secondary">Backend ไม่ได้ส่งเหตุผลของร้านนี้</p>}</div>
      <div className="mt-4 border-t border-border-subtle pt-4"><h4 className="text-sm font-semibold">{restaurant.finalMenuMatch ? "เมนูที่ตรวจสอบแล้วสำหรับสมาชิก" : "ข้อมูลเมนูสำหรับสมาชิก"}</h4>{restaurant.memberMenuOptions.length ? <details className="mt-2"><summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-brand-primary">ดูตัวเลือกเมนูจาก Backend ({restaurant.memberMenuOptions.length})</summary><div className="mt-3 space-y-2">{restaurant.memberMenuOptions.map((option, index) => <MemberMenuOption key={`${restaurant.id}-menu-${index}`} option={option} />)}</div></details> : <p className="mt-2 text-sm text-text-secondary">ร้านนี้ไม่มีข้อมูลเมนูสมาชิกที่ตรวจสอบแล้ว</p>}</div>
      {restaurant.address ? <p className="mt-4 flex items-start gap-2 text-sm leading-5 text-text-secondary"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><span>{restaurant.address}</span></p> : null}
    </Card>
  );
}

function MemberMenuOption({ option }: { option: unknown }) {
  if (isRecord(option) && typeof option.memberId === "string" && Array.isArray(option.options)) {
    return <div className="rounded-xl bg-surface-subtle p-3 text-sm"><p className="font-medium">สมาชิก {option.memberId}</p><ul className="mt-1 space-y-1 text-text-secondary">{option.options.map((menuOption, index) => <li key={index}>• {formatValue(menuOption)}</li>)}</ul></div>;
  }
  return <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-surface-subtle p-3 text-xs leading-5 text-text-secondary">{formatValue(option, true)}</pre>;
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
function formatValue(value: unknown, pretty = false): string { if (typeof value === "string") return value; if (typeof value === "number" || typeof value === "boolean") return String(value); try { return JSON.stringify(value, null, pretty ? 2 : undefined) ?? "ไม่ระบุ"; } catch { return "ไม่สามารถแสดงข้อมูลได้"; } }
function formatNumber(value: number) { return new Intl.NumberFormat("th-TH", { maximumFractionDigits: 2 }).format(value); }
function formatCoverage(value: number) { return value >= 0 && value <= 1 ? `${Math.round(value * 100)}%` : formatNumber(value); }
