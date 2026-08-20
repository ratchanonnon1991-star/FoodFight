import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type PhotonFeature = {
  properties?: {
    name?: string;
    street?: string;
    housenumber?: string;
    district?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  geometry?: {
    coordinates?: unknown;
  };
};

type PhotonResponse = {
  features?: PhotonFeature[];
};

export type LocationSearchResult = {
  locationName: string;
  latitude: number;
  longitude: number;
};

@Injectable()
export class LocationSearchService {
  private lastRequestAt = 0;
  private rateLimitQueue: Promise<void> = Promise.resolve();

  constructor(private readonly configService: ConfigService) {}

  async search(
    query: string,
    latitude?: number,
    longitude?: number,
  ): Promise<LocationSearchResult[]> {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 3) {
      throw new BadRequestException('Enter at least 3 characters to search.');
    }

    const searchParams = new URLSearchParams({
      q: normalizedQuery,
      limit: '5',
      countrycode: 'TH',
    });

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude) &&
      latitude !== undefined &&
      longitude !== undefined
    ) {
      searchParams.set('lat', String(latitude));
      searchParams.set('lon', String(longitude));
      searchParams.set('zoom', '13');
      searchParams.set('location_bias_scale', '0.2');
    }

    return this.fetchPhotonResults(
      `https://photon.komoot.io/api/?${searchParams.toString()}`,
    );
  }

  async reverse(latitude: number, longitude: number) {
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new BadRequestException(
        'A valid latitude and longitude are required.',
      );
    }

    const searchParams = new URLSearchParams({
      lat: String(latitude),
      lon: String(longitude),
    });

    const results = await this.fetchPhotonResults(
      `https://photon.komoot.io/reverse?${searchParams.toString()}`,
    );

    return (
      results[0] ?? {
        locationName: 'Selected location',
        latitude,
        longitude,
      }
    );
  }

  private async fetchPhotonResults(
    url: string,
  ): Promise<LocationSearchResult[]> {
    await this.waitForRateLimit();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'FoodFight/1.0 (location search)',
          Referer:
            this.configService.get<string>('FRONTEND_URL') ??
            'http://localhost:3000',
        },
      });

      if (!response.ok) {
        throw new Error(`Photon returned ${response.status}.`);
      }

      const results = (await response.json()) as PhotonResponse;

      return (results.features ?? []).flatMap((feature) => {
        const properties = feature.properties;
        const coordinates = feature.geometry?.coordinates;
        const longitude = Array.isArray(coordinates)
          ? Number(coordinates[0])
          : Number.NaN;
        const latitude = Array.isArray(coordinates)
          ? Number(coordinates[1])
          : Number.NaN;
        const street = [properties?.housenumber, properties?.street]
          .filter(Boolean)
          .join(' ');
        const locationName = [
          properties?.name,
          street,
          properties?.district,
          properties?.city,
          properties?.state,
          properties?.postcode,
          properties?.country,
        ]
          .filter(
            (part, index, parts) =>
              Boolean(part) && parts.indexOf(part) === index,
          )
          .join(', ')
          .trim();

        if (
          !locationName ||
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude)
        ) {
          return [];
        }

        return [{ locationName, latitude, longitude }];
      });
    } catch {
      throw new ServiceUnavailableException(
        'Location search is temporarily unavailable. You can enter a location manually or use your current location.',
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  private async waitForRateLimit() {
    const minimumIntervalMs = 1000;
    const previousRequest = this.rateLimitQueue;
    let releaseRequest!: () => void;

    this.rateLimitQueue = new Promise<void>((resolve) => {
      releaseRequest = resolve;
    });

    await previousRequest;

    const waitMs = Math.max(
      0,
      this.lastRequestAt + minimumIntervalMs - Date.now(),
    );

    if (waitMs > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, waitMs));
    }

    this.lastRequestAt = Date.now();
    releaseRequest();
  }
}
