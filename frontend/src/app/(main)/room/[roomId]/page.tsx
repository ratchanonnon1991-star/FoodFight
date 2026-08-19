import type { Metadata } from "next";
import { RoomLobbyScreen } from "@/features/room/components/RoomLobbyScreen";

export const metadata: Metadata = {
  title: "Room Lobby | FoodFighter",
  description: "Invite friends and prepare your FoodFighter room.",
};

export default async function RoomLobbyPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return <RoomLobbyScreen roomId={roomId} />;
}
