import { AdminBillDetailPage } from "@/features/admin/components/AdminBillDetailPage";

export default async function AdminBillDetailRoute({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  return <AdminBillDetailPage billId={billId} />;
}
