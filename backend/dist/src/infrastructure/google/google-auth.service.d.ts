import { ConfigService } from '@nestjs/config';
export type GoogleProfile = {
    sub: string;
    email: string;
    name: string;
    picture?: string;
};
export declare class GoogleAuthService {
    private readonly configService;
    private readonly client;
    constructor(configService: ConfigService);
    verifyIdToken(idToken: string): Promise<GoogleProfile>;
}
