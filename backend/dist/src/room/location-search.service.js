"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSearchService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let LocationSearchService = class LocationSearchService {
    configService;
    lastRequestAt = 0;
    rateLimitQueue = Promise.resolve();
    constructor(configService) {
        this.configService = configService;
    }
    async search(query, latitude, longitude) {
        const normalizedQuery = query.trim();
        if (normalizedQuery.length < 3) {
            throw new common_1.BadRequestException('Enter at least 3 characters to search.');
        }
        const searchParams = new URLSearchParams({
            q: normalizedQuery,
            limit: '5',
            countrycode: 'TH',
        });
        if (Number.isFinite(latitude) &&
            Number.isFinite(longitude) &&
            latitude !== undefined &&
            longitude !== undefined) {
            searchParams.set('lat', String(latitude));
            searchParams.set('lon', String(longitude));
            searchParams.set('zoom', '13');
            searchParams.set('location_bias_scale', '0.2');
        }
        return this.fetchPhotonResults(`https://photon.komoot.io/api/?${searchParams.toString()}`);
    }
    async reverse(latitude, longitude) {
        if (!Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180) {
            throw new common_1.BadRequestException('A valid latitude and longitude are required.');
        }
        const searchParams = new URLSearchParams({
            lat: String(latitude),
            lon: String(longitude),
        });
        const results = await this.fetchPhotonResults(`https://photon.komoot.io/reverse?${searchParams.toString()}`);
        return (results[0] ?? {
            locationName: 'Selected location',
            latitude,
            longitude,
        });
    }
    async fetchPhotonResults(url) {
        await this.waitForRateLimit();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        try {
            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    Accept: 'application/json',
                    'User-Agent': 'FoodFight/1.0 (location search)',
                    Referer: this.configService.get('FRONTEND_URL') ??
                        'http://localhost:3000',
                },
            });
            if (!response.ok) {
                throw new Error(`Photon returned ${response.status}.`);
            }
            const results = (await response.json());
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
                    .filter((part, index, parts) => Boolean(part) && parts.indexOf(part) === index)
                    .join(', ')
                    .trim();
                if (!locationName ||
                    !Number.isFinite(latitude) ||
                    !Number.isFinite(longitude)) {
                    return [];
                }
                return [{ locationName, latitude, longitude }];
            });
        }
        catch {
            throw new common_1.ServiceUnavailableException('Location search is temporarily unavailable. You can enter a location manually or use your current location.');
        }
        finally {
            clearTimeout(timeout);
        }
    }
    async waitForRateLimit() {
        const minimumIntervalMs = 1000;
        const previousRequest = this.rateLimitQueue;
        let releaseRequest;
        this.rateLimitQueue = new Promise((resolve) => {
            releaseRequest = resolve;
        });
        await previousRequest;
        const waitMs = Math.max(0, this.lastRequestAt + minimumIntervalMs - Date.now());
        if (waitMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, waitMs));
        }
        this.lastRequestAt = Date.now();
        releaseRequest();
    }
};
exports.LocationSearchService = LocationSearchService;
exports.LocationSearchService = LocationSearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LocationSearchService);
//# sourceMappingURL=location-search.service.js.map