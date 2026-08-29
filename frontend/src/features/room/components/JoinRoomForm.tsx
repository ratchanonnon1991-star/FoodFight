"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/config/routes";
import { roomCodeSchema } from "../schemas/room-schema";
import { roomService, RoomApiError } from "../services/room-service";
import { useLanguage } from "@/i18n/LanguageProvider";
import { roomTranslations } from "../i18n/room-translations";
import { RoomPageHeader } from "./RoomPageHeader";

export function JoinRoomForm() {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = roomTranslations[locale].join;
  const [roomCode, setRoomCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalizedCode = roomCode.trim().toUpperCase();
    const parsed = roomCodeSchema.safeParse(normalizedCode);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t.invalidCode);
      return;
    }

    setIsSubmitting(true);

    try {
      await roomService.findRoomByCode(normalizedCode);
      router.push(`${ROUTES.ROOM.PREVIEW}?code=${encodeURIComponent(normalizedCode)}&from=code`);
    } catch (requestError) {
      setError(
        requestError instanceof RoomApiError
          ? requestError.message
          : t.genericError,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh overflow-x-clip bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-xl lg:max-w-2xl">
        <RoomPageHeader title={t.title} subtitle={t.subtitle} backHref={ROUTES.AUTHENTICATED_HOME} />

        <Card variant="outline" className="rounded-2xl p-5 sm:p-6 md:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface-subtle text-text-primary">
              <KeyRound className="size-7" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold">{t.cardTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t.cardDesc}</p>
          </div>

          {error ? (
            <Alert variant="error" className="mb-5">
              <AlertTitle>{t.errorTitle}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <form onSubmit={submit} className="space-y-5" noValidate>
            <label htmlFor="room-code" className="sr-only">{t.cardTitle}</label>
            <Input
              id="room-code"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6).toUpperCase())}
              placeholder={t.inputPlaceholder}
              autoComplete="off"
              autoCapitalize="characters"
              maxLength={6}
              className="h-16 rounded-xl text-center text-2xl font-semibold uppercase tracking-[0.4em]"
              aria-describedby="room-code-help"
              disabled={isSubmitting}
            />
            <p id="room-code-help" className="text-center text-sm text-text-secondary">{t.helpText}</p>
            <Button type="submit" fullWidth size="lg" loading={isSubmitting} loadingText={t.submitting} rightIcon={<ArrowRight className="size-5" aria-hidden="true" />}>
              {t.submit}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
