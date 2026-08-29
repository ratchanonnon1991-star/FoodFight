"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, ImageUp, ShieldCheck } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useLanguage } from "@/i18n/LanguageProvider";
import { paymentAccountTranslations } from "../i18n/payment-account-translations";
import {
  getMyPaymentAccount,
  saveMyPaymentAccount,
} from "../services/payment-account-service";

const MAX_QR_FILE_SIZE = 5 * 1024 * 1024;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

export function PaymentAccountPageContent() {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = paymentAccountTranslations[locale];
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [paymentType, setPaymentType] = React.useState<"PROMPTPAY">("PROMPTPAY");
  const [accountName, setAccountName] = React.useState("");
  const [promptPayNumber, setPromptPayNumber] = React.useState("");
  const [qrCodeUrl, setQrCodeUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const token = window.localStorage.getItem("accessToken");

    if (!token) {
      router.replace(ROUTES.AUTH.LOGIN);
      return () => {
        isMounted = false;
      };
    }

    getMyPaymentAccount(token)
      .then((currentAccount) => {
        if (!isMounted || !currentAccount) {
          return;
        }

        setPaymentType(currentAccount.paymentType);
        setAccountName(currentAccount.accountName);
        setPromptPayNumber(currentAccount.promptPayNumber);
        setQrCodeUrl(currentAccount.qrCodeUrl ?? "");
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : t.errorDefault,
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router, t.errorDefault]);

  const handleQrChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setErrorMessage(null);

    if (!(["image/png", "image/jpeg", "image/jpg"] as string[]).includes(file.type)) {
      setErrorMessage("Please upload a PNG or JPG image.");
      return;
    }

    if (file.size > MAX_QR_FILE_SIZE) {
      setErrorMessage("QR image must be 5 MB or smaller.");
      return;
    }

    try {
      setQrCodeUrl(await readFileAsDataUrl(file));
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to read the QR image.",
      );
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = window.localStorage.getItem("accessToken");
    const nextAccountName = accountName.trim();
    const nextPromptPayNumber = promptPayNumber.trim();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!token) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    if (!nextAccountName || !nextPromptPayNumber) {
      setErrorMessage("Please enter the account name and PromptPay number.");
      return;
    }

    setIsSaving(true);

    try {
      await saveMyPaymentAccount(token, {
        paymentType,
        accountName: nextAccountName,
        promptPayNumber: nextPromptPayNumber,
        qrCodeUrl: qrCodeUrl || null,
      });

      setSuccessMessage(t.successSaved);
      router.push(ROUTES.AUTHENTICATED_HOME);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : t.errorDefault,
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-background">
        <PageContainer maxWidth="auth" className="py-10">
          <p className="text-sm text-text-secondary">Loading payment account...</p>
        </PageContainer>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer maxWidth="auth" className="space-y-5 py-5 pb-28 sm:py-8">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.AUTHENTICATED_HOME}
            aria-label={t.back}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
              {t.title}
            </p>
            <h1 className="text-2xl font-bold text-text-primary">{t.title}</h1>
          </div>
        </div>

        {errorMessage ? (
          <Alert variant="error">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        {successMessage ? (
          <Alert variant="success">
            <Check className="size-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        ) : null}

        <div className="rounded-3xl border border-border/80 bg-surface p-5 shadow-xs sm:p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-3xl bg-status-success-bg text-status-success-icon">
              <ShieldCheck className="size-10" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <div className="relative">
                <select
                  id="payment-type"
                  value={paymentType}
                  onChange={() => setPaymentType("PROMPTPAY")}
                  className="h-12 w-full appearance-none rounded-md border border-border bg-surface px-3 pr-10 text-base text-text-primary focus-visible:outline-2 focus-visible:outline-brand-secondary"
                >
                  <option value="PROMPTPAY">PromptPay</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-text-secondary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-account-name">{t.accountName}</Label>
              <Input
                id="payment-account-name"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                placeholder={t.accountNamePlaceholder}
                maxLength={100}
                required
              />
              <p className="text-xs text-text-muted">{t.accountNameHelp}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promptpay-number">{t.promptPayNumber}</Label>
              <Input
                id="promptpay-number"
                value={promptPayNumber}
                onChange={(event) => setPromptPayNumber(event.target.value)}
                placeholder={t.promptPayPlaceholder}
                maxLength={30}
                inputMode="tel"
                required
              />
              <p className="text-xs text-text-muted">{t.promptPayHelp}</p>
            </div>

            <div className="space-y-2">
              <Label>{t.qrCode}</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleQrChange}
                className="sr-only"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-28 w-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface-subtle p-4 text-center transition-colors hover:border-brand-secondary hover:bg-brand-secondary/5"
              >
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Payment QR preview"
                    className="max-h-32 rounded-xl object-contain"
                  />
                ) : (
                  <span className="space-y-2">
                    <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-status-success-bg text-status-success-icon">
                      <ImageUp className="size-5" />
                    </span>
                    <span className="block text-sm font-semibold text-text-primary">{t.uploadQr}</span>
                    <span className="block text-xs text-text-secondary">{t.qrCodeHelp}</span>
                  </span>
                )}
              </button>
              {qrCodeUrl ? (
                <button
                  type="button"
                  onClick={() => setQrCodeUrl("")}
                  className="text-xs font-medium text-status-danger-text hover:underline"
                >
                  Remove QR image
                </button>
              ) : null}
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-status-success-bg px-3 py-3 text-xs leading-relaxed text-status-success-text">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" />
              <p>Your payment info is only shared for this bill and is never public.</p>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={isSaving} loadingText={t.saving}>
              {t.save}
            </Button>
            <Link
              href={ROUTES.AUTHENTICATED_HOME}
              className="block text-center text-sm font-semibold text-brand-primary hover:underline"
            >
              Cancel
            </Link>
          </form>
        </div>
      </PageContainer>
    </main>
  );
}
