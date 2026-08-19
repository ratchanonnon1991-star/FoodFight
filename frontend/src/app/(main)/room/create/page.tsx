import type { Metadata } from "next";
import { CreateRoomForm } from "@/features/room/components/CreateRoomForm";

export const metadata: Metadata = {
  title: "Create Room | FoodFighter",
  description: "Set up a FoodFighter room for your group.",
};

export default function CreateRoomPage() {
  return <CreateRoomForm />;
}
