import type { Metadata } from "next";
import { ROUTES } from "@/config/routes";
import { RoomPreviewScreen } from "@/features/room/components/RoomPreviewScreen";

export const metadata: Metadata = {
  title: "Room Preview | FoodFighter",
  description: "Review a FoodFighter room before joining.",
};

type RoomPreviewSearchParams = Promise<{
  code?: string | string[];
  invite?: string | string[];
  from?: string | string[];
}>;

function getValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RoomPreviewPage({
  searchParams,
}: {
  searchParams: RoomPreviewSearchParams;
}) {
  const params = await searchParams;
  const code = getValue(params.code);
  const inviteToken = getValue(params.invite);
  const from = getValue(params.from);

  return (
    <RoomPreviewScreen
      code={code}
      inviteToken={inviteToken}
      backHref={from === "code" ? ROUTES.ROOM.JOIN : ROUTES.AUTHENTICATED_HOME}
    />
  );
}
