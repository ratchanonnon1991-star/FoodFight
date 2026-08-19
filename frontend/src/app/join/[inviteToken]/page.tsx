import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import { RoomPreviewScreen } from "@/features/room/components/RoomPreviewScreen";

export const metadata: Metadata = {
  title: "Join FoodFighter Room | FoodFighter",
  description: "Review a FoodFighter room invitation.",
};

export default async function InviteRoomPage({
  params,
}: {
  params: Promise<{ inviteToken: string }>;
}) {
  const { inviteToken } = await params;

  return <RoomPreviewScreen inviteToken={inviteToken} backHref={ROUTES.HOME} />;
}
