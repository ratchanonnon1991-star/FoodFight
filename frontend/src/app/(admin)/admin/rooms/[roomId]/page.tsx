import { AdminRoomDetailPage } from "@/features/admin/components/AdminRoomDetailPage";

export default async function AdminRoomDetailRoute({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  return <AdminRoomDetailPage roomId={roomId} />;
}
