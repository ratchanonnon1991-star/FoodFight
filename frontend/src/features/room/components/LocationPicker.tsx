"use client";

import * as React from "react";
import { Crosshair, Map as MapIcon, MapPin } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { useLanguage } from "@/i18n/LanguageProvider";
import { roomTranslations } from "../i18n/room-translations";
import { RoomApiError } from "../services/room-service";

import { locationProvider } from "../services/location-provider";
import type {
  LocationSearchSuggestion,
  LocationSelection,
  LocationSelectionSource,
} from "../types/room-types";
import { LocationMap } from "./LocationMap";

export interface LocationPickerProps {
  id: string;
  value: string;
  latitude?: number | null;
  longitude?: number | null;
  onChange: (value: string) => void;
  onPlaceSelected: (place: LocationSelection) => void;
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
  const { locale } = useLanguage();
  const t = roomTranslations[locale].create;
  const [suggestions, setSuggestions] = React.useState<
    LocationSearchSuggestion[]
  >([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [isLocating, setIsLocating] = React.useState(false);
  const [selectionSource, setSelectionSource] =
    React.useState<LocationSelectionSource | null>(null);
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
        const results = await locationProvider.search({
          query: normalizedQuery,
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
    setSelectionSource(null);
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
    onPlaceSelected({ ...suggestion, source: "search" });
    setSelectionSource("search");
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
    source: LocationSelectionSource,
  ) => {
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;

    onChange(fallbackName);
    onPlaceSelected({
      locationName: fallbackName,
      latitude: nextLatitude,
      longitude: nextLongitude,
      source,
    });
    setSelectionSource(source);
    setMessage("Finding the address for this pin...");
    setSearchError(null);

    try {
      const selectedLocation = await locationProvider.reverse(
        nextLatitude,
        nextLongitude,
        controller.signal,
      );

      if (controller.signal.aborted) {
        return;
      }

      onChange(selectedLocation.locationName);
      onPlaceSelected({ ...selectedLocation, source });
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
            "current",
          );
        },
        (error) => {
          setIsLocating(false);
          setSearchError(
            error.code === error.PERMISSION_DENIED
              ? t.locationBlocked
              : t.genericError,
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
      setSearchError(t.locationBlocked);
    }
  };

  const hasCoordinates =
    typeof latitude === "number" && typeof longitude === "number";
  const sourceLabel =
    selectionSource === "current"
      ? t.sourceCurrent
      : selectionSource === "map"
        ? t.sourceMap
        : selectionSource === "search"
          ? t.sourceSearch
          : t.sourceSelected;

  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-text-secondary">
        {t.locationHelper}
      </p>
      <div className="relative z-10">
        <span className="pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center">
          <MapPin className="size-5 text-text-primary" aria-hidden="true" />
        </span>
        <Input
          id={id}
          value={value}
          placeholder={t.locationPlaceholder}
          autoComplete="off"
          disabled={disabled}
          aria-autocomplete="list"
          aria-controls={`${id}-suggestions`}
          aria-expanded={isOpen}
          className="h-14 rounded-xl pl-12 pr-4 bg-surface border-border/80 focus-visible:outline-focus-ring"
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
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium"
            role="status"
          >
            {t.locationSearching}
          </span>
        ) : null}

        {isOpen ? (
          <div
            id={`${id}-suggestions`}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-xl"
          >
            {suggestions.length > 0 ? (
              <ul className="divide-y divide-border/40">
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
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-surface-subtle/80 focus-visible:bg-surface-subtle focus-visible:outline-none"
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
                {t.noLocationsFound}
              </p>
            )}
            <p className="border-t border-border/60 bg-surface-subtle/40 px-4 py-2 text-right text-[10px] text-text-muted">
              {t.searchDataAttribution}
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            setIsMapOpen((current) => !current);
            setSearchError(null);
          }}
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface px-3 text-sm font-medium text-text-primary shadow-2xs transition-all hover:bg-surface-subtle hover:border-border active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          <MapIcon className="size-4 shrink-0 text-text-secondary" aria-hidden="true" />
          <span>{isMapOpen ? t.hideMap : t.pickOnMap}</span>
        </button>
        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={disabled || isLocating}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface px-3 text-sm font-medium text-text-primary shadow-2xs transition-all hover:bg-surface-subtle hover:border-border active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          <Crosshair className={`size-4 shrink-0 text-text-secondary ${isLocating ? "animate-spin" : ""}`} aria-hidden="true" />
          <span>{isLocating ? t.locating : t.useCurrentLocation}</span>
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
                t.sourceSelected,
                "map",
              );
            }}
            onError={setSearchError}
          />
          {hasCoordinates ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-subtle/80 px-3 py-1 text-xs text-text-secondary" role="status">
              <span className="font-medium">{sourceLabel}:</span>
              <span>{latitude.toFixed(5)}, {longitude.toFixed(5)}</span>
            </div>
          ) : null}
        </>
      ) : null}

      {isMapOpen && hasCoordinates ? null : hasCoordinates ? (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-subtle/80 px-3 py-1 text-xs text-text-secondary" role="status">
          <span className="font-medium">{sourceLabel}:</span>
          <span>{latitude.toFixed(5)}, {longitude.toFixed(5)}</span>
        </div>
      ) : null}

      {message ? (
        <p className="text-xs text-text-secondary" role="status">
          {message}
        </p>
      ) : null}
      {searchError ? (
        <p className="text-xs font-medium text-status-danger-text" role="status">
          {searchError}
        </p>
      ) : null}
    </div>
  );
}
