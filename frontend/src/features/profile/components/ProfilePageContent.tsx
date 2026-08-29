'use client';

/* Profile images can be external OAuth URLs or browser-selected data URLs. */
/* eslint-disable @next/next/no-img-element */

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  CreditCard,
  ImageUp,
  Pencil,
  Utensils,
} from 'lucide-react';
import { ROUTES } from '@/config/routes';
import {
  AuthenticatedPageLayout,
  AuthenticatedPageHeader,
} from '@/components/layout/AuthenticatedPageLayout';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  STANDARD_ALLERGIES,
  STANDARD_RESTRICTIONS,
} from '@/features/food-profile/constants/food-profile-constants';
import {
  getMyFoodProfile,
  type FoodProfileResponse,
} from '@/features/food-profile/services/food-profile-service';
import { resolveAuthMode } from '@/features/auth/services/auth-runtime';
import { useLanguage } from '@/i18n/LanguageProvider';
import { profileTranslations } from '../i18n/profile-translations';
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  type CurrentUserProfile,
} from '../services/profile-service';

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
    reader.onerror = () =>
      reject(new Error('Unable to read the selected image.'));
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
  const [failedAvatarUrl, setFailedAvatarUrl] = React.useState<string | null>(
    null,
  );
  const initial = name.trim().charAt(0).toUpperCase() || '?';

  if (avatarUrl && failedAvatarUrl !== avatarUrl) {
    return (
      <img
        key={avatarUrl}
        src={avatarUrl}
        alt={`${name || 'User'}'s profile`}
        className="size-24 rounded-full border-4 border-surface object-cover shadow-md"
        referrerPolicy="no-referrer"
        onError={() => setFailedAvatarUrl(avatarUrl)}
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
  const { locale } = useLanguage();
  const t = profileTranslations[locale];
  const avatarFileInputRef = React.useRef<HTMLInputElement>(null);
  const [profile, setProfile] = React.useState<CurrentUserProfile | null>(null);
  const [foodProfile, setFoodProfile] =
    React.useState<FoodProfileResponse | null>(null);
  const [displayName, setDisplayName] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFoodProfileLoading, setIsFoodProfileLoading] = React.useState(
    () => resolveAuthMode() === 'api',
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    let isMounted = true;
    const token = window.localStorage.getItem('accessToken');

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
        setAvatarUrl(currentProfile.avatarUrl ?? '');
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(t.errorDefault);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    if (resolveAuthMode() === 'api') {
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
    }

    return () => {
      isMounted = false;
    };
  }, [router, t.errorDefault]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = window.localStorage.getItem('accessToken');
    const nextDisplayName = displayName.trim();
    const nextAvatarUrl = avatarUrl.trim();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!token) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    if (!nextDisplayName) {
      setErrorMessage('Please enter your name.');
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
      setAvatarUrl(updatedProfile.avatarUrl ?? '');
      setSuccessMessage(t.successUpdated);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t.errorDefault,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    setErrorMessage(null);

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file.');
      return;
    }

    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setErrorMessage('Profile picture must be 2 MB or smaller.');
      return;
    }

    try {
      setAvatarUrl(await readFileAsDataUrl(file));
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to read the profile picture.',
      );
    }
  };

  if (isLoading) {
    return (
      <AuthenticatedPageLayout className="py-10">
        <p className="text-sm text-text-secondary">Loading profile...</p>
      </AuthenticatedPageLayout>
    );
  }

  return (
    <AuthenticatedPageLayout>
      <AuthenticatedPageHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

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
                {displayName || t.title}
              </h2>
              <p className="truncate text-sm text-text-secondary">
                {profile?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="profile-display-name">{t.displayName}</Label>
              <Input
                id="profile-display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder={t.displayNamePlaceholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>{t.avatarUploadPrompt}</Label>
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
                {t.avatarUploadPrompt}
              </Button>
              <p className="text-xs text-text-muted">
                {t.avatarUploadHelp}
              </p>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isSaving}
              loadingText={t.saving}
            >
              {t.saveChanges}
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
                <h2 className="font-bold text-text-primary">
                  {t.foodPreferences}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {t.foodPreferencesDesc}
                </p>
              </div>
            </div>
            <Link
              href={`${ROUTES.FOOD_PROFILE.ALLERGIES}?from=profile`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/40 px-4 py-2 text-sm font-semibold text-text-primary hover:bg-brand-primary/5"
            >
              {t.editFoodProfile}
              <Pencil className="size-3.5" />
            </Link>
          </div>

          {isFoodProfileLoading ? (
            <p className="mt-6 text-sm text-text-secondary">
              Loading food preferences...
            </p>
          ) : (
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {t.allergies}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foodProfile?.allergies.length ||
                  foodProfile?.otherAllergies ? (
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
                      {t.noAllergies}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {t.restrictions}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foodProfile?.restrictions.length ||
                  foodProfile?.otherRestrictions ? (
                    <>
                      {foodProfile?.restrictions.map((restriction) => (
                        <FoodTag key={restriction}>
                          {getFoodOptionLabel(
                            restriction,
                            STANDARD_RESTRICTIONS,
                          )}
                        </FoodTag>
                      ))}
                      {foodProfile?.otherRestrictions ? (
                        <FoodTag>{foodProfile.otherRestrictions}</FoodTag>
                      ) : null}
                    </>
                  ) : (
                    <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-semibold text-text-secondary">
                      {t.noRestrictions}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {t.foodPreferencesDesc}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {foodProfile?.additionalNotes ||
                    t.noRestrictions}
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
              <h2 className="font-bold text-text-primary">{t.paymentAccount}</h2>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {t.paymentAccountDesc}
              </p>
              <Link
                href={ROUTES.PAYMENT_ACCOUNT}
                className="mt-4 inline-flex h-10 items-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
              >
                {t.paymentAccountButton}
              </Link>
            </div>
          </div>
      </section>
    </AuthenticatedPageLayout>
  );
}
