import { ConfigService } from '@nestjs/config';
export type LocationSearchResult = {
    locationName: string;
    latitude: number;
    longitude: number;
};
export declare class LocationSearchService {
    private readonly configService;
    private lastRequestAt;
    private rateLimitQueue;
    constructor(configService: ConfigService);
    search(query: string, latitude?: number, longitude?: number): Promise<LocationSearchResult[]>;
    reverse(latitude: number, longitude: number): Promise<LocationSearchResult>;
    private fetchPhotonResults;
    private waitForRateLimit;
}
