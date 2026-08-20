"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CreditCard,
  ImageUp,
  Pencil,
  Utensils,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  STANDARD_ALLERGIES,
  STANDARD_RESTRICTIONS,
} from "@/features/food-profile/constants/food-profile-constants";
import {
  getMyFoodProfile,
  type FoodProfileResponse,
} from "@/features/food-profile/services/food-profile-service";
import { resolveAuthMode } from "@/features/auth/services/auth-runtime";
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  type CurrentUserProfile,
} from "../services/profile-service";

const MAX_AVATAR_FILE_SIZE = 2 * 1024 * 1024;

function getFoodOptionLabel(
  id: string,
  options: ReadonlyArray<{ id: string; label: string }>,
) {
  return options.find((option) => option.id === id)?.label ?? id;
}

function FoodTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-semibold text-text-primary">
      {children}
    </span>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

function AvatarPreview({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  React.useEffect(() => {
    setImageFailed(false);
  }, [avatarUrl]);

  if (avatarUrl && !imageFailed) {
    return (
      <img
        src={avatarUrl}
        alt={`${name || "User"}'s profile`}
        className="size-24 rounded-full border-4 border-surface object-cover shadow-md"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span className="flex size-24 items-center justify-center rounded-full border-4 border-surface bg-brand-primary text-3xl font-bold text-white shadow-md">
      {initial}
    </span>
  );
}

export function ProfilePageContent() {
  const router = useRouter();
  const avatarFileInputRef = React.useRef<HTMLInputElement>(null);
  const [profile, setProfile] = React.useState<CurrentUserProfile | null>(null);
  const [foodProfile, setFoodProfile] = React.useState<FoodProfileResponse | null>(null);
  const [displayName, setDisplayName] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFoodProfileLoading, setIsFoodProfileLoading] = React.useState(true);
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

    getCurrentUserProfile(token)
      .then((currentProfile) => {
        if (!isMounted) {
          return;
        }

        setProfile(currentProfile);
        setDisplayName(currentProfile.displayName);
        setAvatarUrl(currentProfile.avatarUrl ?? "");
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unable to load your profile.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    if (resolveAuthMode() === "api") {
      getMyFoodProfile(token)
        .then((result) => {
          if (isMounted && result.ok) {
            setFoodProfile(result.data);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsFoodProfileLoading(false);
          }
        });
    } else {
      setIsFoodProfileLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = window.localStorage.getItem("accessToken");
    const nextDisplayName = displayName.trim();
    const nextAvatarUrl = avatarUrl.trim();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!token) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    if (!nextDisplayName) {
      setErrorMessage("Please enter your name.");
      return;
    }

    setIsSaving(true);

    try {
      const updatedProfile = await updateCurrentUserProfile(token, {
        displayName: nextDisplayName,
        avatarUrl: nextAvatarUrl || null,
      });

      setProfile(updatedProfile);
      setDisplayName(updatedProfile.displayName);
      setAvatarUrl(updatedProfile.avatarUrl ?? "");
      setSuccessMessage("Profile updated successfully.");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setErrorMessage(null);

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file.");
      return;
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setErrorMessage("Profile picture must be 2 MB or smaller.");
      return;
    }

    try {
      setAvatarUrl(await readFileAsDataUrl(file));
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to read the profile picture.",
      );
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-background">
        <PageContainer maxWidth="auth" className="py-10">
          <p className="text-sm text-text-secondary">Loading profile...</p>
        </PageContainer>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background text-text-primary">
      <PageContainer maxWidth="auth" className="space-y-6 py-5 pb-28 sm:py-8">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.AUTHENTICATED_HOME}
            aria-label="Back to home"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
              Account
            </p>
            <h1 className="text-2xl font-bold text-text-primary">My profile</h1>
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

        <section className="rounded-2xl border border-border/80 bg-surface p-5 shadow-xs sm:p-6">
          <div className="mb-6 flex items-center gap-4">
            <AvatarPreview name={displayName} avatarUrl={avatarUrl} />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-text-primary">
                {displayName || "Your profile"}
              </h2>
              <p className="truncate text-sm text-text-secondary">
                {profile?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="profile-display-name">Name</Label>
              <Input
                id="profile-display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={100}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Upload from device</Label>
              <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="sr-only"
              />
              <Button
                type="button"
                variant="outline"
                fullWidth
                leftIcon={<ImageUp className="size-4" />}
                onClick={() => avatarFileInputRef.current?.click()}
              >
                Choose profile picture
              </Button>
              <p className="text-xs text-text-muted">
                JPG, PNG, or other image formats up to 2 MB.
              </p>
            </div>

            <Button type="submit" fullWidth loading={isSaving} loadingText="Saving...">
              Save profile
            </Button>
          </form>
        </section>

        <section className="rounded-2xl border border-border/80 bg-surface p-5 shadow-xs sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-brand-primary">
                <Utensils className="size-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-text-primary">Food Safety &amp; Diet Profile</h2>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  Applied automatically to all group sessions.
                </p>
              </div>
            </div>
            <Link
              href={ROUTES.FOOD_PROFILE.ALLERGIES}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/40 px-4 py-2 text-sm font-semibold text-text-primary hover:bg-brand-primary/5"
            >
              Edit
              <Pencil className="size-3.5" />
            </Link>
          </div>

          {isFoodProfileLoading ? (
            <p className="mt-6 text-sm text-text-secondary">Loading food preferences...</p>
          ) : (
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Food allergies
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foodProfile?.allergies.length || foodProfile?.otherAllergies ? (
                    <>
                      {foodProfile?.allergies.map((allergy) => (
                        <FoodTag key={allergy}>
                          {getFoodOptionLabel(allergy, STANDARD_ALLERGIES)}
                        </FoodTag>
                      ))}
                      {foodProfile?.otherAllergies ? (
                        <FoodTag>{foodProfile.otherAllergies}</FoodTag>
                      ) : null}
                    </>
                  ) : (
                    <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                      No allergies
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Dietary restrictions
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foodProfile?.restrictions.length || foodProfile?.otherRestrictions ? (
                    <>
                      {foodProfile?.restrictions.map((restriction) => (
                        <FoodTag key={restriction}>
                          {getFoodOptionLabel(restriction, STANDARD_RESTRICTIONS)}
                        </FoodTag>
                      ))}
                      {foodProfile?.otherRestrictions ? (
                        <FoodTag>{foodProfile.otherRestrictions}</FoodTag>
                      ) : null}
                    </>
                  ) : (
                    <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                      No restrictions
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Additional nuances
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {foodProfile?.additionalNotes || "No additional food preferences yet."}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-border/80 bg-surface p-5 shadow-xs sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-brand-primary">
              <CreditCard className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-text-primary">Payment account</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                Add or update your PromptPay account and payment QR code.
              </p>
              <Link
                href={ROUTES.PAYMENT_ACCOUNT}
                className="mt-4 inline-flex h-10 items-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
              >
                Set up payment account
              </Link>
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
