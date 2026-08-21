"use client";

import * as React from "react";
import { Crosshair, Map as MapIcon, MapPin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { RoomApiError, roomService } from "../services/room-service";
import type { LocationSearchSuggestion } from "../types/room-types";
import { LocationMap } from "./LocationMap";

export interface LocationPickerProps {
  id: string;
  value: string;
  latitude?: number | null;
  longitude?: number | null;
  onChange: (value: string) => void;
  onPlaceSelected: (place: LocationSearchSuggestion) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export function LocationPicker({
  id,
  value,
  latitude = null,
  longitude = null,
  onChange,
  onPlaceSelected,
  onBlur,
  disabled = false,
}: LocationPickerProps) {
  const [suggestions, setSuggestions] = React.useState<
    LocationSearchSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [isLocating, setIsLocating] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const searchTimeout = React.useRef<number | null>(null);
  const requestId = React.useRef(0);
  const requestController = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    return () => {
      if (searchTimeout.current !== null) {
        window.clearTimeout(searchTimeout.current);
      }
      requestController.current?.abort();
    };
  }, []);

  const requestSuggestions = React.useCallback(
    async (query: string) => {
      const normalizedQuery = query.trim();

      if (normalizedQuery.length < 3 || disabled) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      requestController.current?.abort();
      const controller = new AbortController();
      requestController.current = controller;
      const currentRequestId = ++requestId.current;

      setIsLoading(true);
      setSearchError(null);

      try {
        const results = await roomService.searchLocations(normalizedQuery, {
          signal: controller.signal,
          latitude,
          longitude,
        });

        if (
          controller.signal.aborted ||
          currentRequestId !== requestId.current
        ) {
          return;
        }

        setSuggestions(results);
        setIsOpen(true);
      } catch (error) {
        if (
          controller.signal.aborted ||
          currentRequestId !== requestId.current
        ) {
          return;
        }

        setSuggestions([]);
        setIsOpen(false);
        setSearchError(
          error instanceof RoomApiError
            ? error.message
            : "Location search is unavailable. You can enter a location manually or use your current location.",
        );
      } finally {
        if (
          !controller.signal.aborted &&
          currentRequestId === requestId.current
        ) {
          setIsLoading(false);
        }
      }
    },
    [disabled, latitude, longitude],
  );

  const scheduleSearch = React.useCallback(
    (query: string) => {
      if (searchTimeout.current !== null) {
        window.clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = window.setTimeout(() => {
        void requestSuggestions(query);
      }, 700);
    },
    [requestSuggestions],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    onChange(nextValue);
    setMessage(null);
    setSearchError(null);

    if (nextValue.trim().length < 3 || disabled) {
      requestId.current += 1;
      requestController.current?.abort();
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    scheduleSearch(nextValue);
  };

  const selectSuggestion = (suggestion: LocationSearchSuggestion) => {
    requestController.current?.abort();
    requestId.current += 1;
    onChange(suggestion.locationName);
    onPlaceSelected(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    setIsLoading(false);
    setSearchError(null);
    setMessage("Location selected.");
  };

  const reverseGeocode = async (
    nextLatitude: number,
    nextLongitude: number,
    fallbackName: string,
  ) => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    onChange(fallbackName);
    onPlaceSelected({
      locationName: fallbackName,
      latitude: nextLatitude,
      longitude: nextLongitude,
    });
    setMessage("Finding the address for this pin...");
    setSearchError(null);

    try {
      const selectedLocation = await roomService.reverseLocation(
        nextLatitude,
        nextLongitude,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      onChange(selectedLocation.locationName);
      onPlaceSelected(selectedLocation);
      setMessage("Location selected.");
    } catch {
      if (!controller.signal.aborted) {
        setMessage(
          "Pin selected. The address could not be loaded, but the coordinates were saved.",
        );
      }
    }
  };

  const useCurrentLocation = () => {
    if (isLocating || disabled) {
      return;
    }

    setSearchError(null);

    if (!navigator.geolocation) {
      setSearchError("Location is not available in this browser.");
      return;
    }

    setIsLocating(true);
    setMessage("Getting your current location...");

    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setIsLocating(false);
          setIsMapOpen(true);
          void reverseGeocode(
            coords.latitude,
            coords.longitude,
            "Current location",
          );
        },
        (error) => {
          setIsLocating(false);
          setSearchError(
            error.code === error.PERMISSION_DENIED
              ? "Location permission was denied. Allow location access in your browser and try again."
              : error.code === error.TIMEOUT
                ? "Location lookup timed out. Please try again."
                : "Your current location is unavailable. Please try again or enter a place manually.",
          );
        },
        {
          enableHighAccuracy: true,
          maximumAge: 60_000,
          timeout: 15_000,
        },
      );
    } catch {
      setIsLocating(false);
      setSearchError("Location access is blocked in this browser context.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative z-10">
        <span className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center">
          <MapPin className="size-5 text-text-primary" aria-hidden="true" />
        </span>
        <Input
          id={id}
          value={value}
          placeholder="Search a place or area"
          autoComplete="off"
          disabled={disabled}
          aria-autocomplete="list"
          aria-controls={`${id}-suggestions`}
          aria-expanded={isOpen}
          className="h-14 rounded-xl pl-12 pr-4"
          onChange={handleChange}
          onFocus={() => {
            if (value.trim().length >= 3 && !disabled) {
              scheduleSearch(value);
            }
          }}
          onBlur={(event) => {
            window.setTimeout(() => setIsOpen(false), 150);
            onBlur?.(event);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
        />

        {isLoading ? (
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary"
            role="status"
          >
            Searching...
          </span>
        ) : null}

        {isOpen ? (
          <div
            id={`${id}-suggestions`}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
          >
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map((suggestion) => (
                  <li
                    key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.locationName}`}
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected="false"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-surface-subtle focus-visible:bg-surface-subtle focus-visible:outline-none"
                    >
                      <span className="block text-sm font-medium text-text-primary">
                        {suggestion.locationName}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-3 text-sm text-text-secondary">
                No locations found.
              </p>
            )}
            <p className="border-t border-border px-4 py-2 text-right text-[10px] text-text-muted">
              Search data: OpenStreetMap contributors / Photon
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setIsMapOpen((current) => !current);
            setSearchError(null);
          }}
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary disabled:opacity-50"
        >
          <MapIcon className="size-4" aria-hidden="true" />
          {isMapOpen ? "Hide map" : "Pick on map"}
        </button>
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={disabled || isLocating}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-brand-secondary disabled:opacity-50"
        >
          <Crosshair className="size-4" aria-hidden="true" />
          {isLocating ? "Locating..." : "Use current location"}
        </button>
      </div>

      {isMapOpen ? (
        <>
          <LocationMap
            latitude={latitude}
            longitude={longitude}
            onPositionChange={(nextLatitude, nextLongitude) => {
              void reverseGeocode(
                nextLatitude,
                nextLongitude,
                "Selected location",
              );
            }}
            onError={setSearchError}
          />
          {typeof latitude === "number" && typeof longitude === "number" ? (
            <p className="text-xs text-text-secondary" role="status">
              Pinned location: {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </p>
          ) : null}
        </>
      ) : null}

      {message ? (
        <p className="text-xs text-text-secondary" role="status">
          {message}
        </p>
      ) : null}
      {searchError ? (
        <p className="text-xs text-text-secondary" role="status">
          {searchError}
        </p>
      ) : null}
    </div>
  );
}
