import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import { RestaurantResults } from "@/features/food-fight/components/RestaurantResults";
import { RoomPageHeader } from "@/features/room/components/RoomPageHeader";

export const metadata: Metadata = {
  title: "Nearby Restaurants | FoodFighter",
  description: "Find restaurants near your FoodFighter room.",
};

export default async function RestaurantsPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return (
    <main className="min-h-dvh bg-transparent text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-2 sm:px-6 sm:pt-4 md:max-w-3xl">

        <RoomPageHeader
          title="ร้านอาหารแนะนำ"
          subtitle="ร้านที่เข้ากับเมนูและความต้องการของกลุ่ม"
          backHref={ROUTES.ROOM.RECOMMENDATIONS(roomId)}
        />
        <RestaurantResults roomId={roomId} />
      </div>
    </main>
  );
}
