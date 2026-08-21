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
          : "Unable to create the room. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-dvh overflow-x-clip bg-background text-text-primary">
      <div className="mx-auto w-full max-w-5xl px-4 pb-32 pt-3 sm:px-6 sm:pt-5">
        <RoomPageHeader
          title="Create Room"
          subtitle="Set up your FoodFight"
          backHref={ROUTES.AUTHENTICATED_HOME}
          showAccountActions
        />

        <p className="mb-5 text-base leading-relaxed text-text-secondary">
          Fill in the details below to create a room for your group.
        </p>

        {generalError ? (
          <Alert variant="error" className="mb-4">
            <AlertTitle>Could not create room</AlertTitle>
            <AlertDescription>{generalError}</AlertDescription>
          </Alert>
        ) : null}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid gap-4 lg:grid-cols-2">
          <Card variant="outline" className="rounded-2xl p-5">
            <FormField isInvalid={!!errors.name}>
              <FormLabel
                htmlFor="room-name"
                className="text-base font-semibold normal-case tracking-normal"
              >
                <span className="inline-flex items-center gap-2">
                  Room Name
                  <Info
                    className="size-4 text-text-secondary"
                    aria-hidden="true"
                  />
                </span>
              </FormLabel>
              <div className="relative">
                <Pencil
                  className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                  aria-hidden="true"
                />
                <Input
                  id="room-name"
                  maxLength={30}
                  placeholder="e.g. Saturday dinner"
                  className="h-14 rounded-xl pl-12 pr-14 text-base"
                  {...register("name")}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
                  {roomName.length}/30
                </span>
              </div>
              {errors.name ? (
                <FormError>{errors.name.message}</FormError>
              ) : null}
              <p className="text-sm text-text-secondary">
                This is how your room will appear to others.
              </p>
            </FormField>
          </Card>

          <Card variant="outline" className="rounded-2xl p-5">
            <FormField isInvalid={!!errors.maxMembers}>
              <div className="flex items-center justify-between gap-3">
                <FormLabel
                  htmlFor="max-members"
                  className="text-base font-semibold normal-case tracking-normal"
                >
                  <span className="inline-flex items-center gap-2">
                    Max Members
                    <Info
                      className="size-4 text-text-secondary"
                      aria-hidden="true"
                    />
                  </span>
                </FormLabel>
                <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs text-text-secondary">
                  2 – 15 people
                </span>
              </div>
              <div className="flex h-16 items-center justify-center gap-12 rounded-xl border border-border bg-surface">
                <button
                  type="button"
                  aria-label="Decrease maximum members"
                  onClick={() => updateMaxMembers(maxMembers - 1)}
                  disabled={maxMembers <= 2 || isSubmitting}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary disabled:opacity-40"
                >
                  <Minus className="size-5" aria-hidden="true" />
                </button>
                <Input
                  id="max-members"
                  type="number"
                  min={2}
                  max={15}
                  inputMode="numeric"
                  aria-label="Maximum members"
                  className="h-auto w-12 border-0 p-0 text-center text-3xl font-semibold focus-visible:outline-none"
                  {...register("maxMembers", { valueAsNumber: true })}
                />
                <button
                  type="button"
                  aria-label="Increase maximum members"
                  onClick={() => updateMaxMembers(maxMembers + 1)}
                  disabled={maxMembers >= 15 || isSubmitting}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary disabled:opacity-40"
                >
                  <Plus className="size-5" aria-hidden="true" />
                </button>
              </div>
              {errors.maxMembers ? (
                <FormError>{errors.maxMembers.message}</FormError>
              ) : null}
              <p className="text-sm text-text-secondary">
                Set the maximum number of people who can join.
              </p>
            </FormField>
          </Card>
          </div>

          <Card variant="outline" className="rounded-2xl p-5">
            <FormField isInvalid={!!errors.locationName}>
              <FormLabel
                htmlFor="location-name"
                className="text-base font-semibold normal-case tracking-normal"
              >
                <span className="inline-flex items-center gap-2">
                  Location
                  <Info
                    className="size-4 text-text-secondary"
                    aria-hidden="true"
                  />
                </span>
              </FormLabel>
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
              {errors.locationName ? (
                <FormError>{errors.locationName.message}</FormError>
              ) : null}

              <div className="mt-5 border-t border-border pt-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <FormLabel
                    htmlFor="search-radius"
                    className="text-base font-semibold normal-case tracking-normal"
                  >
                    <span className="inline-flex items-center gap-2">
                      Search Radius
                      <Info
                        className="size-4 text-text-secondary"
                        aria-hidden="true"
                      />
                    </span>
                  </FormLabel>
                  <span className="rounded-full bg-surface-subtle px-3 py-1 text-xs text-text-secondary">
                    Within {selectedRadius} km
                  </span>
                </div>
                <div
                  id="search-radius"
                  className="grid grid-cols-4 gap-2"
                  role="group"
                  aria-label="Search radius"
                >
                  {SEARCH_RADII.map((radius) => (
                    <button
                      key={radius}
                      type="button"
                      aria-pressed={selectedRadius === radius}
                      onClick={() =>
                        setValue("searchRadiusKm", radius, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                      disabled={isSubmitting}
                      className={`h-12 rounded-xl border text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary disabled:opacity-50 ${selectedRadius === radius ? "border-brand-primary bg-surface-subtle font-semibold text-text-primary" : "border-border bg-surface text-text-primary hover:bg-surface-subtle"}`}
                    >
                      {radius} km
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-text-secondary">
                  AI will search for restaurants within the selected distance.
                </p>
              </div>
            </FormField>
          </Card>

          <Card variant="outline" className="rounded-2xl p-5">
            <FormField isInvalid={!!errors.date || !!errors.time}>
              <FormLabel className="text-base font-semibold normal-case tracking-normal">
                <span className="inline-flex items-center gap-2">
                  Date &amp; Time
                  <Info
                    className="size-4 text-text-secondary"
                    aria-hidden="true"
                  />
                </span>
              </FormLabel>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-sm text-text-secondary">Date</span>
                  <div className="relative">
                    <CalendarDays
                      className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                      aria-hidden="true"
                    />
                    <Input
                      id="room-date"
                      type="date"
                      className="h-12 appearance-none rounded-xl pl-11 pr-12 text-sm [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                      {...register("date")}
                    />
                    <button
                      type="button"
                      aria-label="Open date picker"
                      onClick={openDatePicker}
                      className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary"
                    >
                      <CalendarDays className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm text-text-secondary">Time</span>
                  <div className="relative">
                    <Timer
                      className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-text-primary"
                      aria-hidden="true"
                    />
                    <Input
                      type="time"
                      className="h-12 rounded-xl pl-11 pr-10 text-sm [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:size-4"
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
              <p className="text-sm text-text-secondary">
                When will you and your friends meet for the meal?
              </p>
            </FormField>
          </Card>

          <div className="rounded-2xl border border-border bg-surface-subtle p-5">
            <p className="font-semibold text-text-primary">
              After you create the room
            </p>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              We will generate a room code, invite link and QR code for you to
              share with your friends.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            loadingText="Creating room"
          >
            Create Room
          </Button>
        </form>
      </div>
    </main>
  );
}
