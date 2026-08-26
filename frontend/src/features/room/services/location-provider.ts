import { roomService } from "./room-service";
import type {
  LocationProviderId,
  LocationSearchSuggestion,
} from "../types/room-types";

export interface LocationProviderAdapter {
  readonly id: LocationProviderId;
  search: (options: {
    query: string;
    signal?: AbortSignal;
    latitude?: number | null;
    longitude?: number | null;
  }) => Promise<LocationSearchSuggestion[]>;
  reverse: (
    latitude: number,
    longitude: number,
    signal?: AbortSignal,
  ) => Promise<LocationSearchSuggestion>;
}

const osmPhotonProvider: LocationProviderAdapter = {
  id: "osm-photon",
  search: ({ query, signal, latitude, longitude }) =>
    roomService.searchLocations(query, {
      signal,
      latitude,
      longitude,
    }),
  reverse: (latitude, longitude, signal) =>
    roomService.reverseLocation(latitude, longitude, signal),
};

/**
 * Reserved adapter for the future Google Places/Geocoding integration.
 * It intentionally does not load a Google script or make a network request yet.
 */
export const googleMapsProvider: LocationProviderAdapter = {
  id: "google-maps",
  search: async () => {
    throw new Error("Google Maps provider is not configured yet.");
  },
  reverse: async () => {
    throw new Error("Google Maps provider is not configured yet.");
  },
};

/**
 * Keep the current provider active until a Google Maps key and implementation
 * are configured. LocationPicker only depends on this adapter contract.
 */
const configuredProvider = process.env.NEXT_PUBLIC_LOCATION_PROVIDER;

export const locationProvider: LocationProviderAdapter =
  configuredProvider === "google-maps"
    ? googleMapsProvider
    : osmPhotonProvider;
