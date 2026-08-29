"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { CalendarDays, Info, Minus, Pencil, Plus, Timer } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { FormError, FormField, FormLabel } from "@/components/ui/form-field";
import { ROUTES } from "@/config/routes";
import { roomService, RoomApiError } from "../services/room-service";
import {
  createRoomSchema,
  type CreateRoomFormValues,
} from "../schemas/room-schema";
import { useLanguage } from "@/i18n/LanguageProvider";
import { roomTranslations } from "../i18n/room-translations";
import { LocationPicker } from "./LocationPicker";
import { RoomPageHeader } from "./RoomPageHeader";



const SEARCH_RADII = [1, 3, 5, 10] as const;

function getInitialDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function CreateRoomForm() {
  const { locale } = useLanguage();
  const t = roomTranslations[locale].create;
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      maxMembers: 4,
      locationName: "",
      searchRadiusKm: 5,
      date: getInitialDate(),
      time: "19:00",
    },
    mode: "onBlur",
  });

  const maxMembers = useWatch({ control, name: "maxMembers" });
  const selectedRadius = useWatch({ control, name: "searchRadiusKm" });
  const roomName = useWatch({ control, name: "name" });
  const locationName = useWatch({ control, name: "locationName" });
  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });

  const updateMaxMembers = (nextValue: number) => {
    setValue("maxMembers", Math.min(15, Math.max(2, nextValue)), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const openDatePicker = () => {
    const dateInput = document.getElementById("room-date") as
      (HTMLInputElement & { showPicker?: () => void }) | null;

    if (!dateInput) {
      return;
    }

    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.click();
    }
  };

  const handleLocationChange = (value: string) => {
    setValue("locationName", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue("latitude", undefined);
    setValue("longitude", undefined);
  };

  const onSubmit = async (values: CreateRoomFormValues) => {
    setGeneralError(null);

    try {
      const createdRoom = await roomService.createRoom({
        name: values.name.trim(),
        maxMembers: values.maxMembers,
        locationName: values.locationName.trim(),
        latitude: values.latitude,
        longitude: values.longitude,
        searchRadiusKm: values.searchRadiusKm,
        scheduledAt: new Date(`${values.date}T${values.time}:00`).toISOString(),
      });

      window.location.assign(ROUTES.ROOM.LOBBY(createdRoom.id));
    } catch (error) {
      setGeneralError(
        error instanceof RoomApiError
          ? error.message
          : t.genericError,
      );
    }
  };

  return (
    <main className="relative min-h-dvh overflow-x-clip bg-transparent text-text-primary">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-32 pt-2 sm:px-6 sm:pt-4">
        <RoomPageHeader
          title={t.title}
          subtitle={t.subtitle}
          backHref={ROUTES.AUTHENTICATED_HOME}
          showAccountActions
        />


        <p className="mb-6 text-sm sm:text-base leading-relaxed text-white/90 drop-shadow-2xs">
          {t.description}
        </p>


        {generalError ? (
          <Alert variant="error" className="mb-4">
            <AlertTitle>{t.errorTitle}</AlertTitle>
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
          noValidate
        >
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <Card variant="outline" className="rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
              <FormField isInvalid={!!errors.name}>
                <FormLabel
                  htmlFor="room-name"
                  className="text-base font-semibold normal-case tracking-normal"
                >
                  <span className="inline-flex items-center gap-2">
                    {t.roomNameLabel}
                    <Info
                      className="size-4 text-text-secondary"
                      aria-hidden="true"
                    />
                  </span>
                </FormLabel>
                <div className="relative mt-2">
                  <Pencil
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                    aria-hidden="true"
                  />
                  <Input
                    id="room-name"
                    maxLength={30}
                    placeholder={t.roomNamePlaceholder}
                    className="h-14 rounded-2xl border-border/80 bg-surface pl-12 pr-14 text-base focus-visible:outline-focus-ring"
                    {...register("name")}
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                    {roomName.length}/30
                  </span>
                </div>
                {errors.name ? (
                  <FormError>{errors.name.message}</FormError>
                ) : null}
                <p className="mt-2 text-sm text-text-secondary">
                  {t.roomNameHelp}
                </p>
              </FormField>
            </Card>

            <Card variant="outline" className="rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
              <FormField isInvalid={!!errors.maxMembers}>
                <div className="flex items-center justify-between gap-3">
                  <FormLabel
                    htmlFor="max-members"
                    className="text-base font-semibold normal-case tracking-normal"
                  >
                    <span className="inline-flex items-center gap-2">
                      {t.maxMembersLabel}
                      <Info
                        className="size-4 text-text-secondary"
                        aria-hidden="true"
                      />
                    </span>
                  </FormLabel>
                  <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs text-text-secondary font-medium border border-border/40">
                    {t.maxMembersBadge}
                  </span>
                </div>
                <div className="mt-2 flex h-18 items-center justify-between rounded-2xl border border-border/60 bg-surface-subtle/80 px-6 py-2">
                  <button
                    type="button"
                    aria-label={t.decreaseMembers}
                    onClick={() => updateMaxMembers(maxMembers - 1)}
                    disabled={maxMembers <= 2 || isSubmitting}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border/80 bg-surface text-text-primary shadow-2xs transition-all hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-35 disabled:pointer-events-none disabled:shadow-none cursor-pointer"
                  >
                    <Minus className="size-5" aria-hidden="true" />
                  </button>
                  <div className="flex items-center justify-center">
                    <Input
                      id="max-members"
                      type="number"
                      min={2}
                      max={15}
                      inputMode="numeric"
                      aria-label={t.maxMembersLabel}
                      className="h-auto w-16 border-0 bg-transparent p-0 text-center text-3xl sm:text-4xl font-extrabold text-text-primary focus-visible:outline-none"
                      {...register("maxMembers", { valueAsNumber: true })}
                    />
                  </div>
                  <button
                    type="button"
                    aria-label={t.increaseMembers}
                    onClick={() => updateMaxMembers(maxMembers + 1)}
                    disabled={maxMembers >= 15 || isSubmitting}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-border/80 bg-surface text-text-primary shadow-2xs transition-all hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-35 disabled:pointer-events-none disabled:shadow-none cursor-pointer"
                  >
                    <Plus className="size-5" aria-hidden="true" />
                  </button>
                </div>
                {errors.maxMembers ? (
                  <FormError>{errors.maxMembers.message}</FormError>
                ) : null}
                <p className="mt-2 text-sm text-text-secondary">
                  {t.maxMembersHelp}
                </p>
              </FormField>
            </Card>
          </div>

          <Card variant="outline" className="rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
            <FormField isInvalid={!!errors.locationName}>
              <FormLabel
                htmlFor="location-name"
                className="text-base font-semibold normal-case tracking-normal"
              >
                <span className="inline-flex items-center gap-2">
                  {t.locationLabel}
                  <Info
                    className="size-4 text-text-secondary"
                    aria-hidden="true"
                  />
                </span>
              </FormLabel>
              <div className="mt-2">
                <LocationPicker
                  id="location-name"
                  value={locationName}
                  latitude={latitude}
                  longitude={longitude}
                  onChange={handleLocationChange}
                  onPlaceSelected={({
                    locationName: selectedLocation,
                    latitude,
                    longitude,
                  }) => {
                    setValue("locationName", selectedLocation, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    });
                    setValue("latitude", latitude);
                    setValue("longitude", longitude);
                  }}
                  onBlur={() => {
                    void trigger("locationName");
                  }}
                  disabled={isSubmitting}
                />
              </div>
              {errors.locationName ? (
                <FormError>{errors.locationName.message}</FormError>
              ) : null}

              <div className="mt-6 border-t border-border/80 pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <FormLabel
                    htmlFor="search-radius"
                    className="text-base font-semibold normal-case tracking-normal"
                  >
                    <span className="inline-flex items-center gap-2">
                      {t.searchRadiusLabel}
                      <Info
                        className="size-4 text-text-secondary"
                        aria-hidden="true"
                      />
                    </span>
                  </FormLabel>
                  <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs text-text-secondary font-medium border border-border/40">
                    {t.searchRadiusBadge(selectedRadius)}
                  </span>
                </div>
                <div
                  id="search-radius"
                  className="grid grid-cols-4 gap-2 sm:gap-2.5"
                  role="group"
                  aria-label={t.searchRadiusLabel}
                >
                  {SEARCH_RADII.map((radius) => {
                    const isSelected = selectedRadius === radius;
                    return (
                      <button
                        key={radius}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setValue("searchRadiusKm", radius, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        disabled={isSubmitting}
                        className={`h-12 rounded-xl border text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-50 cursor-pointer ${
                          isSelected
                            ? "border-brand-secondary bg-brand-secondary/15 text-brand-secondary font-bold shadow-xs ring-2 ring-brand-secondary/25"
                            : "border-border/80 bg-surface text-text-primary hover:bg-surface-subtle hover:border-border shadow-2xs active:scale-[0.98]"
                        }`}
                      >
                        {radius} km
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-sm text-text-secondary">
                  {t.searchRadiusHelp}
                </p>
              </div>
            </FormField>
          </Card>

          <Card variant="outline" className="rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs">
            <FormField isInvalid={!!errors.date || !!errors.time}>
              <FormLabel className="text-base font-semibold normal-case tracking-normal">
                <span className="inline-flex items-center gap-2">
                  {t.dateTimeLabel}
                  <Info
                    className="size-4 text-text-secondary"
                    aria-hidden="true"
                  />
                </span>
              </FormLabel>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-secondary">{t.dateLabel}</span>
                  <div className="relative">
                    <CalendarDays
                      className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                      aria-hidden="true"
                    />
                    <Input
                      id="room-date"
                      type="date"
                      className="h-13 appearance-none rounded-2xl border-border/80 bg-surface pl-11 pr-12 text-sm focus-visible:outline-focus-ring [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                      {...register("date")}
                    />
                    <button
                      type="button"
                      aria-label={t.openDatePicker}
                      onClick={openDatePicker}
                      className="absolute right-1.5 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-xl text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
                    >
                      <CalendarDays className="size-4 text-text-secondary" aria-hidden="true" />
                    </button>
                  </div>
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-secondary">{t.timeLabel}</span>
                  <div className="relative">
                    <Timer
                      className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                      aria-hidden="true"
                    />
                    <Input
                      type="time"
                      className="h-13 rounded-2xl border-border/80 bg-surface pl-11 pr-10 text-sm focus-visible:outline-focus-ring [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:size-4"
                      {...register("time")}
                    />
                  </div>
                </label>
              </div>
              {errors.date ? (
                <FormError>{errors.date.message}</FormError>
              ) : null}
              {errors.time ? (
                <FormError>{errors.time.message}</FormError>
              ) : null}
              <p className="mt-2 text-sm text-text-secondary">
                {t.dateTimeHelp}
              </p>
            </FormField>
          </Card>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4.5 sm:p-5 text-amber-950">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden="true" />
              <div>
                <p className="font-semibold text-text-primary">
                  {t.afterCreateTitle}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {t.afterCreateDesc}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            loadingText={t.submitting}
            className="h-14 rounded-2xl text-base font-bold shadow-xs active:scale-[0.99]"
          >
            {t.submit}
          </Button>
        </form>
      </div>
    </main>
  );
}
