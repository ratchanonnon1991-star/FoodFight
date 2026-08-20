"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, QrCode, ShieldCheck, UploadCloud } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { BillPageHeader } from "./BillPageHeader";
import { paymentAccountService } from "../services/payment-account-service";
import type { PaymentAccount } from "../types/bill-types";

const MAX_QR_FILE_SIZE = 5 * 1024 * 1024;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

export function PaymentAccountScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  const [account, setAccount] = React.useState<PaymentAccount | null | undefined>(
    undefined,
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const [accountName, setAccountName] = React.useState("");
  const [promptPayNumber, setPromptPayNumber] = React.useState("");
  const [qrCodeUrl, setQrCodeUrl] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
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
      setPromptPayNumber(account.promptPayNumber);
      setQrCodeUrl(account.qrCodeUrl ?? "");
    }
  }, [account]);

  const handleQrChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setError(null);

    if (!(["image/png", "image/jpeg", "image/jpg"] as string[]).includes(file.type)) {
      setError("Please upload a PNG or JPG image.");
      return;
    }

    if (file.size > MAX_QR_FILE_SIZE) {
      setError("QR image must be 5 MB or smaller.");
      return;
    }

    try {
      setQrCodeUrl(await readFileAsDataUrl(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to read the QR image.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const saved = await paymentAccountService.upsert({
        accountName: accountName.trim(),
        promptPayNumber: promptPayNumber.trim(),
        qrCodeUrl: qrCodeUrl || null,
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
                  Add your PromptPay account and QR so friends can pay you back
                  easily.
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
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="promptPayNumber">PromptPay Number</Label>
                  <Input
                    id="promptPayNumber"
                    value={promptPayNumber}
                    onChange={(e) => setPromptPayNumber(e.target.value)}
                    placeholder="081-234-5678"
                    maxLength={30}
                    inputMode="tel"
                    required
                  />
                  <p className="text-xs text-text-muted">
                    Your PromptPay mobile number or 13-digit citizen ID.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Payment QR</Label>
                  <input
                    ref={qrInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleQrChange}
                  />
                  <button
                    type="button"
                    onClick={() => qrInputRef.current?.click()}
                    className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface-subtle p-4 text-center transition-colors hover:border-brand-secondary hover:bg-brand-secondary/5"
                  >
                    {qrCodeUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrCodeUrl}
                        alt="Payment QR preview"
                        className="max-h-32 rounded-xl object-contain"
                      />
                    ) : (
                      <span className="space-y-2">
                        <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-status-success-bg text-status-success-icon">
                          <UploadCloud className="size-5" />
                        </span>
                        <span className="block text-sm font-semibold text-text-primary">
                          Upload QR Code
                        </span>
                        <span className="block text-xs text-text-secondary">
                          PNG, JPG (max. 5MB)
                        </span>
                      </span>
                    )}
                  </button>
                  {qrCodeUrl && (
                    <button
                      type="button"
                      onClick={() => setQrCodeUrl("")}
                      className="text-xs font-medium text-status-danger-text hover:underline"
                    >
                      Remove QR image
                    </button>
                  )}
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
                  <div className="flex items-center gap-4">
                    {account.qrCodeUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={account.qrCodeUrl}
                        alt="PromptPay QR"
                        className="size-20 shrink-0 rounded-md border border-border object-contain"
                      />
                    )}
                    <div>
                      <p className="text-base font-medium text-text-primary">
                        {account.accountName}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {account.promptPayNumber}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card variant="subtle" padding="md" className="flex items-start gap-2">
                  <ShieldCheck className="size-4 text-text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary">
                    Your payment info is only shared for this bill and is never
                    public.
                  </p>
                </Card>

                <Card variant="subtle" padding="md" className="flex items-start gap-2">
                  <QrCode className="size-4 text-text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary">
                    Members scan this QR from your bill detail screen to pay
                    you back.
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
