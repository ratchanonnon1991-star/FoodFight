"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, QrCode, Trash2, UploadCloud } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError, resolveMediaUrl } from "@/lib/api/client";
import { BillPageHeader } from "./BillPageHeader";
import { paymentAccountService } from "../services/payment-account-service";
import type { PaymentAccount } from "../types/bill-types";

export function PaymentAccountScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  const [account, setAccount] = React.useState<PaymentAccount | null | undefined>(
    undefined,
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [accountName, setAccountName] = React.useState("");
  const [promptPayId, setPromptPayId] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isUploadingQr, setIsUploadingQr] = React.useState(false);
  const qrInputRef = React.useRef<HTMLInputElement>(null);

  const load = React.useCallback(async () => {
    try {
      const data = await paymentAccountService.getMine();
      setAccount(data);
      if (!data) {
        setIsEditing(true);
      }
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Unable to load payment account.",
      );
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  React.useEffect(() => {
    if (account) {
      setAccountName(account.accountName);
      setPromptPayId(account.promptPayId);
    }
  }, [account]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const saved = await paymentAccountService.upsert({
        accountName: accountName.trim(),
        promptPayId,
      });
      setAccount(saved);
      setIsEditing(false);

      if (nextUrl) {
        router.push(nextUrl);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to save account.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadQr = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setError(null);
    setIsUploadingQr(true);
    try {
      const saved = await paymentAccountService.uploadQr(file);
      setAccount(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to upload QR code.");
    } finally {
      setIsUploadingQr(false);
    }
  };

  const handleRemoveQr = async () => {
    setError(null);
    try {
      const saved = await paymentAccountService.removeQr();
      setAccount(saved);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to remove QR code.");
    }
  };

  const qrImageUrl = resolveMediaUrl(account?.qrImageUrl);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text-primary">
      <BillPageHeader title="Payment Account" backHref={ROUTES.BILLS} />

      <main className="flex-1 py-6 pb-24">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {error && (
            <Alert variant="error" onClose={() => setError(null)}>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {account === undefined ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : isEditing ? (
            <Card variant="default" padding="md" className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-text-primary">
                  Set up your PromptPay account
                </p>
                <p className="text-xs text-text-secondary">
                  Add your PromptPay account so friends can pay you back. We
                  generate a real, scannable payment QR for every bill you
                  create.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. Ploy P."
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="promptPayId">PromptPay Number</Label>
                  <Input
                    id="promptPayId"
                    value={promptPayId}
                    onChange={(e) => setPromptPayId(e.target.value)}
                    placeholder="Mobile number or citizen ID"
                    required
                  />
                  <p className="text-xs text-text-muted">
                    Your PromptPay mobile number or 13-digit citizen ID.
                  </p>
                </div>

                <div className="flex gap-2">
                  {account && (
                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" fullWidth loading={isSaving}>
                    Save & Continue
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            account && (
              <div className="space-y-4">
                <Card variant="default" padding="md" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-text-primary">
                        Payment Account
                      </p>
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      leftIcon={<Pencil className="size-3.5" />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </div>
                  <div>
                    <p className="text-base font-medium text-text-primary">
                      {account.accountName}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {account.promptPayId}
                    </p>
                  </div>
                  <p className="text-xs text-text-muted">
                    This account is used to generate the payment QR when you
                    create a bill and receive money from friends.
                  </p>
                </Card>

                <Card variant="default" padding="md" className="space-y-3">
                  <p className="text-sm font-semibold text-text-primary">
                    Reference QR (optional)
                  </p>
                  <p className="text-xs text-text-secondary">
                    A real payment QR is generated automatically for every
                    bill. You can optionally upload your own bank QR photo
                    here as a reference image.
                  </p>

                  {qrImageUrl ? (
                    <div className="space-y-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrImageUrl}
                        alt="Uploaded PromptPay QR"
                        className="w-40 h-40 object-contain rounded-md border border-border mx-auto"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          fullWidth
                          onClick={() => qrInputRef.current?.click()}
                        >
                          Replace QR
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          leftIcon={<Trash2 className="size-3.5" />}
                          onClick={handleRemoveQr}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      loading={isUploadingQr}
                      leftIcon={<UploadCloud className="size-4" />}
                      onClick={() => qrInputRef.current?.click()}
                    >
                      Upload QR Code
                    </Button>
                  )}

                  <input
                    ref={qrInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadQr}
                  />
                </Card>

                <Card variant="subtle" padding="md" className="flex items-start gap-2">
                  <QrCode className="size-4 text-text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary">
                    Members scan a QR generated fresh for each payment amount
                    from your bill detail screen - no need to share this
                    reference image with them.
                  </p>
                </Card>

                {nextUrl && (
                  <Button fullWidth size="lg" onClick={() => router.push(nextUrl)}>
                    Continue
                  </Button>
                )}
              </div>
            )
          )}
        </PageContainer>
      </main>
    </div>
  );
}
