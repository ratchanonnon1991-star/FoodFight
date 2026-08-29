import { AdminUserDetailPage } from "@/features/admin/components/AdminUserDetailPage";

export default async function AdminUserDetailRoute({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return <AdminUserDetailPage userId={userId} />;
}
