import type { Metadata } from "next";
import { JoinRoomForm } from "@/features/room/components/JoinRoomForm";

export const metadata: Metadata = {
  title: "Join Room | FoodFighter",
  description: "Join a FoodFighter room with a room code.",
};

export default function JoinRoomPage() {
  return <JoinRoomForm />;
}
